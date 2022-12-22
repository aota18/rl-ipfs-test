import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateEvents } from "./updateAction.js";
import HeaderNavigator from "../header-navigator/HeaderNavigator.js";
import PageTitle from "../page-title/PageTitle.js";
import useQuery from "../../hooks/useQuery.js";
import LabelArea from "../form/LabelArea.js";
import Error from "../form/Error.js";
import UploaderForm from "../image-uploader/UploaderForm.js";
import InputArea from "../form/InputArea.js";
import DatePicker from "../form/DatePicker.js";
import TimePicker from "../form/TimePicker.js";
import { Button } from "@windmill/react-ui";

const SBTDetails = () => {
  const { actions, state } = useStateMachine({ updateEvents });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: state.event,
  });

  const query = useQuery();

  const navigate = useNavigate();

  const onPressBack = () => {
    navigate("/create-event/ticket-nft-details?step=3", { replace: true });
  };

  const onSubmit = (data) => {
    actions.updateEvents(data);
    navigate("/create-event/preview?step=5");
  };
  return (
    <div className="p-4">
      <HeaderNavigator back onPressBack={onPressBack} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle text={"Create SBT"} />

        <div className="my-6">
          <img src={`/step5-${query.get("step")}.svg`} alt="step" />
        </div>

        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-8 space-y-2">
            <LabelArea label="SBT Name" />
            <InputArea
              register={register}
              name="sbtName"
              label="SBT Name"
              type="text"
              placeholder="SBT Name"
              required={true}
            />

            <Error errorName={errors.sbtName} />
          </div>
          <div className="col-span-8 space-y-2">
            <LabelArea label="SBT image" />
            <Controller
              control={control}
              name="sbtImgFiles"
              rules={{ required: "At least one image is required!" }}
              render={({ field: { onChange } }) => (
                <UploaderForm
                  maxNum={1}
                  onChange={onChange}
                  defaultValues={state.event?.sbtImgFiles}
                />
              )}
            />
            <Error errorName={errors.sbtImgFile} />
          </div>

          <div className="col-span-8 space-y-2">
            <LabelArea label="Airdrop Date " />

            <div className="flex grid grid-cols-8 gap-4">
              <div className="col-span-4 flex space-x-2 items-center">
                <Controller
                  control={control}
                  name="airdropDate"
                  rules={{ required: "Date is required!" }}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker onChange={onChange} selected={value} />
                  )}
                />
              </div>

              <div className="col-span-4 ">
                <Controller
                  control={control}
                  name="airdropTime"
                  rules={{ required: "Time is required!" }}
                  render={({ field: { onChange, value } }) => (
                    <TimePicker onChange={onChange} selected={value} />
                  )}
                />
              </div>
            </div>
            <Error errorName={errors.airdropDate} />
            <Error errorName={errors.airdropTime} />
          </div>
        </div>

        <Button type="submit" layout="primary" className="w-full my-6">
          Next
        </Button>
      </form>
    </div>
  );
};

export default SBTDetails;
