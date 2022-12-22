import React from "react";
import { classNames } from "../../utils/class";

const Tab = ({ tabs, currentTab, handleChange }) => {
  return (
    <div>
      <div className="block">
        <div>
          <nav className="-mb-px flex " aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                onClick={() => handleChange(tabs, tab.id)}
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.id === currentTab.id
                    ? "w-full text-center border-primary text-primary"
                    : "w-full text-center border-transparent text-gray-400 hover:text-primary hover:border-primary",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Tab;
