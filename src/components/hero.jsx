import React from 'react';
import styled from 'styled-components';
import { Image, Box, Text, Flex, InputGroup, Input, InputRightElement, Button, useMediaQuery } from "@chakra-ui/react";

import KeyLogo from '../assets/images/key_logo.webp';

const HeroWrapper = styled.div``;

function Hero(){
	const [isLargeScreen] = useMediaQuery("(min-width: 48rem)");
	const handleClick = () =>{
		console.log('Search clicked');
	};
	return (
    <HeroWrapper>
      <Box paddingY={6}>
        <Flex justify="flex-start" align="center" direction={ isLargeScreen ? "row" :  "column"}>
          <Box flex="2">
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
          </Box>
          <Box marginTop= { isLargeScreen ? 0 : 6} flex="2">
            <Flex justify="flex-end">
              <Box width="full">
                <InputGroup size="lg">
                  <Input
                    pr="6rem"
                    type="text"
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
