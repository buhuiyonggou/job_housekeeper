"use client"
import { useState } from 'react';
import { Heading, Box, Stack } from '@chakra-ui/react';
import axios from 'axios';
import JobCard from '../app/components/JobCard';
import JobFilter from '../app/components/JobFilter';
import { Job, JobFilters } from '../app/src/utils/Reusables';

const Home = () =>{
  const [jobs, setJobs] = useState<Job[]>([]);

  const fetchJobs = async (filters: JobFilters) => {
    console.log(filters)
    const options = {
      method: 'GET',
      url: 'https://jobs-api14.p.rapidapi.com/list',
      params: {
        query: filters.query,
        location: filters.location,
        // distance: filters.distance.toString(),
        language: 'en_GB',
        // remoteOnly: filters.remoteOnly.toString(),
        // datePosted: filters.datePosted,
        // employmentTypes: filters.employmentTypes,
        index: 0
      },
      headers: {
        'X-RapidAPI-Key': '1dcd115619msh26e0593a927a5fap154965jsnaea89c1f2a02',
        'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
      }
    };
    // const options = {
    //   method: 'GET',
    //   url: 'https://jobs-api14.p.rapidapi.com/list',
    //   params: {
    //     query: 'Web Developer',
    //     location: 'United States',
    //     distance: '1.0',
    //     language: 'en_GB',
    //     remoteOnly: 'false',
    //     datePosted: 'month',
    //     employmentTypes: 'fulltime;parttime;intern;contractor',
    //     index: '0'
    //   },
    //   headers: {
    //     'X-RapidAPI-Key': '1dcd115619msh26e0593a927a5fap154965jsnaea89c1f2a02',
    //     'X-RapidAPI-Host': 'jobs-api14.p.rapidapi.com'
    //   }
    // };

    try {
      const response = await axios.request<{ jobs: Job[] }>(options);
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
      setJobs([]);
    }
  };

  return (
    <Box>
      <Heading as="h1" size="xl" textAlign="center" mb="8">
        Welcome to Job Application Tracker
      </Heading>
      <JobFilter onSearch={fetchJobs} />
      <Stack spacing="4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </Stack>
    </Box>
  );
};

export default Home;
