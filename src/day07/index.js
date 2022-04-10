import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const thrusterSignal = (signals, program) => {
  const machines = signals.map(setting => new Intcode(program).setNextInput(setting))
  let lastOutput = 0;
  for(let i = 0; true; i++) {
    const machine = machines[i%machines.length]
    if (machine.isStopped) {
      return lastOutput
    }
    lastOutput = machine.setNextInput(lastOutput).nextOutput()
  }
}

const maxSignal = (program, signals) => {
  let max = -Infinity;
  const permutations = (arr, newArr=[]) => {
    if (!arr.length) {
      max = Math.max(max, thrusterSignal(newArr, program))
      return
    }
    arr.forEach(x => permutations(arr.filter(y => y != x), newArr.concat([x])))
  }
  permutations(signals)
  return max
}

run({
  part1: {
    solution: (input) => maxSignal(input, [0,1,2,3,4]),
  },
  part2: {
    solution: (input) => maxSignal(input, [5,6,7,8,9]),
  },
})
