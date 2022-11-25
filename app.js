function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if(b === 0) {
    return 'ERROR: divide by zero';
  }
  return a / b;
}

function operate(op, a, b) {
  switch(op) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
  }
}

function updateOperation(operand, operator, operation) {
  operation.push(operand, operator);
}

function updateDisplay(element, display, willClear) {
  if(display.textContent === 'hello' || willClear) {
    clearDisplay(display);
  }
  display.textContent += element;
}

function clearDisplay(display) {
  display.textContent = '';
}

function makeCalculator() {
  const display = document.querySelector('#display');
  const digits = document.querySelectorAll('.digit');
  const operators = document.querySelectorAll('.operator');
  const decimal = document.querySelector('#decimal')
  const equals = document.querySelector('#equals');
  const clear = document.querySelectorAll('#clear');

  const operation = [];

  //determines if display will clear on next update
  let willClear = false;

  digits.forEach(digit => digit.addEventListener('click', () => {
    updateDisplay(digit.textContent, display, willClear);
    if(willClear) {
      willClear = false;
    }
  }));

  operators.forEach(operator => operator.addEventListener('click', () => {
    updateOperation(operator.textContent, display.textContent, operation);
    willClear = true;
  }))
}

makeCalculator();