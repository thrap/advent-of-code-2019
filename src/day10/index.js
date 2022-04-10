import run from "aocrunner"

const parseAsteroids = (input) => {
  const asteroids = [];
  input.split("\n").map((row, y) => row.split("").map((c, x) => {
    if (c == "#") {
      asteroids.push([x, y])
    }
  }))
  return asteroids
}

const gcd = (a, b) => b == 0 ? Math.abs(a) : gcd(b, a % b);

const part1 = (input) => {
  const asteroids = parseAsteroids(input)

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

const getStation = (asteroids) => {
  var station
  var max = -Infinity
  asteroids.map(([a, b], i) => {
    const map = {};
    asteroids.map(([x, y], j) => {
      if (i == j) return;
      const dx = x-a;
      const dy = y-b;
      const g = gcd(x-a, y-b)
      map[dx/g+" "+dy/g] = true;
    })
    const count = Object.keys(map).length
    if (count > max) {
      max = count
      station = [a, b]
    }
  })
  return station
}

const length = ([u1, u2]) => {
  return Math.sqrt(u1*u1+u2*u2);
}
const angle = ([u1, u2]) => {
  const [v1, v2] = [0,1];
  const ang = Math.acos((u1*v1 + u2*v2)/length([u1,u2]));
  return u1 > 0 ? 2*Math.PI - ang : ang;
}

const part2 = (input) => {
  const asteroids = parseAsteroids(input);
  const station = getStation(asteroids)

  const [a,b] = station;
  const map = {};
  const vectors = [];
  asteroids.forEach(([x, y]) => {
    if(x == a && y == b) return
    const dx = a-x;
    const dy = b-y;
    const g = gcd(dx, dy)
    const vector = [dx/g,dy/g]
    if (map[vector]) {
      map[vector].push([x, y]);
    } else {
      vectors.push(vector);
      map[vector] = [[x, y]]
    }
  })

  var nr200
  let deleted = 0;
  let vs = vectors;
  while (vs.length) {
    vs = vs.sort((a, b) => {
      return angle(a) - angle(b);
    }).filter(v => {
      const stations = map[v].sort((a, b) => length(b)-length(a));

      const station = stations[0];
      deleted = deleted + 1;

      if (deleted == 200) {
        nr200 = station
      }
      if (stations.length == 1) {
        delete map[v];
        return false;
      } else {
        map[v] = stations.slice(1);
        return true;
      }
    })
  }
  return nr200[0]*100+nr200[1]
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
