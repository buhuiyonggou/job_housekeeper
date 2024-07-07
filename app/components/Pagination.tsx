"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import {Flex, Text } from "@chakra-ui/react";
import {Button} from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  TotalItems: number;
  PageSize: number;
  CurrentPage: number;
}

const Pagination = ({ TotalItems, PageSize, CurrentPage }: Props) => {
  console.log("CurrentPage: ", CurrentPage), 
  console.log("PageSize: ", PageSize); 
  console.log("TotalItems: ", TotalItems);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(TotalItems / PageSize);
  if (totalPages <= 1) return null;

  const changePage = (page: number) => {
    // like a string builder
    const params = new URLSearchParams(searchParams?.toString() || "" );
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2" fontSize="small">
        Page {CurrentPage} of {totalPages}
      </Text>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === 1}
        onClick={() => changePage(CurrentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === totalPages}
        onClick={() => changePage(CurrentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={CurrentPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;


