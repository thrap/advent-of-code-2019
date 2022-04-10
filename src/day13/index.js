import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  const machine = new Intcode(program)
  let count = 0
  while (!machine.isStopped) {
    const x = machine.nextOutput()
    const y = machine.nextOutput()
    const id = machine.nextOutput()
    count += id == 2
  }
  return count
}

const part2 = (program) => {
  const machine = new Intcode(2+program.slice(1))
  const board = [...Array(25)].map(_ => [])
  var pos = []
  var paddleX
  var paddleY
  while (!machine.isStopped) {
    const x = machine.nextOutput()
    const y = machine.nextOutput()
    const id = machine.nextOutput()

    if (x != -1) {
      if (y == undefined) {
        return x
      }
      board[y][x] = id
    }
    if (id == 3) {
      paddleX = x
      paddleY = y
    }
    if (id == 4) {
      if (y == paddleY-1 && x == paddleX) {
        machine.setNextInput(0)
      } else {
        machine.setNextInput(Math.sign(x - paddleX))
      }
      pos.push(x)
    }
  }
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
