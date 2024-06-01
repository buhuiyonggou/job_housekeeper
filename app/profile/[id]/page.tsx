"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { AtSignIcon, InfoIcon } from "@chakra-ui/icons";
import {
  FaUser,
  FaGenderless,
  FaLinkedin,
  FaGlobe,
  FaImage,
} from "react-icons/fa";
import ImageUploader from "../../components/ImageUploader";
import { User } from "../../src/utils/Reusables";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "../../ValidationSchema";
import { useRouter } from "next/navigation";

// export type UserFormData = z.infer<typeof UserSchema>;

const Profile = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>();

  // useForm<UserFormData>()({
  //   resolver: zodResolver(UserSchema),
  // });
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const route = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data);
        reset(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [reset]);

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(`/api/users/me/edit`, data);
      setUser(response.data);
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsEditing(false);
      route.push("/profile/[id]");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile.",
        description:
          "There was an error updating your profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReset = () => {
    reset();
    setUser(null);
    setIsEditing(false);
  };

  return (
    <Box maxW="xl" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={2}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUploader
                editStatus={isEditing}
                onImageUpload={(url) => field.onChange(url)}
                onUploadError={(error) => console.error(error)}
              />
            )}
          />

          {/* <FormControl>
            <HStack alignItems="center" m="2">
              <FaUser color="gray.500" />
              <FormLabel m={0} ml={2}>
                Name
              </FormLabel>
            </HStack>
            <Input
              {...register("name")}
              placeholder="Name"
              isReadOnly={!isEditing}
            />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <AtSignIcon color="gray.500" />
              <FormLabel m={0} ml={1}>
                Email
              </FormLabel>
            </HStack>
            <Input {...register("email")} placeholder="Email" isReadOnly />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaGenderless color="gray.500" />
              <FormLabel m={0} ml={1}>
                Gender
              </FormLabel>
            </HStack>
            <Input
              {...register("gender")}
              placeholder="Gender"
              isReadOnly={!isEditing}
            />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <InfoIcon color="gray.500" />
              <FormLabel m={0} ml={1}>
                Description
              </FormLabel>
            </HStack>
            <Textarea
              {...register("description")}
              placeholder="Description"
              isReadOnly={!isEditing}
            />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaLinkedin color="gray.500" />
              <FormLabel m={0} ml={1}>
                LinkedIn
              </FormLabel>
            </HStack>
            <Input
              {...register("linkedin")}
              placeholder="LinkedIn URL"
              isReadOnly={!isEditing}
            />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaGlobe color="gray.500" />
              <FormLabel m={0} ml={1}>
                Personal Site
              </FormLabel>
            </HStack>
            <Input
              {...register("personal_site")}
              placeholder="Personal Site URL"
              isReadOnly={!isEditing}
            />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaImage color="gray.500" />
              <FormLabel m={0} ml={1}>
                Profile Image URL
              </FormLabel>
            </HStack>
            <Input
              {...register("image")}
              placeholder="Profile Image URL"
              isReadOnly={!isEditing}
            />
          </FormControl> */}

          <HStack spacing={8}>
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => setIsEditing(true)}
              isDisabled={isEditing}
              minWidth={90}
            >
              Edit
            </Button>
            <Button type="submit" colorScheme="teal" isDisabled={!isEditing}>
              Update
            </Button>
            <Button
              type="button"
              colorScheme="gray"
              onClick={handleReset}
              isDisabled={!isEditing}
            >
              Cancel
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default Profile;
