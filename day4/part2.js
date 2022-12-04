const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

const sectionString = (pair) => {
  const [start, end] = pair.split("-").map((p) => parseInt(p));
  let string = [];
  for (let i = start; i < end + 1; i++) {
    string.push(i);
  }
  if (start === end) {
    string = [start];
  }
  return string;
};

let count = 0;
arr.forEach((pair) => {
  const [pair1, pair2] = pair.split(",");
  let overlap = false;
  sectionString(pair1).forEach((l) => {
    if (sectionString(pair2).includes(l)) overlap = true;
  });
  if (overlap) count++;
});
console.log(count);
