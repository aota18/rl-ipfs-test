import React from "react";
import AboutListItem from "./AboutListItem";

const mockItems = [
  {
    id: 1,
    icon: "🔗",
    title: "What are NFTs?",
    description: (
      <p className="text-gray-500 font-light">
        Non-fungible tokens (NFTs) are digital assets based on blockchain
        technology and can include various metadata - for example, a ticket NFT
        on RedLetter could include the host of an event and the price of the
        ticket.
      </p>
    ),
  },
  {
    id: 2,
    icon: "🎖",
    title: "What can I do with RedLetter Ticket NFTs?",
    description: (
      <p className="text-gray-500 font-light">
        You can use it as solid proof that you are eligible to attend or
        participate in an event. It may also grant you access to mint
        participation SBTs.
      </p>
    ),
  },
  {
    id: 3,
    icon: "🔗",
    title: "What are RedLetter SBTs?",
    description: (
      <p className="text-gray-500 font-light">
        Soulbound tokens (SBTs) are non-transferable tokens representing your
        identity or history. In RedLetter, this could include your event
        records, participation records, and other digital badges you earned.
      </p>
    ),
  },
  {
    id: 4,
    icon: "🔗",
    title: "How to use RedLetter",
    description: (
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold "> Personal Records</h3>
        <p className="text-gray-500 font-light">
          Customize your event, record your writings, thoughts and photos on the
          blockchain forever.
        </p>

        <h3 className="font-bold ">
          {" "}
          Marriage, Graduation, Get Together Events
        </h3>
        <p className="text-gray-500 font-light">
          Record valuable and unforgettable events such as weddings and
          graduations. Invite friends to congratulate you and gift attendees
          with special digital attendance badges.
        </p>

        <h3 className="font-bold "> Company Events</h3>
        <p className="text-gray-500 font-light">
          Create various events, issue ticket NFTs to gather your audience,
          fandom together, and airdrop SBTs to those who participated with
          ticket NFTs.
        </p>
      </div>
    ),
  },
];

const AboutList = () => {
  return (
    <div className="flex flex-col space-y-2">
      {mockItems.map((item, id) => (
        <AboutListItem key={id} item={item} />
      ))}
    </div>
  );
};

export default AboutList;
