import moment from 'moment';
import React from 'react';
import { AiFillEnvironment } from 'react-icons/ai';
import { truncateString } from '../../utils/string';

const CalendarViewListItem = ({ item, idx }) => {
  console.log(item);
  return (
    <div
      className={`flex items-start space-x-4 cursor-pointer ${
        idx === 0 ? 'mt-4' : ''
      }`}
    >
      <div className="flex">
        <div className="flex items-center ">
          <div
            className={`w-4 h-0 border-b ${
              idx === 0 ? 'border-gray-300' : 'border-none'
            }`}
          />
          <div
            className={`flex flex-col`}
            style={idx === 0 ? {} : { color: 'transparent' }}
          >
            <span className={`${idx === 0 ? 'text-gray-500' : ''}`}>
              {moment.unix(item.eventStartDt).format('MMM')}
            </span>
            <span className="font-bold">
              {moment.unix(item.eventStartDt).format('DD')}
            </span>
          </div>
        </div>
      </div>
      <div>
        <img
          style={{ width: '60px', height: '74px' }}
          className="object-cover rounded-md"
          src={item.medias[0].url}
          alt="event-thumb"
        />
      </div>
      <div className="flex flex-col justify-items">
        <span>{item.title}</span>

        <div className="flex space-x-1 items-center text-gray-400">
          <AiFillEnvironment className="w-3 h-3" />
          <span className="text-xs ">
            {truncateString(item.eventAddress1, 20)}
          </span>
        </div>
        {/* 
        <span className="mt-2">{item.ticketStatus}</span> */}
      </div>
    </div>
  );
};

export default CalendarViewListItem;
