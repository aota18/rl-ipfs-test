import React, { useContext, useState, useRef } from "react";
import { Modal, ModalBody, Button, Input, Label } from "@windmill/react-ui";

import { SidebarContext } from "../../context/SidebarContext";

import { useForm } from "react-hook-form";
import moment from "moment";
import { notifySuccess } from "../../utils/toast";

const ShareModal = ({ event }) => {
  const ref = useRef(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isModalOpen, closeModal } = useContext(SidebarContext);
  const [includeCode, setIncludeCode] = useState(false);

  const { handleSubmit } = useForm();

  const submitHandler = () => {
    console.log("code submit");
    setIsSubmitted(true);
  };

  const handleIncludeCode = () => {
    setIncludeCode(!includeCode);
  };

  const copyMessage = async () => {
    // Select the text field
    ref.current.select();
    ref.current.setSelectionRange(0, 99999);

    await navigator.clipboard.writeText(ref.current.value);

    notifySuccess("Message Copied into Clipboard!");

    // Close Modal
    closeModal("share");
  };

  const generateCopyValue = () => {
    let password = includeCode ? `Invite code: ${event.password}` : "";

    return (
      `You're Invited to ${event.title}!\nStarts: ${moment
        .unix(event.eventStartDt)
        .format("YYYY/MM/DD hh:mm")}\nEnds: ${moment
        .unix(event.eventEndDt)
        .format("YYYY/MM/DD hh:mm")} \n\nEvent link: http://${
        window.location.hostname
      }${process.env.NODE_ENV === "development" && ":4001"}/event?e=${
        event.id
      }&type=${event.category}&from=${event.host.id}&i=t
    ` + password
    );
  };

  return (
    <>
      <Modal isOpen={isModalOpen.share} onClose={() => closeModal("share")}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-black text-2xl font-bold mb-1">
                Share Event
              </h2>

              <div className="border p-4 rounded-md text-left">
                You're Invited to ${event.title}! <br />
                Starts:
                {moment
                  .unix(event.eventStartDt)
                  .format("YYYY/MM/DD hh:mm")}{" "}
                <br />
                Ends:
                {moment.unix(event.eventEndDt).format("YYYY/MM/DD hh:mm")}{" "}
                <br /> <br /> Event link: http://{window.location.hostname}
                {process.env.NODE_ENV === "development" && ":4001"}/event?e=
                {event.id}&type={event.category}&from={event.host.id}&i=t
                <br />
                <br />
                {includeCode && `Invite code: ${event.password}`}
              </div>
              {/** TODO: TextCopy */}
              <textarea
                ref={ref}
                id="msgToShare"
                value={generateCopyValue()}
                onChange={() => {}}
                hidden
              />

              <Label radio className="grid grid-cols-8 gap-4">
                <div className="col-span-4">
                  <Input
                    className="accent-secondary"
                    type="checkbox"
                    value={includeCode}
                    checked={includeCode}
                    onChange={(e) => handleIncludeCode(e.target.value)}
                  />
                  <span className="ml-2">Include invite code</span>
                </div>
              </Label>

              <Button
                className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
                layout="primary"
                onClick={() => copyMessage()}
              >
                Copy Message
              </Button>
            </div>
          </ModalBody>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(ShareModal);
