"use strict";
// bugs to be fixing:
// 1 shouln't be able to click on opponent's field.
// 2. write a draw game function.
// 3. add a reset game button.
// 4. add player to choose x or o maybe, but this will need to update some functions. e.g takeTure and aiTurn function.


// get all possible winning sequence in array list
const winningSequences = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// create a function for the array query of all cells. Array.from returns an array list
const cells = () => Array.from(document.getElementsByClassName('cell'));
// a helper function to convert string to int, and replace c with empty string.
const cellNumId = (c) => Number.parseInt(c.id.replace('c', ''));
//  a helper function to let AI know which cell is empty to select
const cellEmpty = () => cells().filter(cell => cell.innerText === '');
//  to check all 3 cells in an array is all have the same value to the first one as a winner, but not empty.
const threeMatch = (array) => array.every(cell => cell.innerText === array[0].innerText && cell.innerText !== '');
// put mark into the selected cell
const takeTurn = (index, mark) => cells()[index].innerText = mark;
// help function for AI to select empty cell. get random rumber times with empty cell length could be between 0-9, but Math floor can get it  down to 8, because cell started from 0,
// then recursive check the empty cell with cellEmpty helper function, cellNumId convert string to int satisfy the takeTurn function's first parameter index.
const aiChoice = ()=> cellNumId(cellEmpty()[Math.floor(Math.random()*cellEmpty().length)]);
// end game function
const gameOver =(winningSequence) =>{
  winningSequence.forEach(cell => cell.classList.add('winner'));
  ;}


// check winner function, set winner into false as no winner, loop through each element 's' in winningSequences, set another const _cells equal to cells to be reused.
//each winning sequence is in a sub array, take sub array's first index, second index and third index.
// if they are all match to pass in the sequence, turn winner to true and end the game.
const gameWinner =() => {
  let winner = false;
  winningSequences.forEach(s =>{
    const _cells = cells();
    const sequence = [_cells[s[0]], _cells[s[1]], _cells[s[2]]];
    if (threeMatch(sequence)){
      winner = true;
      gameOver(sequence);
    }
  });
  return winner;
}
// function for AI turn, set AI timeout to 1.5 second, aiChoice is for AI to select the empty cell
const aiTurn = () => {
  disableCellListeners();
  setTimeout(() => {
    takeTurn(aiChoice(), 'x');
    if(!gameWinner())
    cellListeners();
  }, 1500);
}

//function for player at game in progress. player is always O and AI is alwyas X, cellNumId convert string to int satisfy the takeTurn function's first parameter index.

//should not able to click on the field has already been clicked. still fixing!!!
// const cellfilled = () => cells().filter(cell => cell.innerText === 'x' || cell.innerText === 'o');
// const eventClick =(event) => {
//   const id = event.target.id;
//   if (id.innerText === 'x' || id.innerText === 'o'){
//     return;
//   }
//   takeTurn(cellNumId(event.target), 'o');
//   if(!gameWinner())
//   aiTurn();
// };

const eventClick =(event) => {
 takeTurn(cellNumId(event.target), 'O');
  if(!gameWinner())
  aiTurn();
};

// create a event listener function for each of the cell in the array
const cellListeners = () => cells().forEach(cell => cell.addEventListener('click', eventClick));
cellListeners();

// disable the event listener
const disableCellListeners = () => cells().forEach(ce => ce.removeEventListener('click', eventClick));
// disableCellListeners();
