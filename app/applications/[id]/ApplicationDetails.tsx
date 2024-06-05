import { VStack, Heading, Badge, Text, Box, Link } from "@chakra-ui/react";
import { Application } from "@prisma/client";
import React from "react";
import { CiLink } from "react-icons/ci";
import ReactMarkdown from "react-markdown";
import { getStatusColorScheme } from "@/app/src/utils/Reusables";

const ApplicationDetails = ({ application }: { application: Application }) => {
  return (
    <VStack spacing={5} align="stretch">
      <Heading as="h1" size="lg" className="text-center">
        Application Details
      </Heading>
      <Text fontSize="lg">
        <strong>Company:</strong>
        <Box as="span" ml="3">
          {application.company}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Status:</strong>
        <Badge
          colorScheme={getStatusColorScheme(application.status)}
          fontSize="lg"
          borderRadius="lg"
          ml="3"
        >
          {application.status}
        </Badge>
      </Text>
      <Text fontSize="lg">
        <strong>Category:</strong>
        <Box as="span" ml="2">
          {application.category}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Job Title:</strong>
        <Box as="span" ml="3">
          {application.job_title}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Job Info:</strong>
        <Box as="span" ml="3">
          <Box borderWidth="1px" borderRadius="lg" p="5" overflow="hidden" className="prose">
            <ReactMarkdown>{application.job_info}</ReactMarkdown>
          </Box>
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Track Link:</strong>
        <Box as="span" ml="3">
          <Link href={application.track_link ?? ""} isExternal color="teal.500">
            <CiLink style={{ display: application.track_link ? "inline" : "none" }} size={20} color="teal" />
            {application.track_link ?? ""}
          </Link>
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Position Code:</strong>
        <Box as="span" ml="3">
          {application.position_code}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Type:</strong>
        <Box as="span" ml="3">
          {application.type}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Term:</strong>
        <Box as="span" ml="3">
          {application.term}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Year:</strong>
        <Box as="span" ml="3">
          {application.year}
        </Box>
      </Text>
      <Text fontSize="lg">
        <strong>Location:</strong>
        <Box as="span" ml="3">
          {application.location}
        </Box>
      </Text>
    </VStack>
  );
};

export default ApplicationDetails;
