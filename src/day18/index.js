import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const parse = (rawInput) => {
  const maze = parseInput(rawInput)
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] == '@') {
        maze[i][j] = '.'
        return [maze, [i, j], rawInput.replace(/[^a-z]/g, '').length]
      }
    }
  }
}

const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]

const part1 = (rawInput) => {
  const [maze, start, keyCount] = parse(rawInput)
  console.log(maze.map(l => l.join('')).join('\n'))
  console.log(start, keyCount);

  const visited = {}
  const queue = [[start[0], start[1], new Set(), 0]]
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const toStr = (i, j, keys) => {
    return i + " " + j + " " + alphabet.map(x => keys.has(x) ? 1 : 0)
  }
  while (queue.length) {
    const [i, j, keys, moves] = queue.shift()
    if (keys.size == keyCount) {
      return moves
    }
    const str = toStr(i, j, keys)
    if (visited[str]) {
      continue
    }
    visited[str] = true
    dirs.forEach(([di, dj]) => {
      const c = maze[i+di]?.[j+dj]
      if (c == '.') {
        queue.push([i+di, j+dj, keys, moves+1])
      } else if (/[a-z]/.test(c)) {
        var newKeys = new Set(keys)
        newKeys.add(c)
        queue.push([i+di, j+dj, newKeys, moves+1])
      } else if (/[A-Z]/.test(c) && keys.has(c.toLowerCase())) {
        queue.push([i+di, j+dj, keys, moves+1])
      }
    })
  }
  console.log(visited);
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Input = ``
const part2Input = part1Input
run({
  part1: {
    tests: [
      { input:
`#########
#b.A.@.a#
#########`, expected: 8 },
      { input:
`########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`, expected: 86 },
      { input:
`########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`, expected: 132 },
      { input:
`#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`, expected: 136 },
      { input:
`########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`, expected: 81 },
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
