import { Button, ButtonGroup, Link } from "@chakra-ui/react";
import React from "react";

const AddApplication = () => {
  return (
    <ButtonGroup>
      <Button colorScheme="teal" size="md">
        <Link href="/applications/new">Add Application</Link>
      </Button>
    </ButtonGroup>
  );
};

export default AddApplication;
