const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

const datastream = arr[0];

for (let i = 0; i < datastream.length - 4; i++) {
  const stringCutted = datastream.slice(i, i + 4).split("");
  if (new Set(stringCutted).size === stringCutted.length) {
    console.log("index: ", i + 4);
    break;
  }
}
