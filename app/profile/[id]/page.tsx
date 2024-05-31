"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, VStack, Image, Text, Heading, Link, HStack, Spinner, Divider } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "../../utils/Reusables";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box maxW="lg" mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md" boxShadow="lg" bg="gray.50">
      <VStack spacing={6} align="stretch">
      <Box display="flex" justifyContent="center">
        {user.image && (
          <Image src={user.image} alt="" boxSize="150px" objectFit="cover"/>
        )}
        </Box>
        <Heading as="h1" size="xl" textAlign="center">
          {user.name}
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          {user.email}
        </Text>
        <Divider />
        {user.gender && (
          <HStack>
            <Text fontWeight="bold">Gender:</Text>
            <Text>{user.gender}</Text>
          </HStack>
        )}
        {user.description && (
          <HStack>
            <Text fontWeight="bold">Description:</Text>
            <Text>{user.description}</Text>
          </HStack>
        )}
        {user.linkedin && (
          <HStack>
            <Text fontWeight="bold">LinkedIn:</Text>
            <Link href={user.linkedin} isExternal color="teal.500">
              {user.linkedin}
            </Link>
          </HStack>
        )}
        {user.personal_site && (
          <HStack>
            <Text fontWeight="bold">Personal Site:</Text>
            <Link href={user.personal_site} isExternal color="teal.500">
              {user.personal_site}
            </Link>
          </HStack>
        )}
        <Button colorScheme="teal" onClick={() => router.push(`/profile/${user.id}/edit`)}>
          Edit Profile
        </Button>
      </VStack>
    </Box>
  );
};

export default Profile;

