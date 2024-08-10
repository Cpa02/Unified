const currDisplay = document.querySelector(".curr-display");
const prevDisplay = document.querySelector(".prev-display");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operation");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".delete");
const equalBtn = document.querySelector(".equal");
let expression = "";

function appendNumber(number) {
  if (number === "." && currDisplay.innerText.includes(".")) return;
  currDisplay.innerText += number;
  expression += number;
}

function chooseOperation(operand) {
  if (currDisplay.innerText === "" && operand !== "-") return;
  if (currDisplay.innerText === "" && operand === "-") {
    currDisplay.innerText = "-";
    expression += "-";
    return;
  }
  if (/[+\-*/]$/.test(expression)) {
    expression = expression.slice(0, -1);
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
  }
  currDisplay.innerText += operand;
  expression += operand;
}

function clearDisplay() {
  currDisplay.innerText = "";
  prevDisplay.innerText = "";
  expression = "";
}

function compute() {
  try {
    const result = eval(expression);
    currDisplay.innerText = result;
    prevDisplay.innerText = expression;
    expression = result.toString();
  } catch (e) {
    currDisplay.innerText = "Error";
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.innerText);
  });
});

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    chooseOperation(operand.innerText);
  });
});

clearBtn.addEventListener("click", () => {
  clearDisplay();
});

equalBtn.addEventListener("click", () => {
  compute();
  prevDisplay.innerText = "";
});

delBtn.addEventListener("click", () => {
  currDisplay.innerText = currDisplay.innerText.slice(0, -1);
  expression = expression.slice(0, -1);
});

document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key);
  } else if (event.key === ".") {
    appendNumber(event.key);
  } else if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
    chooseOperation(event.key);
  } else if (event.key === "Enter") {
    compute();
    prevDisplay.innerText = "";
  } else if (event.key === "Backspace") {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
    expression = expression.slice(0, -1);
  } else if (event.key === "Escape") {
    clearDisplay();
  }
});