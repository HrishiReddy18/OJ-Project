const mongoose = require("mongoose");

const exampleSchema = new mongoose.Schema({
  input: String,
  output: String,
  explanation: String,
});

const testCaseSchema = new mongoose.Schema({
  input: String,
  output: String,
  isHidden: {
    type: Boolean,
    default: true, // hidden test cases for submission
  },
});

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    tags: [String],

    examples: [exampleSchema],

    testCases: [testCaseSchema],

    constraints: [String],

    //   createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },

    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Problem", problemSchema);

// {
//   "title": "Two Sum",
//   "description": "Given an array...",
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
//       "isHidden": false
//     },
//     {
//       "input": "[3,2,4],6",
//       "output": "[1,2]",
//       "isHidden": true
//     }
//   ],
//   "constraints": [
//     "2 <= nums.length <= 10^4"
//   ]
// }
