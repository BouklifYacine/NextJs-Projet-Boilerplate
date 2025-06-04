"use client"


import { ImageUpload } from "@/components/FileUpload/FileUpload";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function PageUpload() {

     const onDrop = useCallback((acceptedFiles : File[]) => {
    console.log(acceptedFiles)
  }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <ImageUpload></ImageUpload>
      {isDragActive ? "Envoyez les fichiers ici" : "Télécharge "}
    </div>
  );
}

export default PageUpload;
