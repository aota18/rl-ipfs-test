import React, { useState } from "react";
import HeaderNavigator from "../components/header-navigator/HeaderNavigator";
import PageTitle from "../components/page-title/PageTitle";
import Tab from "../components/tab/Tab";
import TicketList from "../components/tickets/TicketList";
import useQuery from "../hooks/useQuery";

const tabs = [
  { id: 0, name: "Ongoing", href: "#" },
  { id: 1, name: "Past", href: "#" },
];

const EventSearch = () => {
  const query = useQuery();
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const handleChange = (tabs, id) => {
    console.log("selcted ID: ", id);
    setCurrentTab(tabs[id]);
  };

  return (
    <div className="p-4">
      <HeaderNavigator back search />
      <PageTitle text={query.get("title")} />

      <Tab tabs={tabs} currentTab={currentTab} handleChange={handleChange} />

      <div className="my-4">
        <TicketList />
      </div>
    </div>
  );
};

export default EventSearch;
