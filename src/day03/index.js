import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(',').map(x => [x[0], +x.slice(1)]))

const dirs = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const seen = {}
  const crash = {}
  let min = Number.MAX_VALUE
  input.forEach((path, j) => {
    let x = 0
    let y = 0
    path.forEach(([dir, steps]) => {
      const [dx, dy] = dirs[dir]
      for (let i = 1; i <= steps; i++) {
        x += dx
        y += dy
        const key = 100000*x + y
        if (seen[key] == j) {
          min = Math.min(Math.abs(x) + Math.abs(y), min)
          crash[[x, y]] = true
        }
        seen[key] = j+1
      }
    })
  })
  console.log(crash);
  return min
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83`
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input: part1Input, expected: 159 },
      { input: `R8,U5,L5,D3
U7,R6,D4,L4`, expected: 6 },
      { input: `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`, expected: 135 },
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
