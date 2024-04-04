"use client";
import { Badge, Button, Select } from "@chakra-ui/react";
import { Application, Status } from "@prisma/client";
import React, { useState } from "react";
import axios from "axios";
import { useApplications } from '../ApplicationProvider'

const statusOptions: Record<Status, { label: string; color: string }> = {
  Applied: { label: "Applied", color: "yellow" },
  Interview: { label: "Interview", color: "blue" },
  Offer: { label: "Offer", color: "green" },
  Rejected: { label: "Rejected", color: "red" },
  Pending: { label: "Pending", color: "gray" },
};

interface Props {
  application: Application;
  editable: boolean;
}

const ApplicationStatusBadge = ({ application, editable }: Props) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(application.status);
  const [isEditing, setIsEditing] = useState(false);

  const { handleStatusUpdate } = useApplications();

  const handleStatusChange = async (newStatus: Status) => {
    setIsEditing(false);
    setCurrentStatus(newStatus);
    await handleStatusUpdate(application.application_id, newStatus);
  };

  return (
    <>
      {!isEditing ? (
        <>
          <Badge colorScheme={statusOptions[application.status].color}>
            {statusOptions[application.status].label}
          </Badge>
          {editable && (
            <Button size="xs" ml={2} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </>
      ) : (
        <Select
          defaultValue={currentStatus}
          onChange={(e) => handleStatusChange(e.target.value as Status)}
        >
          {Object.entries(statusOptions).map(([value, { label }]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      )}
    </>
  );
};

export default ApplicationStatusBadge;
