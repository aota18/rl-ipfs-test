import React from "react";

const Main = ({ children }) => {
  return (
    <div
      className={`flex h-screen bg-white dark:bg-gray-900 max-w-7xl mx-auto`}
    >
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full overflow-y-auto  ">
          <div className="container grid mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Main;
