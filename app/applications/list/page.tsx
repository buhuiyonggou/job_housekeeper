import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import AddApplication from "./AddApplication";

const Applications = () => {
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
