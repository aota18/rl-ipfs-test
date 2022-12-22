import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateEvents } from "./updateAction.js";
import PageTitle from "../page-title/PageTitle.js";
import useQuery from "../../hooks/useQuery.js";
import LabelArea from "../form/LabelArea.js";
import Error from "../form/Error.js";
import { Button } from "@windmill/react-ui";
import UploaderForm from "../image-uploader/UploaderForm.js";
import HeaderNavigator from "../header-navigator/HeaderNavigator";

const Memories = () => {
  const query = useQuery();
  const { actions, state } = useStateMachine({ updateEvents });
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: state.event,
  });

  const navigate = useNavigate();

  const onPressBack = () => {
    navigate("/create-event?step=1", { replace: true });
  };

  const onSubmit = (data) => {
    actions.updateEvents(data);
    navigate("/create-event/ticket-nft-details?step=3");
  };

  return (
    <div className=" p-4 ">
      <HeaderNavigator back onPressBack={onPressBack} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between h-full "
      >
        <div>
          <PageTitle text={"Memories"} />

          <div className="my-6">
            <img src={`/step5-${query.get("step")}.svg`} alt="step" />
          </div>

          <div className="grid grid-cols-8 gap-4 mb-4 ">
            <div className="col-span-8 space-y-2">
              <LabelArea label="Pictures" />
              <span>Upload up to 5 images</span>

              <Controller
                control={control}
                name="memoriesImgFiles"
                rules={{ required: "At least one image is required!" }}
                render={({ field: { onChange } }) => (
                  <UploaderForm
                    onChange={onChange}
                    defaultValues={state.event?.memoriesImgFiles || []}
                    type="form"
                    maxNum={5}
                  />
                )}
              />

              <Error errorName={errors.memoriesImgFiles} />
            </div>
          </div>
        </div>

        <Button type="submit" layout="primary" className="w-full my-6">
          Next
        </Button>
      </form>
    </div>
  );
};

export default Memories;
