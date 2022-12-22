import React from "react";
import { Input, Label } from "@windmill/react-ui";

const RadioTicketType = ({ register, name }) => {
  return (
    <>
      <Label radio className="grid grid-cols-8 gap-4">
        <div className="col-span-4">
          <Input type="radio" {...register(`${name}`)} value="FREE" />
          <span className="ml-2">Free</span>
        </div>
        <div className="col-span-4">
          <Input type="radio" {...register(`${name}`)} value="PAID" />
          <span className="ml-2">Paid</span>
        </div>
      </Label>
    </>
  );
};

export default RadioTicketType;
