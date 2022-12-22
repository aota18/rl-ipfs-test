import { Button } from "@windmill/react-ui";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketServices from "../../services/TicketServices";
import { mock } from "../../utils/mock";
import { notifyError, notifySuccess } from "../../utils/toast";

const UserListItem = ({ item, isAttended }) => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const verify = async () => {
    try {
      const result = await TicketServices.verify(item.id);

      if (result.status !== 200) {
        throw new Error("Cannot verify ticket!");
      }

      setIsVerified(true);
    } catch (err) {
      console.error(err);
      notifyError(err.message);
    }
  };
  return (
    <div className="flex items-center space-x-4 ">
      <img
        src={item.owner ? item.owner.profileURL : mock.profileImg}
        className="w-12 h-12 rounded-full"
        alt="profile"
      />

      <div className="flex justify-between w-full border-b ">
        <div className="flex flex-col space-y-0 items-start justify-center pt-2 py-4 ">
          <span>
            {item.owner.firstName} {item.owner.lastName}
          </span>
          <span className="text-sm text-gray-400 ">
            {isAttended
              ? `Timestamp: ${moment(item.createdAt).format(
                  "YYYY/MM/DD hh:mm"
                )}`
              : "1 Ticket"}
          </span>
        </div>
        {isAttended && item.permission !== "APPROVED" && (
          <Button
            disabled={isVerified}
            onClick={verify}
            layout="primary"
            style={{
              backgroundColor: "#4CD964",
            }}
          >
            {isVerified ? "Verified" : "Verify"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserListItem;
