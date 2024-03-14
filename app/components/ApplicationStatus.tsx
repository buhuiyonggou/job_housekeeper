import { Status } from "@prisma/client";
import { Badge } from "@chakra-ui/react";
import React from "react";

interface ApplicationStatusBadgeProps {
  status: Status;
}
const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "blue" | "green" }
> = {
  Applied: { label: "Applied", color: "violet" },
  Interview: { label: "Interview", color: "blue" },
  Offer: { label: "Offer", color: "green" },
  Rejected: { label: "Rejected", color: "red" },
};

const ApplicationStatusBadge = ({ status }: ApplicationStatusBadgeProps) => {
  return (
    <Badge colorScheme={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default ApplicationStatusBadge;
