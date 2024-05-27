import prisma from "@/prisma/client";
import { Avatar, Box, Flex, Heading, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import React from "react";
import { ApplicationStatusBadge } from "../utils/index";
import Link from "next/link";
import dayjs from "dayjs";


const displayApplications = 1;

const LatestApplications = async () => {
  const applications = await prisma.application.findMany({
    orderBy: { application_date: "desc" },
    take: displayApplications,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Box mt="2" p="4" borderWidth="1px" borderRadius="lg">
      <Heading as="h3" size="md" mb="2">
        Latest Applications
      </Heading>
      <Table variant="simple">
        <Tbody>
          {applications.map((application) => (
            <Tr key={application.application_id}>
              <Td>
                <Flex justify="space-between" align="center">
                  <Flex direction="row" align="start" gap="3">
                    {/* add icon here */}
                    <Link href={`/applications/${application.application_id}`}>
                      <Flex direction="column">
                        <label >Title: {application.job_title}</label>
                        <label>Company: {application.company}</label>
                        <label> Application_Date:{dayjs(application.application_date).format("DD-MM-YYYY")}</label>
                      </Flex>
                    </Link>
                    <ApplicationStatusBadge application={application} isEdit={false}/>
                  </Flex>
                  {application.assignedToUser && (
                    <Avatar
                      name={application.assignedToUser?.name || "User"}
                      src={application.assignedToUser?.image || ""}
                    />
                  )}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LatestApplications;

