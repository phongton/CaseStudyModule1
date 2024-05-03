const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d")

const ROW = 18;
const COL = 10;
const SQ = 40;
const COLOR = "WHITE";

let score = 0;

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * SQ, y * SQ, SQ, SQ);
  ctx.strokeStyle = "#ccc";
  ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

let board = [];
for (let i = 0; i < ROW; i++) {
  board[i] = [];
  for (let j = 0; j < COL; j++) {
    board[i][j] = COLOR;
  }
}

function drawBoard() {
  for (let i = 0; i < ROW; i++) {
    for (let j = 0; j < COL; j++) {
      drawSquare(j, i, board[i][j])
    }
  }
}
drawBoard();
console.log(board)


class Cubes {
  constructor(tetris, color) { //trong lớp cubes có 2 đối tượng tetris là hình và màu của lớp cubes
    this.tetris = tetris;
    this.color = color;
    this.tetrisN = 0;
    this.activetetris = this.tetris[this.tetrisN] // lấy ra góc quay dưa trên chỉ số tetrisN = 0 gán nó vào thuộc tính active
    this.x = 3;
    this.y = -2;  // toạ độ đầu tiên để vẽ hinhf là y khi nằm ngoài thẻ canvas sau đó mới đưa vào thẻ canvas
  }

  fill(color) {
    for (let i = 0; i < this.activetetris.length; i++) {
      for (let j = 0; j < this.activetetris.length; j++) {
        if (this.activetetris[i][j]) {
          drawSquare(this.x + j, this.y + i, color);
        }
      }
    }
  }

  draw() {
    this.fill(this.color);
  }

  unDraw() {
    this.fill(COLOR);
  }

  moveDown() {
    if (!this.collision(0, 1, this.activetetris)) {
      this.unDraw();
      this.y++;
      this.draw();
    } else {
      this.lock();
      p = radomCube();

    }
  }

  moveRight() {
    if (!this.collision(1, 0, this.activetetris)) {
      this.unDraw();
      this.x++;
      this.draw();
    }
  }

  moveLeft() {
    if (!this.collision(-1, 0, this.activetetris)) {
      this.unDraw();
      this.x--;
      this.draw();
    }
  }

  moveUp() {
    let nextCube = this.tetris[(this.tetrisN + 1) % this.tetris.length];
    let move = 0;
    if (this.collision(0, 0, nextCube)) {
      if (this.x > COL / 2) {
        move = -1;
      } else {
        move = 1;
      }
    }
    if (!this.collision(0, 0, nextCube)) {
      this.unDraw();
      this.x += move;
      this.tetrisN = (this.tetrisN + 1) % this.tetris.length;
      this.activetetris = this.tetris[this.tetrisN];
      this.draw();
    }
  }

  lock() {

    for (let i = 0; i < this.activetetris.length; i++) {
      for (let j = 0; j < this.activetetris.length; j++) {
        if (!this.activetetris[i][j]) {
          continue
        }
        if (this.y + i < 0) {
          alert("Game Over");
          gameOver = true;
          break;

        }
        board[this.y + i][this.x + j] = this.color;
      }
    }
    for (let i = 0; i < ROW; i++) {
      let Full = true;
      for (let j = 0; j < COL; j++) {
        if ((board[i][j] === COLOR)) {
          Full = false;
          break;
        }
      }
      console.log(board)
      console.log(Full)
      if (Full) {
        for (let z = i; z > 1; z--) {
          for (let j = 0; j < COL; j++) {
            board[z][j] = board[z - 1][j];
          }
        }
        for (let j = 0; j < COL; j++) {
          board[0][j] = COLOR;

        }
        score += 10;
      }
    }

    drawBoard()
    document.getElementById("score").innerText = score;

   }


  collision(x, y, cube) {
    for (let i = 0; i < cube.length; i++) {
      for (let j = 0; j < cube.length; j++) {
        if (!cube[i][j]) {
          continue
        }
        let newX = this.x + j + x;
        let newY = this.y + i + y;
        if (newX < 0 || newX >= COL || newY >= ROW) {
          return true;
        }
        if (newY < 0) {
          continue;
        }
        if (board[newY][newX] !== COLOR) {
          return true
        }
      }
    }
    return false
  }

}

const Cube = [
  [I, "red "],
  [L, "yellow "],
  [O, "black "],
  [S, "blue "],
  [t, "green"],
];

function radomCube() {
  let i = Math.floor(Math.random() * Cube.length);
  return new Cubes(Cube[i][0], Cube[i][1]);
}

let p = radomCube();
document.addEventListener('keydown', function (event) {
  if (event.keyCode === 37) {
    p.moveLeft();
  } else if (event.keyCode === 39) {
    p.moveRight();
  } else if (event.keyCode === 38) {
    p.moveUp();
  } else if (event.keyCode === 40) {
    p.moveDown();
  }
})
let gameOver = false;
let interval;

function drop() {
  interval = setInterval(function () {
    if (!gameOver) {
      p.moveDown()
    } else  {
      clearInterval(interval)
    }

  }, 1000)

}

drop();

