/* 
  1. Looping a Triangle
  Write a loop that makes 7 calls to console.log to output the following triangle
  #
  ##
  ###
  ####
  #####
  ######
  #######
*/

for (let i = 0; i < 7; i++) {
  let triangle = "#";
  for (var j = 0; j < i; j++) {
      triangle += "#";
  }
  console.log(triangle);
}

console.log(" ");
/*
  2. FizzBuzz
  Write a program that uses console.log to print out numbers from 1 to 100 with
  some exceptions
    - for numbers divisible by 3, print "Fizz" instead of the number
    - for numbers divisible by 5, and not 3, print "Buzz" instead
    - for numbers divisible by 3 and 5, print "FizzBuzz"
*/

for (let i = 1; i <= 100; i++) {
  let divisibleBy3 = i % 3 === 0;
  let divisibleBy5 = i % 5 === 0;
  let output = i;

  if (divisibleBy3 && divisibleBy5) {
    output = "FizzBuzz";
  } else if (divisibleBy3) {
    output = "Fizz";
  } else if (divisibleBy5) {
    output = "Buzz";
  } 

  console.log(output);
}

console.log(" ")

/*
  3. Chessboard
  Write a program that creates an 8x8 grid, using new line characters to separate lines
    - at each position of the grid, there is either a space or a # character
    - make the program into a function

  Example output:
   # # # #
  # # # # 
   # # # #
  # # # #  
   # # # #
  # # # # 
   # # # #
  # # # # 
*/

let size = 8;

function chessboard(boardSize) {
  let board = "";

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (row % 2 === 0) {
        board += (col % 2 === 0) ? " " : "#";
      } else {
        board += (col % 2 === 0) ? "#" : " ";
      }

      if (col === boardSize - 1) board += "\n";
    }
  }

  console.log(board);
} 

chessboard(size);