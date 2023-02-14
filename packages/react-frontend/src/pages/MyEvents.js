import { useState } from 'react';
import { AiOutlineCalendar, AiOutlineUnorderedList } from 'react-icons/ai';
import CalendarViewList from '../components/events/CalendarViewList';
import InvitedEventList from '../components/events/InvitedEventList';
import ViewToggle from '../components/events/ViewToggle';
import Loading from '../components/Loading';
import PageTitle from '../components/page-title/PageTitle';
import Tab from '../components/tab/Tab';
import useAsync from '../hooks/useAsync';
import EventServices from '../services/EventServices';
import InvitationServices from '../services/InvitationServices';

const tabs = [
  { id: 0, name: 'Going', href: '#' },
  { id: 1, name: 'Invited', href: '#' },
];

const toggleItems = [
  {
    icon: <AiOutlineCalendar />,
    name: 'Calendar View',
    isClicked: true,
  },
  {
    icon: <AiOutlineUnorderedList />,
    name: 'List View',
    isClicked: false,
  },
];

const MyEvents = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [itemList, setItemList] = useState(toggleItems);

  const onClickItem = (itemId) => {
    setItemList((prev) =>
      prev.map((item, id) => {
        if (itemId === id) {
          return { ...item, isClicked: true };
        } else return { ...item, isClicked: false };
      }),
    );
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useAsync(() => {
    return EventServices.getMyEvents({ page, limit });
  });

  const { data: invitations, loading: loadingInvitations } = useAsync(() => {
    return InvitationServices.getAllInvitations({ page, limit });
  });

  const handleChange = (tabs, id) => {
    setCurrentTab(tabs[id]);
  };

  return (
    <div className="p-4">
      <PageTitle text="My Events" />

      <Tab tabs={tabs} currentTab={currentTab} handleChange={handleChange} />

      <div className="flex space-x-4 my-4">
        <ViewToggle itemList={itemList} onClickItem={onClickItem} />
      </div>

      {/* <CalendarViewList /> */}
      <div className="my-4">
        {loading ? (
          <Loading />
        ) : currentTab.id === 0 ? (
          <CalendarViewList items={data.items} />
        ) : (
          <InvitedEventList items={invitations.items} />
        )}
      </div>
    </div>
  );
};

export default MyEvents;
