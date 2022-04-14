import run from "aocrunner"

const parseInput = rawInput => rawInput.split('\n').map(l => l.split(''))

const dirs = [[0, 1],[-1,0],[0,-1],[1,0]]

const rule = {
  '#': (c) => c == 1 ? '#' : '.',
  '.': (c) => c == 1 || c == 2 ? '#' : '.'
}

const part1 = (rawInput) => {
  const step = (l, i) => l.map((c, j) =>
    rule[c](dirs.filter(([di, dj]) => state[i+di]?.[j+dj] == '#').length)
  )

  const rating = ([...chars]) => chars.reduce((acc, c, i) =>
    acc + (c == '#' ? Math.pow(2, i) : 0)
  ,0)

  const seen = {}
  var state = parseInput(rawInput)
  var str
  for (var i = 0; !seen[str]; i++) {
    seen[str] = true
    str = state.map(l => l.join('')).join('')
    state = state.map(step)
  }
  return rating(str)
}

const newLayer = () => [...Array(5)].map(_ => Array(5).fill('.'))

const addInnerLayer = (state) => {
  if (state[2][2].length == 1) {
    state[2][2] = newLayer()
  } else {
    addInnerLayer(state[2][2])
  }
}
const addLayer = (state) => {
  const layer = newLayer()
  layer[2][2] = state
  addInnerLayer(state)
  return layer
}

const step = (state, parent) => {
  const bug = (i, j) => {
    if (i == -1) return parent[1][2]
    if (i ==  5) return parent[3][2]
    if (j == -1) return parent[2][1]
    if (j ==  5) return parent[2][3]
    return state[i][j]
  }
  const bugsAround = (i, j) => {
    var count = 0
    dirs.forEach(([di, dj]) => {
      if (!(i + di == 2 && j + dj == 2)) {
        count += bug(i+di, j+dj) == '#'
        return
      }
      const center = state[2][2]
      if (center.length != 5) return
      if (i == 1 || i == 3) {
        count += center[i == 1 ? 0 : 4].filter(c => c == '#').length
      } else {
        for (var y = 0; y < 5; y++) {
          count += center[y][j == 1 ? 0 : 4] == '#'
        }
      }
    })
    return count
  }

  return state.map((l, i) => l.map((c, j) => {
    if (i == 2 && j == 2) {
      if (c.length != 5) return '.'
      return step(c, state)
    }
    return rule[c](bugsAround(i, j))
  }))
}

const part2 = (rawInput) => {
  var state = parseInput(rawInput)

  for (var minutes = 0; minutes < 200; minutes++) {
    if (minutes % 2 == 0) {
      state = addLayer(state)
    }
    state = step(state, newLayer())
  }

  return state.flat(Infinity).filter(c => c == '#').length
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
