import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

import { SidebarContext } from "../../context/SidebarContext";

const eventType = [
  {
    label: "Personal",
    value: "PERSONAL",
  },
  {
    label: "Marriage",
    value: "MARRIAGE",
  },
  {
    label: "Graduation",
    value: "GRADUATION",
  },
  {
    label: "Promotion",
    value: "PROMOTION",
  },
  {
    label: "Event",
    value: "EVENT",
  },
  {
    label: "Get-Together",
    value: "GETTOGETHER",
  },
];

const EventSelectModal = () => {
  const { isModalOpen, closeModal } = useContext(SidebarContext);

  return (
    <>
      <Modal
        isOpen={isModalOpen.eventSelect}
        onClose={() => closeModal("eventSelect")}
      >
        <ModalBody className="text-center custom-modal px-4 pb-4"></ModalBody>
        <h2 className="text-xl font-medium mb-1">Select event to create</h2>
        <div className="flex flex-col space-y-2">
          {eventType.map((evt, id) => (
            <Link key={id} to={`/create-event?type=${evt.value}&step=1`}>
              <Button
                className="w-full  hover:bg-white hover:border-gray-50"
                layout="primary"
                onClick={() => closeModal("eventSelect")}
              >
                {evt.label}
              </Button>
            </Link>
          ))}
        </div>

        <ModalFooter className="justify-center">
          <Button
            className="w-full  hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={() => closeModal("eventSelect")}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(EventSelectModal);
