import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  var sum = 0
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      const drone = new Intcode(program)
      drone.input([x,y])
      sum += drone.nextOutput()
    }
  }
  return sum
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
