import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]

const parse = (rawInput) => {
  const maze = parseInput(rawInput)

  const jLength = Math.max(...maze.map(x => x.length))

  const isOuter = ([i, j]) => i == 2 || i == maze.length-3 || j == 2 || j == jLength-3
  const toPortal = pos => pos.concat([isOuter(pos) ? 1 : -1])

  const portals = {}
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (/[A-Z]/.test(maze[i][j])) {
        const [di, dj] = /[A-Z]/.test(maze[i][j+1]) ? [0, 1] : [1, 0]
        const portal = maze[i][j] + maze[i+di][j+dj]
        if (!portals[portal]) {
          portals[portal] = []
        }
        if (maze[i-di]?.[j-dj] == '.') {
          maze[i][j] = '@'
          maze[i+di][j+dj] = ' '
          portals[portal].push(toPortal([i-di, j-dj]))
        } else {
          maze[i][j] = ' '
          maze[i+di][j+dj] = '@'
          portals[portal].push(toPortal([i+2*di, j+2*dj]))
        }
      }
    }
  }

  const portal = Object.values(portals).filter(x => x.length == 2).reduce((acc, [a, b]) => ({
    [a.slice(0,2)]: b,
    [b.slice(0,2)]: a,
    ...acc
  }), {})

  return [maze, portal, portals['AA'][0], portals['ZZ'][0]]
}

const bfs = (input, part2) => {
  const [maze, portal, start, goal] = parse(input)

  const visited = {}
  const queue = [[start[0], start[1], 0, 0]]
  while (queue.length) {
    const [i, j, depth, moves] = queue.shift()
    if (depth < 0) continue
    if (i == goal[0] && j == goal[1] && depth == 0) {
      return moves
    }
    if (visited[[i, j, depth]]) {
      continue
    }
    visited[[i, j, depth]] = true
    if (portal[[i, j]]) {
      const [newI, newJ, ddepth] = portal[[i, j]]
      queue.push([newI, newJ, depth + (part2 ? ddepth : 0), moves+1])
    }
    dirs.forEach(([di, dj]) => {
      if (maze[i+di]?.[j+dj] == '.') {
        queue.push([i+di, j+dj, depth, moves+1])
      }
    })
  }
}

run({
  part1: {
    solution: (input) => bfs(input, false),
  },
  part2: {
    solution: (input) => bfs(input, true),
  },
})
