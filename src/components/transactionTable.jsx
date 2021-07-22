import React from "react";
import { Box, Flex, Text, Divider, useMediaQuery } from "@chakra-ui/react";
import numeral from "numeral";

import { DECIMALS } from "../shared/config";


function TableItem({ label, value }) {
  const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");
  return (
    <Box paddingY="1">
      <Flex
        direction={isLargeScreen ? "row" : "column"}
        justify="flex-start"
        align="flex-start"
      >
        <Box flex="2">
          <Text>{label}</Text>
        </Box>
        <Box flex="10">
          <Text fontSize={isLargeScreen ? "md" : "sm"} as="p">
            {value}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

function TableRow({
  blockHash,
  event,
  blockNumber,
  returnValues,
  transactionHash,
  transactionIndex,
  txTime,
  signature,
}) {
  return (
    <Box paddingY="2" flex={1}>
      <Flex direction="column">
        <TableItem label="Block Number" value={blockNumber} />
        <TableItem label="Event Type" value={event} />
        <TableItem label="Transaction Hash" value={transactionHash} />
        <TableItem label="From" value={returnValues.from} />
        <TableItem
          label="Value"
          value={numeral(returnValues.value / DECIMALS).format("0,0")}
        />
        <TableItem label="To" value={returnValues.to} />
        <TableItem label="Timestamp" value={txTime} />
        <Divider />
      </Flex>
    </Box>
  );
}

export default TableRow;
