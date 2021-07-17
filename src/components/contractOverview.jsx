import React from 'react';
import {Box, Text, Flex, Divider, useMediaQuery} from '@chakra-ui/react';
import numeral from 'numeral';
import { contract} from '../shared/web3'
import {CONTRACT_ADDRESS, DECIMALS, CONTRACT_CREATOR_ADDRESS} from '../shared/config';


function ContractOverview(){

	const [tokenName, setTokenName] = React.useState('');
	const [tokenSymbol, setTokenSymbol] = React.useState('');
	const [totalSupply, setTotalSupply] = React.useState('');

	const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");

	React.useEffect(() => {
		contract.methods.owner().call(
			{ from: CONTRACT_CREATOR_ADDRESS },
			function (error, result) {
				console.log(error, "--error--");
				if(!error){
					console.log(result, "--result--");
				}
			}
      	);

		contract.methods.symbol().call(
			{ from: CONTRACT_CREATOR_ADDRESS },
			function (error, result) {
			console.log(result, "--symbol result--");
			if(!error){
				setTokenSymbol(result);
			}
			}
		);
		contract.methods.name().call(
			{ from: CONTRACT_CREATOR_ADDRESS },
			function (error, result) {
				console.log(result, "--symbol result--");
				if(!error){
					setTokenName(result);
				}
			}
		);

		contract.methods.totalSupply().call(
			{ from: "0x2c54447bC19DB852Fd9133017A8d800c75C469Ce" },
			function (error, result) {
				console.log(result, "--total supply result--");
				if(!error){
					setTotalSupply(result);
				}
			}
		);
	}, []);

	return (
    <Box
      paddingX={5}
      paddingY={7}
      border="1px"
      borderColor="grey.500"
      boxShadow="xs"
	  width={ isLargeScreen ? 'full' : 'full'}
	  borderRadius='lg'
    >
      <Box>
        <Text color="#ff8400" fontSize="lg" fontWeight="bold">
          Contract Overview
        </Text>
		<Divider />
      </Box>
      <Box paddingY='2'>
        <Item label="Name" value={tokenName} />
        <Item label="Symbol" value={tokenSymbol} />
        <Item
          label="Total Supply"
          value={numeral(totalSupply / 10 ** DECIMALS).format("0,0")}
        />
        <Item label="Contract Address" value={CONTRACT_ADDRESS} />
        <Item label="Contract Decimals" value={DECIMALS} />
      </Box>
    </Box>
  );
}

function Item({ label, value }) {
	const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");
  return (
    <Box paddingY="1">
      <Flex direction={ isLargeScreen ? "row" :  "column"} justify="flex-start" align="flex-start">
        <Box flex="3">
          <Text>{label}</Text>
        </Box>
        <Box flex="9">
          <Text fontSize={isLargeScreen ?  'md' : 'sm'} >{value}</Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default ContractOverview
