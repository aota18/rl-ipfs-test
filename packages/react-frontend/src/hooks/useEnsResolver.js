import React from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import { getEthEnsContract } from "../contracts/abi/ethEnsRegistry";
import namehash from "eth-ens-namehash";

const useEnsResolver = () => {
  const FULL_DOMAIN_STR = "redletter.eth";
  const { ethereum } = window;

  const ENS_CONTRACT_ADDRESS = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";

  const provider = new ethers.providers.Web3Provider(ethereum);

  const getENSFromAddress = async (address) => {
    // Reverse Resolution
    const ens = await provider.lookupAddress(address);
    return ens;
  };

  const getAddressfromENS = async (ens) => {
    const address = await provider.resolveName(ens);

    return address;
  };

  function printHash(hash) {
    console.log("Transaction hash : " + hash);
  }

  function printError(err) {
    console.log("Error : " + JSON.stringify(err));
  }

  const createSubdomain = async (subdomain, to) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://rpc.ankr.com/eth_goerli")
    );

    web3.eth.accounts.wallet.add(process.env.REACT_APP_ADMIN_WALLET_PRIV_KEY);

    const ens = getEthEnsContract(web3, ENS_CONTRACT_ADDRESS);

    const NAMEHASH_FULL_DOMAIN = namehash.hash(FULL_DOMAIN_STR);
    let resolver = await ens.methods.resolver(NAMEHASH_FULL_DOMAIN).call();
    let SHA3_NEW_SUBDOMAIN_HASH = web3.utils.sha3(subdomain); //ex : mario

    let result = await ens.methods
      .setSubnodeRecord(
        NAMEHASH_FULL_DOMAIN,
        SHA3_NEW_SUBDOMAIN_HASH,
        to,
        resolver,
        0
      )
      .send({ from: process.env.REACT_APP_ADMIN_WALLET_ADDR })
      .once("transactionHash", printHash)
      .once("error", printError);

    return result;
  };

  return { getENSFromAddress, getAddressfromENS, createSubdomain };
};

export default useEnsResolver;
