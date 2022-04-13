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
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
