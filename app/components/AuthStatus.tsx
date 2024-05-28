import { useSession } from "next-auth/react";
import { Avatar, Box, Link, Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";

export const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Text>Loading...</Text>;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href="/api/auth/signin">
        Login
      </Link>
    );

  return (
    <Box>
      <Menu>
        <MenuButton>
          <Avatar src={session!.user!.image!} name={session!.user!.name!} size="sm" />
          <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Text size="sm">{session!.user!.email}</Text>
          </MenuItem>
          <MenuItem>
            <Link href="/api/auth/signout">Log out</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
