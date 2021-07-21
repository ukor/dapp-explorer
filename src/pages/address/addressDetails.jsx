import React from 'react';
import styled from 'styled-components';
import {useLocation} from 'react-router-dom';
import {Box, Text, Divider} from '@chakra-ui/react';
import numeral from 'numeral';

import Hero from '../../components/hero';
import AddressOverview from '../../components/addressOverview';
import TableRow from '../../components/transactionTable';
import { web3Instance, contract, contractOnSocket } from "../../shared/web3";
import {DECIMALS} from '../../shared/config';

const AddressDetailsWrapper = styled.div`
  background-color: #000000;
  height: 100vh;
  width: 100%;
  color: #ffffff;

  p {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: none;
  }
`;

function AddressDetailsPage(){
  const location = useLocation();
  /**
	 * {
		'address': '',
		'balance':  0,
		'numberOfTransactions': 0,
		'transactions': [],
	}
	 */
  const [walletAddress, setWalletAddress] = React.useState("");
  const [balance, setBalance] = React.useState("");

  const [contractEvent, setContractEvent] = React.useState([]);
  const [currentBlock, setCurrentBlock] = React.useState(0);

  React.useEffect(() => {
    const qs = new URLSearchParams(location.search);
    const addr = qs.get("address");
    if (addr !== null) {
      // get all the details about this address, in respect to the erc20
      contract.methods
        .balanceOf(addr)
        .call({ from: addr }, function (error, result) {
          if (!error) {
            const bal = numeral(result / 10 ** DECIMALS).format("0,0");
            setBalance(bal);
          }
        });
      setWalletAddress(addr);
    }
  }, [location]);


  React.useEffect(() => {
    web3Instance.eth.getBlockNumber().then(function (blockNumber) {
      console.log(blockNumber, "block number");
      setCurrentBlock(blockNumber);
    });
  }, []);

  React.useEffect(() => {
    if (currentBlock !== 0) {
		const qs = new URLSearchParams(location.search);
    	const addr = qs.get("address");
		if(addr !== null) {
			contract
			  .getPastEvents(
				"Transfer",
				{
				  fromBlock: currentBlock - 4999,
				  toBlock: "latest",
				  filter: {from: [addr]},
				},
				function (error, events) {
				  if (error === null) {
					const eventSize = events.length;
					if (eventSize > 1) {
					  // reverse the array so that recent event appears first
					  setContractEvent(
						events.map((item, idx) => events[eventSize - 1 - idx])
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
    }
  }, [currentBlock, location]);

  React.useState(() => {

	const qs = new URLSearchParams(location.search);
	const addr = qs.get("address");
	if(addr !== null){

		// https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#id50
		// subscribe to Transfer event
		contractOnSocket.events
		  .Transfer(function (error, events) {
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
	}
  }, [location]);

  return (
    <AddressDetailsWrapper>
      <Box paddingX={{ base: 6, md: 20 }}>
        <Hero />
        <AddressOverview
          address={walletAddress}
          balance={balance}
          allowance={0}
        />
        <Box paddingY="12">
          <Box>
            <Text color="#ff8400" fontSize="lg" fontWeight="bold">
              Address Transactions
            </Text>
            <Divider />
          </Box>
          {
            // display only the first 50 transaction
            contractEvent.slice(0, 50).map((e) => (
              <TableRow {...e} />
            ))
          }
        </Box>
      </Box>
    </AddressDetailsWrapper>
  );
}


export default AddressDetailsPage;
