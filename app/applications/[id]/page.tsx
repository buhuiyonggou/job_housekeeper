"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
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

  const [application, setApplication] = useState(null);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`/api/applications/${params.id}`);
        if (res.status === 404) {
          router.push("/applications/list");
        } else {
          setApplication(res.data);
        }
      } catch (error) {
        console.error(error);
        router.push("/applications/list");
      }
    };

    fetchApplication();
  }, [params.id]);

  const handleDelete = async () => {
    if (isDeleteConfirmed) {
      setIsLoading(true);
      try {
        await axios.delete(`/api/applications/${params.id}`);
        router.push("/applications/list");
      } catch (error) {
        console.error("Failed to delete the application", error);
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


