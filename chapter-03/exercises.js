/*
  1. Write a function min that takes 2 arguments and returns their minimum
*/

function min(a, b) {
  return a <= b ? a : b;
}

console.log(min(1, 2));
console.log(min(2, 1));
console.log(min(1, 1), "\n");

/*
  2. Define a recusrive function isEven
    Should accept a single parameter & return a Boolean
*/

function isEven(num) {
  function findIsEven(num) {
    if (num === 0) {
      return true;
    } else if (num === 1) {
      return false;
    } else {
      return findIsEven(num - 2);
    }
  }

  return findIsEven(Math.abs(num)); // handle even-ness of negative integers
}

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1), "\n");

/*
  3. Bean Counting
  a. write a function countBs that takes a string and returns how many uppercase B's there are
  b. next, write a function called countChar that takes a second argument indicating which char is to be counted
  c. rewrite countBs to make use of this new function
*/

/*
function countBs(str) {
  let bCount = 0;

  str.forEach(function(char) {
    if (char === 'B') bCount++;
  });

  return bCount;
}
*/

function countChar(str, char) {
  let count = 0;
  let characters = str.split("");

  characters.forEach(function(c) {
    if (c === char) count++;
  });
  
  return count;
}

function countBs(str) {
  return countChar(str, "B");
}

console.log(countBs("Bologna"));
console.log(countBs(""));
console.log(countBs("BoaB"));
console.log(countBs("baboon"));