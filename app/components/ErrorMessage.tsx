import React, { PropsWithChildren } from "react";
import { Text } from "@chakra-ui/react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;

  return (
    <Text color="red" as="p">
      {children}
    </Text>
  );
};

export default ErrorMessage;
