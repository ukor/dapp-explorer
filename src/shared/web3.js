import Web3 from "web3";

import CONTRACT_ABI from './abi.json';
import {CONTRACT_ADDRESS, CONTRACT_OWNER} from './config';

const _provider = new Web3.providers.HttpProvider(
  // "https://bsc-dataseed1.binance.org:443"
  "https://speedy-nodes-nyc.moralis.io/b964c5459b05a5c46c317a35/bsc/mainnet"
);

const _socketProvider = new Web3.providers.WebsocketProvider(
  "wss://speedy-nodes-nyc.moralis.io/b964c5459b05a5c46c317a35/bsc/mainnet/ws"
);

export const web3Instance = new Web3(_provider);

export const web3SocketInstance = new Web3(_socketProvider);

export const contractOnSocket = new web3SocketInstance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS, {
  from: CONTRACT_OWNER
});

export const contract = new web3Instance.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  {
    from: CONTRACT_OWNER,
  }
);
