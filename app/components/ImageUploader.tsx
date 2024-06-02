"use client";
import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
import { Box, Text, useToast, useColorModeValue } from "@chakra-ui/react";
import { UploadButton } from "../src/utils/uploading";
import { User } from "@prisma/client";

interface ImageUploaderProps {
  onImageUpload: (url: string) => void;
  onUploadError: (error: Error) => void;
  editStatus?: boolean;
  user: User;
}

export default function ImageUploader({
  onImageUpload,
  onUploadError,
  editStatus = false,
  user,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string>(user.image || "");
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      height={
        !editStatus
          ? { base: "25vh", md: "35vh" }
          : { base: "30vh", md: "40vh" }
      }
      p={{ base: 2, md: 4 }}
      bg={bgColor}
      borderRadius="md"
      boxShadow="md"
    >
      <Text as="label" fontSize="md" fontWeight="bold" mb={2}>
        Upload Your Portrait Image
      </Text>
      <Text as="label" fontSize="md" fontWeight="bold" mb={2}>
        (Maximum 2MB)
      </Text>
      {editStatus ? (
        <Box
          p={2}
          minW={{ base: "30vh", md: "40vh" }}
          display="flex"
          justifyContent="center"
        >
          <UploadButton
            appearance={{
              button:
                "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
              container:
                "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
              allowedContent:
                "flex h-8 flex-col items-center justify-center px-2 text-white",
            }}
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const imageUrl = res[0].url;
              setImageUrl(imageUrl);
              onImageUpload(imageUrl);
              toast({
                title: "Image uploaded successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
            onUploadError={(error) => {
              console.error(error);
              onUploadError(error);
              toast({
                title: "Error uploading image",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }}
          />
        </Box>
      ) : (
        ""
      )}

      <Box
        mt={4}
        position="relative"
        width={{ base: "80px", md: "120px" }}
        height={{ base: "80px", md: "120px" }}
        overflow="hidden"
        borderRadius="full"
        border="1px solid #ccc"
      >
        <Image src={imageUrl} alt=""/>
      </Box>
    </Box>
  );
}
