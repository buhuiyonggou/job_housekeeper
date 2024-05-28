import { Box, Flex, Spacer } from "@chakra-ui/react";
import prisma from "@/prisma/client";
import React from "react";
import AddApplication from "./AddApplication";
import { Status } from "@prisma/client";
import ApplicationTable, { searchParamsProps } from "./ApplicationTable";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import ApplicationStatusFilter from "./ApplicationStatusFilter";
import { pageSize } from "./constants";

interface Props {
  searchParams: searchParamsProps;
}

const Applications = async ({ searchParams }: Props) => {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams.page) || 1;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;

  const where: any = {status};

  if (query) {
    where.OR = [
      { company: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
      { job_title: { contains: query, mode: "insensitive" } },
    ];
  }

  const orderBy = searchParams.orderBy
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const applications = await prisma.application.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const appsCount = await prisma.application.count({ where });

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
      />
    </Flex>
  );
};

export const metadata = {
  title: "Applications | Application List",
  description: "All Applications Page",
};

export default Applications;
