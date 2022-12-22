import React from "react";
import { Textarea } from "@windmill/react-ui";

const TextArea = ({
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
      <Textarea
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
        rows={4}
        className=" p-2 border  text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white resize-none"
      />
    </>
  );
};

export default TextArea;
