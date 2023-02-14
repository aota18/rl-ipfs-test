import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@windmill/react-ui';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { SidebarContext } from '../../context/SidebarContext';
import QRCode from 'react-qr-code';
import { useForm } from 'react-hook-form';
import Error from '../form/Error';
import TicketServices from '../../services/TicketServices';
import { notifyError, notifySuccess } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
const TicketModal = ({ ticketId }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isModalOpen, closeModal, terminateQRInterval } =
    useContext(SidebarContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const submitHandler = async () => {
    try {
      const result = await TicketServices.approveRequest(ticketId);

      if (result.status !== 200) {
        throw new Error('Server Error');
      }

      notifySuccess('Successfully Sent Request');
      setIsSubmitted(true);
      navigate('/tickets', { replace: true });
    } catch (err) {
      console.log(err);
      notifyError(err.message);
    }
  };

  const renderAfterSubmit = () => {
    return (
      <div className="flex flex-col justify-center items-center text-primary space-y-4">
        <h2 className="text-xl font-medium mb-1">Submitted!</h2>
        <AiOutlineCheckCircle style={{ width: '128px', height: '128px' }} />
        <h2 className="text-xl font-medium mb-1">
          Your attendance has been submitted to the host!
        </h2>
        <p className="text-gray-500">
          Once the host approves, you will be allow-listed for the SBT airdrop
        </p>
      </div>
    );
  };

  const onCloseModal = () => {
    closeModal('ticket');
    terminateQRInterval();
  };

  return (
    <>
      <Modal isOpen={isModalOpen.ticket} onClose={onCloseModal}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody className="text-center custom-modal px-2 pt-4 pb-4">
            {isSubmitted ? (
              renderAfterSubmit()
            ) : (
              <div className="flex flex-col items-center space-y-8">
                <h2 className="text-black text-xl font-bold mb-1">
                  Present Ticket to Host
                </h2>
                <div className="w-40 h-40">
                  <QRCode
                    size={96}
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                    value={'Hello'}
                    viewBox={`0 0 96 96`}
                  />
                </div>
                <p>or enter code</p>

                <Input
                  label="AccessCode"
                  name="accessCode"
                  type="password"
                  placeholder=""
                  {...register('accessCode', {
                    required: 'Code is required',
                    minLength: {
                      value: 10,
                      message: 'Access Code must have at least 10 characters',
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
                Use Ticket
              </Button>
            )}

            <Button
              className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
              layout="outline"
              onClick={onCloseModal}
            >
              Close
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default React.memo(TicketModal);
