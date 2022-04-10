import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  const machine = new Intcode(program)
  let count = 0;
  while (!machine.isStopped) {
      const x = machine.nextOutput()
      const y = machine.nextOutput()
      const id = machine.nextOutput()
      count += id == 2
  }
  return count
}

const part2 = (rawInput) => {
  return
}

const part1Input = ``
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '' },
    ],
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
