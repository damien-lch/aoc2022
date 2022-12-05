const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

let stacks = [];
let mouvs = [];
let cutIndex = arr.indexOf("");

stacks = arr.slice(0, cutIndex - 1);
mouvs = arr.slice(cutIndex + 1, arr.length);

//Stacks
let rightStacks = [];
for (i = 0; i < stacks.length; i++) {
  const currLine = stacks[i];
  let cutedLine = [];
  for (let j = 0; j < currLine.length / 4; j++) {
    cutedLine.push(currLine.slice(0 + 4 * j, 4 + 4 * j));
  }
  cutedLine.forEach((cl, i) => {
    if (!rightStacks[i]) rightStacks[i] = [];
    rightStacks[i].unshift(cl);
  });
}

rightStacks = rightStacks.map((rs) => {
  return rs.map((rl) => rl.trim()).filter((rl) => rl);
});

//Mouvs
mouvs = mouvs.map((m) => {
  return m.replace("move ", "").replace("from ", "").replace("to ", "");
});

mouvs.forEach((m) => {
  const [move, from, to] = m.split(" ");

  const toMove = rightStacks[from - 1].slice(-move);
  rightStacks[to - 1].push(...toMove);
  rightStacks[from - 1] = rightStacks[from - 1].slice(
    0,
    rightStacks[from - 1].length - move
  );
});

//Result
rightStacks.forEach((rs) => {
  console.log(
    rs
      .slice(-1)
      .map((rs) => rs[1])
      .join()
  );
});
