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
console.log(score.visitors);