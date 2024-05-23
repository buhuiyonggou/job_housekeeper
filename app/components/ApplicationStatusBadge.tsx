"use client";
import { Badge, Button, Link } from "@chakra-ui/react";
import { Application, Status } from "@prisma/client";

const statusOptions: Record<Status, { label: string; color: string }> = {
  Applied: { label: "Applied", color: "yellow" },
  Interview: { label: "Interview", color: "blue" },
  Offer: { label: "Offer", color: "green" },
  Rejected: { label: "Rejected", color: "red" },
  Pending: { label: "Pending", color: "gray" },
};

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
