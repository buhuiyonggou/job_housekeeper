import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const JobCardSkeleton = () => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Skeleton height="200px" />
      <Box p="6">
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </Box>
  );
};
