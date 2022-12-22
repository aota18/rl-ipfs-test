import { Button } from "@windmill/react-ui";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import useToggleDrawer from "../../../hooks/useToggleDrawer";

const Navbar = () => {
  const { handleModalOpen } = useToggleDrawer();

  let publicUrl = process.env.PUBLIC_URL + "/";
  let imgattr = "logo";
  let anchor = "#";
  return (
    <div className="flex justify-between items-center my-4">
      <a href={anchor} className="logo">
        <img
          style={{ width: "40px" }}
          src={publicUrl + "img/logo-redletter.svg"}
          alt={imgattr}
        />
      </a>

      <div className="flex flex-col justify-center items-center">
        <Button
          onClick={() => handleModalOpen("walletSelect")}
          disabled={false}
          className="h-12 w-auto bg-redletter"
        >
          Connect Wallet
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
