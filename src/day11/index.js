import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const execute = (program, init) => {
  const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]
  const machine = new Intcode(program)
  const white = { "0,0": init }
  var x = 0
  var y = 0
  var dirI = 0
  while(!machine.isStopped) {
    machine.setNextInput(white[[x,y]] ? 1 : 0)

    white[[x,y]] = machine.nextOutput()
    const turnRight = machine.nextOutput()
    if (turnRight) {
      dirI = (4+dirI + 1)%4
    } else {
      dirI = (4+dirI - 1)%4
    }
    const [dx, dy] = dirs[dirI]
    x += dx
    y += dy
  }
  return white
}

const part1 = (program) => {
  const painted = execute(program, 0)
  return Object.keys(painted).length
}

const part2 = (program) => {
  const white = execute(program, 1)

  const coords = Object.keys(white).map(x => x.split(","))
  const xs = coords.map(v => v[0]);
  const ys = coords.map(v => v[1]);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const arr = Array(maxY - minY+1).fill(1).map(x => Array(maxX - minX+1).fill(0));
  coords.forEach(([x, y]) => {
    arr[maxY-y][maxX-x] = white[[x,y]]
  })
  console.log(arr.map(line => line.join("").replace(/0/g, ' ').replace(/1/g, "█")))
  return 'ZRZPKEZR'
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
