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
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AtSignIcon, InfoIcon } from "@chakra-ui/icons";
import { FaUser, FaGenderless, FaLinkedin, FaGlobe, FaImage } from "react-icons/fa";

interface User {
  id: string;
  name?: string;
  email: string;
  gender?: string;
  description?: string;
  linkedin?: string;
  personal_site?: string;
  image?: string;
}

const Profile = () => {
  const { register, handleSubmit, reset } = useForm<User>();
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();
  const router = useRouter();

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
      const response = await axios.patch(`/api/users/me/edit`, data);
      setUser(response.data);
      toast({
        title: "Profile updated.",
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/applications/list");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error updating profile.",
        description: "There was an error updating your profile. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxW="lg" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={2}>
          <FormControl>
            <HStack alignItems="center" m="2">
              <FaUser color="gray.500" />
              <FormLabel m={0} ml={2}>Name</FormLabel>
            </HStack>
            <Input {...register("name")} placeholder="Name" />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <AtSignIcon color="gray.500" />
              <FormLabel m={0} ml={1}>Email</FormLabel>
            </HStack>
            <Input {...register("email")} placeholder="Email" isReadOnly />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaGenderless color="gray.500" />
              <FormLabel m={0} ml={1}>Gender</FormLabel>
            </HStack>
            <Input {...register("gender")} placeholder="Gender" />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <InfoIcon color="gray.500" />
              <FormLabel m={0} ml={1}>Description</FormLabel>
            </HStack>
            <Textarea {...register("description")} placeholder="Description" />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaLinkedin color="gray.500" />
              <FormLabel m={0} ml={1}>LinkedIn</FormLabel>
            </HStack>
            <Input {...register("linkedin")} placeholder="LinkedIn URL" />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2"> 
              <FaGlobe color="gray.500" />
              <FormLabel m={0} ml={1}>Personal Site</FormLabel>
            </HStack>
            <Input {...register("personal_site")} placeholder="Personal Site URL" />
          </FormControl>

          <FormControl>
            <HStack alignItems="center" m="2">
              <FaImage color="gray.500" />
              <FormLabel m={0} ml={1}>Profile Image URL</FormLabel>
            </HStack>
            <Input {...register("image")} placeholder="Profile Image URL" />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Save Changes
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Profile;
