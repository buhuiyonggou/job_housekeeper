import React from "react";
import { Skeleton, Table, TableContainer, Tbody, Th, Thead, Tr, Td, Box, Flex, Input, Spacer } from "@chakra-ui/react";
import AddApplication from "./AddApplication";
import { pageSize } from "../../src/utils/constants";

const ListLoading = () => {
  const placeholders = Array.from({ length: pageSize });

  return (
    <div>
      <Flex direction="column" gap="3">
        <Box display='flex' gap={6} alignItems='baseline'>
          <Skeleton height="40px" width="150px" mb="4">
            <AddApplication />
          </Skeleton>
          <Skeleton height="40px" width="300px">
            <Input />
          </Skeleton>
        </Box>
      </Flex>

      <Spacer />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>COMPANY</Th>
              <Th>TITLE</Th>
              <Th>LOCATION</Th>
              <Th>TYPE</Th>
              <Th>TERM</Th>
              <Th>YEAR</Th>
              <Th>STATUS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {placeholders.map((_, index) => (
              <Tr key={index}>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
                <Td><Skeleton height="20px" /></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListLoading;