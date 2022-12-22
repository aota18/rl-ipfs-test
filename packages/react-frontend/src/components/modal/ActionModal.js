import React, { useContext } from "react";

import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";
import { FiTrash2, FiSettings } from "react-icons/fi";

import { SidebarContext } from "../../context/SidebarContext";

const ActionModal = ({ id, title, mode, onAction }) => {
  const { isModalOpen, closeModal } = useContext(SidebarContext);

  const handleClick = () => {
    onAction();
  };

  return (
    <>
      <Modal isOpen={isModalOpen.action} onClose={() => closeModal("action")}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          <span className="flex justify-center text-3xl mb-6 text-red-500">
            {mode === "delete?" ? <FiTrash2 /> : <FiSettings />}
          </span>
          <h2 className="text-xl font-medium mb-1">
            Do you really want to {mode}?{" "}
          </h2>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={() => closeModal("action")}
          >
            No
          </Button>
          <Button onClick={handleClick} className="w-full sm:w-auto">
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(ActionModal);
