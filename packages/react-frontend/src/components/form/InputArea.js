import React from "react";
import { Input } from "@windmill/react-ui";

const InputArea = ({
  disabled,
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  step,
  placeholder,
  maxLength,
}) => {
  return (
    <>
      <Input
        {...register(`${name}`, {
          required: required ? `${label} is required!` : false,
          maxLength: maxLength
            ? {
                value: maxLength,
                message: `text cannot be over ${maxLength} characters`,
              }
            : false,
        })}
        disabled={disabled}
        defaultValue={defaultValue}
        type={type}
        step={step}
        placeholder={placeholder}
        name={name}
        className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
      />
    </>
  );
};

export default InputArea;
