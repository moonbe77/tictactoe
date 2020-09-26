const winnerNode = document.getElementById('winner');
const modalNode = document.querySelector('.modal');
const gameStatsNode = document.getElementById('game_stats');
const movesNode = document.getElementById('moves');
const turnNode = document.getElementById('turn');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const cellElements = document.querySelectorAll('.cell');

let playerX = 'X';
let playerO = 'O';
let player = playerX;
let turn = true; //true is man
let isWinner = false;
let moves = 0;
let game = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];
cellElements.forEach((e) => {
  e.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  if (isWinner) return;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;

  addToGame(row, col, player);
}

const startGame = () => {
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
  moves = 0;
  player = playerX;
  updateGameStats();
  drawBoard(game);
};

const changePlayer = () => {
  turn = !turn;
  turn ? (player = playerX) : (player = playerO);
  // console.log(player);
};

const addToGame = (row, col, player) => {
  game[row][col] = player;

  countMoves(game);
  checkWinner(game, player);
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

const aiMove = () => {
  const posibleMoves = availableMoves();
  const pickRandom = Math.floor(
    Math.random() * Math.floor(posibleMoves.length)
  );

  return [posibleMoves[pickRandom][0], posibleMoves[pickRandom][1]];
};

const minimax = (game, depth, player) => {
  const posibleMoves = availableMoves();
  if (checkWinner(game, player)) {
    return move;
  }

  if (player === playerO) {
    let bestScore = Infinity;

    posibleMoves.forEach((element) => {
      if (checkWinner(game, player)) {
        return {
          score: -10,
        };
      } else if (checkWinner(game, player)) {
        return {
          score: -10,
        };
      } else if (posibleMoves.length === 0) {
        return {
          score: 0,
        };
      }
    });
  } else {
    if (checkWinner(game, player)) {
      return {
        score: -10,
      };
    } else if (checkWinner(game, player)) {
      return {
        score: -10,
      };
    } else if (posibleMoves.length === 0) {
      return {
        score: 0,
      };
    }
  }
};

const nextMove = () => {
  console.log(game);
  if (turn) return;
  if (isWinner) return;
  const copyGame = [...game];
  const posibleMoves = availableMoves(copyGame);

  posibleMoves.forEach((element) => {
    console.log('element', element);

    copyGame[element[0]][element[1]] = playerO;
    console.log('copyGame>', copyGame);

    const bestMove = minimax(copyGame, playerO);
    console.log('bestMove', bestMove);

    copyGame[element[0]][element[1]] = '';
  });

  const move = aiMove();

  setTimeout(() => {
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
  if (isWinner) {
    turnNode.innerText = `-`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
  }
};

const declareWinner = (player, draw) => {
  if (draw) {
    winnerNode.innerText = `the game is draw`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
    return;
  }

  let winner = player === playerX ? playerX : playerO;
  if (winner) {
    winnerNode.innerText = `${winner} is the winner`;
    player2.classList.remove('next_turn');
    player1.classList.remove('next_turn');
    showModal();
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
    isWinner = true;
    declareWinner(ply);
    return true;
  }

  if (
    (r1c1 && r2c1 && r3c1) ||
    (r1c2 && r2c2 && r3c2) ||
    (r1c3 && r2c3 && r3c3)
  ) {
    isWinner = true;
    declareWinner(ply);
    return true;
  }

  if (r1c1 && r2c2 && r3c3) {
    isWinner = true;
    declareWinner(ply);
    return true;
  }

  if (r3c1 && r2c2 && r1c3) {
    isWinner = true;
    declareWinner(ply);
    return true;
  }

  if (moves === 9) {
    isWinner = true;
    declareWinner(null, true);
  }
};

const addNameToPlayer = (e) => {
  const target = e.target.id;
  // console.log(target);

  if (target === 'player1') {
    playerX = prompt('Enter player X name') || 'X';
    player1.innerHTML = `P1: ${playerX}`;
  }
  if (target === 'player2') {
    playerO = prompt('Enter player X name') || 'X';
    player2.innerHTML = `P2: ${playerO}`;
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
