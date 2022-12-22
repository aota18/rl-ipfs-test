import React from "react";
import { useParams } from "react-router-dom";
import HeaderNavigator from "../../components/header-navigator/HeaderNavigator";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import PageTitle from "../../components/page-title/PageTitle";
import UserList from "../../components/users/UserList";
import useAsync from "../../hooks/useAsync";
import useQuery from "../../hooks/useQuery";
import TicketServices from "../../services/TicketServices";

const TicketHolders = () => {
  const query = useQuery();

  const { data, loading } = useAsync(() => {
    return TicketServices.getTicketHolders(query.get("e"));
  });

  return (
    <div className="p-4">
      <HeaderNavigator back search />
      <PageTitle text="Ticket Holders" />
      {loading ? (
        <Loading />
      ) : !data.items.length ? (
        <NotFound title={"Ticket Holders"} />
      ) : (
        <UserList items={data.items} />
      )}
    </div>
  );
};

export default TicketHolders;
