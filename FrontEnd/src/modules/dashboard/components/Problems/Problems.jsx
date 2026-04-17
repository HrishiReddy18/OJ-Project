import { useContext, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { userContext } from "../../../shared/userNameContext";
import "./Problems.scss";
import { problemsContext } from "../../../shared/problemsContext";
function Problems() {
  const { user } = useContext(userContext);
  const { Problems, getProblems } = useContext(problemsContext);
  const navigate = useNavigate();
  const [problemsList, setProblemsList] = useState([]);

  // const problemsList = [
  //   {
  //     name: "Two-sum",
  //     difficulty: "medium",
  //     status: false,
  //   },
  //   {
  //     name: "Fibanocci",
  //     difficulty: "easy",
  //     status: true,
  //   },
  //   {
  //     name: "Subset-sum",
  //     difficulty: "hard",
  //     status: false,
  //   },
  // ];

  const fun = async (e) => {
    try {
      const data = await fetch("http://localhost:3000/Problems", {
        method: "GET",
        credentials: "include",
      });

      if (!data.ok) throw new Error("Fetch failed");

      const problemsList = await data.json();
      console.log(problemsList);
      setProblemsList(problemsList);
      getProblems(problemsList);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fun();
  }, []);

  const solveProblem = (id) => {
    console.log("id: ", id);
    navigate(`problem/${id}`);
  };
  return (
    <div>
      {user?.userType == "admin" && (
        <div className="add-problem">
          {" "}
          <button onClick={() => {}}> Add Problem </button>
        </div>
      )}
      {problemsList.length > 0 && (
        <div className="list-of-problems">
          {problemsList.map((prob, index) => (
            <div
              className={`problem ${index % 2 == 0 ? "evenIndex" : "oddIndex"}`}
              onClick={() => {
                solveProblem(prob._id);
              }}
            >
              <span className="problem-col">{index + 1}</span>
              <span className="title">{prob.title}</span>
              <span className="problem-col">{prob.difficulty}</span>
              <span className="problem-col">
                {prob.status ? (
                  <button className="solved-button">solved</button>
                ) : (
                  <button className="solve-button">solve</button>
                )}
              </span>

              {user?.userType == "admin" && (
                <span className="problem-col">
                  <button className="solve-button">Delete</button>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Problems;
