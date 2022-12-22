import React from "react";
import { Input, Label } from "@windmill/react-ui";

const RadioPrivacy = ({ onChange, register, name, defaultValue }) => {
  return (
    <>
      <Label radio className="grid grid-cols-8 gap-4">
        <div className="col-span-4">
          <Input
            type="radio"
            {...register(`${name}`)}
            value="PUBLIC"
            onClick={(e) => onChange(e.target.value)}
            defaultChecked={defaultValue ? false : true}
            defaultValue={defaultValue}
          />
          <span className="ml-2">Public</span>
        </div>
        <div className="col-span-4">
          <Input
            type="radio"
            {...register(`${name}`)}
            value="PRIVATE"
            onClick={(e) => onChange(e.target.value)}
            defaultValue={defaultValue}
          />
          <span className="ml-2">Private</span>
        </div>
      </Label>
    </>
  );
};

export default RadioPrivacy;
