import { Button } from "@windmill/react-ui";
import Cookies from "js-cookie";
import moment from "moment";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderNavigator from "../../components/header-navigator/HeaderNavigator";
import ImageViewModal from "../../components/modal/ImageViewModal";
import SBTModal from "../../components/modal/SBTModal";
import NotFound from "../../components/NotFound";
import ProfileImgUploader from "../../components/profile-img-uploader/ProfileImgUploader";
import Tab from "../../components/tab/Tab";
import { AdminContext } from "../../context/AdminContext";
import { SidebarContext } from "../../context/SidebarContext";
import useAsync from "../../hooks/useAsync";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import GreetingServices from "../../services/GreetingServices";
import { truncateString } from "../../utils/string";

const commentItems = [
  {
    commentDt: moment(),
    eventName: "Open Data Science Conference",
    commentText: "Can't wait",
  },
  {
    commentDt: moment(),
    eventName: "Open Data Science Conference",
    commentText: "Can't wait",
  },
];

const tabs = [
  { id: 0, name: "My Gallery", href: "#" },
  { id: 1, name: "My Redletters", href: "#" },
];

const ProfileMain = () => {
  const { handleModalOpen } = useToggleDrawer();

  const [selectedImg, setSelectedImg] = useState(null);

  const { toggleTab } = useContext(SidebarContext);
  const {
    state: { user },
  } = useContext(AdminContext);

  // const { data, loading } = useAsync(() => {
  //   return SbtServices.getMySbts();
  // });

  const navigate = useNavigate();

  const [selectedSBT, setSelectedSBT] = useState(null);

  const onClickSBT = (sbt) => {
    setSelectedSBT(sbt);
    handleModalOpen("sbt");
  };

  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, loading } = useAsync(() => {
    if (currentTab.id === 1) {
      return GreetingServices.getAllSentGreetings(user.address, {
        page,
        limit,
      });
    } else {
      return GreetingServices.getAllReceivedGreetings(user.address, {
        page,
        limit,
      });
    }
  });

  const handleChange = (tabs, id) => {
    setCurrentTab(tabs[id]);
    toggleTab();
  };

  const onClickImage = (url) => {
    setSelectedImg(url);
    handleModalOpen("imageView");
  };

  const onPressMenu = () => {
    navigate("/profile/update");
  };

  return (
    <>
      <SBTModal sbt={selectedSBT} />
      <ImageViewModal imgUrl={selectedImg} />
      <HeaderNavigator menu onPressMenu={onPressMenu} />

      <div className="p-4 flex flex-col space-y-8">
        <div className="flex space-x-4">
          <ProfileImgUploader img={user?.profileImg} isGuest={user.isGuest} />
          <div className="flex flex-col justify-center">
            <h2 className="font-bold text-xl">
              {user.isGuest ? (
                "Guest"
              ) : (
                <>
                  {user.firstName} {user.lastName}
                </>
              )}
            </h2>
            <span>{truncateString(user.address, 20)}</span>
          </div>
        </div>

        {user?.isGuest ? (
          <div className="flex flex-col justify-center items-center space-y-4">
            <h3 className="text-xl font-bold">Are you Guest?</h3>
            <h3 className="text-xl font-bold">Be a Red Letter member!</h3>

            <Link to="/signup?step=1">
              <Button className="mt-4 h-10 w-24">Sign up</Button>
            </Link>
          </div>
        ) : (
          <>
            <Tab
              tabs={tabs}
              currentTab={currentTab}
              handleChange={handleChange}
            />

            <div className="space-y-4">
              <div className="grid grid-cols-6 gap-4">
                {!loading && data?.items.length === 0 ? (
                  <div className="col-span-6">
                    <NotFound title={"Cards"} />
                  </div>
                ) : (
                  data?.items?.map((item, id) => (
                    <div
                      className="col-span-2 flex justify-center items-center cursor-pointer"
                      onClick={() => onClickImage(item.imgUrl)}
                      key={id}
                    >
                      <img
                        src={item.imgUrl}
                        className="rounded-md w-20 h-20"
                        alt="sbt"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* <div className="flex space-x-4">
                <Link to="/search?title=Cheered">
                  <div className="flex flex-col justify-start border-r border-gray-300 pr-8">
                    <span className="font-bold">0</span>
                    <span className="text-sm font-light">Cheered</span>
                  </div>
                </Link>
                <div className="flex flex-col justify-start border-r border-gray-300 pr-8">
                  <span className="font-bold">1</span>
                  <span className="text-sm font-light">SBTs</span>
                </div>
                <Link to="/search?title=Events Created">
                  <div className="flex flex-col justify-start ">
                    <span className="font-bold">1</span>
                    <span className="text-sm font-light">Event Created</span>
                  </div>
                </Link>
              </div> */}

            {/* <div className="space-y-4">
                <h3 className="">Collected SBTs</h3>
                <div className="grid grid-cols-6 gap-4">
                  {!loading && data?.items.length === 0 ? (
                    <div className="col-span-6">
                      <NotFound title={"sbt"} />
                    </div>
                  ) : (
                    data?.items?.map((item, id) => (
                      <div
                        className="col-span-2 flex justify-center items-center cursor-pointer"
                        onClick={() => onClickSBT(item)}
                        key={id}
                      >
                        <img
                          src={item.imgUrl}
                          className="rounded-full w-20 h-20"
                          alt="sbt"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div> */}

            {/* <div className="space-y-4">
                <h3>My Comments</h3>
                <div className="flex flex-col space-y-4 overflow-y-scroll">
                  {commentItems.map((item, id) => (
                    <div className="flex flex-col" key={id}>
                      <span className="text-xs text-gray-400">
                        {item.commentDt.format("ddd, MMM DD")}
                      </span>
  
                      <span>{item.eventName}</span>
                      <div className="flex space-x-2 items-center">
                        <span className="text-gray-400 text-sm">
                          {item.commentDt.format("hh:mm A")}
                        </span>
                        <p className="font-lights">{item.commentText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

            {/* <a href="http://localhost:4001/home">Dashboard</a> */}
          </>
        )}
      </div>
    </>
  );
};

export default ProfileMain;
