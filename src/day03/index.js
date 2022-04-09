import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(',').map(x => [x[0], +x.slice(1)]))

const dirs = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
}

const intersections = (input) => {
  const paths = parseInput(input)
  const seen = {}
  const intersections = {}
  paths.forEach((path, j) => {
    let x = 0
    let y = 0
    var totalSteps = 0
    path.forEach(([dir, steps]) => {
      const [dx, dy] = dirs[dir]
      for (let i = 1; i <= steps; i++) {
        totalSteps++
        x += dx
        y += dy
        const key = 100000*x + y
        if (seen[key]?.[0] == j) {
          intersections[[x, y]] = seen[key][1]+totalSteps
        }
        seen[key] = [j+1, totalSteps]
      }
    })
  })
  return intersections
}

const part1 = (input) => {
  const manhattan = p => {
    const [x, y] = p.split(',')
    return Math.abs(x) + Math.abs(y)
  }
  return Math.min(...Object.keys(intersections(input)).map(manhattan))
}

const part2 = (input) => {
  return Math.min(...Object.values(intersections(input)))
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
