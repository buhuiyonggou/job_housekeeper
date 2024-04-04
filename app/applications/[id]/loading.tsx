import React from "react";
import {
  Box,
  VStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Flex,
} from "@chakra-ui/react";

const ApplicationDetailsSkeleton = () => {
  return (
    <Box
      maxW="xl"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack spacing={5} align="stretch">
        <Skeleton height="30px" mb="4" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Box borderWidth="2px" borderRadius="lg" p="5" overflow="hidden">
          <SkeletonText mt="4" noOfLines={3} spacing="4" />
        </Box>
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
        <Skeleton height="30px" />
      </VStack>

      <Flex justify="space-around" mt="5">
        <SkeletonCircle size="10" />
        <Skeleton height="30px" width="20%" />
        <SkeletonCircle size="10" />
      </Flex>
    </Box>
  );
};

export default ApplicationDetailsSkeleton;
