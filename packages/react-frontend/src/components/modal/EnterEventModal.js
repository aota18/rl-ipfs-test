import React, { useContext, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@windmill/react-ui";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { SidebarContext } from "../../context/SidebarContext";
import { useForm } from "react-hook-form";
import Error from "../form/Error";
import { notifyError, notifySuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import InvitationServices from "../../services/InvitationServices";
import { clearInvites } from "../../actions/updateInvites";
import { useStateMachine } from "little-state-machine";

const EnterEventModal = ({ submitInfo }) => {
  const { actions } = useStateMachine({ clearInvites });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isModalOpen, closeModal } = useContext(SidebarContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await InvitationServices.requestApproval({
        id: submitInfo.id,
        eventId: submitInfo.eventId,
        password: data.accessCode,
      });

      if (res.status === 200) {
        notifySuccess("You have accpeted the invitation!");

        actions.clearInvites();

        closeModal("enterEvent");

        navigate("/");
      } else {
        notifyError(`Error: ${res.message}`);
      }
    } catch (err) {
      notifyError(err.message);
    }
  };

  const renderAfterSubmit = () => {
    return (
      <div className="flex flex-col justify-center items-center text-primary space-y-4">
        <h2 className="text-xl font-medium mb-1">Submitted!</h2>
        <AiOutlineCheckCircle style={{ width: "128px", height: "128px" }} />
        <h2 className="text-xl font-medium mb-1">
          Your attendance has been submitted to the host!
        </h2>
        <p className="text-gray-500">
          Once the host approves, you will be allow-listed for the SBT airdrop
        </p>
      </div>
    );
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen.enterEvent}
        onClose={() => closeModal("enterEvent")}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
            {isSubmitted ? (
              renderAfterSubmit()
            ) : (
              <div className="flex flex-col items-center space-y-8">
                <h2 className="text-black text-xl font-bold mb-1">
                  Enter Invite Code
                </h2>

                <Input
                  label="AccessCode"
                  name="accessCode"
                  type="password"
                  placeholder=""
                  {...register("accessCode", {
                    required: "Code is required",
                    minLength: {
                      value: 4,
                      message: "Access Code must have at least 4 characters",
                    },
                  })}
                  className="border h-12 text-sm focus:outline-none block w-full bg-white dark:bg-white border-transparent focus:bg-white"
                />
                <Error errorName={errors.accessCode} />
              </div>
            )}
          </ModalBody>
          <ModalFooter className="flex flex-col justify-center">
            {!isSubmitted && (
              <Button
                layout="primary"
                type="submit"
                className="w-full sm:w-auto"
              >
                Enter Event
              </Button>
            )}

            <Button
              className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
              layout="outline"
              onClick={() => closeModal("ticket")}
            >
              Close
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(EnterEventModal);
