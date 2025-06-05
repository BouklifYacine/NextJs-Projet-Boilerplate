// @/hooks/useProfilePicture.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export function useProfilePictureMutations(userId: string) {
  const queryClient = useQueryClient();

  // Upload (POST)
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // 1. Demande presigned URL à l'API
      const { data } = await axios.post("/api/user/profile-picture", {
        contentType: file.type,
        size: file.size,
        fileName: file.name,
      });
      const { presignedurl, publicUrl } = data;

      // 2. Upload direct sur S3
      await axios.put(presignedurl, file, {
        headers: { "Content-Type": file.type },
      });

      return publicUrl as string;
    },
    onSuccess: (publicUrl) => {
      // Met à jour le cache de la photo de profil si tu utilises un useQuery ailleurs
      queryClient.setQueryData(["profile-picture", userId], publicUrl);
      toast.success("Photo de profil mise à jour !");
    },
    onError: () => {
      toast.error("Erreur lors de l'upload de la photo de profil.");
    },
  });

  // Suppression (DELETE)
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete("/api/user/profile-picture");
      return null;
    },
    onSuccess: () => {
      queryClient.setQueryData(["profile-picture", userId], null);
      toast.success("Photo de profil supprimée !");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de la photo de profil.");
    },
  });

  return {
    upload: uploadMutation.mutate,
    uploadAsync: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    delete: deleteMutation.mutate,
    deleteAsync: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}