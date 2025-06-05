'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useProfilePictureMutations } from "../hooks/useProfilePicture";


interface ProfilePictureUploadProps {
  userId: string;
  currentImage: string | null;
  userName: string;
}

export function ProfilePictureUpload({
  userId,
  currentImage,
  userName,
}: ProfilePictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage);
  const [isDragActive, setIsDragActive] = useState(false);

  const {
    upload,
    isUploading,
    delete: deleteProfilePicture,
    isDeleting,
  } = useProfilePictureMutations(userId);

  // Gérer le changement de fichier via l'input file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }
    const tempUrl = URL.createObjectURL(file);
    setPreviewUrl(tempUrl);
    upload(file, {
      onSuccess: (publicUrl) => {
        setPreviewUrl(publicUrl);
        URL.revokeObjectURL(tempUrl);
      },
      onError: () => {
        setPreviewUrl(currentImage);
        URL.revokeObjectURL(tempUrl);
      },
    });
  };

  // Gérer le glisser-déposer
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
      upload(file, {
        onSuccess: (publicUrl) => {
          setPreviewUrl(publicUrl);
          URL.revokeObjectURL(tempUrl);
        },
        onError: () => {
          setPreviewUrl(currentImage);
          URL.revokeObjectURL(tempUrl);
        },
      });
    },
    [upload, currentImage]
  );

  // Configuration de react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => {
      setIsDragActive(false);
      toast.error(
        "Fichier non valide. Veuillez sélectionner une image de moins de 5MB."
      );
    },
  });

  // Mettre à jour previewUrl lorsque currentImage change
  useEffect(() => {
    setPreviewUrl(currentImage);
  }, [currentImage]);

  // Gérer la suppression de la photo de profil
  const handleRemove = () => {
    setPreviewUrl(null);
    deleteProfilePicture(undefined, {
      onError: () => setPreviewUrl(currentImage),
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className={`relative cursor-pointer transition-all duration-300 ${
          isDragActive ? "scale-105 ring-2 ring-purple-500" : ""
        }`}
      >
        <input
          {...getInputProps()}
          onChange={handleFileChange}
          accept="image/*"
        />
        <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-lg hover:opacity-90 transition-opacity">
          <AvatarImage
            src={previewUrl ?? ""}
            alt={userName}
            className="object-cover"
          />
          <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
            {userName?.[0]?.toUpperCase() ?? "U"}
          </AvatarFallback>
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity ${
              isDragActive ? "opacity-100" : "opacity-0 hover:opacity-70"
            }`}
          >
            <ImagePlus className="w-8 h-8 text-white" />
          </div>
        </Avatar>
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          {...getRootProps()}
          disabled={isUploading}
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
            disabled={isUploading || isDeleting}
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );
}