import React from "react";
import PageTitle from "../page-title/PageTitle";

const mockItems = [
  {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Brave Entertain",
    numOfTickets: 1,
  },
  {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Brave Entertain",
    numOfTickets: 1,
  },
  {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Brave Entertain",
    numOfTickets: 1,
  },
  {
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    name: "Brave Entertain",
    numOfTickets: 1,
  },
];

const TicketHolderList = () => {
  return (
    <div>
      <PageTitle text={"Ticket-Holders"} />

      <div className="flex-flex-col space-y-4">
        {mockItems.map((item, id) => (
          <div className="flex" key={id}>
            <img
              src={item.profileImg}
              style={{ width: "45px", heigth: "45px" }}
            />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span>{item.numOfTickets} ticket</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketHolderList;
