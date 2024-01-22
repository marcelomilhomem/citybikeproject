import React from "react";
import {
  TableContainer,
  Table as ChakraTable,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { withNamespaces } from "react-i18next";

const Table = ({ address, freeBikes, city, t }) => {
  return (
    <TableContainer>
      <ChakraTable variant="unstyled">
        <Tbody>
          <Tr>
            <Td>{t("freeBikes")}</Td>
            <Td fontWeight={"100"}>{freeBikes}</Td>
          </Tr>
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};

export default withNamespaces()(Table);
