import prisma from "@/prisma/client";
import { Avatar, Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { ApplicationStatusBadge } from "../src/utils/index";
import Link from "next/link";
import dayjs from "dayjs";
import { BsArchiveFill } from "react-icons/bs";

const displayApplications = 3;

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
      <Heading as="h3" size="md" mb="2" textAlign="center">
        Latest Applications
      </Heading>
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        display={{ base: "grid", md: "grid", lg: "grid" }}
      >
        {applications.map((application) => (
          <Box
            key={application.application_id}
            p="4"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
          >
            <Flex direction="column" gap="3" align="center">
              <Flex direction="row" align="center" gap="3">
                <BsArchiveFill />
                <Link href={`/applications/${application.application_id}`}>
                  <Flex direction="column" align="center">
                    <Heading as="h5" size="sm" m="1">
                      Title: {application.job_title}
                    </Heading>
                    <Heading as="h5" size="sm" m="1">
                      Company: {application.company}
                    </Heading>
                    <Text fontSize="sm" m="1">
                      Application Date:{" "}
                      {dayjs(application.application_date).format("DD-MM-YYYY")}
                    </Text>
                  </Flex>
                </Link>
              </Flex>
              <ApplicationStatusBadge
                application={application}
                isEdit={false}
              />
              {application.assignedToUser && (
                <Avatar
                  name={application.assignedToUser?.name || "User"}
                  src={application.assignedToUser?.image || ""}
                />
              )}
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestApplications;
