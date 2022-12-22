import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "react-day-picker/dist/style.css";
import PersonalInfo from "./SignUp/PersonalInfo";
import MintSBT from "./SignUp/MintSBT";
import EnsSubdomain from "./SignUp/EnsSubdomain";
import SetLocation from "./SignUp/SetLocation";
import { createStore, useStateMachine } from "little-state-machine";
import Main from "../layout/Main";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

/**
 * SIGNUP STEPS
 *
 * STEP 1: Personal Info
 * STEP 2: Mint SBT
 * STEP 3: ENS SubDomain
 * STEP 4: SetLocation
 *
 */

const SignUp = () => {
  return (
    <>
      <nav>
        <ul className="flex space-x-2">
          <li>
            <Link to={`?step=1`}>PersonalInfo</Link>
          </li>
          <li>
            <Link to={`/mint-sbt?step=2`}>Mint SBT</Link>
          </li>
          <li>
            <Link to={`/ens-subdomain?step=3`}>ENS</Link>
          </li>
          <li>
            <Link to={`/set-location?step=4`}>SetLoc</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SignUp;
