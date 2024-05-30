"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboard } from "react-icons/md";
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
} from "@chakra-ui/react";
import ColorModeSwitch from "./components/ColorModeSwitch";
import { AuthStatus } from "./components/AuthStatus";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav" borderBottomWidth="1px" mb={5} px={3} py={3}>
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
            <AuthStatus />
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
    { label: "Findings", href: "/", icon: <MdWork size="32px" /> },
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
  ];

  return (
    <>
      {links.map((link) => (
        <Box
          as="li"
          key={link.href}
          className={link.href === currentPath ? "!text-zinc-500" : ""}
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
