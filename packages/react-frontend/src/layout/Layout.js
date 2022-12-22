import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";

import Main from "./Main";
import routes from "../routes";
import { SidebarContext } from "../context/SidebarContext";
import ThemeSuspense from "../components/theme/ThemeSuspense";
import BottomNavigation from "../components/bottom-navigtation/BottomNavigation";
import { StateMachineProvider } from "little-state-machine";
import EventSelectModal from "../components/modal/EventSelectModal";
import Sidebar from "../components/sidebar/Sidebar";

const Page404 = lazy(() => import("../pages/404"));

const Layout = () => {
  console.log("im layout");
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  let location = useLocation();

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    // <div
    //   className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
    //     isSidebarOpen && "overflow-hidden"
    //   }`}
    // >
    //   {/* <Sidebar /> */}
    //   <div className="flex flex-col flex-1 w-full">
    <Main></Main>
    //   </div>
    // </div>
  );
};

export default Layout;
