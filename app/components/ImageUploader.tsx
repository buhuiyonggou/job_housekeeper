"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UploadButton } from "../src/utils/uploading";
import {Text} from "@chakra-ui/react"

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  onUploadError: (error: Error) => void;
}

export default function ImageUploader({
  onImageUpload,
  onUploadError,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-items-center p-24">
      <Text as="label" size="4">
        Upload Your Portrait Image.
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const imageUrl = res[0].url;
            setImageUrl(imageUrl);
            onImageUpload(imageUrl);
          }}
          onUploadError={onUploadError}
        />
      </Text>
      {imageUrl && (
        <div
          className=" image-container mt-3 "
          style={{
            position: "relative",
            width: "250px",
            maxWidth: "250px",
            height: "250px",
            maxHeight: "250px",
            overflow: "hidden",
            border: "1px solid #ccc",
          }}
        >
          <Image
            src={imageUrl}
            alt="Recipe cover"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </main>
  );
}
