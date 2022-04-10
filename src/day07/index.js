import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const part1 = (input) => {
  const thrusterSignal = (signals) => {
    const machines = signals.map(setting => {
      const machine = new Intcode(input)
      machine.setNextInput(setting)
      return machine
    })
    let lastOutput = 0;
    for(let i = 0; i < machines.length; i++) {

      const machine = machines[i];
      if (machine.isStopped)
        break;

      machine.setNextInput(lastOutput);
      lastOutput = machine.nextOutput();
    }
    return lastOutput
  }

  let max = -Infinity;
  const permutations = (arr, newArr=[]) => {
    if (!arr.length) {
      const lastSignal = thrusterSignal(newArr);
      if (lastSignal > max) {
        max = lastSignal;
      }
    } else {
      arr.forEach(x => permutations(arr.filter(y => y != x), newArr.concat([x])))
    }
  }
  permutations([0, 1, 2, 3, 4])
  return max
}

const part2 = (rawInput) => {
  return
}

run({
  part1: {
    tests: [{ input: '3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0', expected: 43210}],
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
