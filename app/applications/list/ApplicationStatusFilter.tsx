"use client";
import { Status } from "@prisma/client";
import { Select } from '@chakra-ui/react'
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ApplicationStatusFilter = () => {
  const statusOptions: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Applied", value: "Applied" },
    { label: "Interview", value: "Interview" },
    { label: "Offer", value: "Offer" },
    { label: "Rejected", value: "Rejected" },
    { label: "Updating", value: "Updating" },
  ];
  // get the current status from the query params
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (status: Status) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);

    if (searchParams?.get("orderBy"))
      params.append("orderBy", searchParams.get("orderBy")!);

    const query = params.size ? "?" + params.toString() : "";

    router.push(`/applications/list/${query}`);
  }

  return (
    <Select
      defaultValue={searchParams?.get("status") || ""}
      onChange={(e) => handleStatusChange(e.target.value as Status)}
      w= {{base: "55%", md: "12%"}}
    >
      {statusOptions.map((option) => (
        <option key={option.label} value={option.value || ""}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default ApplicationStatusFilter;