import React from "react";
import { Box, Text, Divider, useMediaQuery } from "@chakra-ui/react";
import { contract } from "../shared/web3";
import OverviewItem from './overviewItem';

function AddressOverview({address, balance, allowance}) {
  const [tokenSymbol, setTokenSymbol] = React.useState("");

  const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");

  React.useEffect(() => {

    contract.methods
      .symbol()
      .call({ from: address }, function (error, result) {
        if (!error) {
          setTokenSymbol(result);
        }
      });
  }, [address]);

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
          Address Overview
        </Text>
        <Divider />
      </Box>
      <Box paddingY="2">
        <OverviewItem label="Address" value={address} />
        <OverviewItem label="Balance" value={`${balance} ${tokenSymbol}`} />
        {/* <OverviewItem label="Allowance" value={`${allowance} ${tokenSymbol}`} /> */}
      </Box>
    </Box>
  );
}


export default AddressOverview;
