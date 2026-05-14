/////////////////////////////////////////////////
// 1. a= '1 2 \\n4 5 \\n7'    ===> "\n" literal
// console.log(a)
// 2. a= '1 2 \n4 5 \n7'   ====> new line
// console.log(a)
// 3. str.replace(RegExp,'')  ==> regx===> /pattern/flag  ====> /\\n/g
// 4. JSON.stringify() ====> convert javascript value (JSON object, JSON array, string, number) into JSON string
// Converts:
// Objects → JSON string
// Arrays → JSON string
// Numbers/booleans → string
// Removes:
// undefined
// functions
// symbols
// 5. JSON.parse() is a built-in JavaScript method used to convert a JSON-formatted string into a JavaScript object (JSON Array / JSON OBject).
// const jsonString = '{"name": "John", "age": 30}';
// const obj = JSON.parse(jsonString);
// console.log(obj.name); // "John"
// console.log(obj.age);  // 30

////////////////////////////////////////
// 6. convert input to requird format   ===> normalise function ====> extract
//////////////////////////////////////

// 7. Object.freeze()  ==>

// Reference copy
// const a= {}; b=a ===> pass by reference
//shallow copy (1st level copy)
// object.assign(target, source)  ; b={...a}===> shallow copy (used for copying level 1)  ====> Even in shallow copy, nested objects are passed by referenced

// 8. Deep Copy (copying all levels)  ==> structuredClone ===> create seperate copy for all levels
// A deep copy creates completely independent copies of nested objects too.

//9.Nullish Coalescing
// const name = user.name ?? "Guest";
// Uses default only for:
// null
// undefined

//10. optional chaining

//11.for(let key in users)
//let key in Object.values(users)
// let [key,values] in Object.entries(users)

//12. function in object

//13. function is also a object in js

//////////////////ARRAY///////////////////////
// for(let i of array)    ====> values
// for(let i in object)   ==> for keys
// 1.push, unshift
// 2.pop, shift
// 3.includes, indexOf
// 4.reduce() ===> Reduces array to single value.
// 5. some, every  ====> returns true
// 6. slice
// 7. arr.splice(1, 2); ===> Removes 2 elements from index 1.
// 8. arr.splice(2, 0, [11,12,13]);  ===> remove nothing at index 2 and add [11,12,13]
// 9. flat ===> array.flat(depth) , default depth is 1 ;
//arr.flat(Infinity);
// 10. join
// 11. isArray
// 12. flatMap  ====> first map and flat(1)
// 13. sort ===>By default sorts as strings.
// 14. reverse
