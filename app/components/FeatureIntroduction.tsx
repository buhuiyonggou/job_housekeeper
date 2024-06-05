import React from "react";
import { Box, Flex, Heading, Text, Icon } from "@chakra-ui/react";
import Link from "./Link";
import { FaSearch, FaTasks, FaChartLine } from "react-icons/fa";

const FeatureIntroduction = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-around"
      align="center"
      pl="6"
      pr="6"
      gap="6"
    >
      <Box
        flex="1"
        height="200px"
        maxW="sm"
        p="6"
        boxShadow="md"
        borderRadius="lg"
        textAlign="center"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Icon as={FaSearch} boxSize="12" color="teal.500" mb="4" />
        <Heading size="md" mb="2">
          Job Search
        </Heading>
        <Text>No time to browse each hiring website?</Text>
        <Text className="font-medium">
          Find the most recent positions from diversified resources.
        </Text>
      </Box>

      <Box
        flex="1"
        height="200px"
        maxW="sm"
        p="6"
        boxShadow="md"
        borderRadius="lg"
        textAlign="center"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Link href="/applications/list">
          <Icon as={FaTasks} boxSize="12" color="teal.500" mb="4" />
          <Heading size="md" mb="2">
            Application Management
          </Heading>
          <Text>Want to trace application status?</Text>
          <Text className="font-medium">
            Check your panel review of records.
          </Text>
        </Link>
      </Box>

      <Box
        flex="1"
        height="200px"
        maxW="sm"
        p="6"
        boxShadow="md"
        borderRadius="lg"
        textAlign="center"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Link href="/analysis">
          <Icon as={FaChartLine} boxSize="12" color="teal.500" mb="4" />
          <Heading size="md" mb="2">
            Application Analysis
          </Heading>
          <Text>No response for hundreds of jobs applied?</Text>
          <Text className="font-medium">
            Analyze applications and improve experience.
          </Text>
        </Link>
      </Box>
    </Flex>
  );
};

export default FeatureIntroduction;

