//toggle between players
//get cell clicked
//game logic

let game = [];
let turn = true;
let winner = false;

const addToGame = (cellId, value) => {
  const index = cellId - 1;
  game[index] = value;
  drawGame();
  checkWinner();
};

const drawGame = async () => {
  await game.map((cell, index) => {
    // console.log('cell', index);
    // console.log('cell', cell);
    document.getElementById(index + 1).innerText = cell;
  });
};

const handleClick = (e) => {
  const cell = e.target;
  if (game[e.target.id - 1] != undefined)
    return console.log('cell already with value');

  let value;
  turn ? (value = 'X') : (value = 'O');
  turn = !turn;
  addToGame(e.target.id, value);
};

const resetGame = () => {
  console.log('reset game clicked');
  game = [];
  turn = true;
  console.log(game);
  drawGame();
};

const checkWinner = () => {
  let checkX = [];
  let checkO = [];
  function arraysEqual(a1, a2) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    return JSON.stringify(a1) == JSON.stringify(a2);
  }
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

    recipes.map((recipe) => {
      if (arraysEqual(checkX, recipe)) {
        alert('X is the winner');
      }
      if (arraysEqual(checkO, recipe)) {
        alert('O is the winner');
      }
    });
  }

  game.map((e, index) => {
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
