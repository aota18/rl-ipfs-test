import React from "react";
import { Button } from "@windmill/react-ui";
import WalletSelectModal from "../components/modal/WalletSelectModal";
import useToggleDrawer from "../hooks/useToggleDrawer";
import { Link, Outlet } from "react-router-dom";

const Connect = () => {
  const { handleModalOpen } = useToggleDrawer();

  return (
    <>
      <WalletSelectModal />
      <div className="flex flex-col min-w-screen items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <main className="grow flex flex-col items-center justify-center p-6 sm:p-12 ">
          <img src="/red-letter-logo.svg" alt="logo" />
          <div className="dark:text-gray-200 font-bold">RedLetter</div>
        </main>

        <div className="flex flex-col w-full">
          <Button
            onClick={() => handleModalOpen("walletSelect")}
            disabled={false}
            className="mt-4 h-12 w-full"
          >
            Connect Wallet
          </Button>
          <Link to="/signup?step=1">
            <Button
              onClick={() => console.log("signup")}
              disabled={false}
              className="mt-4 h-12 w-full"
            >
              Sign Up
            </Button>
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Connect;
