$(document).ready(function(){
  //purpose: creates 10x 10 table
  //signature: none
  //examples: createTable(); --> 10x10 table
  function createTable(){
    //loop to add 10 rows
    for (var rowsCounter = 0; rowsCounter < 10; rowsCounter++) {
      //adds rows to the gameboard by append
      $("#gameBoard").append("<tr></tr>")
      //loop to add 10 columns
      for (var colCounter = 0; colCounter < 10;
        colCounter++){
          //adds 10 columns to the last row of the table with an ID
          $("tr").last().append("<td id="+ rowsCounter + colCounter +"></td>")
        }
      }
    };
    createTable();

    $("td").on("click",
    // each time a user clicks a space on the board,the function will add the class to change the color and disable the space.
    function(){
      // if statement that pulls each digit from the ID and places it into the two indexes of the array and asks if it has a value or not
      if (counterOfHits < 24 && torpedoesLeft > 0) {
        if
        //.attr selects the attribute(anything after an equals sign) that you specify, pulling it from the location (i.e. using 'this')
        (board[($(this).attr("id").substring(0,1))][($(this).attr("id").substring(1))] === 0){
          // adds the class to change the screen color to show we already have shot at this space and disable the click ability
          $(this).addClass("shot").off("click");
          // if the array has a 1 in this spot, add teh class "hit" to change the color to red and disable the click function
        } else {
          $(this).addClass("hit").off("click");
          counterOfHits ++;
          $("#counterOfHits").text(counterOfHits);
        }
        // removes one from the torpedoesLeft
        torpedoesLeft -= 1;
        // shows the variable torpedoesLeft on the board
        $("#torpedoesLeft").text(torpedoesLeft);
      }; //end of counterofhits

      if (counterOfHits === 24){
        $("#gameStatus").text("YOU WIN!");
      }
      if (counterOfHits < 24 && torpedoesLeft === 0){
        $("#gameStatus").text("YOU LOSE!");
      //accesses indexes saved in var answerkey and adds the class 'hit'
          for (var i =0; i < answerKey.length; i = i+2) {
          $("#" + answerKey[i] + answerKey[i + 1]).addClass("hit");
      }
    }
  }); //end of on click
});// end of document.ready
// ********************************************************
// ********************************************************

// creating variable to show number of torpedoes left to shoot
var torpedoesLeft = 50;
var board = [];
var counterOfHits = 0;
var answerKey = [];
var index1; // the y axis, top to bottom
var index2; //the x axis, left to right

function createBoard() {
  for (var array = 0; array < 10; array++) {
    board[array] = [0,0,0,0,0,0,0,0,0,0];
  }
}
createBoard();

// placeFiveShip();
// console.log(answerKey);
var ships = {
  block5: function (){
    index1 = Math.floor(Math.random() * 10);
    index2 = Math.floor(Math.random() * 5);
    for (var i = 0; i < 5; i++) {
      board[index1][index2 + i] = 1;
      answerKey.push(index1, index2 + i);
      console.log(index1, index2)
    };
  },
  block4: function () {
    index1 = Math.floor(Math.random() * 10);
    index2 = Math.floor(Math.random() * 6);
  },
  block3: function () {
    index1 = Math.floor(Math.random() * 10);
    index2 = Math.floor(Math.random() * 8);
  },
  block2: function () {
    index1 = Math.floor(Math.random() * 10);
    index2 = Math.floor(Math.random() * 9);
  },
  block1: function () {
    index1 = Math.floor(Math.random() * 10);
    index2 = Math.floor(Math.random() * 10);
  }
};
//the five block ship is added to the board array and the answerkey array
ships.block5();

