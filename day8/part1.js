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

const isTreeVisible = (coords) => {
  //Top
  let topVisible = true;
  for (let t = coords.y - 1; t >= 0; t--) {
    if (matrice[t][coords.x] >= coords.height) {
      topVisible = false;
      break;
    }
    console.log("top visible");
  }
  //Left
  let leftVisible = true;
  for (let l = coords.x - 1; l > 0; l--) {
    if (matrice[coords.y][l] >= coords.height) {
      leftVisible = false;
      break;
    }
    console.log("left visible");
  }
  //Bottom
  let bottomVisible = true;
  for (let b = coords.y + 1; b < matrice.length; b++) {
    if (matrice[b][coords.x] >= coords.height) {
      bottomVisible = false;
      break;
    }
    console.log("bottom visible");
  }
  //Right
  let rightVisible = true;
  for (let r = coords.x + 1; r < matrice.length; r++) {
    if (matrice[coords.y][r] >= coords.height) {
      rightVisible = false;
      break;
    }
    console.log("right visible");
  }
  return topVisible || leftVisible || bottomVisible || rightVisible;
};

for (let i = 1; i < matrice.length - 1; i++) {
  const line = matrice[i];
  for (let j = 1; j < line.length - 1; j++) {
    console.log(
      i,
      j,
      matrice[i][j],
      isTreeVisible({ x: i, y: j, height: matrice[i][j] })
    );
    if (isTreeVisible({ x: +i, y: +j, height: +matrice[i][j] })) treesVisible++;
  }
}

console.log(treesVisible);
