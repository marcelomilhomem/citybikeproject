import React from "react";
import { TableContainer, Table as ChakraTable, Tbody, Tr, Td } from '@chakra-ui/react'

const Table = ({ adress, freeBikes }) => {
    return (
        <TableContainer>
        <ChakraTable variant="simple">
          <Tbody>
            <Tr>
              <Td>Free Bikes</Td>
              <Td fontWeight={'100'}>{freeBikes}</Td>
            </Tr>
            <Tr>
              <Td>Adress</Td>
              <Td fontWeight={'100'}>{adress}</Td>
            </Tr>
          </Tbody>
        </ChakraTable>
      </TableContainer>
    );
  };

export default Table;
