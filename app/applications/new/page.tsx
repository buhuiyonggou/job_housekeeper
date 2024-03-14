import React from "react";
import dynamic from "next/dynamic";
import ApplicationFormSkeleton from "../_components/ApplicationFormSkeleton";

const ApplicationForm = dynamic(
  () => import("../_components/ApplicationForm"),
  {
    ssr: false,
    loading: () => <ApplicationFormSkeleton />,
  }
);

const NewIssuePage = () => {
  return <ApplicationForm />;
};

export default ApplicationForm;
