const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

const isUpperCase = (input) => {
  return input === String(input).toUpperCase();
};

const getSameChar = (string1, string2, string3) => {
  let same;
  string1.split("").forEach((s1) => {
    string2
      .split("")
      .filter((s2) => string1.includes(s2))
      .forEach((s2) => {
        string3
          .split("")
          .filter((s3) => string2.includes(s3))
          .forEach((s3) => {
            if (s1 == s2 && s1 == s3) {
              if (
                (isUpperCase(s1) && isUpperCase(s2) && isUpperCase(s3)) ||
                (!isUpperCase(s1) && !isUpperCase(s2) && !isUpperCase(s3))
              ) {
                same = s1;
              }
            }
          });
      });
  });
  return same;
};

let totalPrio = 0;
for (let i = 0; i < arr.length / 3; i++) {
  const groupLines = arr.slice(i * 3, i * 3 + 3);
  const sameChar = getSameChar(groupLines[0], groupLines[1], groupLines[2]);
  let priority = parseInt(sameChar, 36) - 9;
  if (isUpperCase(sameChar)) priority += 26;
  totalPrio += priority;
}

console.log(totalPrio);
