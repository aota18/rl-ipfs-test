import React from "react";
import { Select } from "@windmill/react-ui";

const SelectGender = ({
  setGender,
  register,
  name,
  label,
  defaultValue,
  required,
}) => {
  return (
    <>
      <Select
        onChange={(e) => setGender(e.target.value)}
        className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? `${label} is required!` : false,
        })}
      >
        <option value="" defaultValue hidden>
          Gender
        </option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHERS">Others</option>
      </Select>
    </>
  );
};

export default SelectGender;
