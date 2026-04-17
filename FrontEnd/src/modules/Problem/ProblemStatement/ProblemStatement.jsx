import React, { useContext } from "react";
import { problemsContext } from "../../shared/problemsContext";
import { useParams } from "react-router-dom";
import "./ProblemStatement.scss";
import Editor from "../editor/editor";
import Console from "../console/Console";

function ProblemStatement() {
  const { problems } = useContext(problemsContext);
  const { id } = useParams();

  const problem = problems.find((x) => x._id == id);
  if (!problem) {
    return <div>No Problem with Id : {id}</div>;
  }

  return (
    <div className="problem-container">
      <div className="problem">
        <div className="title">
          <strong>{problem.title}</strong>
        </div>
        <div className="description">{problem.description}</div>
        {problem.examples.map((ex, idx) => (
          <div className="example">
            <div className="ex-heading">
              <b>Example :{idx + 1}</b>
            </div>
            <div className="input">
              <b>Input: </b> {ex.input}
            </div>
            <div className="output">
              <b>Output: </b> {ex.output}
            </div>
          </div>
        ))}

        {problem.constraints.length > 0 && (
          <div>
            {/* style must be an object */}
            <b style={{ fontSize: "20px", lineHeight: "32px" }}>constraints</b>
            <ul className="constraints">
              {problem.constraints.map((con) => (
                <li>{con}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="editor">
        <Editor></Editor>
        <Console problem={problem}></Console>
      </div>
    </div>
  );
}

export default ProblemStatement;
