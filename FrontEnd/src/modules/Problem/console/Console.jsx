import React, { useContext, useState } from "react";
import "./console.scss";
import { inputContext } from "../../shared/inputContext";
import { useParams } from "react-router-dom";

function Console(props) {
  const [currentTc, setcurrentTc] = useState(-1);
  const [tcOutput, setTcOutput] = useState([]);
  const [defaultTestCases, setdefaultTestCases] = useState([]);
  const { input } = useContext(inputContext);
  const { id } = useParams();

  const { problem } = props;
  const runProblem = async () => {
    setcurrentTc(0);

    //*************************************************************** */
    // If you want to see updated values:
    // useEffect(() => {
    //   console.log(tcOutput);
    // }, [tcOutput]);
    // This runs after re-render with updated state.
    //*******************************************************************88 */
    setTcOutput(() => []); //instant change

    //*************************************************************** */
    // check doubt1.txt
    //*************************************************************** */
    //(React bundles all the statements at once)
    // await showTestCases();  // it is called , but state variables are updated only when re-rendered
    let defaultTestCases = await showTestCases();
    console.log(defaultTestCases);
    let currInput = input; //fetch from context API
    for (let defaultTestCase of defaultTestCases) {
      currInput.input = defaultTestCase.input;
      const data = await fetch("http://localhost:3000/run", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currInput),
        method: "POST",
        credentials: "include",
      });

      const res = await data.json();
      console.log(res);
      //*************Updating state by taking old value***************************************** */
      setTcOutput((prev) => [...prev, res]); //instant change
      console.log("tcOutput: ", tcOutput);
    }
    console.log("tcOutput: ", tcOutput);
  };
  const submitProblem = async () => {
    let currInput = input; //fetch from context API
    currInput.problemId = id;
    const data = await fetch("http://localhost:3000/submit", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currInput),
      method: "POST",
      credentials: "include",
    });

    const res = await data.json();
    console.log(res);
    setTcOutput(res);
  };
  const showTestCases = async () => {
    try {
      const data = await fetch(
        `http://localhost:3000/Problems/${problem._id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (!data.ok) throw new Error("Fetch failed");
      const currentProblem = await data.json();
      // console.log(currentProblem);
      const defaultTestCases = currentProblem.testCases.filter(
        (x) => x.isHidden == false,
      );
      setdefaultTestCases(defaultTestCases);
      console.log(defaultTestCases);
      return defaultTestCases;
    } catch (e) {
      console.log(e);
    }
  };
  const selectedTestCase = (index) => {
    setcurrentTc(index);
  };
  return (
    <div className="console-container">
      <div className="header">
        {/* <button className="inputs" onClick={() => showTestCases()}>
            TestCases
          </button> */}
        {/* <button className="ouputs">Result</button> */}
      </div>
      <div className="testCaseHeader">
        {defaultTestCases.map((testCase, index) => (
          <button className="testCase" onClick={() => selectedTestCase(index)}>
            {" "}
            TestCase-{index + 1}
          </button>
        ))}
      </div>

      {currentTc >= 0 && (
        <div className="currentTestCase">
          <div className="input">{defaultTestCases[currentTc]?.input}</div>
          <div className="Expectedoutput">
            Expected OutPut: {defaultTestCases[currentTc]?.output}
          </div>
          {tcOutput[currentTc]?.ans && (
            <div>
              <div className="output">
                Your OutPut: {tcOutput[currentTc]?.ans}
                {defaultTestCases[currentTc]?.output ==
                tcOutput[currentTc]?.ans ? (
                  <span>{"\u2705"}</span>
                ) : (
                  <span>{"\u274C"}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="footer">
        <button
          className="run"
          onClick={() => {
            runProblem();
          }}
        >
          Run
        </button>
        <button
          className="Submit"
          onClick={() => {
            submitProblem(defaultTestCases[currentTc]);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Console;
