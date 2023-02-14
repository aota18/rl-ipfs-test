import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import HeaderNavigator from '../components/header-navigator/HeaderNavigator';
import Loading from '../components/Loading';
import PageTitle from '../components/page-title/PageTitle';
import Tab from '../components/tab/Tab';
import TicketList from '../components/tickets/TicketList';
import { SidebarContext } from '../context/SidebarContext';
import useAsync from '../hooks/useAsync';
import TicketServices from '../services/TicketServices';

const tabs = [
  { id: 0, name: 'Upcoming', href: '#' },
  { id: 1, name: 'Previous', href: '#' },
];

const Tickets = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { searchText } = useContext(SidebarContext);

  const handleChange = (tabs, id) => {
    setCurrentTab(tabs[id]);
  };

  useEffect(() => {
    let unmounted = false;

    if (currentTab.name === 'Upcoming') {
      TicketServices.getAllTickets({
        page,
        limit,
        from: moment().unix(),
        search: searchText,
      })
        .then((res) => {
          if (!unmounted) {
            setData(res.data);
            setError('');
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!unmounted) {
            setError(err.message);
            setLoading(false);
            setData([]);
          }
        });
    } else {
      TicketServices.getAllTickets({
        page,
        limit,
        previous: true,
        search: searchText,
      })
        .then((res) => {
          if (!unmounted) {
            setData(res.data);
            setError('');
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!unmounted) {
            setError(err.message);
            setLoading(false);
            setData([]);
          }
        });
    }

    return () => {
      unmounted = true;
    };
  }, [currentTab, searchText]);

  return (
    <div className="p-4">
      <HeaderNavigator search />
      <PageTitle text="Tickets" />

      <Tab tabs={tabs} currentTab={currentTab} handleChange={handleChange} />

      <div className="my-4">
        {loading ? <Loading /> : <TicketList items={data.items} />}
      </div>
    </div>
  );
};

export default Tickets;
