import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const execute = (program, code) =>
  new Intcode(program).inputAscii(code).output().slice(-1)[0]

const part1 = (program) => execute(program,
 `NOT A J
  NOT B T
  OR T J
  NOT C T
  OR T J
  NOT D T
  NOT T T
  AND T J
  WALK`
)

const part2 = (program) => execute(program,
 `NOT A J
  NOT B T
  OR T J
  NOT C T
  OR T J
  NOT D T
  NOT T T
  AND T J
  NOT E T
  NOT T T
  OR H T
  AND T J
  RUN`
)

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
