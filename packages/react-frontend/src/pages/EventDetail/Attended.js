import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderNavigator from '../../components/header-navigator/HeaderNavigator';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import PageTitle from '../../components/page-title/PageTitle';
import Tab from '../../components/tab/Tab';
import UserList from '../../components/users/UserList';
import useQuery from '../../hooks/useQuery';
import TicketServices from '../../services/TicketServices';

const tabs = [
  { id: 0, name: 'Not verified', value: 'REQUESTED', href: '#' },
  { id: 1, name: 'Verified', value: 'APPROVED', href: '#' },
];

const Attended = () => {
  const query = useQuery();

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleChange = (tabs, id) => {
    setCurrentTab(tabs[id]);
  };

  useEffect(() => {
    let unmounted = false;

    TicketServices.getTicketAttendees(query.get('e'), {
      status: currentTab.value,
    })
      .then((res) => {
        if (!unmounted) {
          setData(res);
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

    return () => {
      unmounted = true;
    };
  }, [currentTab]);
  return (
    <div className="p-4">
      <HeaderNavigator back search />
      <PageTitle text="Attended" />

      <Tab tabs={tabs} currentTab={currentTab} handleChange={handleChange} />
      <div className="my-4">
        {loading ? (
          <Loading />
        ) : !data.items.length ? (
          <NotFound title={'Attendees'} />
        ) : (
          <UserList
            items={data.items}
            isAttended={true}
            eventId={query.get('e')}
          />
        )}
      </div>
    </div>
  );
};

export default Attended;
