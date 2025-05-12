const buttons = document.querySelectorAll(".button");
const display = document.querySelector(".display");

let firstOperand = null;
let secondOperand = null;
let operator = null;
let waitingSecondOperand = false;

const displayNum = (e) => {
  if (display.textContent === "0" || waitingSecondOperand) {
    display.textContent = e.target.value;
    waitingSecondOperand = false; // 두 번째 피연산자 입력 받았으니 waiting 끝
  } else {
    display.textContent += e.target.value;
  }
};

const calculate = (first, second, op) => {
  switch (op) {
    case "/":
      return first / second;
    case "*":
      return first * second;
    case "-":
      return first - second;
    case "+":
      return first + second;
    default:
      // 시간 나면 try catch로 오류 처리 해보기
      throw new Error(`Invalid operator: ${op}`);
  }
};

const resetCalculator = () => {
  display.textContent = "0";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  waitingSecondOperand = false;
};

buttons.forEach((elem) =>
  elem.addEventListener("click", (e) => {
    const value = e.target.value;
    const classArr = [...e.target.classList];

    if (classArr.includes("number")) {
      displayNum(e);
    }

    if (classArr.includes("point")) {
      if (!display.textContent.includes(".")) {
        display.textContent += ".";
      }
    }

    if (classArr.includes("clear")) {
      resetCalculator();
    }

    if (classArr.includes("toggle-sign")) {
      display.textContent = String(-Number(display.textContent));
    }

    if (classArr.includes("percent")) {
      display.textContent = String(Number(display.textContent) / 100);
    }

    if (classArr.includes("operator")) {
      const currentValue = Number(display.textContent);

      if (firstOperand === null) {
        firstOperand = currentValue;
      } else if (operator && !waitingSecondOperand) {
        // 연속 계산 처리용
        secondOperand = currentValue;
        const result = calculate(firstOperand, secondOperand, operator);
        display.textContent = String(result);
        firstOperand = result;
        secondOperand = null;
      }

      operator = value;
      waitingSecondOperand = true;

      console.log("First Operand:", firstOperand);
      console.log("Operator:", operator);
    }

    if (classArr.includes("equal") && firstOperand !== null && operator) {
      // 냅다 숫자 > 연산자 > = 누르는 거 방지용
      if (waitingSecondOperand) return;

      secondOperand = Number(display.textContent);
      const result = calculate(firstOperand, secondOperand, operator);
      display.textContent = String(result);
      firstOperand = result;
      operator = null;
      secondOperand = null;
      waitingSecondOperand = true;
    }
  })
);
