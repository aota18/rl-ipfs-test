import React from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import { getEthEnsContract } from '../contracts/abi/ethEnsRegistry';
import namehash from 'eth-ens-namehash';
import { getEthNameWrapper } from '../contracts/abi/ethNameWrapper';
import { getBaseRegistrar } from '../contracts/abi/BaseRegistrar';
import { encodeName } from '../utils/string';
import { useNetwork } from 'wagmi';
import { getEthPublicResolver } from '../contracts/abi/ethPublicResolver';

//

const labelhash = (label) =>
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label));

const useEnsResolver = () => {
  const FULL_DOMAIN_STR = 'redletter.eth';
  const { chain } = useNetwork();
  const { ethereum } = window;

  const ENS_CONTRACT_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
  const BASE_CONTRACT_ADDRESS = '0x9C51161bA2FB02Cc0a403332B607117685f34831';
  const WRAPPER_CONTRACT_ADDRESS = '0xEe1F756aCde7E81B2D8cC6aB3c8A1E2cE6db0F39';
  const PUBLIC_RESOLVER_CONTRACT_ADDRESS =
    '0xE264d5bb84bA3b8061ADC38D3D76e6674aB91852';
  const REVERSE_REGISTRAR_CONTRACT_ADDRESS =
    '0x9a879320A9F7ad2BBb02063d67baF5551D6BD8B0';


  // Goerli Testnet
  // const ADMIN_WALLET_PRIV_KEY =
  //   'd9fa4bc52af06a8c2a7ef87f8d31b75e7963fe6bb04f8c6e4677590f1a69c1f1';
  // const ADMIN_WALLET_ADDR = '0xeB082F217C6922d497AB97B42AcBa3770Afff9Ee';

  // Mainnet
  const ADMIN_WALLET_PRIV_KEY =
  '4297dbaef46097b702c85450fed5a9e44bf99c1b4a99e446e37b9e34d3892bbf';
const ADMIN_WALLET_ADDR = '0x4db036918f786DF29871D15379507DB60A01Aac3';

  const provider = new ethers.providers.Web3Provider(ethereum);

  const getENSFromAddress = async (address) => {
    if (chain.network !== 'goerli' || chain.network !== 'ethereum') {
      return null;
    }
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
      const baseSubdomain = 'redletter.eth';

      const web3 = new Web3(
        new Web3.providers.HttpProvider('https://rpc.ankr.com/eth_goerli'),
      );

      web3.eth.accounts.wallet.add(ADMIN_WALLET_PRIV_KEY);

      const ens = getEthEnsContract(web3, ENS_CONTRACT_ADDRESS);
      const wrapper = getEthNameWrapper(web3, WRAPPER_CONTRACT_ADDRESS);
      const publicResolver = getEthPublicResolver(
        web3,
        PUBLIC_RESOLVER_CONTRACT_ADDRESS,
      );

      const NAMEHASH_FULL_DOMAIN = namehash.hash(FULL_DOMAIN_STR);
      let resolver = await ens.methods.resolver(NAMEHASH_FULL_DOMAIN).call();
      let SHA3_NEW_SUBDOMAIN_HASH = web3.utils.sha3(subdomain);

      const encodedSubdomain = encodeName('mno.redletter.eth');

      /* 
      TODO: Execute when wrapper contract is updated ! 
      */
      // await ens.methods
      //   .setApprovalForAll(WRAPPER_CONTRACT_ADDRESS, true)
      //   .send({ from: ADMIN_WALLET_ADDR })
      //   .once('transactionHash', printHash)
      //   .once('error', printError);

      let result = await ens.methods
        .setSubnodeRecord(
          namehash.hash(baseSubdomain),
          labelhash(subdomain),
          ADMIN_WALLET_ADDR,
          resolver,
          0,
        )
        .send({ from: ADMIN_WALLET_ADDR })
        .once('transactionHash', printHash)
        .once('error', printError);

      let setAddr = await publicResolver.methods
        .setAddr(namehash.hash(subdomain + '.' + baseSubdomain), 60, to)
        .send({ from: ADMIN_WALLET_ADDR })
        .once('transactionHash', printHash)
        .once('error', printError);

      let wrap = await wrapper.methods
        .wrap(encodeName(subdomain + '.' + baseSubdomain), to, resolver)
        .send({ from: ADMIN_WALLET_ADDR })
        .once('transactionHash', printHash)
        .once('error', printError);

      // await baseRegistrar.methods
      //   .addController(WRAPPER_CONTRACT_ADDRESS)
      //   .send({ from: ADMIN_WALLET_ADDR })
      //   .once('transactionHash', printHash)
      //   .once('error', printError);

      // await wrapper.methods
      //   .setController(ADMIN_WALLET_ADDR, true)
      //   .send({ from: ADMIN_WALLET_ADDR })
      //   .once('transactionHash', printHash)
      //   .once('error', printError);

      return result;
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
