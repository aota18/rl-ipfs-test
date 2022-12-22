import { Button, Input, Label, Modal, ModalBody } from "@windmill/react-ui";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";

const NeedSignupModal = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isModalOpen, closeModal } = useContext(SidebarContext);
  const [includeCode, setIncludeCode] = useState(false);

  const onClickBtnSignup = () => {
    navigate("/signup?step=1");

    closeModal("needSignup");
  };

  const onClickBtnClose = () => {
    navigate("/greeting-card");
    closeModal("needSignup");
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen.needSignup}
        onClose={() => closeModal("needSignup")}
      >
        <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-black text-2xl font-bold mb-1">
              Please Sign Up!
            </h2>

            <div className="flex flex-col space-y-4 lg:flex-row lg:justify-center lg:items-center lg:space-x-4 lg:space-y-0 w-full">
              <Button
                className="w-auto sm:w-auto hover:bg-white hover:border-gray-50"
                layout="primary"
                onClick={onClickBtnSignup}
              >
                Sign up
              </Button>
              <Button
                className="w-auto sm:w-auto hover:bg-white hover:border-gray-50"
                layout="outline"
                onClick={onClickBtnClose}
              >
                No, thanks
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default React.memo(NeedSignupModal);
