import run from "aocrunner"

const count = (input, test) => {
  const [min, max] = input.split('-').map(x => +x)
  const rec = (x, num) => {
    if (num.length === 6) {
      return num >= min && num <= max && test(num)
    }
    let count = 0
    for (let i = x; i<=9; i++) {
      count += rec(i, num+i);
    }
    return count
  }
  return rec(0, '')
}

run({
  part1: {
    solution: (input) => count(input, (s) => /(\d)\1/.test(s)),
  },
  part2: {
    solution: (input) => count(input, (s) => /(\d)\1/.test(s.replace(/(\d)(\1){2,}/g, ''))),
  },
})
