/*
  Properties:
    - can be accessed by the dot operator (value.x)
      this only works for properties that follow valid binding naming conventions
      the word after the dot is the LITERAL name of the property

    - can also be accessed by brackets (value[x])
      the expression between the brackets is EVALUATED to get the property name
      use when the property does not obey binding naming conventions (flight["flight status"])
  
  Property names are strings
*/

const myStr = "a string";
const property = "length";

console.log(myStr.length, myStr[property], "\n");

/*
  Arrays:
    - the elements inside arrays are stored as the array's properties
    - because numbers are used as the property names, only bracket notation works for arrays
*/

let numArray = [1, 2, 3, 4, 5];
console.log(numArray[2], numArray["2"], "\n"); // using the numerical index is quicker to write

/*
  Methods:
    - methods are properties that hold function values
      for example, all string values have the propety toUpperCase, which returns a method
      additionally, push and pop are methods of array values
*/
console.log(typeof myStr.toUpperCase); // function
console.log(myStr.toUpperCase(), "\n");

/*
  Objects:
    - arbitrary collections of properties 
    - trying to access a property that does not exist returns undefined
    - can assign or reassign values with the assignment operator
    - can delete a property with the delete operator

  Properties can be accessed with the Object.keys function, which returns an array of property names
  Object.assign copies all properties from one object into another
 */

let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
};

console.log(day1.squirrel, day1.events[1]);

day1.squirrel = true; // reassign value of true to squirrel property
day1.color = "grey"; // add a new property called color
console.log(day1.squirrel, day1.color);

delete day1.color; // remove the property called color
console.log(day1.color); // undefined

const properties = Object.keys(day1); // returns list of property names
console.log(properties);

Object.assign(day1, {isHome: true, hoursSlept: 12}); // assign new properties to object
console.log(day1.isHome, day1.hoursSlept, "\n");

/*
  Mutability:
    - numbers, strings and Booleans are immutable --> its impossible to change their values
    - objects are mutable --> their properties can be changed

  With objects, there is a difference between two references to the same object
  vs. two different objects with the same properties

  References to the same object = the same IDENTITY
*/

let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 === object2); // true, reference same object
console.log(object1 === object3); // false

object1.value = 15;
console.log(object2.value); // 15, reassigned through operation on object1

// while the binding of a const cant change, the properties of its referenced object can
const score = {visitors: 1, home: 0}; 
score.visitors = 2;
console.log(score.visitors, "\n");

/*
  Shift and Unshift:
    Shift: removes item from the front of an array
    Unshift: places new item at the front of an array
*/

let todoList = [];

function remember(task) {
  todoList.push(task);
}

function getTask() {
  return todoList.shift();
}

function rememberUrgently(task) {
  todoList.unshift(task);
}

remember("feed cats");
remember("study");
rememberUrgently("brush teeth");

console.log(todoList);
console.log(getTask());
console.log(todoList, "\n");

/*
  Array methods indexOf and lastIndexOf allow user to search for element
  from beginning or end of array

  Both indexOf and lastIndexOf take an optional second argument which indicates
  where to start searching (exclusive)
*/

const elements = [1, 2, 1, 1, 3, 5, 1];
console.log(elements.indexOf(1)); // 0
console.log(elements.lastIndexOf(1)); // 6
console.log(elements.indexOf(1, 0)); // 1
console.log(elements.lastIndexOf(1, 5), "\n"); // 3

/*
  The slice array method takes a start index (inclusive) and end index (exclusive)
  Slice returns the elements between both indexes

  Note: when the end index is not given, slice will return all elements from the starting index
*/

console.log(elements.slice(1, 4)); // [2, 1, 1]
console.log(elements.slice(1)); // [2, 1, 1, 3, 5, 1]

/*
  The concat method allows you to join arrays together
*/

console.log(elements.slice(0, 2).concat(elements.slice(5, 7)), "\n"); // [1, 2, 5, 1]

/*
  Strings and their properties
    - Strings, booleans, and numbers are immutable and are not objects
    - However, these types still have built-in properties

  .slice and .indexOf resemble the array methods with the same names
    - one difference is that string's index of can search for more than 1 character

  .trim removes whitespace (space, newlines, tabs) from the start and end of the string
  .padStart takes a desired length and padding character as arguments
  .split splits a string on every occurence and .join can join it again
  .repeat returns a new string consisting of the original string strung together n times
*/

const sentence = "The quick brown fox jumped over the lazy dog.";
console.log(sentence.slice(4, 9)); //"quick"
console.log(sentence.indexOf("b")); // 10
console.log(sentence.indexOf("fox")); //16
console.log("1".padStart(3, "0")); // "001"
console.log(sentence.split(" ").join("-")); // "The-quick-brown-f..."
console.log((sentence + " ").repeat(3).trim(), "\n");

/*
  The Rest Parameter ...
  The Rest Parameter ... gets bound to an array containing all further arguments
  ... spreads out the array into a function call, passing its elements as separate arguments
*/
const primes = [2, 3, 5, 7, 11, 13, 17]
console.log(Math.max(...primes)); // 17
console.log(...primes); // 2 3 5 7 11 13 17
console.log(Math.max(31, ...primes, 29), "\n"); // 31

/*
  The Math Object
  The Math Object creates a namespace for number-related utility functions
  By having the functions named as methods of Math, this saves useful binding names like max and min for us

  Math.min, Math.max, Math.sqrt, Math.cos, Math.sin, Math.tan, Math.acos, Math.asin, Math.atan
  Math.random returns a random number between 0 (inclusive) and 1 (exclusive)
  Math.floor rounds down, Math.ceil rounds up, Math.round rounds to the nearest whole number
*/

console.log(Math.random() * 3) // generate a random number between 0 and 3 exclusive
console.log(Math.floor(Math.random() * 3), "\n"); // random whole number between 0 and 3 exclusive

/*
  Destructuring
  - Allows you to bind elements of an array
  - Allows you to access properties of an object
*/

function printCoordinates([x, y]) {
  console.log(`x: ${x} y: ${y}`);
}

let {name} = {name: "Martha", age: 16};

printCoordinates([10, 4]);
console.log(name, "\n");

/* 
  JSON = JavaScript Object Notation, a popular serializable format for data
    - ALL property names must be surrounded by DOUBLE quotes
    - NO comments are allowed
    - Simple expressions only, NO computation is allowed

  JSON.stringify() takes a JS value and returns it as a JSON encoded string
  JSON.parse() takes a JSON encoded string and converts it to a JS value
*/

let entry = {date: "20210822", entry: "Today I went to the..."};

console.log(JSON.stringify(entry));
console.log(JSON.parse(JSON.stringify(entry)));
