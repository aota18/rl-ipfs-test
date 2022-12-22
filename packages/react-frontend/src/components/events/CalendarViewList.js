import React from "react";
import moment from "moment";
import CalendarViewListItem from "./CalendarViewListItem";
import { Link } from "react-router-dom";

const mockItems = [
  {
    eventName: "A1",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment(),
    ticketStatus: "Used",
  },
  {
    eventName: "A2",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment().subtract(1, "years"),
    ticketStatus: "Used",
  },
  {
    eventName: "A3",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment().subtract(366, "days"),
    ticketStatus: "Used",
  },
  {
    eventName: "A4",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment().subtract(366, "days"),
    ticketStatus: "Used",
  },
  {
    eventName: "A5",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment().subtract(1, "days"),
    ticketStatus: "Used",
  },
  {
    eventName: "A6",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment().subtract(1, "days"),
    ticketStatus: "Used",
  },
  {
    eventName: "A6",
    eventAddress: "Hyatt Regionce San Francisco",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventDate: moment().subtract(2, "days"),
    ticketStatus: "Used",
  },
];

const CalendarViewList = ({ items }) => {
  let viewList = {};

  // find year put hash if doesn't have a key

  mockItems.forEach((item) => {
    let eventDt = item.eventDate;
    let yearKey = eventDt.year();
    let mdKey = `${eventDt.format("MMM")}/${eventDt.day()}`;

    if (yearKey in viewList) {
      if (mdKey in viewList[yearKey]) {
        viewList[yearKey][mdKey].push(item);
      } else {
        viewList[yearKey][mdKey] = [item];
      }
    } else {
      viewList[yearKey] = {
        [mdKey]: [item],
      };
    }
  });

  // Descending Year
  const sortByYear = (a, b) => {
    return b - a;
  };

  // const sortByDt = (a, b) => {
  //   return a.eventDate, b.eventDate;
  // };

  // Sort

  return (
    <div className="">
      {Object.keys(viewList)
        .sort(sortByYear)
        .map((year, id) => (
          <div key={id} className="text-sm">
            <span>{year}</span>

            <div className="border-l border-gray-300 flex flex-col space-y-4">
              {Object.values(viewList[year]).map((dateList, id) =>
                dateList.map((event, id) => (
                  <Link to={`/event?e=${id}`} key={id}>
                    <CalendarViewListItem item={event} key={id} idx={id} />
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CalendarViewList;
