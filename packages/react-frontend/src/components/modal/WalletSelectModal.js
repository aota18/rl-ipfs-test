import React, { useContext } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { mainnet, goerli } from "wagmi/chains";
import { SidebarContext } from "../../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import AuthServices from "../../services/AuthServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import Cookies from "js-cookie";
import { AdminContext } from "../../context/AdminContext";

const WALLET_TYPE = {
  metamask: "META_MASK",
  walletConnect: "WALLET_CONNECT",
};

const WalletSelectModal = () => {
  const { dispatch } = useContext(AdminContext);
  const { connectAsync } = useConnect();

  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // const { isConnected } = useAccount();

  const navigate = useNavigate();

  const { isModalOpen, closeModal } = useContext(SidebarContext);

  const handleAuth = async (walletType) => {
    const cookieTimeOut = 0.5;
    // Disconnects the web3 provider if it's already active

    try {
      if (isConnected) {
        await disconnectAsync();
      }

      /* enabling the web3 provider metamask */
      const { account, chain } = await connectAsync({
        connector:
          walletType === WALLET_TYPE.metamask
            ? new MetaMaskConnector()
            : new WalletConnectConnector({
                chains: [mainnet, goerli],
                options: {
                  qrcode: true,
                },
              }),
      });

      console.log(account, chain);
      /* REMIND: This flow exactly used in after singup */
      /* login */
      let { msg, user } = await AuthServices.login({
        account,
        chain,
        network: "evm",
      });

      const signature = await signMessageAsync({ message: msg.message });

      const res = await AuthServices.authorize({
        message: msg.message,
        signature,
      });

      user = {
        ...user,
        token: res.accessToken,
      };

      /* Store userinfo into cookie */
      Cookies.set("user", JSON.stringify(user), {
        expires: cookieTimeOut,
      });

      /* Store token to react memory */
      dispatch({ type: "USER_LOGIN", payload: user });

      /* END REMIND

      notifySuccess("Login Success!");

      /* Move to Home */
      navigate("/", { replace: true });

      closeModal("walletSelect");
    } catch (err) {
      notifyError(err.message);
    }

    // Authorize
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen.walletSelect}
        onClose={() => closeModal("walletSelect")}
      >
        <ModalBody className="text-center custom-modal px-4 pb-4"></ModalBody>
        <h2 className="text-center text-xl font-medium mb-4">
          Select your wallet to connect
        </h2>
        <div className="flex flex-col space-y-2">
          <Button onClick={() => handleAuth(WALLET_TYPE.metamask)}>
            Connect via Metamask
          </Button>
          <Button onClick={() => handleAuth(WALLET_TYPE.walletConnect)}>
            Connect via WalletConnect
          </Button>
        </div>

        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={() => closeModal("walletSelect")}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(WalletSelectModal);
