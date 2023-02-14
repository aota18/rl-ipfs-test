import { ethers } from 'ethers';
import { useNetwork } from 'wagmi';
import Web3 from 'web3';
import { getBaseGreeting } from '../contracts/abi/GreetingCard';
import blockchain from '../data/data.json';
import chainData from '../data/chain.json';
import contractsData from '../data/contracts.json';
import { notifyError } from '../utils/toast';

const useGreeting = () => {
  const { chain } = useNetwork();

  function printHash(hash) {
    console.log('Transaction hash : ' + hash);
  }

  function printError(err) {
    console.log('Error : ' + JSON.stringify(err));
  }

  const createFreeGreeting = async (to, uri) => {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider(chainData[chain.id].rpc), //polygon
      );

      web3.eth.accounts.wallet.add(blockchain.wallets.admin.privateKey);

      // const greeting = getBaseGreeting(web3, ETH_GREETING_CONTRACT_ADDRESS);
      const greeting = getBaseGreeting(
        web3,
        contractsData.greetingCard[chain.id],
      );

      let result = await greeting.methods
        .safeMint(to, uri)
        .send({ from: blockchain.wallets.admin.address })
        .once('transactionHash', printHash)
        .once('error', printError);

      return result;
    } catch (err) {
      notifyError(err.message);
      console.log(err);
    }
  };

  return { createFreeGreeting };
};

export default useGreeting;
