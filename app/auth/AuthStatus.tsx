"use client"
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
} from "@chakra-ui/react";
import Link from "../components/Link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

export const AuthStatus = () => {
  const { status, data: session } = useSession();

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
        <MenuButton>
          <Avatar
            src={session?.user?.image || ""}
            name={session?.user?.name || "User"}
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
