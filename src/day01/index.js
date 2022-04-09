import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(x => +x)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const f = x => Math.floor(x / 3) - 2
  return input.reduce((acc, x) => acc + f(x), 0)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = ``
const part2Input = part1Input
run({
  part1: {
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: '' },
    ],
    solution: part2,
  },
  onlyTests: false,
})
