import { useState } from "react";
import { AiOutlineCalendar, AiOutlineUnorderedList } from "react-icons/ai";

const toggleItems = [
  {
    icon: <AiOutlineCalendar />,
    name: "Calendar View",
    isClicked: true,
  },
  {
    icon: <AiOutlineUnorderedList />,
    name: "List View",
    isClicked: false,
  },
];

const ViewToggle = () => {
  const [itemList, setItemList] = useState(toggleItems);

  const onClickItem = (itemId) => {
    setItemList((prev) =>
      prev.map((item, id) => {
        if (itemId === id) {
          return { ...item, isClicked: true };
        } else return { ...item, isClicked: false };
      })
    );
  };

  return (
    <div className="flex space-x-2">
      {itemList.map((item, id) => (
        <div
          key={id}
          className={`flex items-center rounded bg-gray-100 py-2 px-4 space-x-2 cursor-pointer ${
            id === 0 ? "rounded-l-3xl" : ""
          } ${id === itemList.length - 1 ? "rounded-r-3xl" : ""}`}
          onClick={() => onClickItem(id)}
        >
          {item.icon}
          {item.isClicked && <span>{item.name}</span>}
        </div>
      ))}
    </div>
  );
};

export default ViewToggle;
