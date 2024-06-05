import { Box, Flex, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

const ApplicationFormSkeleton = () => {
  return (
    <Box maxW={{ base: '100%', md: '50%' }} mx="auto" mt={5} p={5} borderWidth={1} borderRadius="md">
      <Skeleton height="40px" mb="6" />

      <Flex alignItems="center" width="100%" mb="4">
        <Skeleton height="30px" width="100%" />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} width="100%" mb="4">
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
      </SimpleGrid>

      <Skeleton height="40px" width="100%" mb="4" />

      <Skeleton height="100px" width="100%" mb="4" />

      <Skeleton height="40px" width="100%" mb="4" />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} width="100%" mb="4">
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} width="100%" mb="4">
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
      </SimpleGrid>

      <Flex justifyContent="space-evenly" mt="4" direction={{ base: "column", md: "row" }}>
        <Skeleton height="40px" width={{ base: "100%", md: "auto" }} mb={{ base: "4", md: "0" }} />
        <Skeleton height="40px" width={{ base: "100%", md: "auto" }} mb={{ base: "4", md: "0" }} />
        <Skeleton height="40px" width={{ base: "100%", md: "auto" }} />
      </Flex>
    </Box>
  );
};

export default ApplicationFormSkeleton;
