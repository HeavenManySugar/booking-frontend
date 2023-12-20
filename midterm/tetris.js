// https://tetris.fandom.com/wiki/Tetris_Guideline

// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a new tetromino sequence
// @see https://tetris.fandom.com/wiki/Random_Generator
function generateSequence() {
  const sequence = ["I", "J", "L", "O", "S", "T", "Z"];

  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
}

// get the next tetromino in the sequence
function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }

  const name = tetrominoSequence.pop();
  const matrix = tetrominos[name];

  // I and O start centered, all others start in left-middle
  const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);

  // I starts on row 21 (-1), all others start on row 22 (-2)
  const row = name === "I" ? -1 : -2;

  return {
    name: name, // name of the piece (L, O, etc.)
    matrix: matrix, // the current rotation matrix
    row: row, // current row (starts offscreen)
    col: col, // current col
    selected: false, // whether the block is selected or not
  };
}

// rotate an NxN matrix 90deg
// @see https://codereview.stackexchange.com/a/186834
function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));

  return result;
}

// check to see if the new matrix/row/col is valid
function isValidMove(matrix, cellRow, cellCol) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      for (let tetrominos of tetrominoGame) {
        if (tetrominos == selectedBlock || tetrominos.matrix === matrix)
          continue;
        for (let r = 0; r < tetrominos.matrix.length; r++) {
          for (let c = 0; c < tetrominos.matrix[r].length; c++) {
            if (matrix[row][col] && tetrominos.matrix[r][c]) {
              if (
                tetrominos.row + r === cellRow + row &&
                tetrominos.col + c === cellCol + col
              ) {
                return false;
              }
            }
          }
        }
      }
      if (
        matrix[row][col] &&
        // outside the game bounds
        (cellCol + col < 0 ||
          cellCol + col >= playfield[0].length ||
          cellRow + row >= playfield.length ||
          // collides with another piece
          playfield[cellRow + row][cellCol + col])
      ) {
        return false;
      }
    }
  }

  return true;
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

// place the tetromino on the playfield
function placeTetromino(tetromino) {
  tetrominoGame = removeItemOnce(tetrominoGame, tetromino);
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {
        // game over if piece has any part offscreen
        if (tetromino.row + row < 2) {
          return showGameOver();
        }

        playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
      }
    }
  }

  // check for line clears starting from the bottom and working our way up
  for (let row = playfield.length - 1; row >= 0; ) {
    if (playfield[row].every((cell) => !!cell)) {
      document.getElementById("eventnow").innerHTML = "消除列";

      // drop every row above this one
      for (let r = row; r >= 0; r--) {
        for (let c = 0; c < playfield[r].length; c++) {
          playfield[r][c] = playfield[r - 1][c];
        }
      }
    } else {
      row--;
    }
  }
  // tetrominoGame.push(getNextTetromino());
}

// show the game over screen
function showGameOver() {
  cancelAnimationFrame(rAF);
  gameOver = true;
  document.getElementById("eventnow").innerHTML = "遊戲結束";

  context.fillStyle = "black";
  context.globalAlpha = 0.75;
  context.fillRect(0, canvas.height / 2 - 30, canvas.width, 60);

  context.globalAlpha = 1;
  context.fillStyle = "white";
  context.font = "36px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2);
}

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const grid = 32;
const tetrominoSequence = [];

// keep track of what is in every cell of the game using a 2d array
// tetris playfield is 10x20, with a few rows offscreen
const playfield = [];

function emptyPlayfield() {
  for (let row = -2; row < 20; row++) {
    playfield[row] = [];

    for (let col = 0; col < 10; col++) {
      playfield[row][col] = 0;
    }
  }
}
emptyPlayfield();

