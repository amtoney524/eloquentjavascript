/*
  1. Write a range function that takes 2 arguments, start and end, and
    returns an array containing all the numbers from start up to and including end

    Next, write a sum function that takes an array of numbers and returns their sum

    Bonus: modify the function to take an optional step value
*/

function range(start, end, step=1) {
  let rangeArray = [];

  if (step === 0) step = 1; // prevent infinite loop

  if (step < 0) { // 2 different loop controls 
    while (start >= end) { 
      rangeArray.push(start);
      start += step;
    }
  } else {
    while (start <= end) {
      rangeArray.push(start);
      start += step;
    }
  }

  return rangeArray;
}

function sum(numbers) {
  let sum = 0;
  numbers.forEach(x => {sum += x;});
  return sum;
}

console.log(sum(range(1, 10)));
console.log(sum(range(1, 10, 2)));
console.log(range(1, 10, 2));
console.log(range(5, 2, -1), "\n");

/*
  2. Reversing an Array
    Write 2 functions, reverseArray and reverseArrayInPlace
     - reverseArray returns a new array that contains elements in reverse order
     - reverseArrayInPlace returns the same array with elements in reverse order
     - neither may use the standard reverse method
*/

let fruits = ["apple", "orange", "banana", "peach", "watermelon"];

function reverseArray(elements) {
  let newArray = [];

  for (let i = elements.length - 1; i >= 0; i--) {
    newArray.push(elements[i]);
  }

  return newArray;
}

function reverseArrayInPlace(elements) {
  for (let i = elements.length - 1, j = 0; i > j; i--, j++) {
    let temp = elements[i];
    elements[i] = elements[j];
    elements[j] = temp;
  }
}

console.log(reverseArray(fruits));
console.log(fruits);
reverseArrayInPlace(fruits);
console.log(fruits, "\n");

/*
  3. List
  A list is a nested set of objects with the first object holding a reference to the 2nd,
  the 2nd to the 3rd, and so on.

  Write a function arrayToList that builds up a list structure
  Write a function listToArray that returns an array from a list structure
  Write a helper function prepend which takes an element, and a list, and adds the element to the front
  Write a function nth to return the nth element in the list
*/

class ListNode {
  constructor(value, rest=null) {
    this.value = value;
    this.rest = rest;
  }
}

function arrayToList(array) {
  let head = null;
  let tail = null;

  for (let i = 0; i < array.length; i++) {
    let node = new ListNode(array[i]);
    if (i === 0) {
      head = node;
    } else if (i === 1) {
      head.rest = node;
    } else {
      tail.rest = node;
    }
    tail = node;
  }

  return head;
}

function listToArray(list) {
  let returnArray = [];

  let node = list;

  while(node !== null) {
    returnArray.push(node.value);
    node = node.rest;
  }

  return returnArray;
}

function prepend(element, list) {
  const head = new ListNode(element, list);
  return head;
}

function nth(list, n) {
  function getVal(l, pos) {
    console.log(l, pos)
    if (pos === n) {
      return l.value;
    } else {
      if (l.rest === null) {
        return undefined;
      } else {
        return getVal(l.rest, ++pos);
      }
    }
  }

  return getVal(list, 0);
}

let list = arrayToList([1, 2, 3, 4, 5, 6, 7])
console.log(list);
console.log(listToArray(list));
console.log(prepend(7, list));
console.log(nth(list, 4), "\n");

/*
  Deep Comparison
  The == operator compares objects by identity
  Write a function called deepequal that takes 2 values and returns true only if
  they are the same value or are objects with the same properties
*/

function deepEqual(obj1, obj2) {
  // compare properties if different references in memory
  if (obj1 != obj2) {
    if ((obj1 && obj2) && ((typeof obj1 === "object") && (typeof obj2 === "object"))) {

      if (Object.keys(obj1).length === Object.keys(obj2).length) {

        let keys = Object.keys(obj1);

        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if ((typeof obj1[key] === "object") && (typeof obj2[key] === "object")) {
            let comparison = deepEqual(obj1[key], obj2[key]);
            if (comparison === false) return false;
          } else if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
      } else {
        return false;
      }
    } else {
      return obj1 === obj2;
    }
  }
  return true;
}

let node = new ListNode(2);
console.log(deepEqual(new ListNode(1), new ListNode(1)));
console.log(deepEqual(new ListNode(1), node));
console.log(deepEqual(node, node), "\n");

let list1 = arrayToList([1, 2, 3, 4, 5, 6]);
let list2 = arrayToList([1, 2, 3, 4, 5, 6]);
let list3 = arrayToList([1]);

console.log(deepEqual(node, list1));
console.log(deepEqual(list1, list1));
console.log(deepEqual(list1, list2));
console.log(deepEqual(list1, list3));