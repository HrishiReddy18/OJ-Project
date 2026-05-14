import { useContext, useEffect, useState } from "react";
import {
  Form,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { userContext } from "../../../shared/userNameContext";
import "./Problems.scss";
import { problemsContext } from "../../../shared/problemsContext";
import AddProblem from "../AddProblem/AddProblem";
function Problems() {
  const { user } = useContext(userContext);
  const { Problems, getProblems } = useContext(problemsContext);
  const navigate = useNavigate();
  const [problemsList, setProblemsList] = useState([]);
  const [addNewProblem, setAddNewProblem] = useState([false]);

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

  const fetchProblems = async () => {
    try {
      console.log(Problems);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////
      // DOUBT: When we comeback , why api call is made again?
      if (!Problems) {
        const data = await fetch("http://localhost:3000/Problems", {
          method: "GET",
          credentials: "include",
        });

        if (!data.ok) throw new Error("Fetch failed");

        const problemsList = await data.json();
        console.log(problemsList);
        setProblemsList(problemsList);
        getProblems(problemsList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const solveProblem = (id) => {
    console.log("id: ", id);
    navigate(`problem/${id}`);
  };
  const deleteProblem = async (id) => {
    console.log(id);
    try {
      const data = fetch(`http://localhost:3000/Problems/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchProblems();
    } catch (e) {
      console.log(e);
    }
  };

  const addProblem = () => {
    // setAddNewProblem((prev) => ({ ...prev, addNewProblem: addNewProblem }));
    setAddNewProblem(!addNewProblem);
  };
  return (
    <div>
      {user?.userType == "admin" && (
        <div className="add-problem">
          {" "}
          <button
            onClick={() => {
              addProblem();
            }}
          >
            {" "}
            Add Problem{" "}
          </button>
        </div>
      )}

      {addNewProblem && <AddProblem className="add-problem"></AddProblem>}
      {problemsList.length > 0 && (
        <div className="list-of-problems">
          {problemsList.map((prob, index) => (
            <div
              className={`problem ${index % 2 == 0 ? "evenIndex" : "oddIndex"}`}
            >
              <span className="problem-col">{index + 1}</span>
              <span className="title">{prob.title}</span>
              <span className="problem-col">{prob.difficulty}</span>
              <span className="problem-col">
                {prob.status ? (
                  <button className="solved-button">solved</button>
                ) : (
                  <button
                    className="solve-button"
                    onClick={() => {
                      solveProblem(prob._id);
                    }}
                  >
                    solve
                  </button>
                )}
              </span>

              {user?.userType == "admin" && (
                <span className="problem-col">
                  <button
                    className="solve-button"
                    onClick={() => {
                      deleteProblem(prob._id);
                    }}
                  >
                    Delete
                  </button>
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
