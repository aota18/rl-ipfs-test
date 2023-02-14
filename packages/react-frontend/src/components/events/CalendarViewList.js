import React from 'react';
import moment from 'moment';
import CalendarViewListItem from './CalendarViewListItem';
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';

const CalendarViewList = ({ items }) => {
  let viewList = {};

  // find year put hash if doesn't have a key

  items.forEach((item) => {
    console.log(moment.unix(item.eventStartDt));
    let eventDt = moment.unix(item.eventStartDt);
    let yearKey = eventDt.year();
    let mdKey = `${eventDt.format('MMM')}/${eventDt.day()}`;

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
      {items && items.length !== 0 ? (
        Object.keys(viewList)
          .sort(sortByYear)
          .map((year, id) => (
            <div key={id} className="text-sm">
              <span>{year}</span>

              <div className="border-l border-gray-300 flex flex-col space-y-4">
                {Object.values(viewList[year]).map((dateList, id) =>
                  dateList.map((event, id) => (
                    <Link to={`/event?e=${event.id}`} key={id}>
                      <CalendarViewListItem item={event} key={id} idx={id} />
                    </Link>
                  )),
                )}
              </div>
            </div>
          ))
      ) : (
        <NotFound title={'Events'} />
      )}
    </div>
  );
};

export default CalendarViewList;
