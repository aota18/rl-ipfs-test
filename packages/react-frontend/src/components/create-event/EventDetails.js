import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import PageTitle from "../page-title/PageTitle";
import { updateEvents } from "./updateAction";
import useQuery from "../../hooks/useQuery";
import SelectEventType from "../form/SelectEventType";
import Error from "../form/Error";
import SectionDividerDrop from "../section-divider/SectionDividerDrop";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import "react-day-picker/dist/style.css";
import RadioPrivacy from "../form/RadioPrivacy";
import RadioOnline from "../form/RadioOnline";
import TagList from "../tags/TagList";
import TimePicker from "../form/TimePicker";
import DatePicker from "../form/DatePicker";
import { Button, Input, Label } from "@windmill/react-ui";
import SelectRepeat from "../form/SelectRepeat";
import UploaderForm from "../image-uploader/UploaderForm";

const EventDetails = () => {
  let query = useQuery();
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateEvents });

  const [repeat, setRepeat] = useState(false);

  // Current Event Type
  const [_, setEventType] = useState("");

  // Tags
  const [tags, setTags] = useState([]);
  const [privacy, setPrivacy] = useState(state.event?.privacy);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: state.event,
  });

  const [infoCollapsed, setInfoCollapsed] = useState({
    basicInfo: false,
    privacyOptions: false,
    dateTimeVenue: false,
  });

  const toggleInfoCollapse = (key) => {
    setInfoCollapsed((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleSelectEvent = (type) => {
    setEventType(type);
    navigate(`/create-event?type=${type}&step=1`);
  };

  const onSubmit = (data) => {
    actions.updateEvents(data);
    navigate("/create-event/memories?step=2");
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle text={"Event Details"} />

        <div className="my-6">
          <img src={`step5-${query.get("step")}.svg`} alt="step" />
        </div>

        <div className="flex flex-col space-y-4 ">
          <SelectEventType
            register={register}
            label="Type"
            name="category"
            defaultValue={query.get("type") || "PERSONAL"}
            setEventType={handleSelectEvent}
          />
          <Error errorName={errors.category} />
        </div>

        {/* Basic Info Section */}
        <SectionDividerDrop
          title="Basic Info"
          sectionName="basicInfo"
          isCollapsed={infoCollapsed.basicInfo}
          handleCollapse={toggleInfoCollapse}
        />
        {!infoCollapsed.basicInfo && (
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 space-y-2">
              <LabelArea label="Event Title" />
              <InputArea
                register={register}
                name="eventTitle"
                label="Event Title"
                type="text"
                placeholder="Event Title"
                required={true}
              />

              <Error errorName={errors.eventTitle} />
            </div>

            <div className="col-span-8 space-y-2">
              <LabelArea label="Description" />
              <InputArea
                register={register}
                name="description"
                label="Description"
                type="text"
                placeholder="Describe your event"
                required={true}
              />

              <Error errorName={errors.description} />
            </div>

            <div className="col-span-8 space-y-2">
              <LabelArea label="Recurrance" />
              <Label radio className="grid grid-cols-8 gap-4">
                <div className="col-span-4 flex ">
                  <Input
                    type="radio"
                    label="Recurrance"
                    {...register("repeat")}
                    name="repeat"
                    value="NEVER"
                    defaultChecked={state.event?.recurrance ? false : true}
                    defaultValue={state.event?.recurrance}
                    onClick={(e) => {
                      setRepeat(false);
                    }}
                  />
                  <span className="ml-4">One-time</span>
                </div>
                <div className="col-span-4">
                  <Input
                    disabled
                    type="radio"
                    label="Recurrance"
                    {...register("repeat")}
                    defaultValue={state.event?.recurrance}
                    name="repeat"
                    value="recurring"
                    onClick={(e) => {
                      setRepeat(true);
                    }}
                  />
                  <span className="ml-3">Recurring Event</span>
                </div>
              </Label>
            </div>
            {repeat ? (
              <>
                <div className="col-span-8 space-y-2">
                  <LabelArea label="Repeat" />
                  <SelectRepeat register={register} name="repeat" />
                </div>

                <div className="col-span-8 space-y-2">
                  <LabelArea label="Repeat End Date" />
                  <div className="col-span-4 flex space-y-2 items-center">
                    <DatePicker register={register} name="repeatEndDate" />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="col-span-8 space-y-2">
              <LabelArea label="Event Image" />
              <span>Upload up to 5 images</span>
              <Controller
                control={control}
                name="eventImgFiles"
                rules={{ required: "At least one image is required!" }}
                render={({ field: { onChange } }) => (
                  <UploaderForm
                    maxNum={5}
                    onChange={onChange}
                    defaultValues={state.event?.eventImgFiles}
                  />
                )}
              />
              <Error errorName={errors.eventImgFiles} />
            </div>

            <div className="col-span-8 space-y-2">
              <LabelArea label="Tags" />
              <TagList tags={tags} setTags={setTags} />
            </div>
          </div>
        )}

        {/* Privacy Options Section */}
        <SectionDividerDrop
          title="Privacy Options"
          sectionName="privacyOptions"
          isCollapsed={infoCollapsed.privacyOptions}
          handleCollapse={toggleInfoCollapse}
        />
        {!infoCollapsed.privacyOptions && (
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 space-y-2">
              <LabelArea label="Privacy" />
              <RadioPrivacy
                defaultValue={state.event?.privacy}
                onChange={setPrivacy}
                register={register}
                name="privacy"
              />
            </div>

            {privacy === "PRIVATE" ? (
              <div className="col-span-8 space-y-2">
                <LabelArea label="Invite Password" />
                <InputArea
                  register={register}
                  label="Invite Password"
                  name="password"
                  type="text"
                  placeholder="Invite Password"
                  required={true}
                />

                <Error errorName={errors.password} />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Date, Time, Venue Section */}
        <SectionDividerDrop
          title="Date, Time, Venue"
          sectionName="dateTimeVenue"
          isCollapsed={infoCollapsed.dateTimeVenue}
          handleCollapse={toggleInfoCollapse}
        />
        {!infoCollapsed.dateTimeVenue && (
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-8 space-y-2">
              <LabelArea label="On/Offline" />
              <RadioOnline
                register={register}
                name="onOffline"
                defaultValue={state.event?.onOffline}
              />
            </div>

            <div className="col-span-8 space-y-2">
              <LabelArea label="Address" />
              <InputArea
                register={register}
                name="eventAddress1"
                label="Address1"
                type="text"
                placeholder="Street address or P.O. Box"
                required={true}
              />
              <Error errorName={errors.eventAddress1} />

              <InputArea
                register={register}
                name="eventAddress2"
                type="text"
                required={false}
                placeholder="Apt, Suite, Unit, Building"
              />
              <Error errorName={errors.eventAddress2} />
            </div>

            <div className="col-span-8 space-y-2">
              <LabelArea label="Start Date " />

              <div className="flex grid grid-cols-8 gap-4">
                <div className="col-span-4 flex space-x-2 items-center">
                  <Controller
                    control={control}
                    name="eventStartDate"
                    rules={{ required: "Date is required!" }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker onChange={onChange} selected={value} />
                    )}
                  />
                </div>

                <div className="col-span-4 ">
                  <Controller
                    control={control}
                    name="eventStartTime"
                    rules={{ required: "Time is required!" }}
                    render={({ field: { onChange, value } }) => (
                      <TimePicker onChange={onChange} selected={value} />
                    )}
                  />
                </div>
              </div>

              <Error errorName={errors.eventStartDate} />
              <Error errorName={errors.eventStartTime} />
            </div>

            <div className="col-span-8 space-y-2">
              <LabelArea label="End Date " />

              <div className="flex grid grid-cols-8 gap-4">
                <div className="col-span-4 flex space-x-2 items-center">
                  <Controller
                    control={control}
                    name="eventEndDate"
                    rules={{ required: "Date is required!" }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        selected={state.event?.eventEndDate || value}
                      />
                    )}
                  />
                </div>

                <div className="col-span-4 ">
                  <Controller
                    control={control}
                    name="eventEndTime"
                    rules={{ required: "Time is required!" }}
                    render={({ field: { onChange, value } }) => (
                      <TimePicker onChange={onChange} selected={value} />
                    )}
                  />
                </div>
              </div>

              <Error errorName={errors.eventEndDate} />
              <Error errorName={errors.eventEndTime} />
            </div>
          </div>
        )}

        <Button type="submit" layout="primary" className="w-full my-6">
          Next
        </Button>
      </form>
    </div>
  );
};

export default EventDetails;
