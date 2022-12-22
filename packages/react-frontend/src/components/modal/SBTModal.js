import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

import { SidebarContext } from "../../context/SidebarContext";
import moment from "moment";
import SbtServices from "../../services/SbtServices";
import SBT from "../../contracts/SoulBoundToken.json";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers } from "ethers";
import { notifyError } from "../../utils/toast";

const SBTModal = ({ sbt }) => {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const { isModalOpen, closeModal } = useContext(SidebarContext);

  const onClickBurnBtn = async (tokenId, id) => {
    try {
      // Burn SBT
      const { ethereum } = window;

      // Check if ethereum exists
      if (!ethereum) return;

      // Check if wallet is connected
      if (isConnected) {
        await disconnectAsync();
      }

      // Enabling the web3 provider metamask
      const { account, chain } = await connectAsync({
        connector: new InjectedConnector(),
      });

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        process.env.REACT_APP_SBT_CONTRACT_ADDRESS,
        SBT.abi,
        signer
      );

      const mintTxn = await contract.burn(tokenId);

      if (mintTxn) {
        const result = await SbtServices.burnSbt({ id });
      } else {
        throw new Error("Cannot burn SBT");
      }
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };
  return (
    <>
      {sbt && (
        <Modal isOpen={isModalOpen.sbt} onClose={() => closeModal("sbt")}>
          <ModalBody className="text-center custom-modal px-2 pt-4 ">
            <div className="flex flex-col items-center space-y-2">
              <img
                src={sbt.imgUrl}
                className="rounded-full w-20 h-20"
                alt="sbt"
              />
              <h2 className="text-black text-lg  mb-1">{sbt.name}</h2>
              <span className="text-gray-500 text-md  mb-1">
                Received on {moment(sbt.updatedAt).format("MMM. DD, YYYY")}
              </span>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            <Button
              layout="primary"
              className="w-full sm:w-auto"
              onClick={() => onClickBurnBtn(sbt.tokenId, sbt.id)}
            >
              Burn
            </Button>

            <Button
              className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
              layout="outline"
              onClick={() => closeModal("ticket")}
            >
              Share
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default React.memo(SBTModal);
