import run from "aocrunner"

const parseInput = rawInput => rawInput.split('').map(x => +x)

const part1 = (rawInput) => {
  const pattern = [0, 1, 0, -1]

  const stepN = (state, n) => {
    var idx = 0
    var ans = 0
    for (var i = 0; idx < state.length; i++) {
      if (i % 2 == 0) {
        idx += n + (i != 0 ? 1 : 0)
        continue
      }
      for (var repeat = 0; idx < state.length && repeat <= n; repeat++) {
        ans += state[idx] * pattern[i%4]
        idx++
      }
    }
    return Math.abs(ans)%10
  }

  const step = (state) => {
    return state.map((_, i) => stepN(state, i))
  }

  let state = parseInput(rawInput)
  for (var steps = 0; steps < 100; steps++) {
    state = step(state)
  }
  return state.slice(0,8).join('')
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput).join('').repeat(10000).split('').map(x => +x)
  const offset = +input.slice(0,7).join('')
  const step = (state) => {
    const newState = []
    var sum = state.reduce((acc, x) => acc + x)
    for (var i = 0; i < state.length; i++) {
      var ans = sum
      sum -= state[i]
      newState.push(ans%10)
    }
    return newState
  }
  let state = input.slice(offset)
  for (var steps = 0; steps < 100; steps++) {
    state = step(state)
  }
  return state.slice(0,8).join('')
}

run({
  part1: {
    tests: [
      { input: '80871224585914546619083218645595', expected: '24176176' },
      { input: '19617804207202209144916044189917', expected: '73745418' },
      { input: '69317163492948606335995924319873', expected: '52432133' },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: '03036732577212944063491565474664', expected: '84462026' },
      { input: '02935109699940807407585447034323', expected: '78725270' },
      { input: '03081770884921959731165446850517', expected: '53553731' },
    ],
    solution: part2,
  },
  onlyTests: false,
})
