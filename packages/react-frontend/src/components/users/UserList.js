import React from "react";
import UserListItem from "./UserListItem";

const UserList = ({ items, isAttended }) => {
  return (
    <div>
      {items.map((item, id) => (
        <UserListItem key={id} item={item} isAttended={isAttended} />
      ))}
    </div>
  );
};

export default UserList;
