import { Button } from "@windmill/react-ui";
import Error from "../../components/form/Error";
import InputArea from "../../components/form/InputArea";
import LabelArea from "../../components/form/LabelArea";
import SelectGender from "../../components/form/SelectGender";
import SelectMarried from "../../components/form/SelectMarried";
import SelectNationality from "../../components/form/SelectNationality";
import useSignupSubmit from "../../hooks/useSignupSubmit";
import ProfileImgUploader from "../../components/profile-img-uploader/ProfileImgUploader";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateSignupInfo } from "./updateAction";
import { useEffect, useState } from "react";
import DatePicker from "../../components/form/DatePicker";
import useQuery from "../../hooks/useQuery";
import PageTitle from "../../components/page-title/PageTitle";
import { Controller } from "react-hook-form";
import "react-day-picker/dist/style.css";
import { notifyError } from "../../utils/toast";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import AuthServices from "../../services/AuthServices";

const PersonalInfo = () => {
  const { isConnected, account } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const query = useQuery();

  const { actions, state } = useStateMachine({ updateSignupInfo });

  const { register, handleSubmit, errors, loading, control } =
    useSignupSubmit(state);

  const [married, setMarried] = useState(state.signupInfo?.married);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    actions.updateSignupInfo(data);
    navigate(`/signup/set-location?step=4`);
  };

  const connectWallet = async () => {
    try {
      if (isConnected) {
        await disconnectAsync();
      }

      // enabling the web3 provider metamask
      const { account, chain } = await connectAsync({
        connector: new InjectedConnector(),
      });

      const user = await AuthServices.hasAccount(account);

      /* If user already has an account, go to login page */
      if (user && !user.isGuest) {
        notifyError("You already have an acccount!");
        navigate("/", { replace: true });
      }

      /* If user doesn't have an account at all, create new guest account */
      // if (!user) {
      //   const result = await AuthServices.signupGuest(account);
      //   console.log(result);
      // }
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="p-4">
      {/* {JSON.stringify(signupInfo)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-8">
            <PageTitle text="Sign Up" />
          </div>
          <div className="col-span-8">
            <img
              src={`/step4-${query.get("step")}.svg`}
              alt={`step-${query.get("step")}`}
            />
          </div>
          <div className="col-span-8 my-2">
            <Controller
              control={control}
              name="profileImg"
              render={({ field: { onChange } }) => (
                <ProfileImgUploader
                  onChange={onChange}
                  isNew={true}
                  defaultValues={state.event?.profileImg || null}
                  type="form"
                />
              )}
            />

            <Error errorName={errors.profileImg} />
          </div>
          <div className="col-span-4">
            <InputArea
              register={register}
              name="firstName"
              label="First name"
              type="text"
              placeholder="First Name"
            />

            <Error errorName={errors.firstname} />
          </div>
          <div className="col-span-4">
            <InputArea
              register={register}
              name="lastName"
              label="Last name"
              type="text"
              placeholder="Last Name"
            />

            <Error errorName={errors.lastname} />
          </div>
          <div className="col-span-8">
            <SelectGender
              register={register}
              required={false}
              label="Gender"
              name="gender"
            />
            <Error errorName={errors.gender} />
          </div>
          <div className="col-span-8">
            <SelectNationality
              register={register}
              required={false}
              label="Nationality"
              name="nationality"
            />
            <Error errorName={errors.nationality} />
          </div>

          <div className="col-span-8 space-y-2 my-2">
            <LabelArea label="Date of Birth" />

            <Controller
              control={control}
              name="birthday"
              // rules={{ required: "Birthday is required!" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker onChange={onChange} selected={value} />
              )}
            />
            <Error errorName={errors.birthday} />
          </div>

          {/* <LabelArea label="Optional" />

          <div className="col-span-8">
            <InputArea
              register={register}
              name="companyAddress1"
              required={false}
              type="text"
              placeholder="Company Street address or P.O. Box"
            />
            <Error errorName={errors.companyAddress1} />
          </div>
          <div className="col-span-8">
            <InputArea
              register={register}
              name="companyAddress2"
              required={false}
              type="text"
              placeholder="Apt, Suite, Unit, Building"
            />
            <Error errorName={errors.companyAddress2} />
          </div> */}

          <div className="col-span-1 flex justify-center items-center">
            <img src="twitter.svg" alt="twitter" />
          </div>

          <div className="col-span-7">
            <InputArea
              register={register}
              name="twitterHandle"
              required={false}
              type="text"
              placeholder="Twitter Handle"
            />
            <Error errorName={errors.twitterHandle} />
          </div>

          <div className="col-span-8 space-y-2 my-2">
            <LabelArea label="I am Married" />
            <SelectMarried
              setMarried={setMarried}
              register={register}
              label="Marriage choice"
              required={false}
              name="married"
            />
            <Error errorName={errors.married} />
          </div>

          {married === "YES" ? (
            <div className="col-span-8 space-y-2">
              <LabelArea label="Date of Marriage" />

              <Controller
                control={control}
                name="marriageDt"
                // rules={{ required: "Marriage Date is required!" }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker onChange={onChange} selected={value} />
                )}
              />
              <Error errorName={errors.marriageDt} />
            </div>
          ) : (
            <></>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-4 h-12 w-full"
          block
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfo;
