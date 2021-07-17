import React from 'react';
import styled from 'styled-components'
import { Box, Flex, Text, Divider, useMediaQuery } from '@chakra-ui/react';
import numeral from "numeral";

import Hero from './components/hero';
import { web3Instance, contract} from './shared/web3';
import ContractOverview from './components/contractOverview';
import {
  DECIMALS,
} from "./shared/config";

const AppWrapper = styled.div`
  background-color: #000000;
  height: 100%;
  width: 100%;
  color: #ffffff;

  p {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: none;
  }
`;

function App() {
  const [contractEvent, setContractEvent] = React.useState([]);
  const [currentBlock, setCurrentBlock] = React.useState(0);

  React.useEffect(() => {
    web3Instance.eth.getBlockNumber().then(function (blockNumber) {
      console.log(blockNumber, "block number");
      setCurrentBlock(blockNumber);
    });
  }, []);

  React.useEffect(() =>{
    if (currentBlock !== 0){
      contract
        .getPastEvents(
          "Transfer",
          {
            fromBlock: currentBlock - 4999,
            toBlock: 'latest',
          },
          function (error, events) {
            console.log(error, "error");
            if(!error){
              console.log(events);
              const eventSize = events.length
              if (eventSize > 1){
                // reverse the array so that recent event appears first
                setContractEvent(
                  events.map((item, idx) => events[eventSize - 1 - idx])
                );
              }else {
                setContractEvent(events);
              }
            }
          }
        )
        .then(function (events) {
          console.log(events, "events");
        });
    }
  }, [currentBlock]);

  React.useState(() => {
    // https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#id50
    // subscribe to Transfer event
    contract.events
      .Transfer(function (error, events) {
        console.log(events, error, 'o');
        if(!error){
          setContractEvent(contractEvent.unshift(events));
        }
      })
      .on("connected", function (subbscriptionId) {
        console.log(subbscriptionId, "transfer subscriptionId");
      })
      .on("data", function (event) {
        console.log(event, "data");
      })
      .on("changed", function (event) {})
      .on("error", function (error, receipt) {});
  }, []);

  return (
    <AppWrapper>
      <Box paddingX={{ base: 6, md: 20 }}>
        <Hero />
        <Box>
          <ContractOverview />
        </Box>
        <Box paddingY='12'>
          <Box>
            <Text color="#ff8400" fontSize="lg" fontWeight="bold">
              Transactions
            </Text>
            <Divider />
          </Box>
          {contractEvent.map((e) => (
            <TableRow {...e} />
          ))}
        </Box>
      </Box>
    </AppWrapper>
  );
}



function TableItem ({label, value}){
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

function TableRow({blockHash, event, blockNumber, returnValues, transactionHash, transactionIndex}){
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
        <Divider />
      </Flex>
    </Box>
  );
}

export default App;
