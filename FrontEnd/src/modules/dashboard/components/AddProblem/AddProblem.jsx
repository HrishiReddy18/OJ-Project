import React from "react";
import { useState } from "react";
import "./AddProblem.scss";

function AddProblem() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "easy",
    tags: "",
    constraints: "",
    examples: [{ input: "", output: "", explanation: "" }],
    testCases: [{ input: "", output: "", isHidden: true, isDefault: false }],
  });

  // handle basic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("e.target (name, vale): ", name + "," + value);
    //////////////////////////////////////////////////////////////////////////////
    //     You use it because state updates in React are asynchronous and can be batched. So relying on the current formData directly can lead to bugs.

    // What this does
    // setFormData((prev) => ({ ...prev, [name]: value }));
    // prev → latest state at the time React applies the update
    // ...prev → keep existing fields
    // [name]: value → update only one field

    // ??????????????????????????????????????????????/
    // Why not this?
    // setFormData({ ...formData, [name]: value });

    // This can break when multiple updates happen quickly.
    //////////////////////////////////////////////////////////////////////////////

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle nested arrays
  const handleExampleChange = (index, field, value) => {
    const updated = [...formData.examples];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, examples: updated }));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updated = [...formData.testCases];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, testCases: updated }));
  };

  const addExample = () => {
    setFormData((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }],
    }));
  };

  const addTestCase = () => {
    setFormData((prev) => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", output: "", isHidden: true }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.split(","),
      constraints: formData.constraints.split(","),
    };

    try {
      await fetch("http://localhost:3000/problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), //JSON.stringify ===> convert javascript value(JSON object,JSON array, string(\n====> new line)) into  String
        credentials: "include",
      });
      console.log("Problem added successfully");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="add-problem-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Name:</label>

          <input
            name="title"
            id="title"
            placeholder="Title"
            onChange={handleChange}
          />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <label for="difficulty">Difficulty:</label>
        <select name="difficulty" id="difficulty" onChange={handleChange}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div>
          {" "}
          <input name="tags" placeholder="tag1,tag2" onChange={handleChange} />
        </div>
        <div>
          {" "}
          <input
            name="constraints"
            placeholder="constraint1,constraint2"
            onChange={handleChange}
          />
        </div>
        {/* Examples */}
        <h3>Examples</h3>
        {formData.examples.map((ex, i) => (
          <div key={i}>
            <input
              placeholder="Input"
              onChange={(e) => handleExampleChange(i, "input", e.target.value)}
            />
            <input
              placeholder="Output"
              onChange={(e) => handleExampleChange(i, "output", e.target.value)}
            />
            <input
              placeholder="Explanation"
              onChange={(e) =>
                handleExampleChange(i, "explanation", e.target.value)
              }
            />
          </div>
        ))}
        <button type="button" onClick={addExample}>
          Add Example
        </button>
        {/* Test Cases */}
        <h3>Test Cases</h3>
        {formData.testCases.map((tc, i) => (
          <div key={i}>
            <input
              placeholder="Input"
              onChange={(e) => handleTestCaseChange(i, "input", e.target.value)}
            />
            <input
              placeholder="Output"
              onChange={(e) =>
                handleTestCaseChange(i, "output", e.target.value)
              }
            />
            <label>
              Hidden
              <input
                type="checkbox"
                onChange={(e) =>
                  handleTestCaseChange(i, "isHidden", e.target.checked)
                }
              />
            </label>
            <label>
              Default
              <input
                type="checkbox"
                onChange={(e) =>
                  handleTestCaseChange(i, "isDefault", e.target.checked)
                }
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addTestCase}>
          Add Test Case
        </button>
        <button type="submit">Create Problem</button>
      </form>
    </div>
  );
}

export default AddProblem;

// {
//   "title": "Two Sum",
//   "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\nYou can return the answer in any order.",
//   "difficulty": "easy",
//   "tags": ["array", "hashmap"],
//   "examples": [
//     {
//       "input": "[2,7,11,15], target=9",
//       "output": "[0,1]",
//       "explanation": "nums[0] + nums[1] = 9"
//     }
//   ],
//   "testCases": [
//     {
//       "input": "[2,7,11,15],9",
//       "output": "[0,1]",
//       "isHidden": false,
//       "isDefault":true
//     } ,
//     {
//       "input": "[3,2,4],6",
//       "output": "[1,2]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[3,3],6",
//       "output": "[0,1]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[-1,-2,-3,-4,-5],-8",
//       "output": "[2,4]",
//       "isHidden": false,
//       "isDefault":false
//     } ,
//     {
//       "input": "[-3,4,3,90],0",
//       "output": "[0,2]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[0,4,3,0],0",
//       "output": "[0,3]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[1,5,1,5],10",
//       "output": "[1,3]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[1,2,3,4,5,6,7,8,9,10],19",
//       "output": "[8,9]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[1,2,3],7",
//       "output": "[]",
//       "isHidden": true,
//       "isDefault":false
//     } ,
//     {
//       "input": "[5],10",
//       "output": "[]",
//       "isHidden": true,
//       "isDefault":false
//     }

//   ],
//   "constraints": [
//     "2 <= nums.length <= 10^4"
//   ]
// }
