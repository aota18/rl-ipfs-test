import React, { useState, createContext, useRef } from 'react';
import { serviceList } from '../data/serviceList';
import TicketServices from '../services/TicketServices';
import { notifySuccess } from '../utils/toast';

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  let interval;

  const [qrInterval, setQRInterval] = useState();
  const startQRInterval = (ticketId) => {
    interval = setInterval(() => {
      // Check if is scanned.
      TicketServices.getTicketInfo(ticketId).then((data) => {
        const ticketPermissionStatus = data.permission;

        if (ticketPermissionStatus === 'APPROVED') {
          notifySuccess('Ticket Successfully Verified!');
          closeModal('ticket');
          terminateQRInterval();
          clearInterval(interval);
        }
      });
    }, 1000);
    setQRInterval(interval);
  };

  const terminateQRInterval = () => {
    clearInterval(qrInterval);
  };
  /* 
  Share Modal
  */
  const [isModalOpen, setIsModalOpen] = useState({
    action: false,
    share: false,
    ticket: false,
    eventSelect: false,
    walletSelect: false,
    enterEvent: false,
    needSignup: false,
    sbt: false,
    imageView: false,
    qrScan: false,
  });

  const [service, setService] = useState(serviceList[0]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const resultsPerPage = 20;
  const [limitData, setLimitData] = useState(20);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);
  const [lang, setLang] = useState('');
  const [time, setTime] = useState('');
  const [sortedField, setSortedField] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [zone, setZone] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState(null);
  const searchRef = useRef('');
  const [tabToggle, setTabToggle] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const toggleTab = () => setTabToggle(!tabToggle);

  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const closeModal = (key) =>
    setIsModalOpen((prev) => ({
      ...prev,
      [key]: false,
    }));

  const toggleModal = (key) =>
    setIsModalOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

  const closeBulkDrawer = () => setIsBulkDrawerOpen(false);
  const toggleBulkDrawer = () => setIsBulkDrawerOpen(!isBulkDrawerOpen);

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const handleSubmitForAll = (e) => {
    e.preventDefault();
    if (!searchRef.current.value) return setSearchText(null);
    setCategory(null);
    setSearchText(searchRef.current.value);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
        setIsDrawerOpen,
        isModalOpen,
        toggleModal,
        closeModal,
        isUpdate,
        setIsUpdate,
        closeBulkDrawer,
        isBulkDrawerOpen,
        toggleBulkDrawer,
        lang,
        setLang,
        currentPage,
        setCurrentPage,
        handleChangePage,
        searchText,
        setSearchText,
        category,
        setCategory,
        searchRef,
        handleSubmitForAll,
        status,
        setStatus,
        zone,
        setZone,
        time,
        setTime,
        sortedField,
        setSortedField,
        source,
        setSource,
        resultsPerPage,
        limitData,
        setLimitData,
        tabToggle,
        toggleTab,
        service,
        setService,
        startQRInterval,
        terminateQRInterval,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
