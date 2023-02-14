import React, { useContext, useState } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from '@windmill/react-ui';

import { SidebarContext } from '../../context/SidebarContext';
import moment from 'moment';
import SbtServices from '../../services/SbtServices';
import SBT from '../../contracts/SoulBoundToken.json';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { ethers } from 'ethers';
import { notifyError, notifySuccess } from '../../utils/toast';
import Moralis from 'moralis';
import {
  REACT_APP_MORALIS_API_KEY,
  REACT_APP_SBT_CONTRACT_ADDRESS,
} from '../../utils/env';

const SBTModal = ({ sbt }) => {
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const [loading, setLoading] = useState(false);

  const { isModalOpen, closeModal } = useContext(SidebarContext);

  const onClickBurnBtn = async (tokenId, id) => {
    try {
      setLoading(true);
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
        signer,
      );

      const mintTxn = await contract.burn(tokenId);

      if (mintTxn) {
        const result = await SbtServices.burnSbt({ id });
      } else {
        throw new Error('Cannot burn SBT');
      }
      setLoading(false);
      notifySuccess('SBT was successfully burned!');
    } catch (err) {
      console.log(err);
      notifyError(err.message);
      setLoading(false);
    }
  };

  const getTokenURI = async (obj) => {
    const encodedURI = btoa(JSON.stringify(obj));

    await Moralis.start({
      apiKey: REACT_APP_MORALIS_API_KEY,
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

  const onClickMintBtn = async () => {
    try {
      setLoading(true);
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
        REACT_APP_SBT_CONTRACT_ADDRESS,
        SBT.abi,
        signer,
      );

      const tokenURI = getTokenURI();

      const mintTxn = await contract.safeMint(account, tokenURI);

      let receipt = await mintTxn.wait(2);

      let event = receipt.events.pop();

      const tokenId = parseInt(event.data, 16);

      if (!tokenId) {
        throw new Error('Cannot mint your SBT on Chain!');
      }

      const result = await SbtServices.mintSbt({ id: sbt.id, tokenId });

      setLoading(false);
      notifySuccess('Minted Successfully!');

      closeModal('sbt');
    } catch (err) {
      console.log(err);
      notifyError(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      {sbt && (
        <Modal isOpen={isModalOpen.sbt} onClose={() => closeModal('sbt')}>
          <ModalBody className="text-center custom-modal px-2 pt-4 ">
            <div className="flex flex-col items-center space-y-2">
              <img
                src={sbt.imgUrl}
                className="rounded-full w-20 h-20"
                alt="sbt"
              />
              <h2 className="text-black text-lg  mb-1">{sbt.name}</h2>
              <span className="text-gray-500 text-md  mb-1">
                Received on {moment(sbt.updatedAt).format('MMM. DD, YYYY')}
              </span>
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-center">
            {sbt.status === 'CREATED' ? (
              <Button
                layout="primary"
                className="w-full sm:w-auto"
                onClick={() => onClickMintBtn()}
                disabled={loading}
              >
                {loading ? 'Wait...' : 'Mint'}
              </Button>
            ) : (
              <Button
                layout="primary"
                className="w-full sm:w-auto"
                onClick={() => onClickBurnBtn(sbt.tokenId, sbt.id)}
                disabled={loading}
              >
                {loading ? 'Wait...' : 'Burn'}
              </Button>
            )}

            <Button
              className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
              layout="outline"
              onClick={() => closeModal('ticket')}
              disabled={loading}
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
