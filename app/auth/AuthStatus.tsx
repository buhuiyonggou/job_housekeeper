import {
  Avatar,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  SkeletonCircle,
} from "@chakra-ui/react";
import Link from "../components/Link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { Session } from "next-auth";
import { User } from "../src/utils/Reusables";

interface AuthStatusProps {
  session: Session | null;
  user: User | null;
}

export const AuthStatus = ({ session, user }: AuthStatusProps) => {
  return (
    <Box>
      {!session ? (
        <Link href="/api/auth/signin">Sign in</Link>
      ) : user ? (
        <Menu>
          <MenuButton as={Box} display="flex" alignItems="center">
            <Avatar
              src={user?.image || undefined}
              name={user?.name || "User"}
              size="sm"
            />
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <MenuItem color="tomato">
              <Link href={`/profile/${session?.user?.id}`}>
                <Text size="sm">{session?.user?.email}</Text>
              </Link>
            </MenuItem>
            <MenuItem color="gray.500">
              <Link href="/api/auth/signout">Sign out</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <SkeletonCircle size="10" />
      )}
    </Box>
  );
};