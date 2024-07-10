import { SimpleGrid, Box, Heading, Skeleton } from "@chakra-ui/react";

const ResumeSkeleton = () => {
  return (
    <Box maxW="xl" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md" boxShadow="lg">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        <Skeleton height="40px" width="50%" />
      </Heading>
      <SimpleGrid spacing={6}>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </SimpleGrid>
      <Box width="100%" height="600px" border="1px solid #ccc" mt={2} borderRadius="md" boxShadow="md">
        <Skeleton height="100%" />
      </Box>
    </Box>
  );
};

export default ResumeSkeleton;
