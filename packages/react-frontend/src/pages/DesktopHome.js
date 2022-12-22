import React from "react";
import Navbar from "../components/desktop/global-components/navbar";
import SoftBoxAbout from "../components/desktop/section-components/soft-box-about";
import TalentedPeople from "../components/desktop/section-components/talented-people";
import SoftBoxTab from "../components/desktop/section-components/soft-box-tab";
import SoftBoxLeftsideImage from "../components/desktop/section-components/soft-box-leftside-image";
import BannerV3 from "../components/desktop/section-components/banner-v3";
import Services_V3 from "../components/desktop/section-components/services-v3";
import Footer_V2 from "../components/desktop/global-components/footer-v2";

const DesktopHome = () => {
  return (
    <div>
      <Navbar />
      <BannerV3 />
      <Services_V3 />
      <SoftBoxAbout />
      <TalentedPeople />

      <SoftBoxLeftsideImage />
      <SoftBoxTab />
      <Footer_V2 />
    </div>
  );
};

export default DesktopHome;
