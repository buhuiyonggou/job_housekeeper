import { Badge } from '@chakra-ui/react';
import { Status } from '@prisma/client'
import React from 'react'

interface Props {
    status: Status
}

// create a mapping of status to color
const statusMap: Record<
  Status,
  { label: string; color: "yellow" | "violet" | "green" | "red" }
> = {
  Applied: { label: "Applied", color: "yellow" },
  Interview: { label: "Interview", color: "violet" },
  Offer: { label: "Offer", color: "green" },
    Rejected: { label: "Rejected", color: "red" },
};

const ApplicationStatusBadge = ({status}: Props) => {
  return (
    <Badge colorScheme={statusMap[status].color}>{statusMap[status].label}</Badge>
  )
}

export default ApplicationStatusBadge
