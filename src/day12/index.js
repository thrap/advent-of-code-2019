import run from "aocrunner"

const parseInput = input => input.split("\n").map(x => x.replace(/[^\d,-]/g,"").split(",").map(x => +x)).map(pos => ({pos, vel: [0,0,0]}));

const nextStep = (state) => {
  return state.map((moon, i) => {
    const newMoon = {pos: [...moon.pos], vel: [...moon.vel]};
    state.forEach(({pos}, j) => {
      if (i == j) return
      pos.forEach((a, k) => newMoon.vel[k] += a>moon.pos[k] ? 1 : a == moon.pos[k] ? 0 : -1)
    })
    newMoon.vel.forEach((a,k) => {
      newMoon.pos[k] += a;
    })
    return newMoon;
  })
}

const part1 = (input) => {
  const sum = arr => arr.reduce((acc, x) => acc+Math.abs(x),0)

  let state = parseInput(input)
  for(let i = 1; i <= 1000; i++) {
    state = nextStep(state)
  }

  return sum(state.map(({pos, vel}) => sum(pos) * sum(vel)))
}

const factors = (n) => {
  const limit = Math.sqrt(n)
  const factors = {}
  for (var i = 2; i <= limit; i++) {
    while (n % i == 0) {
      factors[i] = (factors[i] || 0) + 1
      n /= i
    }
  }
  factors[n] = 1
  return factors
}

const part2 = (input) => {
  let state = parseInput(input)
  const fac = {}
  const add = (n) => {
    const f = factors(n)
    Object.keys(f).forEach(p => fac[p] = Math.max(fac[p] || 0, f[p]))
  }
  for(let axis = 0; axis < 3; axis++) {
    let first = 0;
    for(let step = 1; true; step++) {
      state = nextStep(state)
      if (state[0].vel[axis]==0 && state[1].vel[axis]==0 && state[2].vel[axis]==0 && state[3].vel[axis] == 0) {
        if (!first) {
          first = step;
        } else {
          add(step-first)
          break;
        }
      }
    }
  }

  return Object.keys(fac).reduce((acc, p) => acc * Math.pow(p, fac[p]), 2)
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
