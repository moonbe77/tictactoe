//toggle between players DONE
//get cell clicked
//game logic

const winnerNode = document.getElementById('winner');
const gameStatsNode = document.getElementById('game_stats');

let playerX = 'X';
let playerO = 'O';

const startGame = () => {};

let turn = true;
let winner = false;
let game = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const addToGame = (row, col, player) => {
  console.log(game);
  game[row][col] = player;
  checkWinner(player);
};

// const changeTurn = () => {
//   let player;
//   turn ? (player = 'X') : (player = 'O');
//   turn = !turn;

//   return player;
// };

const handleClick = (e) => {
  let player;

  if (winner) return;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  if (game[row][col] != '') return console.log('can not click on that cell');

  turn ? (player = 'X') : (player = 'O');
  e.target.innerText = player;
  addToGame(row, col, player);
  turn = !turn;

  if (turn) {
    player1.classList.add('next_turn');
    player2.classList.remove('next_turn');
  } else {
    player2.classList.add('next_turn');
    player1.classList.remove('next_turn');
  }
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
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
  }
};

const checkWinner = (player) => {
  let r1c1 = game[0][0] === player;
  let r1c2 = game[0][1] === player;
  let r1c3 = game[0][2] === player;

  let r2c1 = game[1][0] === player;
  let r2c2 = game[1][1] === player;
  let r2c3 = game[1][2] === player;

  let r3c1 = game[2][0] === player;
  let r3c2 = game[2][1] === player;
  let r3c3 = game[2][2] === player;

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

const addNameToPlayer = (e) => {
  const player = e.target.id;
  console.log(player);

  if (player === 'player1') {
    playerX = prompt('Enter player X name') || 'X';
    player1.innerHTML = `P1: ${playerX}`;
  }
  if (player === 'player2') {
    playerO = prompt('Enter player X name') || 'X';
    player2.innerHTML = `P2: ${playerO}`;
  }
};

const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
player1.addEventListener('click', addNameToPlayer);
player2.addEventListener('click', addNameToPlayer);
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
