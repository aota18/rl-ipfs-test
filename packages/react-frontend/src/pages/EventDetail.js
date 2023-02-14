import { Button } from '@windmill/react-ui';
import React, { useContext, useEffect, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { AiTwotoneCalendar, AiOutlineScan } from 'react-icons/ai';
import { TiLocation } from 'react-icons/ti';
import TicketHolders from './EventDetail/TicketHolders';
import TicketBooth from '../contracts/TicketBoot.json';
import { ethers } from 'ethers';
import Moralis from 'moralis';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Attended from './EventDetail/Attended';
import AllowBlock from './EventDetail/AllowBlock';
import useQuery from '../hooks/useQuery';
import HeaderNavigator from '../components/header-navigator/HeaderNavigator';

/* 
Host
- Can see all ticket holders
- Can see all attendees
*/

import { generateMockEvents, mock } from '../utils/mock';
import Banner from '../components/banner/banner';
import ShareModal from '../components/modal/ShareModal';
import moment from 'moment';
import { notifyError, notifySuccess } from '../utils/toast';
import EventServices from '../services/EventServices';
import Loading from '../components/Loading';
import { AdminContext } from '../context/AdminContext';
import TicketServices from '../services/TicketServices';
import { REACT_APP_MORALIS_API_KEY } from '../utils/env';
import QRScanModal from '../components/modal/QRScanModal';
import useToggleDrawer from '../hooks/useToggleDrawer';

const EventDetailMain = (props) => {
  const { state } = useContext(AdminContext);
  const { handleModalOpen } = useToggleDrawer();
  const { user } = state;

  const [loading, setLoading] = useState(false);
  const [mintTxnLoading, setMintTxnLoading] = useState(false);
  const [event, setEvent] = useState(generateMockEvents(1)[0]);

  const navigate = useNavigate();

  let query = useQuery();

  const getEventInfo = async (eventId) => {
    try {
      setLoading(true);
      const result = await EventServices.getSingleEvent(eventId);
      setEvent(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      notifyError(err);
    }
  };

  const mintTicket = async (contractAddress, ticketPrice, tokenURI) => {
    try {
      const { ethereum } = window;

      if (!ethereum) return;

      const provider = new ethers.providers.Web3Provider(ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        TicketBooth.abi,
        signer,
      );

      const mintTxn = await contract.mint(tokenURI, {
        value: `${parseFloat(ticketPrice) * 10 ** 18}`,
      });

      await mintTxn.wait();

      return mintTxn;
    } catch (err) {
      console.log(err);
      notifyError(err);
    }
  };

  const getTokenURI = async (
    totalTickets,
    ticketsLeft,
    ticketName,
    description,
    eventId,
    ticketImgURL,
  ) => {
    const objToEncode = {
      name: `${ticketName} #${totalTickets - ticketsLeft + 1}`,
      description: `${description} More Detail : ${eventId}`,
      image: ticketImgURL,
    };

    const encodedURI = btoa(JSON.stringify(objToEncode));

    await Moralis.start({
      apiKey: REACT_APP_MORALIS_API_KEY,
    });

    const abi = [
      {
        path: `rl/ticket`,
        content: encodedURI,
      },
    ];
    const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi,
    });

    return response.data[0].path;
  };

  const buyTicket = async () => {
    try {
      setMintTxnLoading(true);
      const tokenURI = await getTokenURI(
        event.ticketMeta.ticketQuantity,
        event.ticketMeta.ticketsLeft,
        event.ticketMeta.ticketName,
        event.description,
        event.id,
        event.ticketMeta.imgUrl,
      );

      const mintTicketTxn = await mintTicket(
        event.ticketMeta.contractAddress,
        event.ticketMeta.ticketPrice || 0,
        tokenURI,
      );

      if (!mintTicketTxn) {
        throw new Error('Cannot buy Ticket!');
      }

      await TicketServices.createTicket(event.id);

      notifySuccess("You've got the Ticket!");
      navigate('/');
      setMintTxnLoading(false);
    } catch (err) {
      console.log(err);
      notifyError(err);
      setMintTxnLoading(false);
    }
  };

  const handleScanTicket = () => {
    handleModalOpen('qrScan');
  };

  useEffect(() => {
    getEventInfo(query.get('e'));
  }, []);

  if (loading || !event) {
    return <Loading />;
  }

  console.log(event);

  return (
    <>
      <ShareModal event={event} />
      <QRScanModal />
      <div className="relative ">
        <HeaderNavigator back share onPicture={true} />

        <div
          className="w-full h-72 bg-cover brightness-50 blur-sm"
          style={{ backgroundImage: `url(${event.medias[0].url})` }}
        ></div>
        <div className="flex p-4 absolute top-16 space-x-4 ">
          <img
            src={event.medias[0].url}
            className="rounded-lg z-10 object-cover"
            style={{ width: '160px', height: '216px' }}
            alt="event"
          />
          <div className="flex flex-col z-10 justify-between">
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-white ">{event.title}</h1>
              <div className="flex mock.eventDatas-center text-white text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <div>{event.ticketMeta.ticketsLeft || 0} Tickets Left</div>
                </div>
              </div>
              <div className="flex space-x-2 items-center mb-8">
                <img
                  src={event.host?.profileURL || mock.eventData.host.profileImg}
                  style={{ width: '32px', height: '32px' }}
                  className="rounded-full"
                  alt="profile"
                />
                <span className="text-sm text-white">
                  {event.host.firstName || 'Talyor'}{' '}
                  {event.host.lastName || 'Higgs'}
                </span>
              </div>
            </div>

            <Button layout="primary" className="mt-4">
              {' '}
              {event.ticketMeta.ticketPrice
                ? `${event.ticketMeta.ticketPrice} ETH  / ticket`
                : 'FREE'}
            </Button>
          </div>
        </div>

        <div className="bg-white -translate-y-5 z-0 py-10 ">
          {event.privacy === 'PRIVATE' ? (
            <Banner type="danger" message="This is a private event" />
          ) : (
            <></>
          )}
          <div className="px-4">
            {user.address === event.host.walletAddr ? (
              <>
                <div className="flex-col py-2 border-b">
                  <span className="text-sm text-gray-500">
                    {event.ticketMeta.ticketQuantity -
                      event.ticketMeta.ticketsLeft}{' '}
                    people
                  </span>
                  <div className="flex justify-between">
                    <span>See all ticket holders</span>
                    <Link
                      id={query.get('e')}
                      to={`/event/ticket-holders?e=${query.get('e')}`}
                    >
                      <BsChevronRight />
                    </Link>
                  </div>
                </div>

                <div className="flex-col py-2 border-b">
                  <span className="text-sm text-gray-500">
                    {event.numOfAttendees} people
                  </span>
                  <div className="flex justify-between ">
                    <span>See all attendees</span>
                    <Link
                      id={query.get('e')}
                      to={`/event/attended?e=${query.get('e')}`}
                    >
                      <BsChevronRight />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="mt-8">
              <div className="flex space-x-3">
                <div className="flex mt-1">
                  <AiTwotoneCalendar className="text-gray-500" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span>
                    {moment
                      .unix(event.eventStartDt)
                      .format('ddd, MMM DD, YYYY')}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {moment.unix(event.eventStartDt).format('hh:mmA')} -{' '}
                    {moment.unix(event.eventEndDt).format('hh:mmA')}
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
                  <span>{event.eventAddress1}</span>
                  <span className="text-gray-500 text-sm">
                    {event.eventAddress2}
                  </span>
                  <a href="#" className=" text-sm">
                    View map
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h2 className="font-bold text-lg mb-2">Description</h2>
              <p className="text-sm">{event.description}</p>
            </div>

            <div className="my-4 ">
              <h2 className="font-bold text-lg mb-2">Location</h2>
              <p className="text-sm">
                {event.eventAddress1},{event.eventAddress2}
              </p>
            </div>

            {/*
             * TODO: Google MAP
             */}

            {user.address !== event.host.walletAddr ? (
              <>
                <div className="flex space-x-2">
                  <Button layout="outline" className="flex-none px-8">
                    <img src="/clapping.svg" className="w-6" alt="clapping" />
                  </Button>
                  <Button
                    onClick={buyTicket}
                    layout="primary"
                    className="grow"
                    disabled={
                      user.address === event.host.walletAddr ||
                      mintTxnLoading ||
                      event.ticketMeta.ticketsLeft <= 0
                    }
                  >
                    {mintTxnLoading ? 'Wait...' : 'Buy Ticket'}
                  </Button>
                </div>
              </>
            ) : (
              <Button
                layout="primary"
                className="flex w-full px-8 text-xl"
                onClick={() => handleScanTicket()}
              >
                <AiOutlineScan className="mr-4 " /> Scan
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const EventDetail = () => {
  return (
    <Routes>
      <Route index path={`/`} element={<EventDetailMain />} />
      <Route path={`/ticket-holders`} element={<TicketHolders />} />
      <Route path={`/attended`} element={<Attended />} />
      <Route path={`/allow-block`} element={<AllowBlock />} />
    </Routes>
  );
};

export default EventDetail;
