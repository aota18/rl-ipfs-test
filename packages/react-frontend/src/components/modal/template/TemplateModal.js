import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

import { SidebarContext } from "../../../context/SidebarContext";

const __NAME__Modal = () => {
  const { isModalOpen, closeModal } = useContext(SidebarContext);

  return (
    <>
      <Modal
        isOpen={isModalOpen.__NAME__}
        onClose={() => closeModal("__NAME__")}
      >
        <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-black text-xl font-bold mb-1">Hello Modal</h2>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={() => closeModal("__NAME__")}
          >
            Action
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(__NAME__Modal);
