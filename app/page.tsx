"use client";
import { useState, useEffect } from "react";
import {
  Heading,
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  Flex,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import JobCard from "../app/components/JobCard";
import JobFilter from "../app/components/JobFilter";
import { Job, JobFilters } from "../app/src/utils/Reusables";
import FeatureIntroduction from "./components/FeatureIntroduction";
import {JobCardSkeleton} from "../app/components/JobCardSkeleton";

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<JobFilters>({
    // Default filters, fill query and location will enable search jobs on page load
    query: "Software Developer",
    location: "",
    distance: 50,
    remoteOnly: false,
    datePosted: "month",
    employmentTypes: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs(filters, getRandomIndex());
  }, [filters]);

  // used to explore jobs by random index
  const getRandomIndex = () => {
    return Math.floor(Math.random() * 10);
  };

  const fetchJobs = async (filters: JobFilters, pageIndex: number) => {
    const options = {
      method: "GET",
      url: "https://jobs-api14.p.rapidapi.com/list",
      params: {
        query: filters.query,
        location: filters.location,
        distance: filters.distance.toString(),
        language: "en_GB",
        remoteOnly: filters.remoteOnly.toString(),
        datePosted: filters.datePosted,
        employmentTypes: filters.employmentTypes,
        index: pageIndex.toString(),
      },
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jobs-api14.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request<{ jobs: Job[]; index: number }>(
        options
      );
      if (response.data.jobs.length === 0 && pageIndex !== 0) {
        // Fallback to index 0 if no jobs found with random index
        fetchJobs(filters, 0);
      } else {
        setJobs(response.data.jobs);
      }
    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newFilters: JobFilters) => {
    setFilters(newFilters);
  };

  const handleExploreMore = () => {
    fetchJobs(filters, getRandomIndex());
  };

  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" mb="6">
        Welcome to Job Application Tracker
      </Heading>
      <FeatureIntroduction />
      <div className="my-8 border-t border-gray-300" />
      <Grid templateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem colSpan={{ base: 12, md: 4 }} maxW="md" m="4" mt="0">
          <Skeleton isLoaded={!loading}>
            <JobFilter onSearch={handleSearch} defaultValues={filters} />
          </Skeleton>
        </GridItem>

        <GridItem colSpan={{ base: 12, md: 8 }} mt={{ base: 6, md: 0 }} m="6">
          {loading ? (
            <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
          ) : !jobs.length ? (
            <Heading as="h4" size="md" textAlign="center" mt="4">
              Use Search Engine to Explore Posting Jobs
            </Heading>
          ) : (
            <Flex justify="flex-end" mt="4">
              <Button onClick={handleExploreMore} mt="2" mr="10" colorScheme="blue">
                Explore More
              </Button>
            </Flex>
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={{ base: 4, md: 8 }}>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => <JobCardSkeleton key={index} />)
            ) : (
              jobs.map((job, index) => <JobCard key={`${job.id}-${index}`} job={job} />)
            )}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;

