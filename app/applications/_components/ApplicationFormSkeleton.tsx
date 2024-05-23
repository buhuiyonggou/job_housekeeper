import { Box, Flex, SimpleGrid, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

const ApplicationFormSkeleton = () => {
  return (
    <div className='max-w-xl'>
    <Box padding="6" boxShadow="lg" bg="white">
      <Skeleton height="20px" mb="4" />
      <Flex direction={{ base: 'column', md: 'row' }} gap="4">
        <Skeleton height="40px" width="full" />
        <Skeleton height="40px" width="full" />
      </Flex>
      <Skeleton mt="4" noOfLines={4} height="40px" />
      <Skeleton mt="4" noOfLines={4} height="100px" />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4" mt="4">
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </SimpleGrid>
      <SimpleGrid columns={3} gap="4" mt="4">
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </SimpleGrid>
      <Flex justifyContent="space-between" mt="4">
        <SkeletonCircle size="10" />
        <Skeleton height="40px" width="20%" />
        <SkeletonCircle size="10" />
      </Flex>
    </Box>
    </div>
  );
};

export default ApplicationFormSkeleton;
