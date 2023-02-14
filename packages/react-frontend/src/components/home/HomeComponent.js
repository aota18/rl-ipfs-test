import React from 'react';
import { Link } from 'react-router-dom';
import AboutList from '../about/AboutList';

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

const HomeComponent = () => {
  return (
    <div className="h-1/3 ">
      <div className="bg-black px-4 py-20">
        <h1 className="text-white mb-6 text-2xl font-bold">About RedLetter</h1>

        <div className="flex flex-col space-y-4 text-gray-400">
          <p>
            As an on-chain ceremony, RedLetter stores your precious moments and
            life records on the blockchain forever.{' '}
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
  );
};

export default HomeComponent;