const tetrominos = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  O: [
    [1, 1],
    [1, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

// color of each tetromino
const colors = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
};

let tetrominoGame = [getNextTetromino()];
let rAF = null; // keep track of the animation frame so we can cancel it
let gameOver = false;
let selectedBlock = null; // Variable to store the selected block
var last = new Date().getTime();
let mouseHold = false;
let counter = 0;

// game loop
function loop() {
  rAF = requestAnimationFrame(loop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the playfield
  for (let row = 0; row < 20; row++) {
    for (let col = 0; col < 10; col++) {
      if (playfield[row][col]) {
        const name = playfield[row][col];
        context.fillStyle = colors[name];

        // drawing 1 px smaller than the grid creates a grid effect
        context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
      } else {
        context.strokeStyle = "white";
        context.strokeRect(col * grid, row * grid, grid, grid);
        context.fillStyle = "lightgray";
        context.fillRect(col * grid, row * grid, grid - 1, grid - 1);
      }
    }
  }

  // Start a new Path
  context.beginPath();
  context.moveTo(0, 2 * grid);
  context.lineTo(canvas.width, 2 * grid);

  // Draw the Path
  context.strokeStyle = "red";
  context.stroke();
  if (mouseHold) {
    last = new Date().getTime();
  }

  // highlight the selected block
  if (tetrominoGame.indexOf(selectedBlock) > -1) {
    document.getElementById("eventnow").innerHTML = "用戶拖動方塊";
    document.getElementById("time").innerHTML =
      "距離上個事件過了 " + (0).toPrecision(4).slice(0, 5) + " 秒";
    const { row, col, matrix } = selectedBlock;
    let col1 = col,
      row1 = row,
      lengthCol = matrix[0].length,
      lengthRow = matrix.length,
      flag;
    context.strokeStyle = "red";
    context.lineWidth = 2;
    flag = 0;
    for (let r = 0; r < matrix.length; r++) {
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          row1 = row + r;
          flag = 1;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    for (let r = 0; r < matrix.length; r++) {
      flag = 1;
      for (let c = 0; c < matrix[r].length; c++) {
        if (matrix[r][c]) {
          flag = 0;
          break;
        }
      }
      if (flag) {
        lengthRow--;
      }
    }
    flag = 0;
    for (let c = 0; c < matrix[0].length; c++) {
      for (let r = 0; r < matrix.length; r++) {
        if (matrix[r][c]) {
          col1 = col + c;
          flag = 1;
          break;
        }
      }
      if (flag) {
        break;
      }
    }
    for (let c = 0; c < matrix[0].length; c++) {
      flag = 1;
      for (let r = 0; r < matrix.length; r++) {
        if (matrix[r][c]) {
          flag = 0;
          break;
        }
      }
      if (flag) {
        lengthCol--;
      }
    }
    context.strokeRect(
      col1 * grid,
      row1 * grid,
      lengthCol * grid,
      lengthRow * grid
    );
  }

  for (let tetromino of tetrominoGame) {
    // place piece if it runs into anything
    if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
      tetromino.row--;
      placeTetromino(tetromino);
    }
    context.fillStyle = colors[tetromino.name];

    for (let row = 0; row < tetromino.matrix.length; row++) {
      for (let col = 0; col < tetromino.matrix[row].length; col++) {
        if (tetromino.matrix[row][col]) {
          // drawing 1 px smaller than the grid creates a grid effect
          context.fillRect(
            (tetromino.col + col) * grid,
            (tetromino.row + row) * grid,
            grid - 1,
            grid - 1
          );
        }
      }
    }
  }

  // calculate the elapsed time
  var now = new Date().getTime();
  var elapsed = now - last;
  document.getElementById("time").innerHTML =
    "距離上個事件過了 " + (elapsed / 1000).toPrecision(4).slice(0, 5) + " 秒";
  document.getElementById("counter").innerHTML = counter;

  // if 1 second has passed, move the active tetromino down
  if (elapsed > 1000) {
    counter++;
    last = now;
    // draw the next tetromino
    if (counter >= 5) {
      counter = 0;
      tetrominoGame.push(getNextTetromino());
    }

    // draw the active tetromino
    for (let tetromino of tetrominoGame) {
      // tetromino falls every 1 second
      tetromino.row++;
      document.getElementById("eventnow").innerHTML = "方塊自然下落";
      context.fillStyle = colors[tetromino.name];

      for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
          if (tetromino.matrix[row][col]) {
            // drawing 1 px smaller than the grid creates a grid effect
            context.fillRect(
              (tetromino.col + col) * grid,
              (tetromino.row + row) * grid,
              grid - 1,
              grid - 1
            );
          }
        }
      }
    }
  }
}

function moveLeft() {
  if (gameOver || isPaused || !selectedBlock) return;
  document.getElementById("eventnow").innerHTML = "左移方塊";
  const col = selectedBlock.col - 1;

  if (isValidMove(selectedBlock.matrix, selectedBlock.row, col)) {
    selectedBlock.col = col;
  }
}

function moveRight() {
  if (gameOver || isPaused || !selectedBlock) return;
  document.getElementById("eventnow").innerHTML = "右移方塊";
  const col = selectedBlock.col + 1;

  if (isValidMove(selectedBlock.matrix, selectedBlock.row, col)) {
    selectedBlock.col = col;
  }
}

