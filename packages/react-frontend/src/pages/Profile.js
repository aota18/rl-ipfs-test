import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileMain from "./Profile/ProfileMain";
import ProfileUpdate from "./Profile/ProfileUpdate";

const Profile = () => {
  return (
    <>
      <Routes>
        <Route exact path={`/`} element={<ProfileMain />} />
        <Route path={`/update`} element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default Profile;
