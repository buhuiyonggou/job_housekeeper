"use client";

import Skeleton from "../app/components/Skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdDashboard } from "react-icons/md";
import { AiFillFolder } from "react-icons/ai";
import { MdWork } from "react-icons/md";

import classnames from "classnames";
import { Container, Flex } from "@chakra-ui/react";
import "./globals.css";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-5">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <NavLinks />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/", icon: <MdDashboard size="32px" /> },
    {
      label: "Applications",
      href: "/applications/list",
      icon: <AiFillFolder size="32px" />,
    },
    {
      label: "Collections",
      href: "/collections/list",
      icon: <MdWork size="32px" />,
    },
  ];

  return (
    <ul className="flex items-center w-full space-x-6 font-bold">
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
