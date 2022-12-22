import React from "react";
import { Input, Label } from "@windmill/react-ui";

const RadioRecurrence = ({ register, name }) => {
  return (
    <>
      <Label radio className="grid grid-cols-8 gap-4">
        <div className="col-span-4">
          <Input type="radio" {...register(`${name}`)} value="one" checked />
          <span className="ml-2">One-time</span>
        </div>
        <div className="col-span-4">
          <Input type="radio" {...register(`${name}`)} value="recurring" />
          <span className="ml-2">Recurring Event</span>
        </div>
      </Label>
    </>
  );
};

export default RadioRecurrence;
