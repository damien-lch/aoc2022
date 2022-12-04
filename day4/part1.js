const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

let count = 0;
arr.forEach((pair) => {
  const [pair1, pair2] = pair.split(",");
  const [pair1Start, pair1End] = pair1.split("-").map((p) => parseInt(p));
  const [pair2Start, pair2End] = pair2.split("-").map((p) => parseInt(p));
  if (
    (pair1Start <= pair2Start && pair1End >= pair2End) ||
    (pair2Start <= pair1Start && pair2End >= pair1End)
  ) {
    count++;
  }
});
console.log(count);
