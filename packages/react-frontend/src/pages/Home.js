import { Button, Transition } from '@windmill/react-ui';
import { useContext, useEffect, useRef, useState } from 'react';
import HeaderNavigator from '../components/header-navigator/HeaderNavigator';
import Tab from '../components/tab/Tab';
import useToggleDrawer from '../hooks/useToggleDrawer';
import ImageSlider from '../components/image-slider/ImageSlider';
import SectionDivider from '../components/section-divider/SectionDivider';
import EventList from '../components/events/EventList';
import AboutList from '../components/about/AboutList';
import { Link } from 'react-router-dom';
import { generateMockEvents } from '../utils/mock';
import { AdminContext } from '../context/AdminContext';
import { truncateString } from '../utils/string';
import { isDesktop, isMobile } from 'react-device-detect';
import { SidebarContext } from '../context/SidebarContext';
import DesktopHome from './DesktopHome';
import { useNetwork } from 'wagmi';
import HomeComponent from '../components/home/HomeComponent';
import { serviceList } from '../data/serviceList';

const Home = () => {
  const { handleModalOpen } = useToggleDrawer();

  const { service: selectedService, setService } = useContext(SidebarContext);

  const {
    state: { user },
  } = useContext(AdminContext);

  const onSelectService = (service) => {
    setService(service);
  };

  if (!user && isDesktop) {
    return <DesktopHome />;
  } else {
    return (
      <div className="lg:max-7xl h-screen">
        {/* <div className="sm:px-4 lg:px-0 py-2">
        <div className="dark:text-gray-200 text-2xl font-extrabold font-sf">
          RedLetter
        </div>
      </div> */}

        {/* <div className="my-4">
        <SectionDivider title={"Popular Events"} />
      </div>
      <ImageSlider items={items} />

      <div className="my-4">
        <SectionDivider title={"Nearby Events"} />
      </div>

      <div className="h-1/3 overflow-y-scroll p-4 lg:h-full">
        <EventList items={items} />
      </div> */}

        <div className="flex my-4 mx-4 justify-between items-center ">
          <SectionDivider title={'About RedLetter'} />

          {serviceList.map((service) => (
            <div
              className={`cursor-pointer ${
                selectedService.id === service.id ? 'font-bold' : ''
              }`}
              key={service.id}
              onClick={() => onSelectService(service)}
            >
              {service.name}
            </div>
          ))}

          {user ? (
            <span>{truncateString(user.address, 10)}</span>
          ) : (
            <Button
              onClick={() => handleModalOpen('walletSelect')}
              disabled={false}
              className="mt-4 h-8 w-auto"
            >
              Connect Wallet
            </Button>
          )}
        </div>

        <HomeComponent />
      </div>
    );
  }
};

export default Home;
