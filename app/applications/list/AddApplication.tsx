import { Button, ButtonGroup, Link } from "@chakra-ui/react";

const AddApplication = () => {
  return (
    <ButtonGroup >
      <Button colorScheme="teal" size="md" variant="outline">
        <Link href="/applications/new">Add Application</Link>
      </Button>
    </ButtonGroup>
  );
};

export default AddApplication;
