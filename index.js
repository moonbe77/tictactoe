const winnerNode = document.getElementById('winner');
const gameStatsNode = document.getElementById('game_stats');
const movesNode = document.getElementById('moves');
const turnNode = document.getElementById('turn');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

let playerX = 'X';
let playerO = 'O';
let player = 'X';
let turn = true; //true is man
let isWinner = false;
let moves = 0;
let game = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const startGame = () => {
  console.log('starting game');
  const board = document.getElementById('board').children;
  const boardArray = Array.from(board);
  boardArray.forEach((element) => {
    element.innerText = '';
  });

  game = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  winnerNode.innerText = ``;
  turn = true;
  isWinner = false;
  moves = 0;
  player = 'X';
  updateGameStats();
  drawBoard(game);
};

const changePlayer = () => {
  turn = !turn;
  turn ? (player = 'X') : (player = 'O');
};

const addToGame = (row, col, player) => {
  game[row][col] = player;

  countMoves(game);
  checkWinner(game);
  changePlayer();
  updateGameStats();
  drawBoard(game);
  nextMove();
};

const drawBoard = (board) => {
  board[0].forEach((e, i) => {
    if (e != '') {
      switch (i) {
        case 0:
          document.getElementById('1').innerText = e;
          break;
        case 1:
          document.getElementById('2').innerText = e;
          break;
        case 2:
          document.getElementById('3').innerText = e;
          break;

        default:
          break;
      }
    }
  });
  board[1].forEach((e, i) => {
    if (e != '') {
      switch (i) {
        case 0:
          document.getElementById('4').innerText = e;
          break;
        case 1:
          document.getElementById('5').innerText = e;
          break;
        case 2:
          document.getElementById('6').innerText = e;
          break;

        default:
          break;
      }
    }
  });
  board[2].forEach((e, i) => {
    if (e != '') {
      switch (i) {
        case 0:
          document.getElementById('7').innerText = e;
          break;
        case 1:
          document.getElementById('8').innerText = e;
          break;
        case 2:
          document.getElementById('9').innerText = e;
          break;

        default:
          break;
      }
    }
  });
};

const aiMove = () => {
  let emptyCells = [];

  game.forEach((row, index) => {
    //rows
    row.forEach((e, i) => {
      // cols
      e == '' && emptyCells.push([index, i]);
    });
  });

  const pickRandom = Math.floor(Math.random() * Math.floor(emptyCells.length));

  return [emptyCells[pickRandom][0], emptyCells[pickRandom][1]];
};

const nextMove = () => {
  console.log('next move');
  if (turn) return;
  if (isWinner) return;
  const move = aiMove();
  console.log(move);

  setTimeout(() => {
    console.log('random move called');
    addToGame(move[0], move[1], player);
  }, 600);
};

const updateGameStats = () => {
  movesNode.innerText = 9 - moves;

  if (turn) {
    turnNode.innerText = `${playerX} is playing`;
    player1.classList.add('next_turn');
    player2.classList.remove('next_turn');
  } else {
    turnNode.innerText = `${playerO} is playing`;
    player2.classList.add('next_turn');
    player1.classList.remove('next_turn');
  }
  if (winner) {
    turnNode.innerText = `-`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
  }
};

const handleClick = (e) => {
  if (isWinner) return;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  if (game[row][col] != '') return console.log('can not click on that cell');

  addToGame(row, col, player);
};

const declareWinner = (player, draw) => {
  if (draw) {
    winnerNode.innerText = `the game is draw`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
    return;
  }

  let winner = player === 'X' ? playerX : playerO;
  if (winner) {
    winnerNode.innerText = `${winner} is the winner`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
  }
};

const checkWinner = (board) => {
  let r1c1 = board[0][0] === player;
  let r1c2 = board[0][1] === player;
  let r1c3 = board[0][2] === player;

  let r2c1 = board[1][0] === player;
  let r2c2 = board[1][1] === player;
  let r2c3 = board[1][2] === player;

  let r3c1 = board[2][0] === player;
  let r3c2 = board[2][1] === player;
  let r3c3 = board[2][2] === player;

  if (
    (r1c1 && r1c2 && r1c3) ||
    (r2c1 && r2c2 && r2c3) ||
    (r3c1 && r3c2 && r3c3)
  ) {
    declareWinner(player);
    isWinner = true;
    return true;
  }

  if (
    (r1c1 && r2c1 && r3c1) ||
    (r1c2 && r2c2 && r3c2) ||
    (r1c3 && r2c3 && r3c3)
  ) {
    isWinner = true;
    declareWinner(player);
  }

  if (r1c1 && r2c2 && r3c3) {
    isWinner = true;
    declareWinner(player);
  }

  if (r3c1 && r2c2 && r1c3) {
    isWinner = true;
    declareWinner(player);
  }

  if (moves === 9) {
    isWinner = true;
    declareWinner(null, true);
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

const countMoves = (board) => {
  moves = 0;
  board.forEach((e, i) => {
    e.forEach((e) => {
      e != '' && moves++;
    });
  });
};

player1.addEventListener('click', addNameToPlayer);
player2.addEventListener('click', addNameToPlayer);
document
  .getElementById('reset_game_button')
  .addEventListener('click', startGame);

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
