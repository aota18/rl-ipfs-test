import { createContext, useReducer } from "react";

export const CreateEventContext = createContext();

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case "A":
      return {};
    default:
      return state;
  }
}

export const CreateEventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
};
