import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";
import EventListItem from "./EventListItem";

const EventList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items && items.length !== 0 ? (
        items.map((item, id) => (
          <div className="cursor-pointer" key={id}>
            <Link to={`/event?e=${item.id}`} state={{ item }}>
              <EventListItem item={item} />
            </Link>
          </div>
        ))
      ) : (
        <NotFound title={"Events"} />
      )}
    </div>
  );
};

export default EventList;
