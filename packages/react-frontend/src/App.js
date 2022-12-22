import React, { lazy, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "./utils/toast";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import { useStateMachine } from "little-state-machine";
import { updateInvites } from "./actions/updateInvites";
import { AdminContext } from "./context/AdminContext";
import NotFound from "./pages/404";
import routes from "./routes";
import Main from "./layout/Main";
import BottomNavigation from "./components/bottom-navigtation/BottomNavigation";
import EventSelectModal from "./components/modal/EventSelectModal";
import { SignUpProvider } from "./context/SignupContext";
import PersonalInfo from "./pages/SignUp/PersonalInfo";
import MintSBT from "./pages/SignUp/MintSBT";
import EnsSubdomain from "./pages/SignUp/EnsSubdomain";
import SetLocation from "./pages/SignUp/SetLocation";
import NeedSignupModal from "./components/modal/NeedSignupModal";
import Home from "./pages/Home";
import WalletSelectModal from "./components/modal/WalletSelectModal";

const App = () => {
  return (
    <>
      <ToastContainer />

      <Router>
        <WalletSelectModal />
        <NeedSignupModal />
        <AccessibleNavigationAnnouncer />
        <Routes>
          <Route>
            <Route path="/" element={<PrivateRoute />}>
              {routes.map((route, i) => {
                if (route.element) {
                  if (route.path === "/create-event/*") {
                    return (
                      <Route
                        key={i}
                        exact={true}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={i}
                        path={route.path}
                        element={route.element}
                      />
                    );
                  }
                } else return null;
              })}

              <Route path="/" element={<Navigate replace to="/home" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/home" element={<Home />} />
            <Route path="/signup/*" element={<SignUpProvider />}>
              <Route index element={<PersonalInfo />} />
              <Route path={`mint-sbt`} element={<MintSBT />} />
              <Route path={`ens-subdomain`} element={<EnsSubdomain />} />
              <Route path={`set-location`} element={<SetLocation />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

const PrivateRoute = ({ children }) => {
  // const {
  //   state: { user },
  // } = useContext(AdminContext);

  // const { actions } = useStateMachine({
  //   updateInvites,
  // });

  // let location = useLocation();
  // let query = useQuery();

  /* Event Invitation */

  // useEffect(() => {
  //   if (query.get("i") && query.get("i") === "t") {
  //     actions.updateInvites({
  //       from: query.get("from"),
  //       type: query.get("type"),
  //       eventId: query.get("e"),
  //     });
  //   }
  // }, []);

  // if (!user) {
  //   return <Navigate to="/connect" state={{ from: location }} replace />;
  // }

  return (
    <>
      <Main>
        <EventSelectModal />
        <NeedSignupModal />
        {children}
        <Outlet />
      </Main>{" "}
      <BottomNavigation />
    </>
  );
};

export default App;
