import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const print = (maze) => {
  const coords = Object.keys(maze).map(x => x.split(","))
  const xs = coords.map(v => v[0]);
  const ys = coords.map(v => v[1]);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const arr = Array(maxY - minY+1).fill(1).map(x => Array(maxX - minX+1).fill(' '));
  coords.forEach(([x, y]) => {
    arr[maxY-y][maxX-x] = maze[[x,y]]
  })
  console.log(arr.map(line => line.join("")).join('\n'))
}

const part1 = (program) => {
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
  const rec = (x, y, steps) => {
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
      } else if (out == 1) {
        maze[[x+dx,y+dy]] = '.'
        rec(x + dx, y + dy, steps + 1)
        backTrack(dir)
      } else if (out == 2) {
        maze[[x+dx,y+dy]] = '@'
        backTrack(dir)
        min = Math.min(min, steps + 1)
        return steps + 1
      }
    }
  }
  rec(0, 0, 0)

  print(maze)

  return min
}

const part2 = (program) => {
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
