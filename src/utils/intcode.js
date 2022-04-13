const Intcode = function(input, debug=false) {
  let index = 0;
  let arr = [...input.split(",").map(x => +x)];
  let lastOutput = 0;
  let inputs = []
  let relativeBase = 0;
  this.isStopped = false;
  let isTempStopped = false;
  let needsInput = false

  let calls = 0;
  const f = (i) => {
    index = i;
    if (++calls == 1000) {
      calls = 0;
      isTempStopped = true;
      return;
    }
    isTempStopped = false;

    let a = arr[i]
    let b = arr[i+1]
    let c = arr[i+2]
    let d = arr[i+3]

    let mode3 = Math.floor(a/10000)
    a %= 10000
    let mode2 = Math.floor(a/1000)
    a %= 1000
    let mode1 = Math.floor(a/100)
    a %= 100

    const opcode = a

    const getValue = (mode, val) => {
      switch(mode) {
        case 0: return arr[val] || 0;
        case 1: return val;
        case 2: return arr[relativeBase+val] ||0
      }
    }
    const B = getValue(mode1, b);
    const C = getValue(mode2, c);

    const set = (k, val) => {
      if (mode3 == 2)
        arr[relativeBase+k] = val;
      else
        arr[k] = val;
    }

    if (opcode == 99 || i > arr.length) {
      if (debug)
        console.log("STOP")
      this.isStopped = true;
      return arr[0]
    }
    if (opcode == 1) {
      set(d, B + C);
      return f(i + 4);
    } else if (opcode == 2) {
      set(d, B * C);
      return f(i + 4);
    } else if (opcode == 3) {
      if (inputs.length == 0) {
        needsInput = true
        return
      }
      let input = inputs.shift()
      if (debug)
        console.log("Input", input);

      if (mode1 == 2)
        arr[relativeBase+b] = input;
      else
        arr[b] = input;

      return f(i+2);
    } else if (opcode == 4) {
      lastOutput = B;
      if (debug)
        console.log("Output", B);
      return;
    } else if (opcode == 5) {
      if (B) {
        return f(C, arr)
      }
      return f(i+3, arr);
    } else if (opcode == 6) {
      if (!B) {
        return f(C, arr)
      }
      return f(i+3, arr);
    } else if(opcode == 7) {
      set(d, B < C ? 1 : 0);
      return f(i+4, arr)
    } else if(opcode == 8) {
      set(d, B == C ? 1 : 0);
      return f(i+4, arr)
    } else if (opcode == 9) {
      relativeBase += B;
      return f(i+2, arr);
    } else {
      throw "Unknown: " + opcode
    }
  }

  this.start = () => {
    f(index);
  }

  this.output = () => {
    const arr = []
    while(!needsInput && !this.isStopped) {
      arr.push(this.nextOutput())
    }
    return arr
  }

  this.outputAscii = () => {
    return this.output().map(x => String.fromCharCode(x)).join('')
  }

  this.exitCode = () => {
    return lastOutput
  }

  this.nextOutput = () => {
    if (this.isStopped) {
      return undefined;
      //throw "Machine is stopped, cant get more output"
    }
    isTempStopped = true;
    while(isTempStopped) {
      f(index)
    }
    if (!needsInput)
      index += 2;
    return lastOutput;
  }

  this.setNextInput = (input) => {
    needsInput = false
    inputs.push(input)
    return this
  }

  this.input = (arr) => {
    needsInput = false
    inputs.push(...arr)
    return this
  }
}
export default Intcode
