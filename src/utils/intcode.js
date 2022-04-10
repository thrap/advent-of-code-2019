const Intcode = function(input, debug=false) {
  let index = 0;
  let arr = [...input.split(",").map(x => +x)];
  let lastOutput = 0;
  let inputs = []
  let relativeBase = 0;
  this.isStopped = false;
  let isTempStopped = false;

  let calls = 0;
  const f = (i) => {
    index = i;
    if (++calls == 1000) {
      calls = 0;
      isTempStopped = true;
      return;
    }
    isTempStopped = false;

    let [a,b,c,d] = [arr[i], arr[i+1], arr[i+2], arr[i+3]]

    let [mode3, mode2, mode1] = [0, 0, 0];
    const A = a;
    while (a > 10000) {
      mode3 += 1;
      a -= 10000;
    }
    while (a > 1000) {
      mode2 += 1;
      a -= 1000;
    }
    while (a > 100) {
      mode1 += 1;
      a -= 100;
    }
    //console.log(mode1,mode2,mode3)

    const opcode = a % 100;
    //console.log(A,b,c,d)

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
        throw "Trenger input"
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
      //console.log("WAT")
      relativeBase += B;
      //console.log(relativeBase)
      return f(i+2, arr);
    } else {
      console.log("Unknown: " + opcode);
      return;
    }

    throw 1
  }

  this.start = () => {
    f(index);
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
    index += 2;
    return lastOutput;
  }

  this.setNextInput = (input) => {
    inputs.push(input)
  }
}
export default Intcode
