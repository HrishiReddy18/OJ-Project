import React, { useState } from "react";

const problemsContext = React.createContext();

const ProblemsProvider = ({ children }) => {
  const [problems, setproblems] = useState([]);

  const getProblems = (data) => {
    setproblems(data);
  };

  return (
    <problemsContext.Provider value={{ problems, getProblems }}>
      {children}
    </problemsContext.Provider>
  );
};

export { problemsContext, ProblemsProvider };
