import React, { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@windmill/react-ui";

import { SidebarContext } from "../../context/SidebarContext";

const ImageViewModal = ({ imgUrl }) => {
  const { isModalOpen, closeModal } = useContext(SidebarContext);

  return (
    <>
      <Modal
        isOpen={isModalOpen.imageView}
        onClose={() => closeModal("imageView")}
      >
        <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
          <div className="flex flex-col items-center space-y-8">
            {imgUrl ? (
              <img src={imgUrl} alt="img" />
            ) : (
              <span>Sorry, Cannot show image :( </span>
            )}
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={() => closeModal("imageView")}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(ImageViewModal);
