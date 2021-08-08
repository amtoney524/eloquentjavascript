/*
  The keywords let and const are scoped to the block in which they are declared
  In the example below, y will be unavailable outside of the block because it is declared with let
  z, however, is declared with var, and in the case of non-function blocks, it will be visible
*/

let x = 10;

if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z); // 60
} 

// y is not visible here, but z, declared with var, is
console.log(x + z, "\n"); // 40

/*
  In pre-2015 JS, only var's declared within a function are locally scoped
  This is because only functions created new scopes
 */

const getQ = function() {
  var q = 7;
  return q; 
};

console.log(getQ(), "\n"); // 7
// however, console.log(q) would fail since q is undefined here

/*
  Blocks and functions created within other blocks and functions create multiple degrees of locality
  Each local scope can see all the local scopes that contain it as well as the global scope
*/

let hummus = function(factor) {
  const ingredient = function(amount, unit, name) {
    let ingredientAmout = amount * factor; // referencing the local scope containing it
    if (ingredientAmout > 1) unit += "s";
    console.log(`${ingredientAmout} ${unit} ${name}`)
  };

  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "tablespoon", "cumin");
};

hummus(2);

/*
  Bindings can be assigned a new function value; for example, if the recipe was no longer found
*/

hummus = function(factor) {
  console.log("We are out of hummus\n");
};

hummus(2);

/*
  Function Declarations assign the function vale to the named finding.
  They do not require a semicolon and are automatically moved to the top of their scope.
  Because of this, Function Declarations may be used by all of the code in their scope.
*/

console.log("The future says:", future());

function future() {
  return "You'll never have flying cars\n";
}

/*
  Functions can be defined as:
   (1) Values: const square = function(num) { return num * num; };
   (2) Function Decalartions: function square(num) { return num * num; }
   (3) Arrow Functions: const square = (num) => { return num * num; };
*/

//const square = function(num) { return num * num; };
//function square(num) { return num * num }
const square = (num) => { return num * num};
console.log(square(7), "\n");

/*
  Optional Arguments:
    - if too many arguments passed to a function, the extra arguments are ignored
    - if too few arguments passed, the missing parameters are assigned a value of undefined
*/

console.log(square(2, "cat")); // returns 4
console.log(square(), "\n"); // returns undefined * undefined, or NaN

/* 
  Default Parameters:
  If you write an = operator after a parameter, followed by an expression,
  the value of that expression will replace the argument when it is not given
*/

function power(base, exponent=2) {
  let result = 1;
  
  for (let i = 0; i < exponent; i++) {
    result *= base;
  }

  return result;
}

console.log(power(2, 3)); // returns 8
console.log(power(2), "\n"); // returns 4, since missing parameter is assigned default

/*
  Closures:
  Every time a function is called, local bindings are created
  These local bindings may be accessed and returned as closures

  Closure = the ability to reference a local binding in the enclosing scope
*/

function wrapValue(n) {
  let local = n;
  return () => local; // returns function which access & returns local binding "local"
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);

console.log(wrap1(), wrap2(), "\n"); // returns 1 2

// Use closures to create functions that multiply by an arbitrary amount
function multiplier (factor) {
  return (number) => number * factor;
}

let twice = multiplier(2);
let threeTimes = multiplier(3);

console.log(twice(10)); // returns 20
console.log(threeTimes(10), "\n"); // returns 30

/* 
  Recursion: function that calls itself
  However, in JS, loops are generally less expensive than recursion
  This creates a tradeoff of speed vs. elegance
  
  Yet, some problems are better solved with recursion - like exploration of Trees
*/

function recursivePowers(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * recursivePowers(base, exponent - 1);
  }
}

console.log(recursivePowers(10, 3), "\n"); // returns 1000

/*
  Starting from 1 and repeatedly adding 5 or multiplying by 3, infinite numbers can be produced
  Find a sequence of additions & multiplications that find a certain number
 */

function findSolution(target) {
  function find(current, history) {
    if (current === target) {
      return history;
    } else if (current > target) {
      return null; // allows us to break out of current search
    } else {
      return find(current + 5, `(${history} + 5)`) ||
        find(current * 3, `(${history} * 3)`);
    }
  }

  return find(1, "1");
}

console.log(findSolution(24), "\n");