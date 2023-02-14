import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import EnterEventModal from '../modal/EnterEventModal';
import NotFound from '../NotFound';
import InvitedEventListItem from './InvitedListItem';

const InvitedEventList = ({ items }) => {
  console.log(items);
  const [submitInfo, setSubmitInfo] = useState({});

  const { handleModalOpen } = useToggleDrawer();

  const onClickListItem = (id, eventId) => {
    handleModalOpen('enterEvent');
    setSubmitInfo({
      id,
      eventId,
    });
  };

  return (
    <>
      <EnterEventModal submitInfo={submitInfo} />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items && items.length !== 0 ? (
          items.map((item, id) => (
            <div
              className="cursor-pointer"
              key={id}
              onClick={() => onClickListItem(item.id, item.eventId.id)}
            >
              <InvitedEventListItem item={item.eventId} />
            </div>
          ))
        ) : (
          <NotFound title={'Events'} />
        )}
      </div>
    </>
  );
};

export default InvitedEventList;
