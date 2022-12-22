import React from "react";

const AboutListItem = ({ item }) => {
  return (
    <div className="flex flex-col space-y-2 py-4 border-t border-b border-gray-300 p-4">
      <h1 className="text-lg ">{item.title}</h1>
      {item.description}
      <a className="text-blue-500 text-xs" href={item.link}>
        {item.linkLabel}
      </a>
    </div>
  );
};

export default AboutListItem;
