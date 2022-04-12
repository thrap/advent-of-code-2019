import run from "aocrunner"

const pattern = [0, 1, 0, -1]

const stepN = (state, n) => {
  var idx = 0
  var ans = 0
  for (var i = 0; idx < state.length; i++) {
    if (i % 2 == 0) {
      idx += n + (i != 0 ? 1 : 0)
      continue
    }
    for (var repeat = 0; idx < state.length && repeat <= n; repeat++, idx++) {
      ans += state[idx] * pattern[i%4]
    }
  }
  return Math.abs(ans)%10
}

const step = (state) => {
  return state.map((_, i) => stepN(state, i))
}

const part1 = (rawInput) => {
  let state = rawInput.split('').map(x => +x)
  for (var steps = 0; steps < 100; steps++) {
    state = step(state)
  }
  return state.slice(0,8).join('')
}

const factorsFromPascal = (n) => {
  let pascal = Array(100).fill(0)
  pascal[0] = 1
  const factors = []
  for (var i = 1; i < n+pascal.length; i++) {
    if (i >= pascal.length)
      factors.push(pascal[pascal.length-1])
    const newPascal = [1]
    for (var j = 1; j < pascal.length; j++) {
      newPascal[j] = (pascal[j]+pascal[j-1]) % 10
    }
    pascal = newPascal
  }
  return factors
}

const part2State = (input) => {
  const offset = +input.slice(0,7)
  let state = []
  const length = input.length*10000
  for (var i = offset; i < length; i++) {
    state.push(input[i % input.length])
  }
  return state
}

const part2 = (input) => {
  const state = part2State(input)

  const factors = factorsFromPascal(state.length)

  const step100 = (state, j) => {
    var sum = 0
    for (var i = 0; i+j < state.length; i++) {
      sum += factors[i]*state[i+j]
      sum %= 10
    }
    return sum
  }

  return [...Array(8)].map((_,i) => step100(state, i)).join('')
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
})
