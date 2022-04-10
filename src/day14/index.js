import run from "aocrunner"

const produce = (graph) => (fuelCount) => {
  const extra = Object.keys(graph).reduce((acc, x) => ({[x]:0, ...acc}), {})
  const rec = (node, need) => {
    if (node == 'ORE') {
      return need
    }
    const taken = Math.min(extra[node], need)
    need -= taken
    extra[node] -= taken

    const [count, children] = graph[node]
    const needed = Math.ceil(need/count)
    if (count * needed - need) {
      extra[node] += count * needed - need
    }

    const ores = children.map(([c, x]) => rec(x, needed * c))
    return ores.reduce((acc, x) => acc+x)
  }
  return rec('FUEL', fuelCount)
}

const oreCalculator = input => {
  const parse = (s) => s.split(' ').map((x, i) => i == 0 ? +x : x)
  const graph = {}
  input.split('\n').forEach(l => {
    const [a, b] = l.split(' => ')
    const [count, x] = parse(b)
    graph[x] = [+count, a.split(', ').map(parse)]
  })
  return produce(graph)
}

const part1 = (input) => oreCalculator(input)(1)

const part2 = (input) => {
  const f = oreCalculator(input)

  const limit = 1000000000000
  var factor = 1
  while(f(factor*2) < limit) {
    factor *= 2
  }

  var sum = factor
  while (factor >= 1) {
    if (f(sum + factor) < limit) {
      sum += factor
    }
    factor /= 2
  }
  return sum
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
