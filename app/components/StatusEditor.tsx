"use client";
import { Badge, Select } from "@chakra-ui/react";
import { Application, Status } from "@prisma/client";
import React, { useState } from "react";
import { useApplications } from "../ApplicationProvider";

interface Props {
  application: Application;
  placeholder?: string;
}

const StatusEditor = ({ application, placeholder }: Props) => {
  const [currentStatus, setCurrentStatus] = useState<Status>(
    application.status
  );

  const { handleStatusUpdate } = useApplications();

  const handleStatusChange = async (newStatus: Status) => {
    setCurrentStatus(newStatus);
    await handleStatusUpdate(application.application_id, newStatus);
  };

  return (
    <Badge colorScheme={statusOptions[currentStatus].color} 
    >
    <Select
      defaultValue={currentStatus}
      borderColor='transparent'
      placeholder={placeholder}
      onChange={(e) => handleStatusChange(e.target.value as Status)}
    >
      {Object.entries(statusOptions).map(([value, { label }]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
    </Badge>
  );
};

export const statusOptions: Record<Status, { label: string; color: string }> = {
  Applied: { label: "Applied", color: "yellow" },
  Interview: { label: "Interview", color: "blue" },
  Offer: { label: "Offer", color: "green" },
  Rejected: { label: "Rejected", color: "red" },
  Updating: { label: "Updating", color: "gray" },
};

export default StatusEditor;
