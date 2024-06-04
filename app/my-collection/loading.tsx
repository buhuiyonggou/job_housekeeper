import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import { JobCardSkeleton } from "../components/JobCardSkeleton";

const CollectionSkeleton = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" mb="8">
        Your Job Collections
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={6}>
        {Array.from({ length: 8 }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CollectionSkeleton;
