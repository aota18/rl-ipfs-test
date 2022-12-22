import React from "react";

const SelectPlane = ({ value, options, onSelect }) => {
  return (
    <select
      defaultValue={value}
      style={{
        MozAppearance: "none",
        WebkitAppearance: "none",
      }}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((option, id) => (
        <option key={id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectPlane;