// purpose: to place 2 4-block ships on the board without overlapping the 5-block ship that has already been placed and with one block of space between the borders of each previously placed ship
function fourBlockShip(){
  var counterOfShips = 0
  while (counterOfShips < 2){
    // creates two random numbers and assigns them to variable index1 and index2
    ships.block4();
    // variable to count number of if statements that are true
    var issue = 0;
    // function to check the surrounding columns and rows to see if there are any ships already placed there
    function checkTd() {
      //loop  to check the first set of random numbers (the first index) and then the following indexes to the right
      for (i = 0; i < 4; i++){
        //checks if the space is already taken (value = 1)
        if (board[index1][index2 + i] === 1){
          issue++;
          ships.block4();
        };
        //if the first index is in the top row (0) checks the space below
        if (index1 ===0) {
          if (board[index1 + 1][index2 + i] === 1) {
            issue++;
            ships.block4();
          };}
          //checking the spaces above the bottom row (index 8) if the first index is in row 9
          if (index1 === 9) {
            if (board[index1 - 1][index2 + i] === 1) {
              ships.block4();
              issue++;
            };}
            //checking middle rows, top and bottom
            if ((!(index1 === 0)) && (!(index1 === 9))) {
              if ((board[index1 + 1][index2 + i] === 1) ||
              (board[index1 - 1][index2 + i] === 1)) {
                ships.block4();
                issue++;
              };};
              //if the index is on the left-most column (0) of the board, check only the space to the right of the ship
      if (index2 === 0) {
        if (board[index1][index2 + 4] === 1) {
          ships.block4();
          issue++;
        };
      };
      //if the index is on the right-most possible column (6), checks the space to the left
      if (index2 === 6) {
        if (board[index1][index2 - 1] === 1) {
          ships.block4();
          issue++;
        };
      };
      //for the inside rows check both left and right spaces for a ship
      if ((!(index2 === 0)) && (!(index2 === 6))) {
        if ((board[index1][index2 - 1] === 1) ||
        (board[index1][index2 + 4] === 1)) {
          ships.block4();
          issue++;
        };
      };
    }; //end of for loop
  }; //end of checkTd
  //run function to cycle through if statements
    checkTd();
    //while there are issues re-cycle through the function
    while (issue > 0) {
      issue = 0;
      checkTd();
    };
    //once the cycle has finished and there are no issues the ship is placed in the array for the board and the answerkey
    for (var i = 0; i < 4; i++) {
      board[index1][index2 + i] = 1;
      answerKey.push(index1, index2 + i);
      console.log(counterOfShips);
    };
    counterOfShips++;
  }
}
fourBlockShip();

function threeBlockShip(){
  var counterOfShips = 0
  while (counterOfShips < 2){
    ships.block3();
    var issue = 0;
    function checkTd() {
      for (i = 0; i < 3; i++){
        if (board[index1][index2 + i] === 1){
          issue++;
          ships.block3();
        };
        if (index1 ===0) {
          if (board[index1 + 1][index2 + i] === 1) {
            ships.block3();
            issue++;
          };}
          //   //checking the bottom row
          if (index1 === 9) {
            if (board[index1 - 1][index2 + i] === 1) {
              ships.block3();
              issue++;
            };}
            //checking middle rows
            if ((!(index1 === 0)) && (!(index1 === 9))) {
              if ((board[index1 + 1][index2 + i] === 1) ||
              (board[index1 - 1][index2 + i] === 1)) {
                ships.block3();
                issue++;
              };};
      if (index2 === 0) {
        if (board[index1][index2 + 3] === 1) {
          ships.block3();
          issue++;
        };
      };
      //checking each tr for ships left only
      if (index2 === 7) {
        if (board[index1][index2 - 1] === 1) {
          ships.block3();
          issue++;
        };
      };
      //for the inside rows check both left and right spaces for a ship
      if ((!(index2 === 0)) && (!(index2 === 7))) {
        if ((board[index1][index2 - 1] === 1) ||
        (board[index1][index2 + 3] === 1)) {
          ships.block3();
          issue++;
        };
      };
    };//end of for loop
  }; //end of checkTd
    checkTd();
    while (issue > 0) {
      issue = 0;
      checkTd();
    };
    for (var i = 0; i < 3; i++) {
      board[index1][index2 + i] = 1;
      answerKey.push(index1, index2 + i);
      console.log(counterOfShips);
    };
    counterOfShips++;
  }
}
threeBlockShip();

