import run from "aocrunner"
import Intcode from "../utils/intcode.js"

run({
  part1: {
    solution: (program) => new Intcode(program).setNextInput(1).nextOutput(),
  },
  part2: {
    solution: (program) => new Intcode(program).setNextInput(2).nextOutput(),
  },
})
