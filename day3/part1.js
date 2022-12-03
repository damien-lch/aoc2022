const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

const isUpperCase = (input) => {
  return input === String(input).toUpperCase();
};

const getSameChar = (string1, string2) => {
  let same;
  string1.split("").forEach((s1) => {
    string2.split("").forEach((s2) => {
      if (s1 == s2) {
        if (
          (isUpperCase(s1) && isUpperCase(s2)) ||
          (!isUpperCase(s1) && !isUpperCase(s2))
        ) {
          same = s1;
        }
      }
    });
  });
  return same;
};

console.log(
  arr.reduce((acc, cur) => {
    const part1 = cur.slice(0, cur.length / 2);
    const part2 = cur.slice(cur.length / 2, cur.length);
    let sameChar = getSameChar(part1, part2);
    let priority = parseInt(sameChar, 36) - 9;
    if (isUpperCase(sameChar)) priority += 26;
    return (acc = acc + priority);
  }, 0)
);
