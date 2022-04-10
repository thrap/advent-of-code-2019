import run from "aocrunner"

const parseInput = input => input.split("\n").map(x => x.replace(/[^\d,-]/g,"").split(",").map(x => +x)).map(pos => ({pos, vel: [0,0,0]}));

const part1 = (input) => {
  const moons = parseInput(input)
  let step = moons;
  for(let i = 1; i <= 1000; i++) {
    step = step.map((moon, i) => {
      const newMoon = {pos: [...moon.pos], vel: [...moon.vel]};
      step.forEach(({pos}, j) => {
        if (i == j) return
        pos.forEach((a, k) => newMoon.vel[k] += a>moon.pos[k] ? 1 : a == moon.pos[k] ? 0 : -1)
      })
      newMoon.vel.forEach((a,k) => {
        newMoon.pos[k] += a;
      })
      return newMoon;
    })
  }
  const sum = pos => pos.reduce((acc, x) => acc+Math.abs(x),0)

  return sum(step.map(({pos, vel}) => sum(pos) * sum(vel)))
}

const part2 = (input) => {
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
