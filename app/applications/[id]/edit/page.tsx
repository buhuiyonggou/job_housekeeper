import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ApplicationFormSkeleton from "../../_components/ApplicationFormSkeleton";

interface EditApplicationPageProps {
  params: {
    id: string;
  };
}

const ApplicationForm = dynamic(() => import("../../_components/ApplicationForm"), {
  ssr: false,
  loading: () => <ApplicationFormSkeleton />,
});

const EditIssuePage = async ({ params }: EditApplicationPageProps) => {
  const application = await prisma.application.findUnique({
    where: { application_id: parseInt(params.id) },
  });

  if (!application) notFound();

  return <ApplicationForm application={application} />;
};

export default EditIssuePage;