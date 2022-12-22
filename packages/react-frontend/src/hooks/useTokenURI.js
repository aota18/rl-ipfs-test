import Moralis from "moralis";
import React from "react";

const useTokenURI = () => {
  const getTokenURI = async (objToEncode, abiPath) => {
    const encodedURI = btoa(JSON.stringify(objToEncode));

    await Moralis.start({
      apiKey: process.env.REACT_APP_MORALIS_API_KEY,
    });

    const abi = [
      {
        path: abiPath,
        content: encodedURI,
      },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi,
    });

    return response.data[0].path;
  };

  return { getTokenURI };
};

export default useTokenURI;
