import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (program) => {
  const computers = [...Array(50)].map((_,i) => new Intcode(program).input([i,-1]))

  var ans = 0
  for (var j = 0; !ans; j++) {
    computers.forEach(computer => {
      const output = computer.output()
      for (var i = 0; i < output.length-1; i+=3) {
        const [addr, x, y] = output.slice(i)
        if (addr == 255) {
          ans = y
        } else {
          computers[addr].input([x,y])
        }
      }
    })
  }
  return ans
}

const part2 = (program) => {
  const computers = [...Array(50)].map((_,i) => new Intcode(program).input([i,-1]))

  var ans = 0

  var last = -Infinity
  var nat = []
  for (var j = 0; !ans; j++) {
    var transmitted = false
    computers.forEach(computer => {
      const output = computer.output()
      for (var i = 0; i < output.length-1; i+=3) {
        const [addr, x, y] = output.slice(i)
        if (addr == 255) {
          nat = [x, y]
        } else {
          transmitted = true
          computers[addr].input([x,y])
        }
      }
    })
    if (!transmitted) {
      const y = nat[1]
      if (last == y) {
        return y
      }
      last = y
      computers[0].input(nat)
    }
  }
  return ans
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
