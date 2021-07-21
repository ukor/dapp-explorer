import React from "react";
import { Box, Text, Divider, useMediaQuery } from "@chakra-ui/react";
import { contract } from "../shared/web3";
import {CONTRACT_OWNER} from "../shared/config";
import OverviewItem from "./overviewItem";

function TransactionOverview({ from, to, value, blockHash, hash, blockNumber, transactionIndex, gas, gasPrice, }) {
  const [tokenSymbol, setTokenSymbol] = React.useState("");

  const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");

  React.useEffect(() => {
    contract.methods.symbol().call({ from: CONTRACT_OWNER }, function (error, result) {
      if (!error) {
        setTokenSymbol(result);
      }
    });
  }, []);

  return (
    <Box
      paddingX={5}
      paddingY={7}
      border="1px"
      borderColor="grey.500"
      boxShadow="xs"
      width={isLargeScreen ? "full" : "full"}
      borderRadius="lg"
    >
      <Box>
        <Text color="#ff8400" fontSize="lg" fontWeight="bold">
          Transaction Overview
        </Text>
        <Divider />
      </Box>
      <Box paddingY="2">
        <OverviewItem label="Tx Hash" value={hash} />
        <OverviewItem label="Block Number" value={blockNumber} />
        <OverviewItem label="From" value={from} />
        <OverviewItem label="Value" value={`${value} ${tokenSymbol}`} />
        <OverviewItem label="To" value={to} />
        <OverviewItem label="Gas Price" value={gasPrice} />
        <OverviewItem label="Gas" value={gas} />
        <OverviewItem label="Block Hash" value={blockHash} />
        <OverviewItem label="Transaction Index" value={transactionIndex} />
      </Box>
    </Box>
  );
}

export default TransactionOverview;
