const { readFileSync } = require("fs");

const shapes = [
  {
    name: "rock",
    signs: ["A", "X"],
    score: 1,
    defeats: ["C", "Z"],
  },
  {
    name: "paper",
    signs: ["B", "Y"],
    score: 2,
    defeats: ["A", "X"],
  },
  {
    name: "scissors",
    signs: ["C", "Z"],
    score: 3,
    defeats: ["B", "Y"],
  },
];

const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

const round = (battle) => {
  let [player1, end] = battle.split(" ");
  player1 = shapes.find((s) => s.signs.includes(player1));
  let player2;
  switch (end) {
    case "X":
      player2 = shapes.find((s) => s.signs.includes(player1.defeats[0]));
      break;
    case "Y":
      player2 = player1;
      break;
    case "Z":
      player2 = shapes.find((s) => s.defeats.includes(player1.signs[0]));
      break;
  }

  //Draw
  if (player1.name === player2.name) {
    return player1.score + 3;
  }

  if (player1.signs.some((r) => player2.defeats.includes(r))) {
    return 6 + player2.score;
  }

  return player2.score;
};

console.log(arr.reduce((prv, cur) => (prv += round(cur)), 0));
