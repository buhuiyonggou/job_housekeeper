"use client";

import { useState } from "react";
import { Box, Button, Container, Heading, Input, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function ResetPasswordRequest() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleRequest = async () => {
    try {
      await axios.post("/api/auth/reset-request", { email });
      toast({
        title: "Request sent",
        description: "If the email is registered, you will receive a reset link.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to send reset password request:", error);
      toast({
        title: "Error",
        description: "Failed to send reset password request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center">
      <Container centerContent>
        <Box
          p={4}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          className="bg-gray-100/[0.6]"
          width={"70%"}
        >
          <Heading as="h1" size="lg" mb={4}>
            Reset Password
          </Heading>

          <Stack spacing={4}>
            <Input
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' onClick={handleRequest}>Send Reset Link</Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
