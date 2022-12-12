const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

let cycle = 0;
let strength = 1;

const cycleStrength = [];
const cyclesToCheck = [20, 60, 100, 140, 180, 220];

const checkCycleStrength = () => {
  console.log("Cycle: ", cycle);
  const cycleIndex = cyclesToCheck.indexOf(cycle);

  if (cycleIndex === -1) return;

  console.log("Strength: ", strength);

  cycleStrength.push({
    cycle: cycle,
    strength: cycle * strength,
  });
};

arr.forEach((op) => {
  checkCycleStrength();
  cycle++;
  if (op === "noop") {
  } else if (op.startsWith("addx")) {
    checkCycleStrength();
    cycle++;
    console.log(
      strength,
      parseInt(op.split(" ")[1]),
      strength + parseInt(op.split(" ")[1])
    );
    strength += parseInt(op.split(" ")[1]);
  }
});

console.log(cycleStrength);

console.log(
  cycleStrength.reduce((acc, cur) => {
    return acc + cur.strength;
  }, 0)
);
