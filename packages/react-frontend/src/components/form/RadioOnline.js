import React from "react";
import { Input, Label } from "@windmill/react-ui";

const RadioOnline = ({ register, name, defaultValue }) => {
  return (
    <>
      <Label radio className="grid grid-cols-8 gap-4">
        <div className="col-span-4">
          <Input
            type="radio"
            {...register(`${name}`)}
            value="online"
            defaultChecked={defaultValue ? false : true}
            defaultValue={defaultValue}
          />
          <span className="ml-2">Online</span>
        </div>
        <div className="col-span-4">
          <Input
            type="radio"
            {...register(`${name}`)}
            value="offline"
            defaultValue={defaultValue}
          />
          <span className="ml-2">Offline</span>
        </div>
      </Label>
    </>
  );
};

export default RadioOnline;
