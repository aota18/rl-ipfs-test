import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers } from "ethers";

const useContract = () => {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const getContract = async (contractAddress, abi) => {
    const { ethereum } = window;
    if (!ethereum) return;

    if (isConnected) {
      await disconnectAsync();
    }

    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, abi, signer);

    return contract;
  };

  return { getContract };
};

export default useContract;
