import run from "aocrunner"

const parseInput = input => [...input.split(",").map(x => +x)]

const f = (i, arr) => {
  const [a,b,c,d] = arr.slice(i)

  if (a == 99 || i > arr.length)
    return arr[0]
  if (a == 1)
    arr[d] = arr[b] + arr[c]
  else
    arr[d] = arr[b] * arr[c]
  return f(i+4, arr)
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  input[1] = 12
  input[2] = 2
  return f(0, input)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
