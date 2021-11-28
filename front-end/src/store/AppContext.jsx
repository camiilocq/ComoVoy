import React from "react";

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const state = {};

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
