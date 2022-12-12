const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

let mouvs = arr.map((line) => {
  const [mouv, length] = line.split(" ");
  return {
    mouv,
    length: parseInt(length),
  };
});

let top = 0;
let right = 0;
let left = 0;
let bottom = 0;

let currentY = 0;
let currentX = 0;
mouvs.forEach((m) => {
  if (m.mouv === "U") {
    currentY -= m.length;
    if (currentY < top) top = currentY;
  } else if (m.mouv === "D") {
    currentY += m.length;
    if (currentY > bottom) bottom = currentY;
  } else if (m.mouv === "L") {
    currentX -= m.length;
    if (currentX < left) left = currentX;
  } else if (m.mouv === "R") {
    currentX += m.length;
    if (currentX > right) right = currentX;
  }
});

let grid = [];

for (let i = 0; i < Math.abs(top) + Math.abs(bottom) + 1; i++) {
  grid[i] = [];
  for (let j = 0; j < Math.abs(left) + Math.abs(right) + 1; j++) {
    grid[i][j] = ".";
  }
}

const getGridSize = () => {
  let x = 0,
    y = 0;
  return { x, y };
};

const displayGrid = () => {
  console.log(grid);
};

console.log(getGridSize());
displayGrid();
