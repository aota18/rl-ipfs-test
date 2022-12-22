import { lazy } from "react";

// use lazy for better code splitting
const Home = lazy(() => import("../pages/Home"));
const Explore = lazy(() => import("../pages/Explore"));
const Tickets = lazy(() => import("../pages/Tickets"));
const TicketDetail = lazy(() => import("../pages/TicketDetail"));
const CreateEvent = lazy(() => import("../pages/CreateEvent"));
const GreetingCard = lazy(() => import("../pages/GreetingCard"));
const MyEvents = lazy(() => import("../pages/MyEvents"));
const EventDetail = lazy(() => import("../pages/EventDetail"));
const Profile = lazy(() => import("../pages/Profile"));
const EventSearch = lazy(() => import("../pages/EventSearch"));
// const Setting = lazy(() => import("../pages/Setting"));
const Page404 = lazy(() => import("../pages/404"));
const ReadMore = lazy(() => import("../pages/ReadMore"));
const Test = lazy(() => import("../pages/Test"));

/*
//  * ⚠ These are internal routes!
//  * They will be rendered inside the app, using the default `containers/Layout`.
//  * If you want to add a route to, let's say, a landing page, you should add
//  * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
//  * are routed.
//  *
//  * If you're looking for the links rendered in the SidebarContent, go to
//  * `routes/sidebar.js`
 */

const routes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/create-event/*",
    element: <CreateEvent />,
  },
  {
    path: "/greeting-card/*",
    element: <GreetingCard />,
  },
  {
    path: "/tickets",
    element: <Tickets />,
  },
  {
    path: "/my-events",
    element: <MyEvents />,
  },
  {
    path: "/ticket",
    element: <TicketDetail />,
  },
  {
    path: "/event/*",
    element: <EventDetail />,
  },
  {
    path: "/profile/*",
    element: <Profile />,
  },
  {
    path: "/search",
    element: <EventSearch />,
  },
  {
    path: "/read-more",
    element: <ReadMore />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/404",
    element: <Page404 />,
  },
];

export default routes;
