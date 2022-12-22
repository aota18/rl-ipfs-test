import React from "react";
import ActivityListItem from "./ActivityListItem";

const mockItems = [
  {
    id: 1,
    profileImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    user: "Barbara Michelle",
    eventName: "Mock Event 2022",
    createdAt: 1664484998,
  },
  {
    id: 2,
    profileImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    user: "Barbara Michelle",
    eventName: "Mock Event 2022",
    createdAt: 1664484998,
  },
  {
    id: 3,
    profileImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    eventImg:
      "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg",
    user: "Barbara Michelle",
    eventName: "Mock Event 2022",
    createdAt: 1664484998,
  },
];

const ActivityList = () => {
  return (
    <div className="flex flex-col space-y-4">
      {mockItems.map((item, id) => (
        <ActivityListItem key={id} item={item} />
      ))}
    </div>
  );
};

export default ActivityList;
