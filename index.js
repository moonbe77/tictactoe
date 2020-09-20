//toggle between players DONE
//get cell clicked
//game logic

const winnerNode = document.getElementById('winner');
const gameStatsNode = document.getElementById('game_stats');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
let playerX, playerY;

const startGame = () => {
  playerX = prompt('Enter player X name') || 'X';
  playerO = prompt('Enter player O name') || 'O';

  player1.innerHTML = `P1: ${playerX}`;
  player2.innerHTML = `P2: ${playerO}`;
};

let game = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let turn = true;
let winner = false;

const addToGame = (row, col, player) => {
  game[row][col] = player;
  checkWinner(player);
};

// drawGame();

const handleClick = (e) => {
  if (winner) return;

  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  if (game[row][col] != '') return console.log('cell already with value');

  let player;
  turn ? (player = 'X') : (player = 'O');
  e.target.innerText = player;
  turn = !turn;

  addToGame(row, col, player);
};

const resetGame = () => {
  const board = document.getElementById('board').children;
  const boardArray = Array.from(board);
  boardArray.forEach((element) => {
    element.innerText = '';
  });
  console.log('reset game clicked');
  game = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  winnerNode.innerText = ``;
  turn = true;
  turn = true;
  winner = false;
};

const declareWinner = (player) => {
  winner = player === 'X' ? playerX : playerO;
  if (winner) {
    winnerNode.innerText = `${winner} is the winner`;
  } 
};
const checkWinner = (player) => {
  let r1c1, r1c2, r1c3, r2c1, r2c2, r2c3, r3c1, r3c2, r3c3;

  r1c1 = game[0][0] === player;
  r1c2 = game[0][1] === player;
  r1c3 = game[0][2] === player;

  r2c1 = game[1][0] === player;
  r2c2 = game[1][1] === player;
  r2c3 = game[1][2] === player;

  r3c1 = game[2][0] === player;
  r3c2 = game[2][1] === player;
  r3c3 = game[2][2] === player;

  if (
    (r1c1 && r1c2 && r1c3) ||
    (r2c1 && r2c2 && r2c3) ||
    (r3c1 && r3c2 && r3c3)
  ) {
    declareWinner(player);
  }

  if (
    (r1c1 && r2c1 && r3c1) ||
    (r1c2 && r2c2 && r3c2) ||
    (r1c3 && r2c3 && r3c3)
  ) {
    declareWinner(player);
  }

  if (r1c1 && r2c2 && r3c3) {
    declareWinner(player);
  }

  if (r3c1 && r2c2 && r1c3) {
    declareWinner(player);
  }
};

document
  .getElementById('reset_game_button')
  .addEventListener('click', resetGame);

document.getElementById('1').addEventListener('click', handleClick);
document.getElementById('2').addEventListener('click', handleClick);
document.getElementById('3').addEventListener('click', handleClick);
document.getElementById('4').addEventListener('click', handleClick);
document.getElementById('5').addEventListener('click', handleClick);
document.getElementById('6').addEventListener('click', handleClick);
document.getElementById('7').addEventListener('click', handleClick);
document.getElementById('8').addEventListener('click', handleClick);
document.getElementById('9').addEventListener('click', handleClick);

startGame();
