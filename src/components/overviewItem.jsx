import React from "react";
import { Box, Text, Flex, useMediaQuery } from "@chakra-ui/react";

function OverviewItem({ label, value }) {
  const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");
  return (
    <Box paddingY="1">
      <Flex
        direction={isLargeScreen ? "row" : "column"}
        justify="flex-start"
        align="flex-start"
      >
        <Box flex="3">
          <Text>{label}</Text>
        </Box>
        <Box flex="9">
          <Text fontSize={isLargeScreen ? "md" : "sm"}>{value}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default OverviewItem;
