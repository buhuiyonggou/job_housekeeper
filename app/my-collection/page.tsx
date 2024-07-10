import { fetchUserCollections } from "../src/utils/fetchUserCollections";
import { Box, Heading, SimpleGrid, Image } from "@chakra-ui/react";
import JobCard from "../components/JobCard";
import { Job } from "../src/utils/Reusables";

export default async function Collection() {
  const collections = await fetchUserCollections();

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb="8">
        Your Job Collections
      </Heading>
      <Box overflowY="scroll">
        {!collections || collections.length === 0? (
         <Box textAlign="center">
         <Image
           src="empty_collection.jpg"
           alt="Empty Collection"
           boxSize={{ base: "150px", md: "250px" }}
           mx="auto"
         />
         <Heading as="h4" size="md" mt={4}>
           No collections found.
         </Heading>
       </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={6}>
            {collections?.map((job) => (
              <JobCard job={job as Job} isCollected={true} key={job.id} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}

export const metadata = {
  title: "Your Job Collections | Job List",
  description: "User's job collections page",
};
