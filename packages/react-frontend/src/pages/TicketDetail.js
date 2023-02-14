import { Button } from '@windmill/react-ui';
import moment from 'moment';
import React, { useContext } from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { TiLocation } from 'react-icons/ti';
import { useLocation } from 'react-router';
import HeaderNavigator from '../components/header-navigator/HeaderNavigator';
import TicketModal from '../components/modal/TicketModal';
import { SidebarContext } from '../context/SidebarContext';
import useQuery from '../hooks/useQuery';
import useToggleDrawer from '../hooks/useToggleDrawer';

const TicketDetail = () => {
  const query = useQuery();
  const {
    state: { item },
  } = useLocation();

  const { handleModalOpen } = useToggleDrawer();
  const { isModalOpen, closeModal, startQRInterval } =
    useContext(SidebarContext);
  let interval;

  const handleUseTicket = (ticketId) => {
    handleModalOpen('ticket');
    // Set Interval of
    startQRInterval(ticketId);
  };

  return (
    <div className="relative">
      <TicketModal ticketId={item.id} />

      <HeaderNavigator back menu onPicture={true} />
      <div className="flex flex-col ">
        <div
          className="w-full h-80 bg-cover brightness-50"
          style={{
            backgroundImage: `url(${item.event.medias[0].url})`,
          }}
        ></div>

        <div className="rounded-t-xl -translate-y-5 bg-white p-4">
          <div className="flex items-center space-x-2 ">
            <div className="w-2 h-2 rounded-full bg-success" />

            <span className="text-gray-500">
              {item.status === 'CREATED'
                ? 'Unused'
                : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>

          <h1 className="text-3xl font-bold">{item.event.title}</h1>

          <div className="flex flex-col my-4 space-y-4">
            <div className="flex space-x-3">
              <div className="flex mt-1">
                <AiTwotoneCalendar className="text-gray-500" />
              </div>
              <div className="flex flex-col space-y-1">
                <span>
                  {moment
                    .unix(item.event.eventStartDt)
                    .format('ddd, MMM DD, YYYY')}
                </span>
                <span className="text-gray-500 text-sm">
                  {moment.unix(item.event.eventStartDt).format('hh:mmA')} -{' '}
                  {moment.unix(item.event.eventEndDt).format('hh:mmA')}
                </span>
                <a href="#" className=" text-sm">
                  Add to calendar
                </a>
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="flex mt-1">
                <TiLocation />
              </div>
              <div className="flex flex-col space-y-1">
                <span>{item.event.eventAddress1}</span>
                <span className="text-gray-500 text-sm">
                  {item.event.eventAddress2}
                </span>
                <a href="#" className=" text-sm">
                  View map
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-bold text-lg mb-2">Location</h2>
              <p className="text-sm">
                {item.event.eventAddress1} {item.event.eventAddress2}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="mt-4 h-12 w-full"
            to="/dashboard"
            disabled={
              item.permission === 'REQUESTED'
              // || item.permission === 'APPROVED'
            }
            onClick={() => handleUseTicket(item.id)}
          >
            {item.permission === 'APPROVED'
              ? 'Used'
              : item.permission === 'REQUESTED'
              ? 'Requested'
              : 'Use Ticket'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
