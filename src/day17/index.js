import run from "aocrunner"
import Intcode from "../utils/intcode.js"

const parseMap = (program) => {
  const robot = new Intcode(program)
  return robot.outputAscii().split('\n').slice(0,-3)
}

const dirs = [[0,1],[1,0],[0,-1],[-1,0]]

const intersections = (map) => {
  const list = []
  for (var i = 1; i < map.length - 1; i++) {
    for (var j = 1; j < map[0].length - 1; j++) {
      if (map[i][j] != '#') continue
      if (dirs.every(([di, dj]) => map[i+di][j+dj] == '#')) {
        list.push([i,j])
      }
    }
  }
  return list
}

const part1 = (program) => {
  return intersections(parseMap(program)).reduce((acc, [x,y]) => acc + x*y, 0)
}

const part2 = (program) => {
  const robot = new Intcode(2+program.slice(1))

  const input = (input) => {
    robot.inputAscii(input)
  }

  input('A,A,B,C,C,A,C,B,C,B')
  const A = 'L,4,L,4,L,6,R,10,L,6'
  input(A)
  const B = 'L,12,L,6,R,10,L,6'
  input(B)
  const C = 'R,8,R,10,L,6'
  input(C)
  input('n')
  robot.output()
  return robot.exitCode()
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
