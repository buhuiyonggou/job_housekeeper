import { Box, Heading, Text, Link, Image, Badge, Stack } from "@chakra-ui/react";
import { Job } from "app/src/utils/Reusables";
import { JobProviders } from "app/src/utils/Reusables";

const JobCard = ({ job }: { job: Job }) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={job.image} alt={job.company} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            <Text> &bull; Location: {job.location} </Text>
            <Text>&bull; Posted Time: {job.timeAgoPosted} </Text>
          </Box>
        </Box>

        <Box m="3" fontWeight="semibold" lineHeight="tight" noOfLines={1}>
          <Heading as="h5" size="sm">
            {job.title}
          </Heading>
        </Box>

        <Text fontWeight="semibold" letterSpacing="wide" fontSize="sm" m="2">
          &bull; Salary: {job.salaryRange || "Not Specified"}   
        </Text>

        <Box as="span" color="gray.600" fontSize="sm">
          {job.salaryRange}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm"  p="1">
        {job.jobProviders.slice(0, 3).map((jobProvider: JobProviders, index) => (
            <Box as='span' key={jobProvider.jobProvider} mr="1">
              {index + 1}. <Link href={jobProvider.url} isExternal>{jobProvider.jobProvider}</Link>
            </Box>
          ))}
          {job.jobProviders.length > 5 && (
            <Box as='span' p="1">...</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;
