import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Box, Text, Divider } from "@chakra-ui/react";
import numeral from "numeral";

import Hero from "../../components/hero";
import TxOverview from "../../components/transactionOverview";
import { web3Instance } from "../../shared/web3";
import { DECIMALS } from "../../shared/config";

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

function AddressDetailsPage() {
  const location = useLocation();
  const [tx, setTx] = React.useState(null);

  React.useEffect(() => {
	  if(tx === null){
		  const qs = new URLSearchParams(location.search);
		  const h = qs.get("txhash");
		  if (h !== null) {
			// get all the details about this address, in respect to the erc20
			web3Instance.eth.getTransaction(h, function(error, result){
				if (!error){
					result["value"] = numeral(result["value"] / 10 ** DECIMALS).format("0,0");
					setTx(result);
				}
			});
		  }
	  }
  }, [location]);

  return (
    <AddressDetailsWrapper>
      <Box paddingX={{ base: 6, md: 20 }}>
        <Hero />
		{
			tx !== null && <TxOverview {...tx}/>
		}
      </Box>
    </AddressDetailsWrapper>
  );
}

export default AddressDetailsPage;
