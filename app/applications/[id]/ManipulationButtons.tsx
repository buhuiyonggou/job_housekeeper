"use client";
import Link from '@/app/components/Link';
import { Alert, AlertIcon, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import EditApplicationButton from './editButton';

interface Props {
  application: {
    application_id: number;
  };
  isDeleteConfirmed: boolean;
  isLoading: boolean;
  deleteFunction: () => void;
}

const ManipulationButtons = ({ application, isDeleteConfirmed, isLoading, deleteFunction }: Props) => {
  return (
    <>
      {isDeleteConfirmed && (
        <Alert status='warning' mb={4} mt={3}>
          <AlertIcon />
          Please double check before deleting the application.
        </Alert>
      )}
      
      <Flex direction={{ base: "column", md: "row" }} justify="space-around" mt="5" gap={{ base: 4, md: 0 }}>
        <Button 
          colorScheme="red" 
          flex={{ md: "0.35" }} 
          height={{ base: "36px", md: "auto" }} 
          onClick={deleteFunction}
          isLoading={isLoading}
        >
          {isDeleteConfirmed ? 'Confirm Delete' : 'Delete'}
        </Button>
        <Button colorScheme="orange" flex={{ md: "0.35" }} height={{ base: "36px", md: "auto" }} >
          <Link href={`/applications/list`}>Go Back</Link>
        </Button>
        <EditApplicationButton
          applicationId={application.application_id}
          colorScheme="teal"
          content="Edit Application"
        />
      </Flex>
    </>
  );
}

export default ManipulationButtons;
