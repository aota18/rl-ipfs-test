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

const aboutItems = [
  {
    img: '/about-medal.svg',
    title: (
      <div className="text-3xl font-bold text-white">
        Forever keep <br /> who you are
      </div>
    ),
    description: (
      <p className="text-gray-500 text-center">
        RedLetter keeps all your <br /> special moments on the blockchain
        forever.
      </p>
    ),
  },
  {
    img: '/about-chain.svg',
    title: <div className="text-3xl font-bold text-white">Soul-bound</div>,
    description: (
      <p className="text-gray-500 text-center">
        Prove your life records with permanent <br /> digital badges - SBTs
        (Soul-bound Tokens) - <br /> to commemorate them.
      </p>
    ),
  },
  {
    img: '/about-puzzle.svg',
    title: (
      <div className="text-3xl font-bold text-white text-center">
        Your memories,
        <br /> forever
      </div>
    ),
    description: (
      <p className="text-gray-500 text-center">
        Keep your personal writings, photos, or <br /> special events on
        blockchain.
      </p>
    ),
  },
];

const Home = () => {
  const { chain } = useNetwork();

  const { handleModalOpen } = useToggleDrawer();
  const {
    state: { user },
  } = useContext(AdminContext);

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

        <div className="h-1/3 ">
          {/**
           * TODO : EventList
           */}
          <div className="bg-black px-4 py-20">
            <h1 className="text-white mb-6 text-2xl font-bold">
              About RedLetter
            </h1>

            <div className="flex flex-col space-y-4 text-gray-400">
              <p>
                As an on-chain ceremony, RedLetter stores your precious moments
                and life records on the blockchain forever.{' '}
              </p>

              <p>
                Those who attend or congratulate these events will be given a
                special permanent digital badge (SBT - Soul Bound Token) to
                commemorate their participation.{' '}
              </p>

              <p>
                You can permanently store personal writings and photos or record
                important events like your wedding on the blockchain.
              </p>

              <Link to="/read-more">
                <span className="underline underline-offset-1">Read More</span>
              </Link>
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient(to bottom, #000000 0%, #ffffff 15%, #ffffff 85%, #000000 100%)`,
              height: '370px',
            }}
            className="flex flex-col justify-center items-center"
          >
            <h1 className="text-3xl font-bold"> Celebrate your </h1>
            <h1 className="text-3xl font-bold"> precious moments. </h1>

            <div className=" text-3xl font-bold ">
              <span
                style={{
                  background: `linear-gradient(to right, rgba(201,92,102,1) 0%, rgba(167,51,155,1) 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Forever.
              </span>
            </div>
          </div>
          <div
            style={{
              background: `linear-gradient(to bottom, #000000 95%, #FFFFFF 100%)`,
            }}
            className="bg-black flex flex-col items-center space-y-20 px-8 pt-16 py-32"
          >
            <h2 className="text-gray-500">What is RedLetter?</h2>
            {aboutItems.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center space-y-4"
              >
                <img src={item.img} alt="about-items" />
                {item.title}

                {item.description}
              </div>
            ))}
          </div>
          <AboutList />
        </div>
      </div>
    );
  }
};

export default Home;

/**
 * 
 * background-color: #000000;
background-image: linear-gradient(180deg, #000000 0%, #ffffff 30%, #ffffff 66%, #000000 100%);

 * 
 * */
