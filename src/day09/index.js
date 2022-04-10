import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  return new Intcode(program).setNextInput(1).nextOutput()
}

const part2 = (rawInput) => {

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
