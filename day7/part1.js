const { readFileSync } = require("fs");
const contents = readFileSync("input.txt", "utf-8");
const arr = contents.split(/\r?\n/);

let directories = [];
let currentDir;
let currentCmd;

const isCommand = (string) => {
  return string[0] === "$";
};

const getCommand = (string) => {
  return string
    .split(" ")
    .map((s) => s.replace("$", ""))
    .filter((s) => s);
};

const getNewDirectory = (name) => {
  if (name === "..") {
    currentDir = directories.find((d) => d.name === currentDir.parent);
  } else {
    if (name === "/") {
      directories.push({
        name: "/",
        parent: null,
        files: [],
        size: 0,
      });
      currentDir = directories.find((d) => d.name === name);
    } else {
      if (!directories.find((d) => d.name === name)) {
        directories.push({
          name: name,
          parent: currentDir ? currentDir.name : null,
          files: [],
          size: 0,
        });
      }
      currentDir = directories.find(
        (d) => d.name === name && d.parent === currentDir.name
      );
    }
  }
};

arr.forEach((line, i) => {
  console.log(i);
  if (isCommand(line)) {
    const [command, option] = getCommand(line);
    switch (command) {
      case "cd":
        getNewDirectory(option);
        currentCmd = command;
        break;
      case "ls":
        currentCmd = command;
        break;
    }
  } else {
    if (currentCmd === "ls") {
      const [line1, line2] = line.split(" ");
      if (line1 === "dir") {
        //Check if folder already exist
        if (
          !directories.find(
            (d) => d.name === line2 && d.parent === currentDir.name
          )
        ) {
          console.log("current dir", currentDir);
          directories.push({
            name: line2,
            parent: currentDir.name,
            files: [],
            size: 0,
          });
        }
      } else {
        currentDir.files = [
          ...currentDir.files,
          {
            name: line2,
            size: line1,
          },
        ];
        currentDir.size += parseInt(line1);
      }
    }
  }
  console.log(directories);
});

let tempTotal = 0;
const findChilds = (dir) => {
  tempTotal += parseInt(dir.size);
  const childs = directories.filter((d) => d.parent === dir.name);
  childs.forEach((c) => {
    findChilds(c);
  });
  return tempTotal;
};

directories = directories.map((dir) => {
  const iciTotal = findChilds(dir);
  tempTotal = 0;
  return { ...dir, grandTotal: iciTotal };
});

console.log(
  directories.reduce((acc, curr) => {
    return curr.grandTotal < 100_000 ? (acc += parseInt(curr.grandTotal)) : acc;
  }, 0)
);
