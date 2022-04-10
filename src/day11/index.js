import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]

const part1 = (program) => {
  const machine = new Intcode(program)
  const white = {}
  var x = 0
  var y = 0
  var dirI = 0
  while(!machine.isStopped) {
    machine.setNextInput(white[[x,y]] ? 1 : 0)

    white[[x,y]] = machine.nextOutput()
    const turnRight = machine.nextOutput()
    if (turnRight) {
      dirI = (4+dirI - 1)%4
    } else {
      dirI = (4+dirI + 1)%4
    }
    const [dx, dy] = dirs[dirI]
    x += dx
    y += dy
  }

  return Object.keys(white).length
}

const part2 = (rawInput) => {
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
