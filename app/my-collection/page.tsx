"use client";
import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { Job } from "../src/utils/Reusables";

const Collection = () => {
  const [collections, setCollections] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('/api/collection');
        setCollections(response.data);
      } catch (error) {
        console.error('Failed to fetch collections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (collections.length === 0) {
    return <Box>No collections found.</Box>;
  }

  return (
    // <Box>
    //   {/* <Heading as="h1" size="xl" textAlign="center" mb="8">
    //     Your Job Collections
    //   </Heading>
    //   <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
    //     {collections.map((job) => (
    //       <JobCard key={job.id} job={job} />
    //     ))}
    //   </SimpleGrid> */}

    // </Box>
    <Box>
      <Heading as="h1" size="xl" textAlign="center" mb="8">
        Your Job Collections
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {collections.map((job) => (
          <Box key={job.id} borderWidth="1px" borderRadius="lg" p="6">
            <Text fontWeight="bold" mb="2">Title: {job.title}</Text>
            <Text>Company: {job.company}</Text>
            <Text>Location: {job.location}</Text>
            <Text>Employment Type: {job.employmentType}</Text>
            <Text>Date Posted: {job.datePosted}</Text>
            <Text>Salary Range: {job.salaryRange}</Text>
            {job.image && <img src={job.image} alt={job.company} style={{ maxWidth: '100%', height: 'auto' }} />}
            <Box mt="2">
              <Text fontWeight="bold">Providers:</Text>
              {/* <ul>
                {job.providers && job.providers.map(provider => (
                  <li key={provider.id}>
                    <a href={provider.url} target="_blank" rel="noopener noreferrer">{provider.jobProvider}</a>
                  </li>
                ))}
              </ul> */}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Collection;
