import React from "react";
import ENSAddress from "@ensdomains/react-ens-address";

const EnsAddress = () => {
  return <ENSAddress provider={window.web3 || window.ethereum} />;
};

export default EnsAddress;
