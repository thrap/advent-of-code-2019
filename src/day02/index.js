import run from "aocrunner"

const parse = input => [...input.split(",").map(x => +x)]

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

const g = (arr, noun, verb) => {
  arr[1] = noun;
  arr[2] = verb;
  return f(0, arr);
}

const part1 = (input) => g(parse(input), 12, 2)

const part2 = (input) => {
  const arr = parse(input)
  for(let i = 0; i < 100; i++) {
    for(let j = 0; j < 100; j++) {
      if (g([...arr], i, j) == 19690720) {
        return 100*i+ j
      }
    }
  }
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
