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

class Directory {
  name = "";
  parent = null;
  children = [];
  files = [];
  constructor(name, parent) {
    this.name = name;
    this.parent = parent || null;
  }
  addChild = (child) => {
    this.children = [...this.children, child];
  };
  addFile = (file) => {
    this.files = [...this.files, file];
  };
  getFilesSize = () => {
    return this.files.reduce((acc, cur) => {
      return acc + parseInt(cur.size);
    }, 0);
  };
}

const getNewDirectory = (name) => {
  if (name === "/") {
    const newDir = new Directory("/");
    directories.push(newDir);
    currentDir = newDir;
  } else {
    if (name === "..") {
      currentDir = currentDir.parent;
    } else {
      currentDir = currentDir.children.find((c) => c.name === name);
    }
  }
};

arr.forEach((line, i) => {
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
        const newDir = new Directory(line2, currentDir);
        currentDir.addChild(newDir);
        directories.push(newDir);
      } else {
        currentDir.addFile({
          name: line2,
          size: line1,
        });
      }
    }
  }
});

let tempTotal = 0;
const findChilds = (dir) => {
  tempTotal += parseInt(dir.getFilesSize());
  dir.children.forEach((c) => {
    findChilds(c);
  });
  return tempTotal;
};

const dirs = directories.map((dir) => {
  const iciTotal = findChilds(dir);
  tempTotal = 0;
  return { ...dir, grandTotal: iciTotal };
});

console.log(
  dirs.reduce((acc, curr) => {
    return curr.grandTotal < 100_000 ? (acc += parseInt(curr.grandTotal)) : acc;
  }, 0)
);
