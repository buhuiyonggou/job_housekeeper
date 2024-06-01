"use client";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Skeleton,
  HStack,
  useToast,
} from "@chakra-ui/react";
import Link from "../components/Link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
};

export const AuthStatus = () => {
  const { status, data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      axios.get("/api/users/me")
        .then((response) => {
          setUser(response.data);
          console.log("User fetched successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast({
            title: "Error fetching user data",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [status, toast, user]);

  if (status === "loading") {
    return (
      <HStack>
        <Skeleton height="40px" width="40px" borderRadius="full" />
        <Skeleton height="20px" width="80px" />
      </HStack>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Box mr="2">
        <Link href="/api/auth/signin">Log in</Link>
      </Box>
    );
  }

  return (
    <Box>
      <Menu>
        <MenuButton as={Box} display="flex" alignItems="center">
          <Avatar
            src={user?.image}
            name={user?.name || "User"}
            size="sm"
          />
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Link href={`/profile/${session?.user?.id}`}>
              <Text size="sm">{session?.user?.email}</Text>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/api/auth/signout">Log out</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
