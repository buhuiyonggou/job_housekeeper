import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

interface ResponsiveTextProps extends BoxProps {
  children: React.ReactNode;
}

const ResponsiveText = ({ children, ...props }: ResponsiveTextProps) => {
  return (
    <Box fontSize={{ base: "sm", md: "md" } } {...props}>
      {children}
    </Box>
  );
};

export default ResponsiveText;
