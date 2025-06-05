'use client';

import { Button } from "@/components/ui/button";
import { useProfilePicture } from "../hooks/useProfilePicture";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
// import { Progress } from "@/components/ui/progress";

interface ProfilePictureUploadProps {
  userId: string;
  currentImage: string | null;
  userName: string;
}

export function ProfilePictureUpload({ userId, currentImage, userName }: ProfilePictureUploadProps) {
  const {
    uploadAndUpdateProfilePicture,
    deleteProfilePicture,
    isUploading,
    isUpdating,
    isDeleting,
    // uploadProgress,
  } = useProfilePicture();

  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage);
  const [isDragActive, setIsDragActive] = useState(false);

  // Gérer le changement de fichier via l'input file
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    // Créer une URL temporaire pour la prévisualisation
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    try {
      // Uploader l'image et mettre à jour la photo de profil
      const result = await uploadAndUpdateProfilePicture({ file, userId });
      if (result?.success) {
        // Mettre à jour l'URL de prévisualisation avec l'URL réelle
        setPreviewUrl(result.imageUrl);
      }
    } catch (error) {
      // En cas d'erreur, revenir à l'image précédente
      setPreviewUrl(currentImage);
      console.error("Erreur lors de l'upload de l'image:", error);
    } finally {
      // Libérer l'URL temporaire
      URL.revokeObjectURL(tempUrl);
    }
  };

  // Gérer le glisser-déposer
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Créer une URL temporaire pour la prévisualisation
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);

    try {
      // Uploader l'image et mettre à jour la photo de profil
      const result = await uploadAndUpdateProfilePicture({ file, userId });
      if (result?.success) {
        // Mettre à jour l'URL de prévisualisation avec l'URL réelle
        setPreviewUrl(result.imageUrl);
      }
    } catch (error) {
      // En cas d'erreur, revenir à l'image précédente
      setPreviewUrl(currentImage);
      console.error("Erreur lors de l'upload de l'image:", error);
    } finally {
      // Libérer l'URL temporaire
      URL.revokeObjectURL(tempUrl);
    }
  }, [currentImage, uploadAndUpdateProfilePicture, userId]);

  // Configuration de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => {
      setIsDragActive(false);
      toast.error("Fichier non valide. Veuillez sélectionner une image de moins de 5MB.");
    }
  });

  // Gérer la suppression de la photo de profil
  const handleRemove = async () => {
    if (!previewUrl) return;
    
    try {
      setPreviewUrl(null);
      await deleteProfilePicture();
    } catch (error) {
      setPreviewUrl(currentImage);
      console.error("Erreur lors de la suppression de l'image:", error);
    }
  };

  // Mettre à jour previewUrl lorsque currentImage change
  useEffect(() => {
    setPreviewUrl(currentImage);
  }, [currentImage]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer transition-all duration-300 ${isDragActive ? 'scale-105 ring-2 ring-purple-500' : ''}`}
      >
        <input {...getInputProps()} onChange={handleFileChange} accept="image/*" />
        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-lg hover:opacity-90 transition-opacity">
          <AvatarImage
            src={previewUrl ?? ""}
            alt={userName}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
            {userName?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
          
          {/* Overlay pour indiquer qu'on peut déposer une image */}
          <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity ${isDragActive ? 'opacity-100' : 'opacity-0 hover:opacity-70'}`}>
            <ImagePlus className="w-8 h-8 text-white" />
          </div>
        </Avatar>
      </div>

      {/* Barre de progression */}
      {/* {isUploading && (
        <div className="w-full max-w-xs">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-center mt-1">{uploadProgress}%</p>
        </div>
      )} */}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          {...getRootProps()}
          disabled={isUploading || isUpdating}
        >
          <Upload className="w-4 h-4" />
          Changer
        </Button>

        {previewUrl && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleRemove}
            disabled={isUploading || isUpdating || isDeleting}
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );
}