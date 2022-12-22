import React from "react";

const PageTitle = ({ text }) => {
  return (
    <div className="dark:text-gray-200 text-3xl font-bold font-sfb mb-4 sm:text-4xl">
      {text}
    </div>
  );
};

export default PageTitle;
