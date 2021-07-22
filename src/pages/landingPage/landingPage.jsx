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

      (async () => {

        let events = await contract.getPastEvents("Transfer", {
          fromBlock: currentBlock - 4999,
          toBlock: "latest",
        });
        // get only the first 50 events
        events = events.splice(0, 50);
        const eventSize = events.length;
        const _events = [];
        if (eventSize > 1) {
          // reverse the array so that recent event appears first
          for (let i = 0; i < eventSize; i++){
            if(events[i].hasOwnProperty('blockNumber')){
              const block = await web3Instance.eth.getBlock(events[i]["blockNumber"]);

              events[i]["timestamp"] = block.timestamp;

              var d = new Date(block.timestamp * 1000);
              var s = d.toUTCString();
              s = s.substring(0, s.indexOf("GMT")) + "UTC";
              events[i]["txTime"] = s;

              _events.unshift(events[i]);
            }
          }
          setContractEvent(_events);
        } else {
          setContractEvent(events);
        }
      })();
    }
  }, [currentBlock]);

  React.useState(() => {
    // https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#id50
    // subscribe to Transfer event
    contractOnSocket.events
      .Transfer(async function (error, events) {
        if (!error) {
          const block = await web3Instance.eth.getBlock(
            events["blockNumber"]
          );

          events["timestamp"] = block.timestamp;

          var d = new Date(block.timestamp * 1000);
          var s = d.toUTCString();
          s = s.substring(0, s.indexOf("GMT")) + "UTC";
          events["txTime"] = s;
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
				<TableRow key={`${e.transactionHash}_${e.returnValues.to}`} {...e} />
			))
		  }
        </Box>
      </Box>
    </AppWrapper>
  );
}

export default LandingPage;
