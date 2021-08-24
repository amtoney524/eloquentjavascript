/*
  Higher-Order Functions operate on other functions, either by taking them as arguments or by returning them
    - Higher-order functions allow us to abstract over actions
 */

// a function that creates new functions
function greaterThan(n) {
  return m => m > n;
}

let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11)); // true

// functions that change other functions
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result
  };
}
noisy(Math.min)(3,2,1);

// functions that provide new types of control flow
function reapeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

function unless(test, then) {
  if (!test) then();
}

reapeat(3, n => {
  unless(n % 2 === 1, () => {
    console.log(n, "is even");
  });
});

// The built-in array method forEach provides something like a for loop as a higher order function
["A", "B"].forEach(l => console.log(l));
