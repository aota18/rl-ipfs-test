import { Select } from '@windmill/react-ui';
import { useStateMachine } from 'little-state-machine';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearInvites } from '../actions/updateInvites';
import EventList from '../components/events/EventList';
import Loading from '../components/Loading';
import PageTitle from '../components/page-title/PageTitle';
import ActivityList from '../components/recent-activities/ActivityList';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import useAsync from '../hooks/useAsync';
import useToggleDrawer from '../hooks/useToggleDrawer';
import EventServices from '../services/EventServices';
import InvitationServices from '../services/InvitationServices';
import { notifyError } from '../utils/toast';

const Explore = () => {
  const {
    state: { user },
  } = useContext(AdminContext);

  const { sortedField, setSortedField } = useContext(SidebarContext);

  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ clearInvites });
  const { handleModalOpen } = useToggleDrawer();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useAsync(() => {
    return EventServices.getAllEvents({ page, limit, sortBy: sortedField });
  });

  useEffect(() => {
    if ('invites' in state && Object.keys(state?.invites).length !== 0) {
      if (user.isGuest) handleModalOpen('needSignup');
      else {
        // TODO: Save Invites for this user.
        // create event invite
        // then show Invite Event Modal (event code)
        createInvitation({
          from: state.invites.from,
          eventId: state.invites.eventId,
          to: user.id,
        });

        actions.clearInvites();
      }
    }
  }, []);

  const createInvitation = async (createInvitationInput) => {
    try {
      const res = await InvitationServices.createInvitation(
        createInvitationInput,
      );
      navigate('/my-events');
    } catch (err) {
      notifyError(err);
    }
  };

  const onSelectSortOption = (e) => {
    setSortedField(e.target.value);
  };

  return (
    <div className="p-4">
      {/* <HeaderNavigator /> */}
      <div className="flex flex-col space-y-2">
        <PageTitle text="Explore" />

        <div className="flex justify-between items-center">
          <SmallTitle text={'NFT Museum'} />
          <h2 className="text-md mb-4 lg:text-xl">Ranking</h2>
        </div>

        <div>
          <Select
            className="border h-10 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
            name={'sortOption'}
            onChange={onSelectSortOption}
          >
            <option value="ticketPrice">Ticket Price Low to High</option>
            <option value="numOfParticipants">Number of participants</option>
            <option value="mintDate">Mint Date</option>
          </Select>
        </div>

        <div className="h-96 overflow-y-auto sm:h-full lg:h-full">
          {loading ? <Loading /> : <EventList items={data.items} />}
        </div>

        <div className="flex-1 overflow-y-auto sm:hidden">
          <SmallTitle text={'Recent Activities'} />

          <ActivityList />
        </div>
      </div>
    </div>
  );
};

const SmallTitle = ({ text }) => {
  return <h2 className="text-md font-bold mb-4 lg:text-xl">{text}</h2>;
};

export default Explore;
