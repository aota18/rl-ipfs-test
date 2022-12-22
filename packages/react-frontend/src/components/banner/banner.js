import React from "react";
import { HiLockClosed } from "react-icons/hi";
import { getColors } from "../../utils/status";

/*
@props
Type : success | danger | alert | info | base
Icon : React Icon
Message: string
*/

/* 
TODO : icon implementation
*/
const Banner = ({ type, icon, message }) => {
  return (
    <div className={`w-full bg-${getColors(type)}-50 py-3 px-4`}>
      <div
        className={`flex items-center space-x-2 text-${getColors(
          type
        )}-500 text-sm`}
      >
        <HiLockClosed className="w-5 h-5" />
        <span className="">{message}</span>
      </div>
    </div>
  );
};

export default Banner;
