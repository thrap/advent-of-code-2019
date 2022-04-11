import run from "aocrunner"

const parseInput = rawInput => rawInput.split('').map(x => +x)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const pattern = [0, 1, 0, -1]

  const stepN = (state, n) => {
    const p = []
    for (var i = 0; p.length <= state.length; i++) {
      for (var repeat = 0; repeat <= n; repeat++) {
        p.push(pattern[i%4])
      }
    }
    p.shift()
    var ans = 0
    for (var i = n; i < state.length; i++) {
      ans += state[i]*p[i]
    }
    return Math.abs(ans)%10
  }

  const step = (state) => {
    return state.map((_, i) => stepN(state, i))
  }

  let state = input
  for (var steps = 0; steps < 100; steps++) {
    state = step(state)
  }
  return state.slice(0,8).join('')
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `80871224585914546619083218645595`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: '24176176' },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: part2Input, expected: '' },
    ],
    solution: part2,
  },
  onlyTests: false,
})
