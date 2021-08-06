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