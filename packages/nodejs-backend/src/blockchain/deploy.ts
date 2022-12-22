/* Compile And Push To Eth Network */
import * as fs from 'fs';
import solc = require('solc');
import Web3 = require('web3');
import HDWalletProvider = require('@truffle/hdwallet-provider');

/* Account Info */
const privateKey = process.env.WALLET_PRIVATE_KEY; /* YOUR SEED PHRASE ... */

/* Chain RPC URL */
const providerOrUrl = process.env.CHAIN_RPC_URL; /* RINKEBY ENDPOINT */

const provider = new HDWalletProvider({
  privateKeys: [privateKey],
  providerOrUrl,
});
// @ts-ignore
const web3 = new Web3(provider);
const content = fs.readFileSync(
  __dirname + '/contracts/TicketBooth.sol',
  'utf8',
); /* PATH TO CONTRACT */

const input = {
  language: 'Solidity',
  sources: {
    'TicketBooth.sol': { content },
  },
  settings: {
    outputSelection: { '*': { '*': ['*'] } },
  },
};

const compiledContract = fs.readFileSync(
  __dirname + '/contracts/TicketBooth.json',
  'utf-8',
);

const deploy = async () => {
  /* 1. Get Ethereum Account */

  try {
    const [account] = await web3.eth.getAccounts();

    console.log(account);

    /* 2. Compile Smart Contract */
    const contract = JSON.parse(compiledContract);

    /* 2. Extract Abi And Bytecode From Contract */
    const abi = contract.abi;
    const bytecode = contract.bytecode;

    /* 3. Send Smart Contract To Blockchain */
    const { _address } = await new web3.eth.Contract(abi).deploy({
      data: bytecode,
      arguments: ['20', `${0.001 * 10 ** 18}`],
    });

    console.log('Contract Address =>', _address);
  } catch (err) {
    console.log(err);
  }
};

export default deploy;
