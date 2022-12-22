import React from "react";

const AuthProvider = ({ children }) => {
  let AuthContext = React.createContext(null);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
