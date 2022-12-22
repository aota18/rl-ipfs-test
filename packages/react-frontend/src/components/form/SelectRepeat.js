import React from "react";
import { Select } from "@windmill/react-ui";

const SelectRepeat = ({ register, name, label }) => {
  return (
    <>
      <Select
        className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Repeat
        </option>
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
        <option value="YEARLY">Yearly</option>
      </Select>
    </>
  );
};

export default SelectRepeat;
