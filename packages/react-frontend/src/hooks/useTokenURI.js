import Moralis from 'moralis';
import React from 'react';

const MORALIS_API_KEY =
  '5ypDxqSS2fSeXXzNoaCSx3Ngzcc8ZCYRRqh7ZQYHm30GZEGLJNiEuYbhoawmPHGH';

const useTokenURI = () => {
  const getTokenURI = async (objToEncode, abiPath) => {
    const encodedURI = btoa(JSON.stringify(objToEncode));

    await Moralis.start({
      apiKey: MORALIS_API_KEY,
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
