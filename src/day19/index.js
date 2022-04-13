import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  var sum = 0
  for (var x = 0; x < 50; x++) {
    for (var y = 0; y < 50; y++) {
      const drone = new Intcode(program).input([x,y])
      sum += drone.nextOutput()
    }
  }
  return sum
}

const part2 = (program) => {
  const affected = (pos) => new Intcode(program).input(pos).nextOutput()

  const size = 100-1
  const traverse = (pos) => {
    const [x, y] = pos
    if (!affected(pos)) {
      return traverse([x, y+1])
    }
    if (affected([x-size, y]) && affected([x-size, y+size])) {
      return (x-size)*10000 + y
    }
    return traverse([x+1, y])
  }
  return traverse([20, 0])
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
