import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]

const part1 = (rawInput) => {
  const rules = {
    '#': (c) => c == 1 ? '#' : '.',
    '.': (c) => c == 1 || c == 2 ? '#' : '.'
  }
  const step = (l, i) => l.map((c, j) =>
    rules[c](dirs.filter(([di, dj]) => state[i+di]?.[j+dj] == '#').length)
  )

  const rating = ([...chars]) => chars.reduce((acc, c, i) =>
    acc + (c == '#' ? Math.pow(2, i) : 0)
  ,0)

  const seen = {}
  var state = parseInput(rawInput)
  for (var i = 0; true; i++) {
    const str = state.map(l => l.join('')).join('')
    if(seen[str]) {
      return rating(str)
    }
    seen[str] = true
    state = state.map(step)
  }
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `....#
#..#.
#..##
..#..
#....`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 2129920 },
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
