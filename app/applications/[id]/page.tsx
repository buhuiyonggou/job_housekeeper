import React from "react";
import {
  Box,
  Link,
  Button,
  Flex,
} from "@chakra-ui/react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import EditApplicationButton from "./editButton";
import ApplicationDetails from "./ApplicationDetails";

interface ApplicationDetailsProps {
  params: {
    id: string;
  };
}

const ApplicationDetailPage = async ({ params }: ApplicationDetailsProps) => {
  if (isNaN(parseInt(params.id))) notFound();

  const application = await prisma.application.findUnique({
    where: {
      application_id: parseInt(params.id),
    },
  });

  if (!application) notFound();

  return (
    <Box
      maxW="xl"
      mx="auto"
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
     <ApplicationDetails application={application} />
      <Flex direction={{ base: "column", md: "row" }}justify="space-around" mt="5" gap={{ base: 4, md: 0 }}>
        <Button colorScheme="orange" flex= {{md: "0.35"}}  height={{ base: "36px", md: "auto" }}>
          <Link href={`/applications/list`}>Go Back</Link>
        </Button>
        <EditApplicationButton
          applicationId={application.application_id}
          colorScheme="teal"
          content="Edit Application"
        />
      </Flex>
    </Box>
  );
};



export default ApplicationDetailPage;
