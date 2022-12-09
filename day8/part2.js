const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

let treesVisible = 0;

const matrice = [];
arr.forEach((line) => {
  matrice.push(line.split(""));
});

//Outlined trees
treesVisible += matrice.length * 2;
treesVisible += matrice[0].length * 2 - 4;

const getScenicScore = (coords) => {
  let topScore = 0;
  let leftScore = 0;
  let rightScore = 0;
  let bottomScore = 0;
  //Top
  let topVisible = true;
  for (let t = coords.y - 1; t >= 0; t--) {
    topScore++;
    if (matrice[t][coords.x] >= coords.height) {
      topVisible = false;
      break;
    }
  }
  //Left
  let leftVisible = true;
  for (let l = coords.x - 1; l >= 0; l--) {
    leftScore++;
    if (matrice[coords.y][l] >= coords.height) {
      leftVisible = false;
      break;
    }
  }
  //Bottom
  let bottomVisible = true;
  for (let b = coords.y + 1; b < matrice.length; b++) {
    bottomScore++;
    if (matrice[b][coords.x] >= coords.height) {
      bottomVisible = false;
      break;
    }
  }
  //Right
  let rightVisible = true;
  for (let r = coords.x + 1; r < matrice.length; r++) {
    rightScore++;
    if (matrice[coords.y][r] >= coords.height) {
      rightVisible = false;
      break;
    }
  }
  return topScore * leftScore * bottomScore * rightScore;
};

let scenicScores = [];

for (let i = 1; i < matrice.length - 1; i++) {
  const line = matrice[i];
  for (let j = 1; j < line.length - 1; j++) {
    scenicScores.push(getScenicScore({ x: +i, y: +j, height: +matrice[j][i] }));
  }
}

console.log(Math.max(...scenicScores));
