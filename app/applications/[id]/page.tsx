import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  Link,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import { CiLink } from "react-icons/ci";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Status } from "@prisma/client";
import ReactMarkdown from "react-markdown";
import EditApplication from "./editApplication";

interface ApplicationDetailsProps {
  params: {
    id: string;
  };
}

const ApplicationDetails = async ({ params }: ApplicationDetailsProps) => {
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
      <VStack spacing={5} align="stretch">
        <Heading as="h1" size="lg" className="text-center">
          Application Details
        </Heading>
        <Text fontSize="lg">
          <strong>Company:</strong>
          {application.company}
        </Text>
        <Text fontSize="lg">
          <strong>Status:</strong>{" "}
          <Badge
            colorScheme={getStatusColorScheme(application.status)}
            fontSize="lg"
            borderRadius="lg"
          >
            {application.status}
          </Badge>
        </Text>

        <Text fontSize="lg">
          <strong>Category:</strong> {application.category}
        </Text>
        <Text fontSize="lg">
          <strong>Job Title:</strong> {application.job_title}
        </Text>
        <strong>Job Info:</strong><Box borderWidth="1px" borderRadius="lg" p="5" overflow="hidden" className="prose">
         <ReactMarkdown>{application.job_info}</ReactMarkdown>
        </Box>
        <Text fontSize="lg">
          <strong>Track Link:</strong>{" "}
          <Link href={application.track_link ?? ""} isExternal color="teal.500">
            {" "}
            <CiLink
              style={{ display: application.track_link ? "inline" : "none" }}
              size={20}
              color="teal"
            />
            {application.track_link ?? ""}
          </Link>
        </Text>
        <Text fontSize="lg">
          <strong>Position Code:</strong> {application.position_code}
        </Text>
        <Text fontSize="lg">
          <strong>Type:</strong> {application.type}
        </Text>
        <Text fontSize="lg">
          <strong>Term:</strong> {application.term}
        </Text>
        <Text fontSize="lg">
          <strong>Year:</strong> {application.year}
        </Text>
        <Text fontSize="lg">
          <strong>Location:</strong> {application.location}
        </Text>
      </VStack>

    <Flex justify="space-around" mt="5">
        <Button colorScheme="orange" flex="0.35">
            <Link href={`/applications/list`}>Go Back</Link>
        </Button>
        <EditApplication applicationId={application.application_id} colorScheme="teal" content="Edit Application"/>
    </Flex>
    </Box>
  );
};

function getStatusColorScheme(status: Status) {
  switch (status) {
    case Status.Applied:
      return "blue";
    case Status.Interview:
      return "yellow";
    case Status.Offer:
      return "green";
    case Status.Rejected:
      return "red";
    default:
      return "gray";
  }
}

export default ApplicationDetails;
