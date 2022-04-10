import run from "aocrunner"

const parseGraph = input => {
  const parent = {};
  input.split("\n").map(x => x.split(")")).forEach(([x, y]) => parent[y] = x)
  return parent
}

const part1 = (input) => {
  const parent = parseGraph(input)
  const orbits = (x) => parent[x] ? orbits(parent[x]) + 1 : 0;

  return Object.keys(parent).reduce((acc, key) => acc + orbits(key), 0);
}

const part2 = (input) => {
  const parent = parseGraph(input)

  const path = (x) => parent[x] ? [x, ...path(parent[x])] : [x]

  const youPath = path(parent["YOU"])
  const sanPath = path(parent["SAN"])
  const node = sanPath.find(x => youPath.includes(x))

  return youPath.indexOf(node) + sanPath.indexOf(node)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
