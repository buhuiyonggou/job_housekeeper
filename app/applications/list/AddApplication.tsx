import { Button, Link } from "@radix-ui/themes";
import React from "react";

const AddApplication = () => {
  return (
    <Button variant="soft" size="3">
      <Link href="/applications/new">Add Application</Link>
    </Button>
  );
};

export default AddApplication;
