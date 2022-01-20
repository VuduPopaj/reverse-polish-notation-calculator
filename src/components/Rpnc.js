import React, { useState } from "react";

function App() {
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const rpn = (newExpr) => {
    let expr = newExpr.split(",");
    let stack = [];
    let nrCounter = 0;
    let opCounter = 0;
    for (let i = 0; i < expr.length; i++) {
      if (!isNaN(expr[i]) && isFinite(expr[i])) {
        stack.push(expr[i]);
        nrCounter++;
      } else {
        opCounter++;
        let a = stack.pop();
        let b = stack.pop();
        if (expr[i] === "+") {
          stack.push(parseFloat(a) + parseFloat(b));
        } else if (expr[i] === "-") {
          stack.push(parseFloat(a) - parseFloat(b));
        } else if (expr[i] === "*") {
          stack.push(parseFloat(a) * parseFloat(b));
        } else if (expr[i] === "/") {
          stack.push(parseFloat(a) / parseFloat(b));
        }
      }
    }
    if (input === "") {
      return setError("You did not enter anything!");
    }
    if (
      nrCounter === opCounter + 1 &&
      newExpr !== "" &&
      stack[0] !== undefined
    ) {
      setError("");
      setInput(input + "=" + stack[0]);
    } else if (nrCounter <= opCounter) {
      setError("Something went wrong! Check the number of OPERATORS!");
    } else if (stack[0] === undefined) {
      setError("Only numbers and arithmetic operators are valid!");
      setInput("");
    } else if (nrCounter >= opCounter - 2) {
      setError("Something went wrong! Check the number of OPERANDS!");
    }
  };

  return (
    <div className="App">
      <h1>Reverse Polish Notation Calculator</h1>
      <br />
      <input
        type="text"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        id="operand"
        placeholder="Enter the operand and operator:2,6,5,4,*,-,+"
      />
      <button className="button" onClick={() => rpn(input)}>
        Compute
      </button>
      <button
        className="button"
        onClick={() => {
          setInput("");
          setError("");
        }}
      >
        Clear
      </button>
      <div className="validation">{error}</div>
    </div>
  );
}

export default App;
