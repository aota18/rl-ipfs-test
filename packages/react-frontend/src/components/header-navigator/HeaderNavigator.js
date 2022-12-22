import { Button } from "@windmill/react-ui";
import React, { useState } from "react";
import {
  IoIosArrowBack,
  IoIosSearch,
  IoMdShare,
  IoIosMore,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";
import useToggleDrawer from "../../hooks/useToggleDrawer";

const HeaderNavigator = ({
  back,
  onPressBack,
  search,
  share,
  menu,
  onPicture,
  onPressMenu,
}) => {
  const [isSearchOn, setIsSearchOn] = useState(false);

  const { handleModalOpen } = useToggleDrawer(SidebarContext);
  let navigate = useNavigate();

  const onClickGoBack = () => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigate(-1);
    }
  };

  const toggleBtnSearch = () => {
    setIsSearchOn(!isSearchOn);
  };

  const onClickBtnShare = () => {
    console.log("share btn clicked");
    handleModalOpen("share");
  };

  const onClickBtnMenu = () => {
    console.log("menu btn clicked");
  };

  const getLayout = (back, search, share, menu) => {
    if (
      (search && !back && !share && !menu) ||
      (menu && !back && !share && !search)
    ) {
      return "flex-row-reverse";
    } else {
      return "justify-between";
    }
  };
  return (
    <div className={` ${onPicture ? "absolute top-0 z-10 w-full" : ""}`}>
      <div className={`flex ${getLayout(back, search, share, menu)}`}>
        {back ? (
          <Button
            layout="link"
            style={{ margin: "0", padding: "0" }}
            onClick={() => onClickGoBack()}
          >
            <IoIosArrowBack
              className={`w-6 h-6 ${onPicture ? "text-white" : ""}`}
            />
          </Button>
        ) : (
          <></>
        )}
        {search ? (
          <Button layout="link" onClick={() => toggleBtnSearch()}>
            <IoIosSearch
              className={`w-6 h-6 ${onPicture ? "text-white" : ""}`}
            />
          </Button>
        ) : (
          <></>
        )}

        {share ? (
          <Button layout="link" onClick={() => onClickBtnShare()}>
            <IoMdShare className={`w-6 h-6 ${onPicture ? "text-white" : ""}`} />
          </Button>
        ) : (
          <></>
        )}
        {menu ? (
          <Button layout="link" onClick={() => onPressMenu()}>
            <IoIosMore className={`w-6 h-6 ${onPicture ? "text-white" : ""}`} />
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default HeaderNavigator;
