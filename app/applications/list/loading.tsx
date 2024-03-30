import React from "react";
import { Skeleton, Table, TableContainer, Tbody, Th, Thead, Tr, Td } from "@chakra-ui/react";
import AddApplication from "./AddApplication";

const LoadingPage = () => {
  const placeholders = [1, 2, 3, 4, 5]; 

  return (
    <div>
      <AddApplication />
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
            {placeholders.map((placeholder, index) => (
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
