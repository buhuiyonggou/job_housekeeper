"use client";
import { Badge, Button, Link } from "@chakra-ui/react";
import { Application } from "@prisma/client";
import {statusOptions} from "@/app/components/StatusEditor";

interface Props {
  application: Application;
}

const ApplicationStatusBadge = ({ application }: Props) => {
  return (
    <>
      <Badge colorScheme={statusOptions[application.status].color}>
        {statusOptions[application.status].label}
      </Badge>
      <Button size="xs" ml={3}>
        <Link href={`/applications/${application.application_id}/edit`}>
          Edit
        </Link>
      </Button>
    </>
  );
};

export default ApplicationStatusBadge;
