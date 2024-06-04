"use client";
import { Box, Flex, Spacer, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddApplication from "./AddApplication";
import { Status } from "@prisma/client";
import ApplicationTable, { searchParamsProps } from "./ApplicationTable";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import ApplicationStatusFilter from "./ApplicationStatusFilter";
import { pageSize } from "../../src/utils/constants";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  searchParams: searchParamsProps;
}

const Applications = ({ searchParams }: Props) => {
  const [applications, setApplications] = useState([]);
  const [appsCount, setAppsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const changeSearchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await axios.get('/api/applications', {
          params: searchParams,
        });
        setApplications(data.applications);
        setAppsCount(data.appsCount);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch applications", error);
        toast({
          title: "Error",
          description: "Failed to fetch applications.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [searchParams, toast]);

  const handlePageChange = (page: number) => {
    const totalPages = Math.ceil(appsCount / pageSize);
    // Don't update if the page is out of range
    if (page < 1 || page > totalPages) {
      return; 
    }

    const params = new URLSearchParams(changeSearchParams || undefined);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  const query = searchParams?.query || "";
  const page = parseInt(searchParams.page) || 1;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status as Status) ? searchParams.status : undefined;

  return (
    <Flex direction="column" gap="3">
      <Box display='flex' gap={6} alignItems='baseline'>
        <ApplicationStatusFilter />
        <AddApplication />
        <SearchBar placeholder="Search applications..." />
      </Box>
 
      <Spacer />
      <ApplicationTable
        applications={applications}
        searchParams={searchParams}
      />
      <Pagination
        TotalItems={appsCount}
        PageSize={pageSize}
        CurrentPage={page}
        onPageChange={handlePageChange}
      />
    </Flex>
  );
};

export default Applications;
