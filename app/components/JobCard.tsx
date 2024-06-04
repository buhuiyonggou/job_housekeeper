"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Box,
  Heading,
  Text,
  Link,
  Image,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Job } from "app/src/utils/Reusables";
import { BsCollectionFill } from "react-icons/bs";
import { FaClover } from "react-icons/fa6";
import axios from "axios";

interface Props {
  job: Job;
  isCollected?: boolean;
}

const JobCard = ({ job, isCollected }: Props) => {
  const { data: session } = useSession();
  const [isSaved, setIsSaved] = useState(isCollected || false);

  const handleSaveJob = async () => {
    setIsSaved(true);
    try {
      await axios.post("/api/collection", {
        ...job,
        jobProviders: job.jobProviders.map((provider) => ({
          jobProvider: provider.jobProvider,
          url: provider.url,
        })),
      });
    } catch (error) {
      console.error("Failed to save job:", error);
      setIsSaved(false);
    }
  };

  const handleUnSaveJob = async () => {
    setIsSaved(false);
    try {
      await axios.delete(`/api/collection/${job.id}`);
    } catch (error) {
      console.error("Failed to unsave job:", error);
      setIsSaved(true);
    }
  };

  const jobProviders = job.jobProviders || [];
  const firstProvider = jobProviders[0] || { jobProvider: "", url: "" };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Flex justify="space-between">
        <Image src={job.image} alt={job.company} />
        {session && (
          isSaved ? (
            <Button rightIcon={<BsCollectionFill />} onClick={handleUnSaveJob}>
              Job Saved
            </Button>
          ) : (
            <Button
              rightIcon={<FaClover />}
              colorScheme="blue"
              variant="outline"
              onClick={handleSaveJob}
            >
              Save to Collection
            </Button>
          )
        )}
      </Flex>

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
            <Text>&bull; Posted Time: {job.datePosted} </Text>
          </Box>
        </Box>

        <Box m="3" fontWeight="semibold" lineHeight="tight" noOfLines={1}>
          <Link href={firstProvider.url} isExternal>
            <Heading as="h5" size="sm">
              {job.title}
            </Heading>
          </Link>
        </Box>

        <Text fontWeight="semibold" letterSpacing="wide" fontSize="sm" m="2">
          &bull; Salary: {job.salaryRange || "Not Specified"}
        </Text>

        <Box as="span" color="gray.600" fontSize="sm">
          {job.salaryRange}
        </Box>

        <Box as="span" color="gray.600" fontSize="sm" p="1">
          {jobProviders
            .slice(0, jobProviders.length >= 3 ? 3 : jobProviders.length)
            .map((provider, index) => (
              <Box as="span" key={provider.jobProvider} mr="1">
                {index + 1}.{" "}
                <Link href={provider.url} isExternal>
                  {provider.jobProvider}
                </Link>
              </Box>
            ))}
          {jobProviders.length > 5 && (
            <Box as="span" p="1">
              ...
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default JobCard;

