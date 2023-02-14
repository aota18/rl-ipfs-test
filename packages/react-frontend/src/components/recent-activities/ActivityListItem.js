import React from 'react';
import { Avatar } from '@windmill/react-ui';
import moment from 'moment';
import { mock } from '../../utils/mock';

const ActivityListItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center space-x-4 ">
      <div>
        <Avatar
          src={item.by.profileURL || mock.profileImg}
          alt="Judith"
          size="large"
        />
      </div>
      <div>
        <div className="dark:text-gray-200 text-sm leading-5">
          <span className="font-semibold">{item.by.firstName}</span> has ordered{' '}
          <span className="font-semibold">
            {item.ticketLog.ticket.event.title}{' '}
          </span>
          ticket.{' '}
          <p className="text-gray-400">
            {moment(item.createdAt).format('MM/DD HH:MM A')}
          </p>
        </div>
      </div>
      <img
        src={item.ticketLog.ticket.event.medias[0].url}
        className="w-10 h-10 rounded-md object-cover"
        alt="event-activity"
      />
    </div>
  );
};

export default ActivityListItem;
