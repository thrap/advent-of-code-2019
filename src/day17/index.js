import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  const dirs = [[0, 1],[-1,0],[0,-1],[1,0],[0,0]]
  const machine = new Intcode(program)
  var str = ""
  while(!machine.isStopped) {
    str += String.fromCharCode(machine.nextOutput())
  }

  const alignment = (str) => {
    const arr = str.split('\n').map(l => l.split(''))
    var sum = 0
    for (var i = 1; i < arr.length - 1; i++) {
      for (var j = 1; j < arr[0].length -1; j++) {
        if (dirs.every(([di, dj]) => arr[i+di][j+dj] == '#')) {
          sum += i*j
        }
      }
    }
    return sum
  }

  return alignment(str)
}

const part2 = (program) => {
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
