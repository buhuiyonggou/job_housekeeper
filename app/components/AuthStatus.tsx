import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import Link from '../components/Link';
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

export const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Text>Loading...</Text>;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin">
        Login
      </Link>
    );

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
