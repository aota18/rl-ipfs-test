import React from "react";
import { Select } from "@windmill/react-ui";

const SelectMarried = ({
  setMarried,
  register,
  name,
  label,
  defaultValue,
  required,
}) => {
  return (
    <>
      <Select
        className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? `${label} is required!` : false,
          onChange: (e) => {
            setMarried(e.target.value);
          },
        })}
        defaultValue={defaultValue}
      >
        <option value="" defaultValue hidden>
          Select Married
        </option>
        <option value={"YES"}>Yes</option>
        <option value={"NO"}>No</option>
      </Select>
    </>
  );
};

export default SelectMarried;
