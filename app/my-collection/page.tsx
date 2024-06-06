"use client";
import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, Heading } from "@chakra-ui/react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { Job } from "../src/utils/Reusables";
import CollectionSkeleton from "./loading";

const Collection = () => {
  const [collections, setCollections] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get("/api/collection");
        setCollections(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <CollectionSkeleton />;
  }

  if (collections.length === 0) {
    return (
      <Box display="flex" justifyContent="center">
        No collections found.
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" textAlign="center" mb="8">
        Your Job Collections
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={6}>
        {collections.map((job) => (
          <JobCard job={job} isCollected={true} key={job.id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Collection;
