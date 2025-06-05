import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface UploadProfilePictureParams {
  file: File;
  userId: string;
}

export function useProfilePicture() {
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mutation pour mettre à jour la photo de profil
  const { mutate: updateProfilePicture, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      imageUrl,
      key,
    }: {
      imageUrl: string;
      key: string;
    }) => {
      const response = await axios.post("/api/user/profile-picture", {
        imageUrl,
        key,
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalider les requêtes pour forcer un rafraîchissement des données
      queryClient.invalidateQueries({ queryKey: ["profil"] });
      toast.success("Photo de profil mise à jour avec succès");
    },
    onError: (error) => {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil:",
        error
      );
      toast.error("Erreur lors de la mise à jour de la photo de profil");
    },
  });

  // Mutation pour supprimer la photo de profil
  const { mutate: deleteProfilePicture, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/user/profile-picture");
      return response.data;
    },
    onSuccess: () => {
      // Invalider les requêtes pour forcer un rafraîchissement des données
      queryClient.invalidateQueries({ queryKey: ["profil"] });
      toast.success("Photo de profil supprimée avec succès");
    },
    onError: (error) => {
      console.error(
        "Erreur lors de la suppression de la photo de profil:",
        error
      );
      toast.error("Erreur lors de la suppression de la photo de profil");
    },
  });

  // Fonction pour uploader une image
  const uploadImage = async (
    file: File
  ): Promise<{ imageUrl: string; key: string }> => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Préparer les données pour la requête
      const payload = {
        contentType: file.type,
        size: file.size,
        fileName: file.name,
      };

      // Obtenir une URL présignée pour l'upload
      const presignedUrlResponse = await axios.post("/api/s3/upload", payload);

      if (presignedUrlResponse.status !== 200) {
        throw new Error("Échec de l'obtention de l'URL présignée");
      }

      const { presignedurl, key } = presignedUrlResponse.data;

      // Uploader le fichier avec suivi de la progression
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            setUploadProgress(Math.round(percentage));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            resolve();
          } else {
            reject(new Error(`Upload échoué avec le code ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error("Upload échoué"));
        };

        xhr.open("PUT", presignedurl);
        xhr.setRequestHeader("Content-type", file.type);
        xhr.send(file);
      });

      // Construire l'URL de l'image
      // Utiliser l'URL du bucket S3 avec la clé
      const imageUrl = `${process.env.NEXT_PUBLIC_S3_URL || "https://fly.storage.tigris.dev"}/${key}`;

      setIsUploading(false);
      setUploadProgress(100);

      return { imageUrl, key };
    } catch (error) {
      setIsUploading(false);
      setUploadProgress(0);
      console.error("Erreur lors de l'upload de l'image:", error);
      throw error;
    }
  };

  // Fonction pour uploader et mettre à jour la photo de profil
  const uploadAndUpdateProfilePicture = async ({
    file,
    userId,
  }: UploadProfilePictureParams) => {
    try {
      // Optimistic update: on peut simuler la mise à jour avant qu'elle ne soit effective
      // en mettant à jour le cache de la requête
      // const previousData = queryClient.getQueryData(["profil", userId]);

      // Créer une URL temporaire pour l'optimistic update
      const tempObjectUrl = URL.createObjectURL(file);

      // Mettre à jour le cache avec l'URL temporaire
      queryClient.setQueryData(["profil", userId], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            image: tempObjectUrl,
          };
        }
        return oldData;
      });

      // Uploader l'image
      const { imageUrl, key } = await uploadImage(file);

      // Mettre à jour la photo de profil dans la base de données
      updateProfilePicture({ imageUrl, key });

      // Libérer l'URL temporaire
      URL.revokeObjectURL(tempObjectUrl);

      return { success: true, imageUrl };
    } catch (error) {
      // En cas d'erreur, restaurer les données précédentes
      queryClient.setQueryData(["profil", userId], (oldData: any) => {
        return oldData;
      });

      console.error(
        "Erreur lors de l'upload et de la mise à jour de la photo de profil:",
        error
      );
      toast.error("Erreur lors de la mise à jour de la photo de profil");
      throw error;
    }
  };

  return {
    uploadAndUpdateProfilePicture,
    deleteProfilePicture,
    isUploading,
    isUpdating,
    isDeleting,
    uploadProgress,
  };
}
