import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const map = (program) => {
  const machine = new Intcode(program)
  const maze = {}

  const dirs = { 1: [0, 1], 2: [0, -1], 3: [-1,0], 4: [1, 0] }
  const reverse = { 1 : 2, 2: 1, 3: 4, 4: 3 }

  const tested = {}
  var min = Infinity
  const minSteps = {}
  const backTrack = dir => {
    machine.setNextInput(reverse[dir])
    machine.nextOutput()
  }
  const explore = (x, y, steps) => {
    if (!tested[[x, y]]) {
      tested[[x, y]] = new Set()
    }
    steps = minSteps[[x, y]] || steps
    minSteps[[x, y]] = steps
    const set = tested[[x, y]]
    for (var dir = 1; dir <= 4; dir++) {
      if (set.has(dir)) continue
      set.add(dir)
      const [dx, dy] = dirs[dir]
      machine.setNextInput(dir)
      const out = machine.nextOutput()
      if (out == 0) {
        maze[[x+dx,y+dy]] = '#'
        continue
      }
      if (out == 1) {
        maze[[x+dx,y+dy]] = '.'
      } else {
        maze[[x+dx,y+dy]] = 'O'
        min = Math.min(min, steps + 1)
      }
      explore(x + dx, y + dy, steps + 1)
      backTrack(dir)
    }
  }
  explore(0, 0, 0)

  return [min, maze]
}

const part1 = (program) => {
  return map(program)[0]
}

const part2 = (program) => {
  const maze = map(program)[1]
  const start = Object.keys(maze).find(x => maze[x] == 'O').split(',').map(c => +c)

  const queue = [[start,0]]
  const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]
  var max = 0
  while(queue.length) {
    const [[x, y], steps] = queue.shift()
    max = Math.max(max, steps)
    dirs.forEach(([dx, dy]) => {
      const pos = [x + dx, y + dy]
      if (maze[pos] == '.') {
        maze[pos] = 'O'
        queue.push([pos, steps+1])
      }
    })
  }
  return max
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
