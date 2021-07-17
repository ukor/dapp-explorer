import Web3 from "web3";

import CONTRACT_ABI from './abi.json';
import {CONTRACT_ADDRESS, CONTRACT_OWNER} from './config';

const _provider = new Web3.providers.HttpProvider(
  "https://bsc-dataseed1.binance.org:443"
);

export const web3Instance = new Web3(_provider);

export const contract = new web3Instance.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  {
    from: CONTRACT_OWNER,
  }
);
