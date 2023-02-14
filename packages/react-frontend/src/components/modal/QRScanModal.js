import { Button, Modal, ModalBody, ModalFooter } from '@windmill/react-ui';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarContext } from '../../context/SidebarContext';
import QrReader from 'react-qr-scanner';

const QRScanModal = ({ ticketId }) => {
  const { isModalOpen, closeModal } = useContext(SidebarContext);

  const navigate = useNavigate();

  const onCloseModal = () => {
    closeModal('qrScan');
  };

  /* QR Reader */
  const [qrResult, setQrResult] = useState('');
  const handleScan = (data) => {
    setQrResult(data);
  };
  const handleError = (err) => console.log(err);

  return (
    <>
      <Modal isOpen={isModalOpen.qrScan} onClose={onCloseModal}>
        <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
          <div className="flex flex-col items-center space-y-8">
            <h2 className="text-black text-xl font-bold mb-1">
              Please Scan the ticket
            </h2>
            <QrReader
              delay={100}
              className="object-fill w-auto h-auto"
              onError={handleError}
              onScan={handleScan}
            />
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col justify-center">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={onCloseModal}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(QRScanModal);
