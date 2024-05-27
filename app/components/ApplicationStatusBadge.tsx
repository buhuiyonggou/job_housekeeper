"use client";
import { Badge, Button, Link } from "@chakra-ui/react";
import { Application } from "@prisma/client";
import { statusOptions } from "../utils/Reusables";

interface Props {
  application: Application;
  isEdit: boolean;
}

const ApplicationStatusBadge = ({ application, isEdit }: Props) => {
  return (
    <>
      <Badge colorScheme={statusOptions[application.status].color}>
        {statusOptions[application.status].label}
      </Badge>
      {isEdit ? (
        <Button size="xs" ml={3}>
          <Link href={`/applications/${application.application_id}/edit`}>
            Edit
          </Link>
        </Button>
      ) : null}
    </>
  );
};

export default ApplicationStatusBadge;
