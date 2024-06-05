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
  useToast,
} from "@chakra-ui/react";
import Link from "../components/Link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../lib/userSlice";
import { RootState } from "../../lib/store";

export const AuthStatus = () => {
  const { status, data: session } = useSession();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/users/me")
        .then((response) => {
          dispatch(setUser(response.data));
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
  }, [status, dispatch, toast]);

  return (
    <Box>
      {!session ? (
        <Link href="/api/auth/signin">Sign in</Link>
      ) : (
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
            <MenuItem color='tomato'>
              <Link href={`/profile/${session?.user?.id}`}>
                <Text size="sm">{session?.user?.email}</Text>
              </Link>
            </MenuItem>
            <MenuItem color='gray.500'>
              <Link href="/api/auth/signout">Sign out</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Box>
  );
};
