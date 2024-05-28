// app/auth/Signin.tsx
"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

export default function SignIn() {
  const [providers, setProviders] = useState<any>();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <Box
      bgPosition="center"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
    >
      <Container centerContent>
        <Box
          p={8}
          mt={8}
          maxWidth="500px"
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          className="bg-gray-100/[0.6]"
        >
          <Heading as="h1" size="lg" mb={4}>
            Welcome Back!
          </Heading>

          <Text fontSize="lg" mb={6}>
            Sign in to your account
          </Text>
          <Stack spacing={4}>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <Button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
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
