"use client";
import React, { useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ApplicationDetails from "./ApplicationDetails";
import ManipulationButtons from "./ManipulationButtons";
import ApplicationFormSkeleton from "../_components/ApplicationFormSkeleton";

interface ApplicationDetailsProps {
  params: {
    id: string;
  };
}

const ApplicationDetailPage = ({ params }: ApplicationDetailsProps) => {
  const router = useRouter();
  const toast = useToast();

  const [application, setApplication] = useState(null);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`/api/applications/${params.id}`);
        setApplication(res.data);
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 404) {
          toast({
            title: "Application not found",
            description: "Cannot find the application.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (error.response && error.response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "You are not authorized to view this application.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error",
            description: "An error occurred while fetching the application.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
        router.push("/applications/list");
      }
    };

    fetchApplication();
  }, [params.id, router, toast]);

  const handleDelete = async () => {
    if (isDeleteConfirmed) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/applications/${params.id}`);
        router.push("/applications/list");
      } catch (error) {
        console.error("Failed to delete the application", error);
        toast({
          title: "Error",
          description: "Failed to delete the application.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    } else {
      setIsDeleteConfirmed(true);
    }
  };

  if (!application) {
    return <ApplicationFormSkeleton />;
  }

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
      <ManipulationButtons
        application={application}
        isDeleteConfirmed={isDeleteConfirmed}
        isLoading={isLoading}
        deleteFunction={handleDelete}
      />
    </Box>
  );
};

export default ApplicationDetailPage;


