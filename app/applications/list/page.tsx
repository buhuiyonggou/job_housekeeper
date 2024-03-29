import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import AddApplication from "./AddApplication";
import { Application, Status } from "@prisma/client";

interface searchParamsProps {
  status: Status;
  orderBy: keyof Application;
  page: string;
}

interface Props {
  searchParams: searchParamsProps;
}

const Applications = async ( {searchParams} : Props) => {
  return (
    <Flex direction="row" gap="3">
      {/* <Selector /> */}
      <AddApplication />
    </Flex>
  );
};

export const metadata = {
  title: "Applications | Application List",
  description: "All Applications Page",
};

export default Applications;
