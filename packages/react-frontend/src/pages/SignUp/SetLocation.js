import { Button } from "@windmill/react-ui";
import Cookies from "js-cookie";
import { useStateMachine } from "little-state-machine";
import moment from "moment";
import React, { useContext, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSignMessage } from "wagmi";
import { AdminContext } from "../../context/AdminContext";
import useQuery from "../../hooks/useQuery";
import useSignupSubmit from "../../hooks/useSignupSubmit";
import AuthServices from "../../services/AuthServices";
import { notifyError, notifySuccess } from "../../utils/toast";
import { updateSignupInfo, clearSignupInfo } from "./updateAction";

const SetLocation = () => {
  const chain = {
    id: 5,
    unsupported: false,
  };
  const cookieTimeOut = 0.5;

  const { signMessageAsync } = useSignMessage();

  const {
    state: {
      user: { address },
    },
    dispatch,
  } = useContext(AdminContext);
  const query = useQuery();

  const [signupTxnLoading, setSignupTxnLoading] = useState(false);

  const { actions, state } = useStateMachine({
    updateSignupInfo,
    clearSignupInfo,
  });

  const { handleSubmit, loading } = useSignupSubmit(state);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    actions.updateSignupInfo(data);

    try {
      setSignupTxnLoading(true);
      const signupInput = createSignupInput(state.signupInfo);

      // for (const key of signupInput.keys()) {
      //   console.log(key + ": " + signupInput.get(key));
      // }
      const result = await AuthServices.signup(signupInput);

      /* Authorize */
      let { msg, user } = await AuthServices.login({
        account: address,
        chain: chain,
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

      /* Authorize END */

      setSignupTxnLoading(false);

      notifySuccess("Register Success!");

      /* Clear Event Form */
      actions.clearSignupInfo();

      navigate("/profile", { replace: true });
    } catch (err) {
      console.log(err);
      notifyError(`Error : ${err}`);
      setSignupTxnLoading(false);
    }
  };

  const createSignupInput = (obj) => {
    console.log(obj);
    let signUpInputObj = {};

    /* Date */
    if ("birthday" in obj) {
      signUpInputObj.birthday = moment(obj.birthday).unix();
    }

    if ("marriageDt" in obj) {
      signUpInputObj.marriageDt = moment(obj.marriageDt).unix();
    }

    if ("walletAddr" in obj) {
      signUpInputObj.walletAddr = obj.walletAddr;
    }

    if ("ens" in obj) {
      signUpInputObj.ens = obj.ens;
    }

    if ("firstName" in obj) {
      signUpInputObj.firstName = obj.firstName;
    }

    if ("lastName" in obj) {
      signUpInputObj.lastName = obj.lastName;
    }

    if ("nationality" in obj) {
      signUpInputObj.nationality = obj.nationality;
    }

    if ("gender" in obj) {
      signUpInputObj.gender = obj.gender;
    }

    if ("married" in obj) {
      signUpInputObj.married = obj.married;
    }

    if ("companyAddress1" in obj) {
      signUpInputObj.companyAddress1 = obj.companyAddress1;
    }

    if ("companyAddress2" in obj) {
      signUpInputObj.companyAddress2 = obj.companyAddress2;
    }

    if ("twitterHandle" in obj) {
      signUpInputObj.twitterHandle = obj.twitterHandle;
    }

    /* Create Into Form Object */

    let formObj = new FormData();

    Object.keys(signUpInputObj).forEach((key, idx) => {
      formObj.append(key, signUpInputObj[key]);
    });

    /* Image */
    if ("profileImg" in obj && obj.profileImg !== undefined) {
      formObj.append("profileImg", obj.profileImg);
    }

    return formObj;
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-8">
          <div className="">
            <img src={`/step4-${query.get("step")}.svg`} alt="img" />
          </div>

          <div>
            <img src="/location.svg" alt="location" />
          </div>

          <div className="text-4xl font-bold tracking-tight">
            Hello, nice to meet you!
          </div>

          {/* <div className="text-lg mb-4 font-light text-gray-600">
            Set your location to start find the best event around you
          </div>

          <Button
            iconLeft={FaLocationArrow}
            onClick={() => console.log("Use current location")}
            disabled={loading}
            className="mt-4 h-12 w-full"
            block
          >
            Use current location
          </Button>

          <Button
            layout="link"
            onClick={() => console.log("manual location")}
            disabled={loading}
            className="mt-4 h-12 w-full"
            block
          >
            or set your location manually
          </Button> */}

          <Button
            type="submit"
            disabled={signupTxnLoading}
            className="mt-4 h-12 w-full"
            block
          >
            Signup
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetLocation;
