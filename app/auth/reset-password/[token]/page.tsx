"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Stack,
  useToast,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { MdBuild } from "react-icons/md";
import { BeatLoader } from "react-spinners";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const params = useParams();
  const token = params?.token;

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`/api/auth/reset-password/${token}`);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Invalid token",
          description: "Token is invalid or expired.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        router.push("/auth/signin");
      }
    };

    if (token) {
      fetchEmail();
    }
  }, [token, toast, router]);

  const handleReset = async () => {
    try {
      await axios.post(`/api/auth/reset-password/${token}`, { password });
      toast({
        title: "Password reset",
        description: "Your password has been reset successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/auth/signin");
    } catch (error) {
      console.error("Failed to reset password:", error);
      toast({
        title: "Error",
        description: "Failed to reset password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box minHeight="150vh" display="flex" justifyContent="center">
      <Container centerContent>
        <Box
          p={4}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          className="bg-gray-100/[0.6]"
          width={"70%"}
          mt={8}
        >
          <Heading as="h1" size="lg" mb={4}>
            Reset Password
          </Heading>

          <Text fontSize='lg' mb={4}>{email}</Text>

          <Stack spacing={4} >
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              leftIcon={<MdBuild />}
              colorScheme="pink"
              variant="solid"
              isLoading={loading}
              spinner={<BeatLoader size={8} color="white" />}
              onClick={handleReset}
            >
              Reset Password
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
