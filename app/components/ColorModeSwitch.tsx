import {
  Flex,
  IconButton,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import React from "react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <>
      <Flex
        justify="between"
        alignItems="center"
        fontSize="small"
        fontWeight="bold"
      >
        <IconButton
          aria-label="toggle theme"
          rounded="full"
          size="md"
          right="4"
          onClick={toggleColorMode}
          icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        />
        {colorMode === "dark" ? (
          <Text>Toggle Light </Text>
        ) : (
          <Text>Toggle Dark </Text>
        )}
      </Flex>
    </>
  );
};

export default ColorModeSwitch;
