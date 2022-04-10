import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n')//.map(parseLine)

const part1 = (input) => {
  const orbits = (x) => parent[x] ? orbits(parent[x]) + 1 : 0;

  const parent = {};
  input.split("\n").map(x => x.split(")")).forEach(([x, y]) => parent[y] = x)

  let sum = Object.keys(parent).reduce((acc, key) => acc + orbits(key), 0);

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
