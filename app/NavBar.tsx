"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { MdDashboard, MdWifiFind } from "react-icons/md";
import { AiFillFolder } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  IconButton,
  useDisclosure,
  VStack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ColorModeSwitch from "./components/ColorModeSwitch";
import { AuthStatus } from "./auth/AuthStatus";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../lib/userSlice";
import { RootState } from "../lib/store";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, data: session } = useSession();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (status === "authenticated" && session) {
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
    <Box
      as="nav"
      borderBottomWidth="1px"
      mb={5}
      px={{ base: 0, md: 3 }}
      py={{ base: 1, md: 3 }}
      className={"text-white bg-zinc-600"}
    >
      <Container maxW="container.fluid">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <IconButton
              aria-label="Toggle navigation"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              display={{ base: "block", md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack as="ul" spacing={2} display={{ base: "none", md: "flex" }}>
              <NavLinks isMobile={false} />
            </HStack>
          </Flex>
          <HStack spacing={4} align="center">
            <AuthStatus session={session} user={user} />
            <ColorModeSwitch />
          </HStack>
        </Flex>
        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <VStack as="ul" spacing={4}>
              <NavLinks isMobile={true} />
            </VStack>
          </Box>
        )}
      </Container>
    </Box>
  );
};

const NavLinks = ({ isMobile }: { isMobile: boolean }) => {
  const currentPath = usePathname();

  const links = [
    { label: "Findings", href: "/", icon: <MdWifiFind size="32px" /> },
    {
      label: "Applications",
      href: "/applications/list",
      icon: <AiFillFolder size="32px" />,
    },
    {
      label: "Analysis",
      href: "/analysis",
      icon: <MdDashboard size="32px" />,
    },
    {
      label: "Collection",
      href: "/my-collection",
      icon: <MdWork size="32px" />,
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Box
          as="li"
          key={link.href}
          className={`${
            link.href === currentPath ? "!text-zinc-400" : ""
          } bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-700 focus:outline-none focus:ring focus:ring-zinc-300`}
        >
          <Link href={link.href}>
            <HStack
              spacing={1}
              align="center"
              p={2}
              w={isMobile ? "full" : "auto"}
            >
              {link.icon}
              <Text fontWeight="bold">{link.label}</Text>
            </HStack>
          </Link>
        </Box>
      ))}
    </>
  );
};

export default NavBar;
