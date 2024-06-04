import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Application, Status } from "@prisma/client";
import { IoIosArrowDropup } from "react-icons/io";
import React from "react";
import { ApplicationStatusBadge } from "../../src/utils/index";

interface Props {
  applications: Application[];
  searchParams: searchParamsProps;
}

const columns: {
  label: string;
  value: keyof Application;
}[] = [
  { label: "Company", value: "company" },
  { label: "Title", value: "job_title" },
  { label: "Location", value: "location" },
  { label: "Type", value: "type" },
  { label: "Term", value: "term" },
  { label: "Year", value: "year" },
  { label: "Last Update", value: "updatedAt" },
  { label: "Status", value: "status" },
];

export const columnName = columns.map((column) => column.value);

const ApplicationTable = ({ applications, searchParams }: Props) => {
  return (
    <Box overflowX="auto">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column.value}>
                  <NextLink
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: column.value,
                      },
                    }}
                  >
                    {column.label}
                    {column.value === searchParams.orderBy && (
                      <IoIosArrowDropup className="inline" />
                    )}
                  </NextLink>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {applications.map((application) => (
              <Tr key={application.application_id}>
                <Td className="hidden md:table-cell small-font">
                  <ChakraLink
                    color="teal.500"
                    as={NextLink}
                    href={`/applications/${application.application_id}`}
                  >
                    {application.company}
                  </ChakraLink>
                </Td>
                <Td className="hidden md:table-cell small-font">
                  {application.job_title}
                </Td>
                <Td className="hidden md:table-cell small-font">{application.location}</Td>
                <Td className="hidden md:table-cell small-font">{application.type}</Td>
                <Td className="hidden md:table-cell small-font">{application.term}</Td>
                <Td className="hidden md:table-cell small-font">{application.year}</Td>
                <Td className="hidden md:table-cell small-font">
                  {new Date(application.updatedAt || '2000-01-02').toLocaleDateString()}  
                </Td>
                <Td className="hidden md:table-cell small-font">
                  <ApplicationStatusBadge application={application} isEdit={true}/>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export interface searchParamsProps {
  status: Status;
  orderBy: keyof Application;
  page: string;
  query?: string;
}

export default ApplicationTable;