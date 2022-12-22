import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AiTwotoneCalendar } from "react-icons/ai";
import moment from "moment";

const DatePicker = ({ onChange, selected }) => {
  const [isOnSelectDate, setIsOnSelectDate] = useState(false);

  const toggleCalendarPicker = () => {
    setIsOnSelectDate(!isOnSelectDate);
  };

  const onSelectDate = (e) => {
    // Toggle the function
    onChange(e);
    toggleCalendarPicker();
  };

  const showDateString = () => {
    if (selected) {
      if (typeof selected === "number") {
        return <span>{moment.unix(selected).format("MMM DD, YYYY")}</span>;
      } else {
        return <span>{moment(selected).format("MMM DD, YYYY")}</span>;
      }
    } else {
      return <span className="text-gray-500">Select Date</span>;
    }
  };

  useEffect(() => {}, [selected]);

  return (
    <>
      <div className="flex flex-col ">
        <div
          className="flex items-center space-x-2 cursor-pointer "
          onClick={() => {
            toggleCalendarPicker();
          }}
        >
          <AiTwotoneCalendar className="text-gray-500" />
          {showDateString()}
        </div>
        <div>
          {isOnSelectDate && (
            <DayPicker
              fromYear={1920}
              toYear={2025}
              captionLayout="dropdown"
              mode="single"
              selected={selected ? selected : moment()}
              onSelect={onSelectDate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DatePicker;
