import React, { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import SelectPlane from "./SelectPlane";

const getNumberOptions = (from, to) => {
  let options = [];

  for (let i = from; i <= to; i++) {
    let label = i;

    if (i < 10) {
      label = `0${i}`;
    }
    options.push({ value: i, label });
  }

  return options;
};

const meridiemOptions = () => {
  let options = [];
  options.push({ value: "AM", label: "AM" });
  options.push({ value: "PM", label: "PM" });
  return options;
};

/*
* TODO : HOW TO MERGE WITH DATES?

==> Turn into seconds and add to date.
*/
const TimePicker = ({ onChange, selected }) => {
  const [hours, setHours] = useState(9);
  const [minutes, setMinutes] = useState(0);
  const [meridiem, setMeridiem] = useState("AM");

  const [isSelected, setIsSelected] = useState(false);

  const togglePicker = () => {
    setIsSelected(!isSelected);
  };

  // const onSelectTime = (type, value) => {
  //   let h = hours;
  //   let m = minutes;
  //   let d = meridiem;

  //   if (type === "h") {
  //     h = value;
  //   } else if (type === "m") {
  //     m = value;
  //   } else {
  //     d = value;
  //   }

  //   let hoursToSecs = h * 3600;
  //   let minutesToSecs = minutes * 60;
  //   let meridiemToSecs = meridiem === "AM" ? 0 : 12 * 3600;

  //   return hoursToSecs + minutesToSecs + meridiemToSecs;
  // };

  useEffect(() => {
    let hoursToSecs = hours * 3600;
    let minutesToSecs = minutes * 60;
    let meridiemToSecs = meridiem === "AM" ? 0 : 12 * 3600;

    onChange(hoursToSecs + minutesToSecs + meridiemToSecs);
  }, [hours, minutes, meridiem]);

  return (
    <div className="flex items-center space-x-2">
      <AiOutlineClockCircle
        className="cursor-pointer hover:text-gray-500"
        onClick={() => {
          togglePicker();
        }}
      />

      <span>
        <div className="flex items-center">
          <SelectPlane
            value={hours}
            options={getNumberOptions(1, 12)}
            onSelect={setHours}
          />
          <span>:</span>
          <SelectPlane
            value={minutes}
            options={getNumberOptions(0, 60)}
            onSelect={setMinutes}
          />

          <SelectPlane
            value={meridiem}
            options={meridiemOptions()}
            onSelect={setMeridiem}
          />
        </div>
      </span>
    </div>
  );
};

export default TimePicker;
