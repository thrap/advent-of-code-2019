import run from "aocrunner"

const parseInput = rawInput => rawInput.split('-').map(x => +x)

const part1 = (rawInput) => {
  const [min, max] = parseInput(rawInput)
  let count = 0;
  const rec = (x, num) => {
    if (num.length === 6) {
      if (num >= min && num <= max && /(\d)\1/.test(num)) {
        count++;
      }
      return;
    }
    for (let i = x; i<=9; i++) {
      rec(i, num+i);
    }
  }

  rec(0, "");
  console.log(count)

  return count
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
      { input: part1Input, expected: '' },
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
