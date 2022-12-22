import React from "react";
import HeaderNavigator from "../components/header-navigator/HeaderNavigator";

const ReadMore = () => {
  return (
    <div>
      <HeaderNavigator back />
      <div className="px-4 text-gray-500 my-2 space-y-4 leading-5">
        <h1 className="text-3xl font-bold text-black"> About RedLetter</h1>

        <p>
          As an on-chain ceremony, RedLetter stores your precious moments and
          life records on the blockchain forever.
        </p>

        <p>
          Those who attend or congratulate these events will be given a special
          permanent digital badge (SBT - Soul Bound Token) to commemorate their
          participation.
        </p>

        <p>
          You can permanently store personal writings and photos or record
          important events like your wedding on the blockchain.
        </p>

        <h1 className="text-2xl font-bold text-black"> Founder's Sharing</h1>

        <p>
          Redletter’s mission, in short: event(or precious moment) registration
          on-chain. Marriage, promotion, graduation, every single memorable days
          or milestones could be submitted via this platform, and permanently
          recorded on Ethereum network, along with related NFT/SBT minted.
          Actually the first idea came to my mind was on-chain marriage
          registration, because every country’s according law is different,
          certificates issued by centralized bureau is not convincing, therefore
          it will make most sense if we put prince.eth & bride.eth under
          redletter.eth to certify this special moment on blockchain as a
          permanent record. And next I found out that it could work for any
          event beside marriage, promotion, graduation, all big moments are
          basically created by 42 length hash addresses, or an ENS name. We are
          creating an Eco-system that allows users to draw on the big picture!
          We automate an NFT/SBT creation process after event submitted, the SBT
          will stick with the account forever, and the NFT could be sold on
          opensea or any other platforms, whether the NFT will carry value or
          not, depended on who created it(if by Donald Trump, it might be
          expensive), and how many people participated or clicked like on it. 
        </p>

        <h1 className="text-2xl font-bold text-black">
          {" "}
          Where The RedLetter Idea Comes From
        </h1>

        <p>
          This idea comes from the famous “whistle blower”. By early 2020 when
          COVID just started spreading, in China there was a famous “whistle
          blower”: Dr Liwenliang who worked in Wuhan Hospital, he published
          something reminding all people to wear mask to prevent this possible
          new horrible virus, he was arrested by local police at first place,
          they wanted him to shut up, then they released him after couple days
          of custody. Afterwards, Dr Liwenliang went back to hospital to save
          covid patients, and unfortunately himself caught COVID during curing
          patients, sadly, he passed away by Feb 2020. To commemorate his
          braveness, as well as a condemn to China government, people created a
          record of him (RIP) on Ethereum, this permanent ETH height is just for
          him (
          <a href="#" className="text-blue-500">
            link
          </a>
          ).
        </p>

        <p>
          As the founder of Redletter.eth, at that time I was just thinking,
          creating such a record on Ethereum is really meaningful, “forever” is
          the best part of blockchain, and nobody can forbid it. However, not
          everyone knows how to create such “raw record” on blockchain,
          redletter.eth is a project that provides very user-friendly UI(title,
          content, multi-media upload, involved addresses .eth) & feature to
          facilitate such “moment” creation on-chain.
        </p>

        <img src="/about-readmore-img.png" alt="about-readmore" />
      </div>
    </div>
  );
};

export default ReadMore;
