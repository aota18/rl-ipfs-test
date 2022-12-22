import React from "react";
import { Select } from "@windmill/react-ui";

const SelectEventType = ({
  setEventType,
  register,
  name,
  label,
  defaultValue,
}) => {
  return (
    <>
      <Select
        className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
        name={name}
        defaultValue={defaultValue}
        {...register(`${name}`, {
          required: `${label} is required!`,
          onChange: (e) => {
            setEventType(e.target.value);
          },
        })}
      >
        <option value="" hidden>
          Event
        </option>
        <option value="PERSONAL">Personal</option>
        <option value="MARRIAGE">Marriage</option>
        <option value="PROMOTION">Promotion</option>
        <option value="GRADUATION">Graduation</option>
        <option value="EVENT">Event</option>
        <option value="GETTOGETHER">Get-Together</option>
      </Select>
    </>
  );
};

export default SelectEventType;
