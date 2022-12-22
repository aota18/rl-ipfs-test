import React, { useState } from "react";

const CardSelectList = ({ items, selectedCard, onSelectCard }) => {
  return (
    <div className="flex space-x-4">
      {items.map((item, id) => (
        <div
          key={id}
          onClick={() => onSelectCard(item.id)}
          style={{ backgroundImage: `url(${item.url})` }}
          className={`w-20 h-20 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer flex flex-col justify-end items-center space-y-1 p-1 bg-cover`}
        >
          {selectedCard.id === id && (
            <span className="text-xs text-white bg-green-500 px-2 rounded-md ">
              Selected
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardSelectList;
