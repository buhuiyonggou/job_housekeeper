import React from "react";
import { Skeleton, Table, TableContainer, Tbody, Th, Thead, Tr, Td, Box, Flex, Input, Spacer } from "@chakra-ui/react";
import AddApplication from "./AddApplication";
import { pageSize } from "./page";


const LoadingPage = () => {
  const placeholders = []
  for (let i = 0; i < pageSize; i++) {
    placeholders.push(i);
  }
  return (
    <div>
      <Flex direction="column" gap="3">
        <Box display='flex' gap={6} alignItems='baseline'>
          <Skeleton height="40px" width="150px" mb="4">
            <AddApplication />
          </Skeleton>
            <Skeleton height="40px" width="300px">
              <Input/>
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
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
                <Td><Skeleton height="20px" className="hidden md:table-cell"/></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LoadingPage;
