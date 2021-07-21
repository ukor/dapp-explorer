import React from 'react';
import styled from 'styled-components';
import {useHistory, Link as ReactRouterLink} from 'react-router-dom';
import { Image, Box, Text, Flex, InputGroup, Input, InputRightElement, Button, Link, useMediaQuery } from "@chakra-ui/react";
import web3 from 'web3';

import KeyLogo from '../assets/images/key_logo.webp';

const HeroWrapper = styled.div``;

function Hero(){
  const [searchItem, setSearchItem] = React.useState('');
	const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");
  const history = useHistory();
	const handleClick = () =>{
    // https://web3js.readthedocs.io/en/v1.3.4/web3-utils.html#isaddress
    if (web3.utils.isAddress(searchItem)) {
      // get address details
      history.push(`/address?address=${searchItem}`);
    } else {
      // https://web3js.readthedocs.io/en/v1.3.4/web3-eth.html#gettransaction
      history.push(`/txHash?txhash=${searchItem}`);
    }
  };
	return (
    <HeroWrapper>
      <Box paddingY={6}>
        <Flex justify="flex-start" align="center" direction={ isLargeScreen ? "row" :  "column"}>
          <Box flex="2">
            <Link textDecoration="none" as={ReactRouterLink} to='/'>
              <Flex justify="flex-start" align="center">
                <Box>
                  <Image width="150px" src={KeyLogo} />
                </Box>
                <Box flex="1">
                  <Text
                    as="h3"
                    color="#ff8400"
                    fontSize="1.5rem"
                    fontWeight="bold"
                  >
                    Key Token Explorer
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Box>
          <Box marginTop= { isLargeScreen ? 0 : 6} flex="2">
            <Flex justify="flex-end">
              <Box width="full">
                <InputGroup size="lg">
                  <Input
                    pr="6rem"
                    type="text"
                    value={searchItem}
                    onChange={(event) => setSearchItem(event.target.value)}
                    size="lg"
                    placeholder="Enter tx hash / address"
                    _focus={{ borderColor: "#ff8400" }}
                  />
                  <InputRightElement width="6rem">
                    <Button
                      _hover={{ bg: "#ff8400" }}
                      bg="#ff8400"
                      onClick={handleClick}
                    >
                      Search
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </HeroWrapper>
  );
}

export default Hero;
