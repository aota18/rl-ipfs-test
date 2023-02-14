import React from 'react';
import {
  AiOutlineSearch,
  AiOutlineBarcode,
  AiOutlineSchedule,
  AiOutlineUser,
  AiFillPlusCircle,
  AiFillHome,
} from 'react-icons/ai';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { isDesktop, isMobile } from 'react-device-detect';
import { SidebarContext } from '../../context/SidebarContext';

const eventNavMenu = [
  {
    name: 'Explore',
    icon: <AiOutlineSearch className="text-center w-6 h-6" />,
    to: '/explore',
  },
  {
    name: 'Tickets',
    icon: <AiOutlineBarcode className="text-center w-6 h-6" />,
    to: '/tickets',
  },
  {
    name: 'Create Event',
    icon: <AiOutlineSearch className="text-center w-6 h-6" />,
    to: '/create-event',
  },
  {
    name: 'My Events',
    icon: <AiOutlineSchedule className="text-center w-6 h-6" />,
    to: '/my-events',
  },
  {
    name: 'Profile',
    icon: <AiOutlineUser className="text-center w-6 h-6" />,
    to: '/profile',
  },
];

const greetingNavMenu = [
  {
    name: 'Home',
    icon: <AiFillHome className="text-center w-6 h-6" />,
    to: '/home',
  },

  {
    name: 'Create Card',
    icon: <AiOutlineSearch className="text-center w-6 h-6" />,
    to: '/greeting-card',
  },
  {
    name: 'Profile',
    icon: <AiOutlineUser className="text-center w-6 h-6" />,
    to: '/profile',
  },
];

const BottomNavigation = () => {
  const { service } = useContext(SidebarContext);

  const { handleModalOpen } = useToggleDrawer();
  const {
    state: { user },
  } = useContext(AdminContext);

  const navigate = useNavigate();

  const onClickCreateGreetingBtn = () => {
    // If user is guest, pop up needsignup modal
    if (!user || user.isGuest) {
      handleModalOpen('needSignup');
    } else {
      navigate('/greeting-card');
    }
  };

  const onClickCreateEventBtn = () => {
    // If user is guest, pop up needsignup modal
    if (!user || user.isGuest) {
      handleModalOpen('needSignup');
    } else {
      // IF Alreday Signed up, event select modal
      handleModalOpen('eventSelect');
    }
  };

  const onClickProfileBtn = () => {
    if (!user) {
      handleModalOpen('walletSelect');
    } else {
      navigate('/profile');
    }
  };

  const onClickMyEvents = () => {
    if (!user || user.isGuest) {
      handleModalOpen('needSignup');
    } else {
      // IF Alreday Signed up, event select modal
      navigate('/my-events');
    }
  };

  const renderEventNavMenu = () => {
    return eventNavMenu.map((menu, id) => {
      if (menu.to === '/create-event') {
        return (
          <div
            key={id}
            className="flex flex-col w-full items-center justify-end focus:text-primary hover:text-primary  inline-block text-center pb-1"
          >
            <div className="absolute bottom-8 text-redletter">
              <AiFillPlusCircle
                onClick={onClickCreateEventBtn}
                className="w-12 h-12 cursor-pointer"
              />
            </div>
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </div>
        );
      } else if (menu.to === '/profile') {
        return (
          <div
            key={id}
            to={menu.to}
            className="flex flex-col w-full focus:text-primary hover:text-primary justify-center items-center inline-block text-center pt-2 pb-1 cursor-pointer"
            onClick={onClickProfileBtn}
          >
            {menu.icon}
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </div>
        );
      } else if (menu.to === '/my-events') {
        return (
          <div
            key={id}
            to={menu.to}
            className="flex flex-col w-full focus:text-primary hover:text-primary justify-center items-center inline-block text-center pt-2 pb-1 cursor-pointer"
            onClick={onClickMyEvents}
          >
            {menu.icon}
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </div>
        );
      } else {
        return (
          <Link
            key={id}
            to={menu.to}
            className="flex flex-col w-full focus:text-primary hover:text-primary justify-center items-center inline-block text-center pt-2 pb-1"
          >
            {menu.icon}
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </Link>
        );
      }
    });
  };

  const renderGreetingNavMenu = () => {
    return greetingNavMenu.map((menu, id) => {
      if (menu.to === '/greeting-card') {
        return (
          <div
            key={id}
            className="flex flex-col w-full items-center justify-end focus:text-primary hover:text-primary  inline-block text-center pb-1"
          >
            <div className="absolute bottom-8 text-redletter">
              <AiFillPlusCircle
                onClick={onClickCreateGreetingBtn}
                className="w-12 h-12 cursor-pointer"
              />
            </div>
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </div>
        );
      } else if (menu.to === '/profile') {
        return (
          <div
            key={id}
            to={menu.to}
            className="flex flex-col w-full focus:text-primary hover:text-primary justify-center items-center inline-block text-center pt-2 pb-1 cursor-pointer"
            onClick={onClickProfileBtn}
          >
            {menu.icon}
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </div>
        );
      } else {
        return (
          <Link
            key={id}
            to={menu.to}
            className="flex flex-col w-full focus:text-primary hover:text-primary justify-center items-center inline-block text-center pt-2 pb-1"
          >
            {menu.icon}
            <span className="tab tab-home block text-xs">{menu.name}</span>
          </Link>
        );
      }
    });
  };

  if (!(!user && isDesktop)) {
    return (
      <div className="w-full mt-12">
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow py-1"
        >
          <div id="tabs" className="flex justify-between">
            {service.id === 0 ? renderEventNavMenu() : renderGreetingNavMenu()}
          </div>
        </section>
      </div>
    );
  } else {
    return <></>;
  }
};

export default BottomNavigation;
