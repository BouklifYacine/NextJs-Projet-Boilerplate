"use client"


import { ImageUpload } from "@/components/FileUpload/FileUpload";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function PageUpload() {

     const onDrop = useCallback((acceptedFiles : File[]) => {
    console.log(acceptedFiles)
  }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
        maxFiles : 5, 
        maxSize : 1024 * 1024 * 5, // = 5MB, 
        accept : {
            "image/*" : [],
        }
      })
  return (
    <div className="flex flex-col gap-8 justify-center items-center" {...getRootProps()} >
      <ImageUpload {...getInputProps()}></ImageUpload >
      {isDragActive ? "Envoyez les fichiers ici" : "Télécharge "}
    </div>
  );
}

export default PageUpload;
