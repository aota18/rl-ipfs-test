import { useState, useEffect } from "react";
import CalendarViewList from "../components/events/CalendarViewList";
import InvitedEventList from "../components/events/InvitedEventList";
import ViewToggle from "../components/events/ViewToggle";
import Loading from "../components/Loading";
import PageTitle from "../components/page-title/PageTitle";
import Tab from "../components/tab/Tab";
import useAsync from "../hooks/useAsync";
import EventServices from "../services/EventServices";
import InvitationServices from "../services/InvitationServices";

const tabs = [
  { id: 0, name: "Going", href: "#" },
  { id: 1, name: "Invited", href: "#" },
];

const MyEvents = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useAsync(() => {
    if (currentTab.id === 1) {
      return InvitationServices.getAllInvitations({ page, limit });
    } else {
      return InvitationServices.getAllInvitations({ page, limit });
    }
  });

  const handleChange = (tabs, id) => {
    setCurrentTab(tabs[id]);
  };

  return (
    <div className="p-4">
      <PageTitle text="My Events" />

      <Tab tabs={tabs} currentTab={currentTab} handleChange={handleChange} />

      <div className="flex space-x-4 my-4">
        <ViewToggle />
      </div>

      {/* <CalendarViewList /> */}
      <div className="my-4">
        {loading ? <Loading /> : <InvitedEventList items={data.items} />}
      </div>
    </div>
  );
};

export default MyEvents;
