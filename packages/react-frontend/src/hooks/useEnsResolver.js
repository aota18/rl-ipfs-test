import React from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { getEthEnsContract } from '../contracts/abi/ethEnsRegistry';
import namehash from 'eth-ens-namehash';
import { getEthNameWrapper } from '../contracts/abi/ethNameWrapper';
import { getBaseRegistrar } from '../contracts/abi/BaseRegistrar';
import { encodeName } from '../utils/string';

const useEnsResolver = () => {
  const FULL_DOMAIN_STR = 'redletter.eth';
  const { ethereum } = window;

  const ENS_CONTRACT_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
  const BASE_CONTRACT_ADDRESS = '0x9C51161bA2FB02Cc0a403332B607117685f34831';
  const WRAPPER_CONTRACT_ADDRESS = '0x582224b8d4534F4749EFA4f22eF7241E0C56D4B8';

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
    console.log('Transaction hash : ' + hash);
  }

  function printError(err) {
    console.log('Error : ' + JSON.stringify(err));
  }

  const createSubdomain = async (subdomain, to) => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli'),
    );

    web3.eth.accounts.wallet.add(process.env.REACT_APP_ADMIN_WALLET_PRIV_KEY);

    const ens = getEthEnsContract(web3, ENS_CONTRACT_ADDRESS);
    const wrapper = getEthNameWrapper(web3, WRAPPER_CONTRACT_ADDRESS);

    const NAMEHASH_FULL_DOMAIN = namehash.hash(FULL_DOMAIN_STR);
    let resolver = await ens.methods.resolver(NAMEHASH_FULL_DOMAIN).call();
    let SHA3_NEW_SUBDOMAIN_HASH = web3.utils.sha3(subdomain); //ex : mario

    let result = await ens.methods
      .setSubnodeRecord(
        NAMEHASH_FULL_DOMAIN,
        SHA3_NEW_SUBDOMAIN_HASH,
        to,
        resolver,
        0,
      )
      .send({ from: process.env.REACT_APP_ADMIN_WALLET_ADDR })
      .once('transactionHash', printHash)
      .once('error', printError);

    return result;
  };

  const wrapSubdomain = async (subdomain, to) => {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli'),
      );

      web3.eth.accounts.wallet.add(ADMIN_WALLET_PRIV_KEY);

      const ens = getEthEnsContract(web3, ENS_CONTRACT_ADDRESS);
      const wrapper = getEthNameWrapper(web3, WRAPPER_CONTRACT_ADDRESS);

      const NAMEHASH_FULL_DOMAIN = namehash.hash(FULL_DOMAIN_STR);
      let resolver = await ens.methods.resolver(NAMEHASH_FULL_DOMAIN).call();
      let SHA3_NEW_SUBDOMAIN_HASH = web3.utils.sha3(subdomain);

      const encodedSubdomain = encodeName('kkk.redletter.eth');

      let wrap = await wrapper.methods
        .wrap(encodedSubdomain, to, resolver)
        .send({ from: ADMIN_WALLET_ADDR })
        .once('transactionHash', printHash)
        .once('error', printError);

      return wrap;
    } catch (err) {
      console.log(err);
    }
  };

  const createSubdomain_NameWrapper = async (subdomain, to) => {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli'),
      );

      web3.eth.accounts.wallet.add(ADMIN_WALLET_PRIV_KEY);

      const ens = getEthEnsContract(web3, ENS_CONTRACT_ADDRESS);
      const wrapper = getEthNameWrapper(web3, WRAPPER_CONTRACT_ADDRESS);

      const NAMEHASH_FULL_DOMAIN = namehash.hash(FULL_DOMAIN_STR);
      let resolver = await ens.methods.resolver(NAMEHASH_FULL_DOMAIN).call();

      let SHA3_NEW_SUBDOMAIN_HASH = web3.utils.sha3(subdomain); //ex : mario

      let result = await wrapper.methods
        .setSubnodeRecord(
          NAMEHASH_FULL_DOMAIN,
          SHA3_NEW_SUBDOMAIN_HASH,
          to,
          resolver,
          0,
        )
        .send({ from: ADMIN_WALLET_ADDR })
        .once('transactionHash', printHash)
        .once('error', printError);

      console.log('===CHECK1====', result);

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const ADMIN_WALLET_PRIV_KEY =
    'd9fa4bc52af06a8c2a7ef87f8d31b75e7963fe6bb04f8c6e4677590f1a69c1f1';
  const ADMIN_WALLET_ADDR = '0xeB082F217C6922d497AB97B42AcBa3770Afff9Ee';

  const registerAndWrap = async (subdomain, to, duration) => {
    try {
      const web3 = new Web3(
        new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli'),
      );

      web3.eth.accounts.wallet.add(ADMIN_WALLET_PRIV_KEY);

      console.log(web3.eth.accounts);

      const ens = getEthEnsContract(web3, ENS_CONTRACT_ADDRESS);
      const baseRegistrar = getBaseRegistrar(web3, BASE_CONTRACT_ADDRESS);
      const wrapper = getEthNameWrapper(web3, WRAPPER_CONTRACT_ADDRESS);

      const NAMEHASH_FULL_DOMAIN = namehash.hash(FULL_DOMAIN_STR);
      let resolver = await ens.methods.resolver(NAMEHASH_FULL_DOMAIN).call();
      let SHA3_NEW_SUBDOMAIN_HASH = web3.utils.sha3(subdomain); //ex : mario

      console.log('===CHECK0====', SHA3_NEW_SUBDOMAIN_HASH, to, duration);

      // Set Namewrapper Controller
      console.log('===SET Approval For All===', ADMIN_WALLET_ADDR);
      let setApprovalForAllResult = await wrapper.methods
        .ownerOf(WRAPPER_CONTRACT_ADDRESS)
        .send({ from: ADMIN_WALLET_ADDR })
        .once('transactionHash', printHash)
        .once('error', printError);

      // console.log('===SET CONTROLLER===', ADMIN_WALLET_ADDR);
      // let setControllerResult = await wrapper.methods
      //   .setController(ADMIN_WALLET_ADDR, ADMIN_WALLET_ADDR)
      //   .send({ from: ADMIN_WALLET_ADDR })
      //   .once('transactionHash', printHash)
      //   .once('error', printError);

      // let result = await wrapper.methods
      //   .registerAndWrapETH2LD('akuns', to, duration, resolver, 65536, 0)
      //   .send({ from: ADMIN_WALLET_ADDR })
      //   .once('transactionHash', printHash)
      //   .once('error', printError);

      return setApprovalForAllResult;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getENSFromAddress,
    getAddressfromENS,
    createSubdomain,
    wrapSubdomain,
    createSubdomain_NameWrapper,
    registerAndWrap,
  };
};

export default useEnsResolver;
