const winnerNode = document.getElementById('winner');
const modalNode = document.querySelector('.modal');
const gameStatsNode = document.getElementById('game_stats');
const movesNode = document.getElementById('moves');
const turnNode = document.getElementById('turn');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const cellElements = document.querySelectorAll('.cell');

let huPlayer = 'X';
let aiPlayer = 'O';
let player = huPlayer;
let turn = true; //true is man
let isWinner = false;
let isTie = false;
let moves = 0;
let game = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

const addEventToCells = () => {
  cellElements.forEach((e) => {
    e.addEventListener('click', handleClick, { once: true });
  });
};

function handleClick(e) {
  if (isWinner) return;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  console.log('cell click', row, col);

  addToGame(row, col, player);
}

const startGame = () => {
  addEventToCells();
  hideModal();
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
  isTie = false;
  moves = 0;
  player = huPlayer;
  updateGameStats();
  drawBoard(game);
};

const changePlayer = () => {
  turn = !turn;
  turn ? (player = huPlayer) : (player = aiPlayer);
  console.log(player);
};

const addToGame = (row, col, player) => {
  game[row][col] = player;

  countMoves(game);
  checkWinner(game, player);
  changePlayer();
  updateGameStats();
  drawBoard(game);
  declareWinner(game, player);
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

const availableMoves = (board) => {
  let emptyCells = [];

  board.forEach((row, index) => {
    //rows
    row.forEach((e, i) => {
      // cols
      e == '' && emptyCells.push([index, i]);
    });
  });

  return emptyCells;
};

// const aiMove = () => {
//   const posibleMoves = availableMoves(game);
//   const pickRandom = Math.floor(
//     Math.random() * Math.floor(posibleMoves.length)
//   );

//   return [posibleMoves[pickRandom][0], posibleMoves[pickRandom][1]];
// };

function minimax(newBoard, player) {
  var availSpots = availableMoves(newBoard);

  if (checkWinner(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWinner(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }
  var moves = [];

  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = [availSpots[i][0], availSpots[i][1]];
    move.orig = newBoard[availSpots[i][0]][availSpots[i][1]];
    newBoard[availSpots[i][0]][availSpots[i][1]] = player;

    if (player == aiPlayer) {
      var result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i][0]][availSpots[i][1]] = move.orig;

    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

const nextMove = () => {
  if (player == huPlayer) {
    return;
  }
  if (isWinner || isTie) {
    return;
  }

  const copyGame = [...game];
  const bestMove = minimax(copyGame, aiPlayer).index;
  console.log('minimax', bestMove);

  setTimeout(() => {
    addToGame(bestMove[0], bestMove[1], player);
  }, 600);
};

const updateGameStats = () => {
  movesNode.innerText = 9 - moves;

  if (turn) {
    turnNode.innerText = `${huPlayer} is playing`;
    player1.classList.add('next_turn');
    player2.classList.remove('next_turn');
  } else {
    turnNode.innerText = `${aiPlayer} is playing`;
    player2.classList.add('next_turn');
    player1.classList.remove('next_turn');
  }
  if (isWinner) {
    turnNode.innerText = `-`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
  }
};

const declareWinner = (board, player) => {
  if (checkWinner(board, player)) {
    isWinner = true;
    winnerNode.innerText = `${player} is the winner`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
    showModal();
    return;
  }

  if (moves === 9) {
    isTie = true;
    winnerNode.innerText = `the game is draw`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
    showModal();
    return;
  }
};

const checkWinner = (board, ply) => {
  let r1c1 = board[0][0] === ply;
  let r1c2 = board[0][1] === ply;
  let r1c3 = board[0][2] === ply;

  let r2c1 = board[1][0] === ply;
  let r2c2 = board[1][1] === ply;
  let r2c3 = board[1][2] === ply;

  let r3c1 = board[2][0] === ply;
  let r3c2 = board[2][1] === ply;
  let r3c3 = board[2][2] === ply;

  if (
    (r1c1 && r1c2 && r1c3) ||
    (r2c1 && r2c2 && r2c3) ||
    (r3c1 && r3c2 && r3c3)
  ) {
    return true;
  }

  if (
    (r1c1 && r2c1 && r3c1) ||
    (r1c2 && r2c2 && r3c2) ||
    (r1c3 && r2c3 && r3c3)
  ) {
    return true;
  }

  if (r1c1 && r2c2 && r3c3) {
    return true;
  }

  if (r3c1 && r2c2 && r1c3) {
    return true;
  }

  // if (moves === 9) {
  //   return false;
  // }
};

const addNameToPlayer = (e) => {
  const target = e.target.id;
  // console.log(target);

  if (target === 'player1') {
    huPlayer = prompt('Enter player X name') || 'X';
    player1.innerHTML = `P1: ${huPlayer}`;
  }
  if (target === 'player2') {
    aiPlayer = prompt('Enter player X name') || 'X';
    player2.innerHTML = `P2: ${aiPlayer}`;
  }
  startGame();
};

const countMoves = (board) => {
  moves = 0;
  board.forEach((e, i) => {
    e.forEach((e) => {
      e != '' && moves++;
    });
  });
};

const showModal = () => {
  modalNode.classList.add('show');
};
const hideModal = () => {
  modalNode.classList.remove('show');
};

player1.addEventListener('click', addNameToPlayer);
player2.addEventListener('click', addNameToPlayer);
document
  .getElementById('reset_game_button')
  .addEventListener('click', startGame);

startGame();
