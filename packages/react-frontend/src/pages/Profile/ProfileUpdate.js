import { Button } from "@windmill/react-ui";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "../../components/form/DatePicker";
import Error from "../../components/form/Error";
import InputArea from "../../components/form/InputArea";
import LabelArea from "../../components/form/LabelArea";
import SelectGender from "../../components/form/SelectGender";
import SelectMarried from "../../components/form/SelectMarried";
import SelectNationality from "../../components/form/SelectNationality";
import HeaderNavigator from "../../components/header-navigator/HeaderNavigator";
import ActionModal from "../../components/modal/ActionModal";
import PageTitle from "../../components/page-title/PageTitle";
import ProfileImgUploader from "../../components/profile-img-uploader/ProfileImgUploader";
import { AdminContext } from "../../context/AdminContext";
import useAsync from "../../hooks/useAsync";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import AuthServices from "../../services/AuthServices";
import UserServices from "../../services/UserServices";
import { notifyError, notifySuccess } from "../../utils/toast";

const ProfileUpdate = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AdminContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const [married, setMarried] = useState();

  const onSubmit = (data) => {
    if ("birthday" in data) {
      // If it is object from date picker
      if (typeof data.birthday !== "number") {
        data.birthday = moment(data.birthday).unix();
      }
    }
    if ("marriageDt" in data) {
      // If it is object from date picker
      if (typeof data.marriageDt !== "number") {
        data.marriageDt = moment(data.marriageDt).unix();
      }
    }

    updateProfile(user.id, data);
  };

  const getMeData = async () => {
    const result = await AuthServices.me();
    return result.data;
  };

  const resetWithInitData = async () => {
    const dataToReset = await getMeData();
    setMarried(dataToReset.married);
    reset(dataToReset);
  };

  const updateProfile = async (id, data) => {
    console.log(data);
    try {
      setLoading(true);
      const result = await UserServices.update(id, data);

      if (result.status !== 200) {
        throw new Error(result.message);
      }

      notifySuccess("Updated Successfully");
      setLoading(false);
    } catch (err) {
      notifyError(err);
      setLoading(false);
    }
  };

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("user");
    navigate("/");
  };

  useEffect(() => {
    resetWithInitData();
  }, []);

  return (
    <div className="p-4">
      {/* <ActionModal mode={"update"} /> */}
      <HeaderNavigator back />
      {/* {JSON.stringify(signupInfo)} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-8">
            <PageTitle text="My Profile" />
          </div>

          {/* <div className="col-span-8 my-2">
            <Controller
              control={control}
              name="profileImg"
              rules={{ required: "At least one image is required!" }}
              render={({ field: { onChange } }) => (
                <ProfileImgUploader
                  onChange={onChange}
                  isNew={true}
                  defaultValues={data.profileURL || null}
                  type="form"
                />
              )}
            />

            <Error errorName={errors.profileImg} />
          </div> */}
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
            <SelectGender register={register} label="Gender" name="gender" />
            <Error errorName={errors.gender} />
          </div>
          <div className="col-span-8">
            <SelectNationality
              register={register}
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
              rules={{ required: "Birthday is required!" }}
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
            <img src="/twitter.svg" alt="twitter" />
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
                rules={{ required: "Marriage Date is required!" }}
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
          Update
        </Button>

        <div
          onClick={() => logout()}
          disabled={false}
          className="mt-4 h-12 w-full underline text-gray-500 cursor-pointer"
        >
          Logout
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