function twoBlockShip(){
  var counterOfShips = 0
  while (counterOfShips < 2){
    ships.block2();
    var issue = 0;
    function checkTd() {
      for (i = 0; i < 2; i++){
        if (board[index1][index2 + i] === 1){
          issue++;
          ships.block2();
        };
        if (index1 ===0) {
          if (board[index1 + 1][index2 + i] === 1) {
            ships.block2();
            issue++;
          };}
          //   //checking the bottom row
          if (index1 === 9) {
            if (board[index1 - 1][index2 + i] === 1) {
              ships.block2();
              issue++;
            };}
            //checking middle rows
            if ((!(index1 === 0)) && (!(index1 === 9))) {
              if ((board[index1 + 1][index2 + i] === 1) ||
              (board[index1 - 1][index2 + i] === 1)) {
                ships.block2();
                issue++;
              };};
      if (index2 === 0) {
        if (board[index1][index2 + 2] === 1) {
          ships.block2();
          issue++;
        };
      };
      //checking each tr for ships left only
      if (index2 === 8) {
        if (board[index1][index2 - 1] === 1) {
          ships.block2();
          issue++;
        };
      };
      //for the inside rows check both left and right spaces for a ship
      if ((!(index2 === 0)) && (!(index2 === 8))) {
        if ((board[index1][index2 - 1] === 1) ||
        (board[index1][index2 + 2] === 1)) {
          ships.block2();
          issue++;
        };
      };
    };//end of for loop
  }; //end of checkTd
    checkTd();
    while (issue > 0) {
      issue = 0;
      checkTd();
    };
    for (var i = 0; i < 2; i++) {
      board[index1][index2 + i] = 1;
      answerKey.push(index1, index2 + i);
      console.log(counterOfShips);
    };
    counterOfShips++;
  }
}
twoBlockShip();

//purpose: to place 5 ships at a random index in the array
//signature: nothing --> returns index
//examples: placeShip --> board[0][0]= 1
function placeShip() {
  //sets the number of ships to zero before the function is run
  var counterOfShips = 0;
  //if the counterOfShips is less than 5, the computer will pick a random number and defines it as var index
  while (counterOfShips < 1) {
    ships.block1();
    //vertical td *************************
    //checking the top row
    if (index1 ===0) {
      if (board[index1 + 1][index2] === 1) {
        ships.block1();
        issue++;
      };}
      //   //checking the bottom row
      if (index1 === 9) {
        if (board[index1 - 1][index2] === 1) {
          ships.block1();
          issue++;
        };}
        //checking middle rows
        if ((!(index1 === 0)) && (!(index1 === 9))) {
          if ((board[index1 + 1][index2] === 1) ||
          (board[index1 - 1][index2] === 1)) {
            ships.block1();
            issue++;
          };};
          if (board[index1][index2] != 0){
            ships.block1();
            issue++;
          };
    var issue = 0;
    function checkTr(){
      // checking each tr for ships right only
      if (index2 === 0) {
        if (board[index1][index2 + 1] === 1) {
          ships.block1();
          issue++;
        };
      };
      //checking each tr for ships left only
      if (index2 === 8) {
        if (board[index1][index2 - 1] === 1) {
          ships.block1();
          issue++;
        };
      };
      //for the inside rows check both left and right spaces for a ship
      if ((!(index2 === 0)) && (!(index2 === 8))) {
        if ((board[index1][index2 - 1] === 1) ||
        (board[index1][index2 + 1] === 1)) {
          ships.block1();
          issue++;
        };
      };
      //vertical td
      //checking the top row
      if (index1 ===0) {
        if (board[index1 + 1][index2] === 1) {
          ships.block1();
          issue++;
        };}
        //   //checking the bottom row
        if (index1 === 9) {
          if (board[index1 - 1][index2] === 1) {
            ships.block1();
            issue++;
          };}
          //checking middle rows
          if ((!(index1 === 0)) && (!(index1 === 9))) {
            if ((board[index1 + 1][index2] === 1) ||
            (board[index1 - 1][index2] === 1)) {
              ships.block1();
              issue++;
            };};
            if (board[index1][index2] != 0){
              ships.block1();
              issue++;
            };
          };
          checkTr();
          while (issue > 0){
            issue = 0;
            checkTr();
          }
          board[index1][index2] = 1;
          counterOfShips += 1;
          console.log(index1,index2);
          //adds the index to an empty array and saves in var answerkey
          answerKey.push(index1,index2);
        };
      }
      placeShip();
