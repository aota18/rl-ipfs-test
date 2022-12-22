import React from "react";
import { Avatar } from "@windmill/react-ui";
import moment from "moment";

const ActivityListItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center space-x-4 ">
      <div>
        <Avatar src={item.profileImg} alt="Judith" size="large" />
      </div>
      <div>
        <div className="dark:text-gray-200 text-sm leading-5">
          <span className="font-semibold">{item.user}</span> has ordered{" "}
          <span className="font-semibold">{item.eventName} </span>ticket.{" "}
          <p className="text-gray-400">
            {moment.unix(item.createdAt).format("HH:MM A")}
          </p>
        </div>
      </div>
      <img
        src={item.eventImg}
        className="w-10 h-10 rounded-md object-cover"
        alt="event-activity"
      />
    </div>
  );
};

export default ActivityListItem;
