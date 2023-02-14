import React, { useEffect } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { createStore, useStateMachine } from 'little-state-machine';

import EventDetails from '../components/create-event/EventDetails';
import Memories from '../components/create-event/Memories';
import SBTDetails from '../components/create-event/SBTDetails';
import TicketNFTDetails from '../components/create-event/TicketNFTDetails';
import Preview from '../components/create-event/Preview';
import { clearEvents } from '../components/create-event/updateAction';
/**
 * STEP 1: Event Details
 * STEP 2: Create Ticket NFT
 * STEP 3: Whitelist
 * STEP 4: Memories
 * STEP 5: Create SBT
 * STEP 6: REVIEW
 *
 */

// Event Type : Personal | Marriage | Graduation | Promotion |  Event | Get-Together

export const mockEventObject = {
  airdropDate: '2022-10-11T07:00:00.000Z',
  airdropTime: 32400,
  canBeResold: 'no',
  description: 'Mock Description',
  eventAddress1: 'Addr1',
  eventAddress2: 'Addr2',
  eventEndDate: '2022-10-05T07:00:00.000Z',
  eventEndTime: 32400,
  eventStartDate: '2022-10-05T07:00:00.000Z',
  eventStartTime: 28800,
  eventTitle: 'Mock Event',
  eventType: 'personal',
  memoriesImgFiles: [new File([''], 'filename', { type: 'image/png' })],
  onOffline: 'online',
  privacy: 'public',
  recurrance: 'NEVER',
  salesEndDate: '2022-10-06T07:00:00.000Z',
  salesEndTime: 43200,
  salesStartDate: '2022-10-06T07:00:00.000Z',
  salesStartTime: 32400,
  sbtImgFile: [new File([''], 'filename', { type: 'image/png' })],
  sbtName: 'Mock SBT',
  ticketImgFile: [new File([''], 'filename', { type: 'image/png' })],
  ticketName: 'Mock Ticket',
  ticketType: 'FREE',
};
// Init Event Info
createStore({});

const CreateEvent = () => {
  const { actions } = useStateMachine({ clearEvents });

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser);
    return () => {
      actions.clearEvents();
      window.removeEventListener('beforeunload', alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = '';
    alert(
      'Are you sure you want to leave this page? Your data will not be saved.',
    );
  };

  return (
    <>
      <Routes>
        <Route exact path={`/`} element={<EventDetails />} />
        <Route path={`/memories`} element={<Memories />} />
        <Route path={`/sbt-details`} element={<SBTDetails />} />
        <Route path={`/ticket-nft-details`} element={<TicketNFTDetails />} />
        <Route path={`/preview`} element={<Preview />} />
      </Routes>
    </>
  );
};

export default CreateEvent;
