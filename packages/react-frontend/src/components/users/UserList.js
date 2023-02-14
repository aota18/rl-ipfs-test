import React from 'react';
import UserListItem from './UserListItem';

const UserList = ({ items, isAttended, eventId }) => {
  return (
    <div>
      {items.map((item, id) => (
        <UserListItem
          key={id}
          item={item}
          isAttended={isAttended}
          eventId={eventId}
        />
      ))}
    </div>
  );
};

export default UserList;
