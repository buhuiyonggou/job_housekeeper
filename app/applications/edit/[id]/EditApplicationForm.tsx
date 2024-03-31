import dynamic from 'next/dynamic'
import React from 'react'
import prisma from "@/prisma/client";
import ApplicationFormSkeleton from '../../_components/ApplicationFormSkeleton'
import { notFound } from 'next/navigation';

interface EditApplicationFormProps {
    params:{
        application_id: string;
    }
}

const ApplicationForm = dynamic(()=> import("../../_components/ApplicationForm"), {
    ssr: false,
    loading: () => <ApplicationFormSkeleton />

})

const EditApplicationForm = async ({params}: EditApplicationFormProps) => {
    const application = await prisma.application.findUnique({
        where: {
            application_id: parseInt(params.application_id),
        }
    })

    if(!application) notFound();

    return <ApplicationForm application={application} />};

export default EditApplicationForm;