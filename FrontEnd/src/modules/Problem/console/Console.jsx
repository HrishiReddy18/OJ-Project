import React, { useContext, useState } from "react";
import "./console.scss";
import { inputContext } from "../../shared/inputContext";
import { useParams } from "react-router-dom";
import AiReviewDialog from "../ai-review-dialog/AiReviewDialog";

function Console(props) {
  const [currentTc, setcurrentTc] = useState(-1);
  const [tcOutput, setTcOutput] = useState([]);
  const [verdict, setVerdict] = useState("");
  const [isRun, setIsRun] = useState(false);
  const [defaultTestCases, setdefaultTestCases] = useState([]);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [verdictFlag, setVerdictFlag] = useState(false);
  const [showAiReview, setShowAiReview] = useState(false);
  const [stderr, setStderr] = useState("");
  const { input } = useContext(inputContext);
  const { id } = useParams();

  const { problem } = props;
  const runProblem = async () => {
    setcurrentTc(0);
    setIsRun(true);

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
    console.log("input");
    console.log(input);
    let currInput = input; //fetch from context API
    for (let defaultTestCase of defaultTestCases) {
      currInput.input = defaultTestCase.input;
      console.log("currInput");
      console.log(currInput);

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
      if (res.err) {
        setStderr(res.err.stderr);
        return;
      }
      //*************Updating state by taking old value***************************************** */
      setTcOutput((prev) => [...prev, res]); //instant change
      console.log("tcOutput: ", tcOutput);
    }
    setSubmitFlag(false);
    setVerdictFlag(false);
    setStderr("");

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
    console.log("line 70");
    console.log(res);
    setTcOutput(res);
    setSubmitFlag(true);
    setVerdictFlag(res);
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

  const verdictClick = () => {
    setVerdictFlag(true);
  };
  const generateAiReview = () => {
    setShowAiReview(!showAiReview);
  };
  const closeDialog = () => {
    setShowAiReview(false);
  };
  return (
    <div className="console-container">
      {/* {!submitFlag && ( */}
      <div>
        <div className="header">
          {/* <button className="inputs" onClick={() => showTestCases()}>
            TestCases
          </button> */}
          {/* <button className="ouputs">Result</button> */}
        </div>
        {!submitFlag && (
          <div className="tc-ai">
            <div className="testCaseHeader">
              {defaultTestCases.map((testCase, index) => (
                <button
                  className="testCase"
                  onClick={() => selectedTestCase(index)}
                >
                  {" "}
                  TestCase-{index + 1}
                </button>
              ))}
            </div>
            {defaultTestCases.length > 0 && (
              <div>
                <button
                  className="ai-review"
                  onClick={generateAiReview}
                  // disabled={isRun}
                >
                  {" "}
                  Ask-ai
                </button>
              </div>
            )}
          </div>
        )}

        {showAiReview && (
          <AiReviewDialog
            closeDialog={closeDialog}
            problem={problem}
            input={input}
          ></AiReviewDialog>
        )}

        {!submitFlag && currentTc >= 0 && (
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
            {stderr && <div className="error-msge">{stderr}</div>}
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
      {/* )} */}
      {submitFlag && (
        <div className="verdict">
          {/* <button
            onclick={() => {
              verdictClick();
            }}
          >
            Verdict
          </button> */}
          <strong>Verdict</strong>
          {verdictFlag.status && (
            <div className="submit-success"> All test cases passed</div>
          )}
          {!verdictFlag.status && (
            <div className="submit-failure"> {verdictFlag.message}</div>
          )}

          {/* {verdictFlag  ? (
            <div className="submit-success"> All test cases passed</div>
          ) : (
            <div className="submit-fail"> Please submit your code</div>
          )} */}
        </div>
      )}
    </div>
  );
}

export default Console;
