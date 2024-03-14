import Skeleton from "@/app/components/Skeleton";
import { Box } from "@chakra-ui/react";
import React from "react";

const ApplicationFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default ApplicationFormSkeleton;
