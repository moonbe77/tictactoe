//toggle between players
//get cell clicked
//game logic

let game = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

let turn = true;
let winner = false;

const addToGame = (row, col, player) => {
  game[row][col] = player;
  // drawGame();
  // checkWinner();
  console.log(game);
};

// drawGame();

const handleClick = (e) => {
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
  console.log('reset game clicked');
  turn = true;
};

function arraysEqual(a1, a2) {
  /* WARNING: arrays must not contain {objects} or behavior may be undefined */
  return JSON.stringify(a1) == JSON.stringify(a2);
}

const checkWinner = () => {
  let checkX = [];
  let checkO = [];
  function compare() {
    const recipes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    recipes.forEach((recipe) => {
      if (arraysEqual(checkX, recipe)) {
        console.log('X is the winner');
      }
      if (arraysEqual(checkO, recipe)) {
        console.log('O is the winner');
      }
    });
  }

  game.forEach((e, index) => {
    if (e == 'X') {
      checkX.push(index);
    } else {
      checkO.push(index);
    }
    compare();
  });
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
