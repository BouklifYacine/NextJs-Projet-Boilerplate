"use client"


import { ImageUpload } from "@/features/upload/components/FileUpload";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function PageUpload() {

     const onDrop = useCallback((acceptedFiles : File[]) => {
    console.log(acceptedFiles)
  }, [])

  // Rajouter IsDragActive si besoin pour gérer quand on drag n drop et gérer le style et la page 
      const {getRootProps, getInputProps} = useDropzone({onDrop,
        maxFiles : 5, 
        maxSize : 1024 * 1024 * 5, // = 5MB, 
        accept : {
            "image/*" : [],
        }
      })
  return (
    <div className="flex flex-col gap-8 justify-center items-center" {...getRootProps()} >
      <ImageUpload {...getInputProps()}></ImageUpload >
     
    </div>
  );
}

export default PageUpload;
