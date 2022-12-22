import React from "react";
import { Link } from "react-router-dom";
import NotFound from "../NotFound";
import TicketListItem from "./TicketListItem";

const TicketList = ({ items }) => {
  return (
    <div className="flex flex-col space-y-4">
      {items.length !== 0 ? (
        items.map((item, id) => (
          <Link to={`/ticket?t=${item.id}`} state={{ item }} key={id}>
            <TicketListItem item={item} />
          </Link>
        ))
      ) : (
        <NotFound title={"Tickets"} />
      )}
    </div>
  );
};

export default TicketList;
