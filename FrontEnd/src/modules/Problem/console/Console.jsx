import React, { useContext, useState } from "react";
import "./console.scss";
import { problemsContext } from "../../shared/problemsContext";

function Console() {
  const [isClicked, setIsClicked] = useState(false);
  const { problem } = useContext(problemsContext);
  return (
    <div className="console-container">
      <div className="header">
        <button
          className="run"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          Run
        </button>
        <button
          className="Submit"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          Submit
        </button>
      </div>
      {isClicked && (
        <div className="body">
          <div className="header">
            <button className="inputs">TestCases</button>
            <button className="ouputs">Result</button>
          </div>
          <div className="body"></div>
        </div>
      )}
    </div>
  );
}

export default Console;
