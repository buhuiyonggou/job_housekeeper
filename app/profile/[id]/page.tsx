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
  HStack,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { AtSignIcon, InfoIcon } from "@chakra-ui/icons";
import { FaUser, FaGenderless, FaLinkedin, FaGlobe } from "react-icons/fa";
import ImageUploader from "../../components/ImageUploader";
import { z } from "zod";
import { UserSchema } from "@/app/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setUser } from "../../../lib/userSlice";
import { User } from "@prisma/client";

export type UserFormData = z.infer<typeof UserSchema>;

const Profile = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
  });

  const [user, setUserState] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserState(response.data);
        reset(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [reset]);


  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(`/api/users/me/edit`, {
        ...data,
        updatedAt: new Date(),
      });
      setUserState(response.data);
      setIsEditing(false);
      dispatch(setUser(response.data)); // Update the user in Redux state
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <Box maxW="xl" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={2}>
          {loading ? (
            <>
              <Skeleton height="150px" width="150px" borderRadius="full" />
              <Skeleton height="40px" width="100%" />
              <Skeleton height="40px" width="100%" />
              <Skeleton height="40px" width="100%" />
              <Skeleton height="100px" width="100%" />
              <Skeleton height="40px" width="100%" />
              <Skeleton height="40px" width="100%" />
            </>
          ) : (
            <>
              {user && (
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <ImageUploader
                      editStatus={isEditing}
                      user={user}
                      onImageUpload={(url) => field.onChange(url)}
                      onUploadError={(error) => console.error(error)}
                    />
                  )}
                />
              )}

              <FormControl>
                <HStack alignItems="center" m="2">
                  <FaUser color="gray.500" />
                  <FormLabel m={0} ml={2}>
                    Name
                  </FormLabel>
                </HStack>
                <Input
                  {...register("name")}
                  placeholder="Name"
                  disabled={!isEditing}
                />
              </FormControl>

              <FormControl>
                <HStack alignItems="center" m="2">
                  <AtSignIcon color="gray.500" />
                  <FormLabel m={0} ml={1}>
                    Email
                  </FormLabel>
                </HStack>
                <Input {...register("email")} placeholder="Email" disabled />
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                />
              </FormControl>
            </>
          )}

          <Flex
            display="flex"
            justifyContent="space-around"
            width="90%"
            mt="6"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "stretch", md: "center" }}
          >
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => setIsEditing(true)}
              isDisabled={isEditing}
              width={{ base: "100%", md: "25%" }}
              mb={{ base: "4", md: "0" }}
            >
              Edit
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              isDisabled={!isEditing || isSubmitting}
              width={{ base: "100%", md: "25%" }}
              mb={{ base: "4", md: "0" }}
            >
              Update
            </Button>
            <Button
              type="button"
              colorScheme="gray"
              onClick={handleReset}
              isDisabled={!isEditing}
              width={{ base: "100%", md: "25%" }}
            >
              Cancel
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default Profile;


