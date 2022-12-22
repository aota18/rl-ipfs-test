import React, { useContext, useState } from "react";
import Uploader from "../../components/image-uploader/Uploader";
import useSignupSubmit from "../../hooks/useSignupSubmit";
import { useNavigate, useRouteMatch } from "react-router-dom";
import { updateSignupInfo } from "./updateAction";

import { useStateMachine } from "little-state-machine";
import { Button } from "@windmill/react-ui";
import { getStepFromUrl } from "../../utils/url";
import useQuery from "../../hooks/useQuery";
import HeaderNavigator from "../../components/header-navigator/HeaderNavigator";
import { notifyError, notifySuccess } from "../../utils/toast";
import SBT from "../../contracts/SoulBoundToken.json";
import { ethers } from "ethers";
import Moralis from "moralis";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import SbtServices from "../../services/SbtServices";
import AuthServices from "../../services/AuthServices";
import { InjectedConnector } from "wagmi/connectors/injected";

const sbtDefaultImgURL =
  "https://redletter-storage.s3.us-west-2.amazonaws.com/111022_SBT.jpeg";

const MintSBT = () => {
  const query = useQuery();
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const { actions, state } = useStateMachine({ updateSignupInfo });

  const { handleSubmit, getValues } = useSignupSubmit(state);

  const navigate = useNavigate();

  const [imgUrl, setImgUrl] = useState(null);

  const [mintTxnLoading, setMintTxnLoading] = useState(false);
  const [minted, setMinted] = useState(false);

  const onSubmit = (data) => {
    actions.updateSignupInfo(data);
    navigate(`/signup/ens-subdomain?step=${parseInt(query.get("step")) + 1}`);
  };

  const getTokenURI = async () => {
    const objToEncode = {
      name: `RedLetter Signup SBT`,
      description: `RedLetter Signup SBT`,
      image: sbtDefaultImgURL,
    };

    const encodedURI = btoa(JSON.stringify(objToEncode));

    await Moralis.start({
      apiKey: process.env.REACT_APP_MORALIS_API_KEY,
    });

    const abi = [
      {
        path: `rl/sbt`,
        content: encodedURI,
      },
    ];

    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi,
    });

    return response.data[0].path;
  };

  const mintSBT = async () => {
    try {
      setMintTxnLoading(true);

      const { ethereum } = window;

      if (!ethereum) return;

      if (isConnected) {
        await disconnectAsync();
      }

      // enabling the web3 provider metamask
      const { account, chain } = await connectAsync({
        connector: new InjectedConnector(),
      });

      const user = await AuthServices.hasAccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        process.env.REACT_APP_SBT_CONTRACT_ADDRESS,
        SBT.abi,
        signer
      );

      const tokenURI = getTokenURI();

      const mintTxn = await contract.safeMint(account, tokenURI);

      let receipt = await mintTxn.wait(2);

      let event = receipt.events.pop();

      const tokenId = parseInt(event.data, 16);

      if (!tokenId) {
        throw new Error("Cannot mint your SBT on Chain!");
      }

      const result = await SbtServices.createSbt({
        name: "RedLetter Signup SBT",
        imgUrl: sbtDefaultImgURL,
        userId: user.id,
        tokenId,
      });

      if (result.status !== 200) {
        throw new Error(result.message);
      }

      // notifySuccess(result.message);

      setMintTxnLoading(false);
      setMinted(true);
    } catch (err) {
      console.log(err);
      notifyError(err.message);
      setMintTxnLoading(false);
    }
  };

  return (
    <div className="p-4">
      <HeaderNavigator back />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="mb-4">
            <img src={`/step4-${query.get("step")}.svg`} />
          </div>

          <div className="text-2xl font-bold mb-2">
            Hi, {state.signupInfo && state.signupInfo.firstName}
          </div>

          <div className="text-lg font-light text-gray-600">
            Welcome to RedLetter.
            <br />
            Mint your first SBT below.
          </div>

          <div className="flex flex-col items-center my-8 space-y-6">
            <div>
              <Uploader imageUrl={imgUrl} setImageUrl={setImgUrl} />
            </div>

            <div className="text-md font-bold my-2 text-center">
              RedLetter <br />
              Signup SBT
            </div>

            <Button
              onClick={mintSBT}
              disabled={mintTxnLoading || minted}
              className="w-20 px-4 py-2 h-8 text-white bg-secondary border-none"
              block
            >
              {minted ? "Minted" : mintTxnLoading ? "Minting..." : "Mint"}
            </Button>

            <Button
              type="submit"
              disabled={mintTxnLoading}
              className="mt-4 h-12 w-full"
              block
            >
              Next
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MintSBT;
