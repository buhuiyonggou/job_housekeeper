import React from "react";
import NextLink from "next/link";
import { Link as CharkraLink } from "@chakra-ui/react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link = ({ href, children }: LinkProps) => {
  return (
    // legacyBehavior is required to prevent a warning in the console
    <NextLink href={href} passHref legacyBehavior>
      <CharkraLink>{children}</CharkraLink>
    </NextLink>
  );
};

export default Link;
