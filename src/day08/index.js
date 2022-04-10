import run from "aocrunner"

const part1 = (input) => {
  const layers = input.match(/(\d{25}){6}/g)
  //maxBy count c != "0"
  let max = layers.map(x => x.split("").filter(c => c!=="0")).sort((a, b) => b.length - a.length)[0]

  const ones = max.filter(c => c == '1').length;
  const twos = max.filter(c => c == '2').length;

  return ones * twos
}

const part2 = (input) => {

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
