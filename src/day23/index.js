import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const transmit = (computers, setNAT) => {
  var transmitted = false
  computers.forEach(computer => {
    const output = computer.output()
    for (var i = 0; i < output.length-1; i+=3) {
      const [addr, x, y] = output.slice(i)
      if (addr == 255) {
        setNAT([x, y])
      } else {
        transmitted = true
        computers[addr].input([x,y])
      }
    }
  })
  return transmitted
}

const network = (program, setNAT) => {
  const computers = [...Array(50)].map((_,i) => new Intcode(program).input([i,-1]))

  return [() => transmit(computers, setNAT), computers[0]]
}

const part1 = (program) => {
  let ans
  const [transmit] = network(program, ([_, y]) => ans = y)

  while(!ans) {
    transmit()
  }
  return ans
}

const part2 = (program) => {
  let ans, last
  let nat = []
  const [transmit, com0] = network(program, (arr) => nat = arr)
  while(!ans) {
    if (!transmit()) {
      const y = nat[1]
      if (last == y) {
        return y
      }
      last = y
      com0.input(nat)
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