function moveDown() {
  if (gameOver || isPaused || !selectedBlock) return;
  document.getElementById("eventnow").innerHTML = "用戶下落方塊";
  document.getElementById("time").innerHTML =
    "距離上個事件過了 " + (0).toPrecision(4).slice(0, 5) + " 秒";
  const row = selectedBlock.row + 1;

  if (!isValidMove(selectedBlock.matrix, row, selectedBlock.col)) {
    selectedBlock.row = row - 1;
    placeTetromino(selectedBlock);
    return false;
  }

  selectedBlock.row = row;
  return true;
}

function moveRotate() {
  if (gameOver || isPaused || !selectedBlock) return;
  document.getElementById("eventnow").innerHTML = "旋轉方塊";
  const matrix = rotate(selectedBlock.matrix);

  if (isValidMove(matrix, selectedBlock.row, selectedBlock.col)) {
    selectedBlock.matrix = matrix;
  }
}

function resetgame() {
  cancelAnimationFrame(rAF);
  gameOver = false;
  emptyPlayfield();
  context.clearRect(0, 0, canvas.width, canvas.height);
  tetrominoSequence.length = 0;
  generateSequence();
  tetrominoGame = [getNextTetromino()];
  rAF = requestAnimationFrame(loop);
  last = new Date().getTime();
  document.getElementById("time").innerHTML =
    "距離上個事件過了 " + (0).toPrecision(4).slice(0, 5) + " 秒";
  document.getElementById("eventnow").innerHTML = "新遊戲";
  document.getElementById("btn1").innerHTML =
    '<i class="fa-solid fa-pause"></i>';
  isPaused = false;
}

let isPaused = false; // Variable to track if the game is paused

function pauseGame() {
  if (gameOver) return;
  if (isPaused) {
    document.getElementById("btn1").innerHTML =
      '<i class="fa-solid fa-pause"></i>';
    isPaused = false;
    rAF = requestAnimationFrame(loop); // Resume the game loop
    document.getElementById("eventnow").innerHTML = "遊戲繼續";
    last = new Date().getTime();
  } else {
    document.getElementById("eventnow").innerHTML = "遊戲暫停";
    document.getElementById("btn1").innerHTML =
      '<i class="fa-solid fa-play fa-fade"></i>';
    isPaused = true;
    cancelAnimationFrame(rAF); // Pause the game loop
    last = new Date().getTime();
    document.getElementById("time").innerHTML =
      "距離上個事件過了 " + (0).toPrecision(4).slice(0, 5) + " 秒";
  }
}

// listen to keyboard events to move the active tetromino
document.addEventListener("keydown", function (e) {
  if (gameOver) return;

  // Pause the game when the 'P' key is pressed
  if (e.which === 80) {
    pauseGame();
  }

  // Press the 'R' key to reset the game
  if (e.which === 82) {
    resetgame();
  }

  // left and right arrow keys (move)
  if (e.which === 37 || e.which === 39) {
    const col = e.which === 37 ? moveLeft() : moveRight();
  }

  // up arrow key (rotate)
  if (e.which === 38) {
    moveRotate();
  }

  // down arrow key (drop)
  if (e.which === 40) {
    moveDown();
  }
});

// listen to mouse events to select and move the block
canvas.addEventListener("mousedown", function (e) {
  if (gameOver || isPaused) return;

  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;

  for (let tetromino of tetrominoGame) {
    // check if the mouse clicked inside the active tetromino
    if (
      mouseX >= tetromino.col * grid &&
      mouseX < (tetromino.col + tetromino.matrix[0].length) * grid &&
      mouseY >= tetromino.row * grid &&
      mouseY < (tetromino.row + tetromino.matrix.length) * grid
    ) {
      selectedBlock = tetromino;
      mouseHold = true;
    }
  }
});

canvas.addEventListener("mousemove", function (e) {
  if (gameOver || isPaused || !mouseHold) return;

  const mouseX = e.clientX - canvas.getBoundingClientRect().left;
  const mouseY = e.clientY - canvas.getBoundingClientRect().top;
  const col =
    Math.floor(mouseX / grid) - Math.floor(selectedBlock.matrix[0].length / 2);
  const row =
    Math.floor(mouseY / grid) - Math.floor(selectedBlock.matrix.length / 2);

  // update the position of the selected block based on the mouse movement
  // check if the new position is valid
  if (isValidMove(selectedBlock.matrix, row, col)) {
    selectedBlock.col = col;
    selectedBlock.row = row;
  }
});

canvas.addEventListener("mouseup", function (e) {
  if (gameOver || isPaused || !mouseHold) return;
  mouseHold = false;
});

// start the game
rAF = requestAnimationFrame(loop);
