import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (input) => {
  const machine = new Intcode(input);
  machine.setNextInput(1)
  let last = 0
  while(!last) {
    last = machine.nextOutput()
  }
  return last
}

const part2 = (input) => {
  const machine = new Intcode(input);
  machine.setNextInput(5)
  return machine.nextOutput()
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
