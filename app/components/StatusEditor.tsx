"use client";
import { Badge, Select } from "@chakra-ui/react";
import { Application, Status } from "@prisma/client";
import React, { useState } from "react";
import { useApplications } from "../ApplicationProvider";
import { statusOptions } from "../utils/Reusables";

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

export default StatusEditor;
