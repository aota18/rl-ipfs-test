import {
  createStore,
  StateMachineProvider,
  useStateMachine,
} from "little-state-machine";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { updateSignupInfo } from "../pages/SignUp/updateAction";

createStore({});

export const SignUpProvider = ({ children }) => {
  const { connectAsync } = useConnect();
  const { isConnected, address } = useAccount();
  const { actions } = useStateMachine({ updateSignupInfo });

  const connectWallet = async () => {
    /* If wallet is already connected */
    if (isConnected) {
      actions.updateSignupInfo({
        walletAddr: address,
      });
      return;
    }
    /* Or Try to Connect */
    try {
      // enabling the web3 provider metamask
      const { account } = await connectAsync({
        connector: new InjectedConnector(),
      });

      actions.updateSignupInfo({
        walletAddr: account,
      });
      return;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return <Outlet />;
};
