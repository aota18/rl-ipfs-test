import { useStateMachine } from "little-state-machine";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearInvites } from "../actions/updateInvites";
import EventList from "../components/events/EventList";
import Loading from "../components/Loading";
import PageTitle from "../components/page-title/PageTitle";
import ActivityList from "../components/recent-activities/ActivityList";
import { AdminContext } from "../context/AdminContext";
import useAsync from "../hooks/useAsync";
import useToggleDrawer from "../hooks/useToggleDrawer";
import EventServices from "../services/EventServices";
import InvitationServices from "../services/InvitationServices";
import { notifyError } from "../utils/toast";

const Explore = () => {
  const {
    state: { user },
  } = useContext(AdminContext);

  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ clearInvites });
  const { handleModalOpen } = useToggleDrawer();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useAsync(() => {
    return EventServices.getAllEvents({ page, limit });
  });

  useEffect(() => {
    if ("invites" in state && Object.keys(state?.invites).length !== 0) {
      if (user.isGuest) handleModalOpen("needSignup");
      else {
        console.log(user.id);
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
        createInvitationInput
      );
      navigate("/my-events");
    } catch (err) {
      notifyError(err);
    }
  };

  return (
    <div className="p-4">
      {/* <HeaderNavigator /> */}
      <div className="flex flex-col space-y-2">
        <PageTitle text="Explore" />

        <div className="flex justify-between items-center">
          <SmallTitle text={"NFT Museum"} />
          <h2 className="text-md mb-4 lg:text-xl">Ranking</h2>
        </div>

        <div className="h-96 overflow-y-auto sm:h-full lg:h-full">
          {/* <Button onClick={handleModalOpen}>Toggle Modal</Button> */}
          {loading ? <Loading /> : <EventList items={data.items} />}
        </div>

        <div className="flex-1 overflow-y-auto sm:hidden">
          <SmallTitle text={"Recent Activities"} />

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
