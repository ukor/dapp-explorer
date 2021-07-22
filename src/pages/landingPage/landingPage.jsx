import React from "react";
import styled from "styled-components";
import { Box, Text, Divider } from "@chakra-ui/react";

import Hero from "../../components/hero";
import { web3Instance, contract, contractOnSocket } from "../../shared/web3";
import ContractOverview from "../../components/contractOverview";
import TableRow from '../../components/transactionTable';

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

function LandingPage() {
  const [contractEvent, setContractEvent] = React.useState([]);
  const [currentBlock, setCurrentBlock] = React.useState(0);

  React.useEffect(() => {
    web3Instance.eth.getBlockNumber().then(function (blockNumber) {
      console.log(blockNumber, "block number");
      setCurrentBlock(blockNumber);
    });
  }, []);

  React.useEffect(() => {
    if (currentBlock !== 0) {
      contract
        .getPastEvents(
          "Transfer",
          {
            fromBlock: currentBlock - 4999,
            toBlock: "latest",
          },
          function (error, events) {
            console.log(error, "error");
            if (!error) {
              console.log(events);
              const eventSize = events.length;
              if (eventSize > 1) {
                // reverse the array so that recent event appears first
                setContractEvent(
                  events.map((item, idx) => {
                    const event = events[eventSize - 1 - idx];
                    // https://ethereum.stackexchange.com/a/7288/72258
                    const timeStamp = web3Instance.eth.getBlock(
                      event["blockNumber"]
                    ).timestamp;

                    event["timestamp"] = timeStamp

                    var d = new Date(timeStamp * 1000);
                    var s = d.toUTCString();
                    s = s.substring(0, s.indexOf("GMT")) + "UTC";
                    event["txTime"] = s;
                    return event;
                  })
                );
              } else {
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
    contractOnSocket.events
      .Transfer(function (error, events) {
        console.log(events, error, "<<<>>>");
        if (!error) {
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
        <Box paddingY="12">
          <Box>
            <Text color="#ff8400" fontSize="lg" fontWeight="bold">
              Transactions
            </Text>
            <Divider />
          </Box>
          {
			// display only the first 50 transaction
			contractEvent.slice(0, 50).map((e) => (
				<TableRow key={e.transactionHash} {...e} />
			))
		  }
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default LandingPage;
