import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const print = (maze, diff = {}) => {
  console.log(maze.map((l,i) => l.map((c,j) => diff[[i,j]] || c).join('')).join('\n'));
}

const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]

const part1 = (rawInput) => {
  const maze = parseInput(rawInput)

  const portals = {}
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[0].length; j++) {
      if (/[A-Z]/.test(maze[i][j])) {
        const [di, dj] = /[A-Z]/.test(maze[i][j+1]) ? [0, 1] : [1, 0]
        const portal = maze[i][j] + maze[i+di][j+dj]
        if (!portals[portal]) {
          portals[portal] = []
        }
        if (maze[i-di]?.[j-dj] == '.') {
          maze[i][j] = '@'
          maze[i+di][j+dj] = ' '
          portals[portal].push([i-di, j-dj])
        } else {
          maze[i][j] = ' '
          maze[i+di][j+dj] = '@'
          portals[portal].push([i+2*di, j+2*dj])
        }
      }
    }
  }
  const portal = Object.values(portals).filter(x => x.length == 2).reduce((acc, [a, b]) => ({
    [a]: b,
    [b]: a,
    ...acc
  }), {})

  const visited = {}
  const bfs = () => {
    const queue = [[start, 0]]
    while (queue.length) {
      const [pos, moves] = queue.shift()
      if (pos[0] == goal[0] && pos[1] == goal[1]) {
        return moves
      }
      if (visited[pos]) {
        continue
      }
      visited[pos] = true
      if (portal[pos]) {
        queue.push([portal[pos], moves+1])
      }
      const [i, j] = pos
      dirs.forEach(([di, dj]) => {
        if (maze[i+di]?.[j+dj] == '.') {
          queue.push([[i+di, j+dj], moves+1])
        }
      })
    }
  }

  const start = portals['AA'][0]
  const goal = portals['ZZ'][0]

  return bfs()

  const diff = {}
  diff[start] = 'S'
  diff[goal] = 'G'
  print(maze, diff)
  console.log(start, goal)

  return min
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = `         A           \n`+
`         A        \n`+
`  #######.#########
  #######.........#
  #######.#######.#
  #######.#######.#
  #######.#######.#
  #####  B    ###.#
BC...##  C    ###.#
  ##.##       ###.#
  ##...DE  F  ###.#
  #####    G  ###.#
  #########.#####.#
DE..#######...###.#
  #.#########.###.#
FG..#########.....#
  ###########.#####
             Z
             Z     `
run({
  part1: {
    tests: [
      { input: part1Input, expected: 23 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
    ],
    solution: part2,
  },
  trimTestInputs: false
})
