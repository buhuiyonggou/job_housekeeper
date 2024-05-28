"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { AiFillFolder } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import classnames from "classnames";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import ColorModeSwitch from "./components/ColorModeSwitch";
import { AuthStatus } from "./components/AuthStatus";

const NavBar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useBreakpointValue({ base: true, sm: false });

  useEffect(() => {
    setIsMounted(true);
    if (!isMobile) {
      setIsNavOpen(false);
    }
  }, [isMobile]);

  // Render nothing if not yet mounted to prevent mismatch between server and client
  if (!isMounted) return null;

  return (
    <Box as="nav" className="border-b mb-5 px-5 py-5">
      <Container maxW="container.fluid">
        <Flex justify="space-between" align="center">
          <Flex justify="between" align="center">
            {isMobile && (
              <IconButton
                aria-label="Toggle navigation"
                icon={isNavOpen ? <CloseIcon /> : <HamburgerIcon />}
                onClick={() => setIsNavOpen(!isNavOpen)}
              />
            )}
            {!isMobile && <NavLinks isNavOpen={false} isMobile={false} />}
          </Flex>
          <Flex gap="6" align="center">
            <AuthStatus />
            <ColorModeSwitch />
          </Flex>
        </Flex>
      </Container>

      {isMobile && isNavOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <NavLinks isNavOpen={isNavOpen} isMobile={isMobile} />
        </Box>
      )}
    </Box>
  );
};

const NavLinks = ({ isNavOpen, isMobile }: { isNavOpen: boolean, isMobile: boolean }) => {
  const currentPath = usePathname();
  const ulClass = classnames("font-bold", {
    "flex flex-col space-y-4 mt-4": isNavOpen && isMobile,
    "flex flex-row items-center w-full space-x-6": !isNavOpen || !isMobile,
  });

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
    <ul className={ulClass}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-500": link.href === currentPath,
            })}
            href={link.href}
          >
            <div className="flex items-center space-x-2 flex-wrap mt-2 mr-2">
              {link.icon}
              <span>{link.label}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;



