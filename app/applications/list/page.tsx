import { getServerSession } from "next-auth/next";
import { Flex, Spacer } from "@chakra-ui/react";
import AddApplication from "./AddApplication";
import { Status, Prisma } from "@prisma/client";
import prisma from "@/prisma/client";
import ApplicationTable, {
  columnName,
  searchParamsProps,
} from "./ApplicationTable";
import Pagination from "@/app/components/Pagination";
import SearchBar from "@/app/components/SearchBar";
import ApplicationStatusFilter from "./ApplicationStatusFilter";
import { pageSize } from "../../src/utils/constants";
import authOptions from "@/app/auth/authOptions";

interface Props {
  searchParams: searchParamsProps;
}

const Applications = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  const userId = session.user.id;

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status as Status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const query = searchParams.query || "";
  const where = {
    AND: [
      { assignedToUserId: userId },
      status ? { status } : {},
      query
        ? {
            OR: [
              {
                company: {
                  contains: query,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              {
                job_title: {
                  contains: query,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              {
                location: {
                  contains: query,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
            ],
          }
        : {},
    ],
  };

  const orderBy = columnName.includes(searchParams.orderBy)
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
    <Flex direction="column" gap="3" p={3}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={6}
        alignItems="baseline"
      >
        <ApplicationStatusFilter />
        <AddApplication />
        <SearchBar placeholder="Search applications..." />
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

export default Applications;

export const metadata = {
  title: "Manage your applications | Application List",
  description: "All Applications Page",
};
