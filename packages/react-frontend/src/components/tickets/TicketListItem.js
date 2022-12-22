import React from "react";
import { AiFillEnvironment } from "react-icons/ai";
import { Badge } from "@windmill/react-ui";
import moment from "moment";
import { getMintString, truncateString } from "../../utils/string";

const TicketListItem = ({ item }) => {
  return (
    <div className="flex justify-between font-sf space-x-4 ">
      <img
        style={{ width: "100px", height: "136px" }}
        className="object-cover rounded-lg"
        src={item.ticketMeta.imgUrl}
        alt="event"
      />

      <div className="flex flex-col space-y-4 justify-center w-full border-b ">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-500 text-sm font-thin ">
            {moment.unix(item.event.eventStartDt).format("ddd, MMM D")}{" "}
            {getMintString(item.event.eventStartDt)}
          </span>
          <span className="">{item.title}</span>
          <span className="flex items-center text-gray-500 text-sm space-x-2 font-thin">
            <AiFillEnvironment className="w-3 h-3" />
            <span>{truncateString(item.event.eventAddress1, 20)}</span>
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center space-x-1">
            <img src="clapping.svg" className="w-4 h-4" alt="clapping" />
            <span className="dark:text-gray-200">{item.claps || 0}</span>
          </div>
          <Badge
            type="primary"
            className="flex justify-center items-center px-3 text-md
            "
          >
            {item.ticketMeta.ticketPrice
              ? `${item.ticketMeta.ticketPrice} ETH`
              : "FREE"}
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TicketListItem;
