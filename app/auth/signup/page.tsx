"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "../../components/Link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignUp() {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClick = () => setShow(!show);
  const handleConfirmClick = () => setShowConfirm(!showConfirm);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    try {
      await axios.post("/api/auth/signup", { email, password });
      router.push("/auth/signin");
    } catch (error: any) {
      console.error("Failed to sign up:", error);
      toast({
        title: "Failed to sign up.",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bgPosition="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
    >
      <Container centerContent>
        <Box
          p={10}
          mt={8}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          className="bg-gray-100/[0.6]"
          maxWidth="500px"
          width="100%"
        >
          <Heading as="h1" size="lg" mb={4}>
            Create an Account
          </Heading>

          <Stack spacing={4}>
            <InputGroup>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>

            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleConfirmClick}>
                  {showConfirm ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <Flex justifyContent="center" gap="10" mt="4">
            <Button onClick={handleSubmit}>Sign Up</Button>
            <Button onClick={() => router.push("/auth/signin")}>Cancel</Button>
          </Flex>

          <Flex direction="column" mt="4">
            <Flex justifyContent="center" m="2">
              <Text>Already have an account?</Text>
              <Link href="/auth/signin">
                <Text color="blue.500" ml="1">
                  Sign in
                </Text>
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
