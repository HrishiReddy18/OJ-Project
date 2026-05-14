import React, { useState } from "react";

const inputContext = React.createContext();

const InputProvider = ({ children }) => {
  const [input, setInput] = useState({});

  const getInput = (data) => {
    setInput(data);
  };

  return (
    <inputContext.Provider value={{ input, getInput }}>
      {children}
    </inputContext.Provider>
  );
};

export { inputContext, InputProvider };
