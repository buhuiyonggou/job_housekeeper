import { Box, Flex, Spacer } from "@chakra-ui/react";
import prisma from "@/prisma/client";
import React from "react";
import AddApplication from "./AddApplication";
import { Status } from "@prisma/client";
import ApplicationTable, { searchParamsProps } from "./ApplicationTable";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";

interface Props {
  searchParams: searchParamsProps;
}

const Applications = async ({ searchParams }: Props) => {
  const query = searchParams?.query || "";
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 8;

  const statuses = Object.values(Status);

  const where: any = {};

  if (query) {
    const statusConditions = statuses
      .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      .map((s) => ({ status: s }));

    where.OR = [
      { company: { contains: query, mode: "insensitive" } },
      { location: { contains: query, mode: "insensitive" } },
      { job_title: { contains: query, mode: "insensitive" } },
      ...statusConditions,
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
      <Flex>
        <Box display='flex' gap={6} alignItems='baseline'>
          <AddApplication />
          <SearchBar placeholder="Search applications..." />
        </Box>
      </Flex>
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
