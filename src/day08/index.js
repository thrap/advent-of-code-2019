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
  const layers = input.match(/(\d{25}){6}/g)
  let output = layers[0].split("").reduce((acc, _, i) => acc + layers.find(x => x[i]!="2")[i], "")

  console.log(output.replace(/0/g, ' ').replace(/1/g, "█").match(/.{25}/g))
  return "KCGEC"
}

run({
  part1: {
    solution: part1,
  },
  part2: {
    solution: part2,
  },
})
