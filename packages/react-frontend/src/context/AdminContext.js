import Cookies from "js-cookie";
import React, { createContext, useReducer } from "react";

export const AdminContext = createContext();

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, user: action.payload };

    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
