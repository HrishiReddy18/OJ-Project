//  convert input to requird format
// Here our input is string where each input is seperated by ,
// (try like this   "input": "4\n2 7 11 15\n9\n", also instead of . ===> \n)
function normalizeInput(input) {
  // Step 1: make it valid JSON array
  let wrapped = `[${input}]`;

    // wrapped = `[[1,2],"I am hrishi","broCode",["I am robo","Sunny","head shot"],[[1,2],[3,4]]]`;
  let parsed;
  try {
    parsed = JSON.parse(wrapped);
  } catch (err) {
    throw new Error("Invalid input format");
  }

  // Step 2: recursively extract
  function extract(item) {
    if (Array.isArray(item)) {
      // nested arrays
      if (item.length > 0){
        if(Array.isArray(item[0])) {
        return item.flatMap(extract);
      }
        //strinf array where string with more than one word
      if(typeof item[0] === "string" || item[0] instanceof String){
        return item.flatMap(extract);
      }
    }

    
      // flat array
      return [item];
    }
    // single value → treat as single-element array
    return [[item]];
  }

  // Step 3: normalize to string lines
  const result = parsed.flatMap(extract);

  console.log(result.map((arr) => arr.join(" ")));
  return result.map((arr) => arr.join(" "));
}
module.exports = normalizeInput;
// Here is the exact step-by-step trace of how the function processes:

// [1,2,3] , 3,4, [[2,3],[4,5]]
// 1. Wrap into valid JSON
// wrapped = "[[1,2,3] , 3,4, [[2,3],[4,5]]]"
// 2. JSON.parse
// parsed = [
//   [1,2,3],
//   3,
//   4,
//   [
//     [2,3],
//     [4,5]
//   ]
// ]
// 3. Run flatMap(extract)

// We process each element one by one:

// ➤ Element 1: [1,2,3]
// It’s an array
// First element is not an array → flat array
// return [[1,2,3]]
// ➤ Element 2: 3
// Not an array
// return [[3]]
// ➤ Element 3: 4
// Not an array
// return [[4]]
// ➤ Element 4: [[2,3],[4,5]]
// It’s an array
// First element is an array → nested case

// So:

// return item.flatMap(extract)

// Now process inner elements:

// ➤ Inner element: [2,3]
// Flat array
// return [[2,3]]
// ➤ Inner element: [4,5]
// Flat array
// return [[4,5]]

// So combined:

// [[2,3],[4,5]]
// 4. Final combined result (after flatMap)
// result = [
//   [1,2,3],
//   [3],
//   [4],
//   [2,3],
//   [4,5]
// ]
// 5. Convert to strings
// result.map(arr => arr.join(","))
// Final Output
// 1 2 3
// 3
// 4
// 2 3
// 4 5
// Key takeaway
// Outer structure → handled by JSON.parse
// Shape detection:
// [1,2,3] → flat array → keep as is
// [[2,3],[4,5]] → nested → flatten one level
// 3 → wrap as [3]
