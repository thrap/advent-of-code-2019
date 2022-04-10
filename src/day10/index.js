import run from "aocrunner"

const part1 = (input) => {
  const asteroids = [];
  input.split("\n").map((row, y) => row.split("").map((c, x) => {
    if (c == "#") {
      asteroids.push([x, y])
    }
  }))

  const gcd = (a, b) => b == 0 ? Math.abs(a) : gcd(b, a % b);

  const counts = asteroids.map(([a, b], i) => {
    const map = {};
    asteroids.map(([x, y], j) => {
      if (i == j) return;
      const dx = x-a;
      const dy = y-b;
      const g = gcd(x-a, y-b)
      map[dx/g+" "+dy/g] = true;
    })
    return Object.keys(map).length;
  })

  return Math.max(...counts)
}

const part2 = (rawInput) => {
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
