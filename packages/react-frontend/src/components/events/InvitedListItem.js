import React from "react";
import { AiFillEnvironment } from "react-icons/ai";
import moment from "moment";
import { getMintString, truncateString } from "../../utils/string";
import { mock } from "../../utils/mock";

const InvitedEventListItem = ({ item }) => {
  return (
    <div className="flex font-sf space-x-4 sm:flex-col sm:space-x-0 sm:space-y-4">
      <div className="lg:h-80 lg:hover:drop-shadow-lg">
        <img
          className="w-24 h-32 object-cover object-center rounded-lg sm:h-full sm:w-full lg:h-full lg:w-full "
          src={item ? item?.medias[0].url : mock.eventData.eventImg}
          alt="event"
        />
      </div>

      <div className="flex flex-col space-y-3 justify-center border-b sm:w-full sm:border-none lg:border-none ">
        <span className="text-gray-500 text-sm font-thin lg:font-bold lg:text-lg lg:text-black">
          {moment.unix(item.eventStartDt).format("ddd, MMM D")}{" "}
          {getMintString(item.eventStartDt)}
        </span>
        <span className="dark:text-gray-200 sm:text-xl lg:font-extrabold lg:text-2xl">
          {truncateString(item.title, 25)}
        </span>
        <span className="flex items-center text-gray-500 text-sm space-x-2 font-thin ">
          <AiFillEnvironment className="w-3 h-3 sm:w-5 sm:h-5" />
          <span>{truncateString(item.eventAddress1, 20)}</span>
        </span>

        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-red-500">{"Unclaimed"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitedEventListItem;
