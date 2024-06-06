"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { FaGoogle, FaGithub } from "react-icons/fa";
import Link from "../../components/Link";

export default function SignIn() {
  // change the state type later
  const [providers, setProviders] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: "Missing email or password",
        description: "Please enter both your email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast({
          title: "Sign in failed",
          description: result.error,
          status: "error",
          duration: 3000,
        });
      } else {
        toast({
          title: "Signed in successfully",
          status: "success",
          duration: 3000,
        });

        // Reload the page and navigate to /applications/list
        window.location.href = "/applications/list";
      }
    } catch (error: any) {
      console.error("Failed to sign in:", error);
      toast({
        title: "Sign in failed",
        description: error.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  const cancelSignIn = () => {
    setEmail("");
    setPassword("");
    router.push("/auth/signin");
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
          p={4}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          className="bg-gray-300/[0.2]"
          width={"70%"}
        >
          <Heading as="h1" size="lg" mb={4}>
            Welcome Back!
          </Heading>

          <Stack spacing={4}>
            <Heading as="h2" size="md">
              Sign in with your account
            </Heading>

            <Box>
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
              </Stack>
            </Box>
            <Flex justifyContent="center" gap="10" mt="2">
              <Button variant="outline" colorScheme="blue" onClick={handleSignIn}>
                Sign in
              </Button>
              <Button variant="outline" onClick={cancelSignIn}>
                Cancel
              </Button>
            </Flex>

            <Flex direction="column">
              <Flex justifyContent="center" m="2">
                <Text>Do not have an account?</Text>
                <Link href="/auth/signup">
                  <Text color="blue.500" ml="1">
                    Sign up
                  </Text>
                </Link>
              </Flex>
              <Flex justifyContent="center" m="2">
                <Text>Forgot your password?</Text>
                <Link href="/auth/reset-password">
                  <Text color="blue.500" ml="1">
                    Reset
                  </Text>
                </Link>
              </Flex>
            </Flex>
          </Stack>

          <Stack spacing={4} mt="6">
            <Heading as="h2" size="md">
              Sign in with Providers
            </Heading>
            {providers &&
              Object.values(providers)
                .filter((provider: any) => provider.name !== "Credentials")
                .map((provider: any) => (
                  <Button
                    key={provider.name}
                    onClick={() =>
                      signIn(provider.id, { callbackUrl: "/applications/list" })
                    }
                    size="lg"
                    colorScheme={provider.name === "Google" ? "red" : "gray"}
                    leftIcon={
                      provider.name === "Google" ? <FaGoogle /> : <FaGithub />
                    }
                  >
                    Sign in with {provider.name}
                  </Button>
                ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
