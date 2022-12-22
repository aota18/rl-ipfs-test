import fs = require('fs');
import path = require('path');
import Web3 = require('web3');
import Contract = require('@truffle/contract');
import HDWalletProvider = require('@truffle/hdwallet-provider');

/* Account Info */
const privateKey = process.env.WALLET_PRIVATE_KEY; /* YOUR SEED PHRASE ... */
/* Chain RPC URL */
const providerOrUrl = process.env.CHAIN_RPC_URL; /* RINKEBY ENDPOINT */
/* Contract Address */
const contractAddress = process.env.NFT_CONTRACT_ADDRESS;

//@ts-ignore
const web3 = new Web3(new Web3.providers.HttpProvider(providerOrUrl));

const execute = async () => {
  const abiPath = path.resolve('src/blockchain/contracts/TicketBooth.json');
  const rawData = fs.readFileSync(abiPath, 'utf-8');
  const contractAbi = JSON.parse(rawData);

  const contract = Contract({ abi: contractAbi.abi });
  const provider = new HDWalletProvider(privateKey, providerOrUrl);

  contract.setProvider(provider);
  const contractInstance = await contract.at(contractAddress);

  const result = await contractInstance.totalTicketCount();
};

const getTicketsLeft = async (contractAddr) => {
  try{
    const abiPath = path.resolve('src/blockchain/contracts/TicketBooth.json');
    const rawData = fs.readFileSync(abiPath, 'utf-8');
    const contractAbi = JSON.parse(rawData);

    const contract = Contract({ abi: contractAbi.abi });
    const provider = new HDWalletProvider(privateKey, providerOrUrl);

    contract.setProvider(provider);
    const contractInstance = await contract.at(contractAddr);

    const result = await contractInstance.availableTicketCount();

    return result.words[0];
  }
  catch(error){
    return 0;
  }
};

export { execute, getTicketsLeft };
