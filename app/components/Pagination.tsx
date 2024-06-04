"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  TotalItems: number;
  PageSize: number;
  CurrentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ TotalItems, PageSize, CurrentPage, onPageChange }: Props) => {
  const totalPages = Math.ceil(TotalItems / PageSize);

  if (totalPages <= 1) return null;

  return (
    <Flex align="center" gap="2">
      <Text size="1">
        Page {CurrentPage} of {totalPages}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === 1}
        onClick={() => onPageChange(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === 1}
        onClick={() => onPageChange(CurrentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === totalPages}
        onClick={() => onPageChange(CurrentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;


