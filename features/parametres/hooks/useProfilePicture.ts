// @/hooks/useProfilePicture.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { serverDeleteProfilePicture, serverUploadProfilePicture } from "../actions/changerphotodeprofil";

export function useProfilePictureMutations(userId: string) {
  const queryClient = useQueryClient();

  // Upload (POST)
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // 1. Demande presigned URL via server action
      const { presignedurl } = await serverUploadProfilePicture({
        contentType: file.type,
        size: file.size,
        fileName: file.name,
      });

      // 2. Upload direct sur S3
      await fetch(presignedurl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // On retourne la presignedurl (comme dans ton API)
      return presignedurl as string;
    },
    onSuccess: (presignedurl) => {
      queryClient.setQueryData(["profile-picture", userId], presignedurl);
      toast.success("Photo de profil mise à jour !");
    },
    onError: () => {
      toast.error( "Erreur lors de l'upload de la photo de profil.");
    },
  });

  // Suppression (DELETE)
  const deleteMutation = useMutation({
    mutationFn: async () => {
      await serverDeleteProfilePicture();
      return null;
    },
    onSuccess: () => {
      queryClient.setQueryData(["profile-picture", userId], null);
      toast.success("Photo de profil supprimée !");
    },
    onError: () => {
      toast.error( "Erreur lors de la suppression de la photo de profil.");
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