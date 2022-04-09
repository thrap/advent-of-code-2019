import run from "aocrunner"

const solve = (input, f) => input.split('\n').reduce((acc, x) => acc + f(x), 0)

const fuel = x => Math.floor(x / 3) - 2
const fuelRec = x => fuel(x) > 0 ? fuel(x) + fuelRec(fuel(x)) : 0

run({
  part1: {
    solution: input => solve(input, fuel),
  },
  part2: {
    solution: input => solve(input, fuelRec),
  },
})
