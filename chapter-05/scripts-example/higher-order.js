const SCRIPTS = require('./scripts.js')

/*
  Filtering Arrays:
  The filter function returns elements that meet a set criteria
    - filter is a PURE function which does not modify the array it was given
    - while hard-coded below, filter is a standard array method
*/

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) passed.push(element);
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living), "\n");
console.log(SCRIPTS.filter(script => script.direction === "ttb"), "\n");

/* 
  Transforming with Map:
  The map function applies a function to all of the array's elements
    - new array will have same length as input array, but content will have been mapped to new values
    - like forEach and filter, map is also a standard array method
*/

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(script => script.direction === "rtl");
console.log(map(rtlScripts, script => script.name), "\n");

/*
  Summarizing with Reduce:
  Computes a single value from an array
    - a reduce function may also be called a "fold"
    - builds a value by repeatedly taking a single element from an array & combining it with the current value
    - the parameters to reduce are a combining function and a starting value (optional for arrays with > 1 element)
*/

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
console.log([1, 2, 3, 4].reduce((a,b) => a + b), "\n");

// find the script with the most characters
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}), "\n");


/*
  Composability:
  Higher-order functions start to shine when you need to compose operations
  They are more readble, but not as fast since they build up new arrays while running filter and map
*/

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));

console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))), "\n");

  // Figure out what script a piece of text is using
  /*
    The some function takes a test function and tells you if it returns true
    for any of the elements in the array  
  */
  function characterScript(code) {
    for (let script of SCRIPTS) {
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        return script;
      }
    }
    return null;
  }

  // count the characters that belong to each script
  function countBy(items, groupName) {
    let counts = [];

    for (let item of items) {
      let name = groupName(item);
      let known = counts.findIndex(c => c.name === name);
      if (known === -1) {
        counts.push({name, count: 1});
      } else {
        counts[known].count++;
      }
    }

    return counts;
  }

  console.log(countBy([1, 2, 3, 4, 5], n => n > 2), "\n");

  function textScripts(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.name : "none";
    }).filter(({name}) => name !== "none");

    let total = scripts.reduce((n, {count}) => n + count, 0);
    if (total === 0) return "No scripts found";

    return scripts.map(({name, count}) => {
      return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
  }

  console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));