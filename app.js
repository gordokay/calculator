function add(a, b) {
  return Math.round((a + b) * 100) / 100;
}

function subtract(a, b) {
  return Math.round((a - b) * 100) / 100;
}

function multiply(a, b) {
  return Math.round((a * b) * 100) / 100;
}

function divide(a, b) {
  if(b === 0) {
    return 'ERROR: divide by zero';
  }
  return Math.round((a / b) * 100) / 100;
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

//returns true if operate is called so display can be updated with result
function updateOperation(operand, operator, operation) {
  operation.push(Number(operand), operator);
  if(operation.length == 4) {
    let a = operation[0];
    let op = operation[1];
    let result = operate(op, a, Number(operand));
    operation.splice(0, 3, result);
    return true;
  }
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

function toggleOperators(operators) {
  operators.forEach(operator => operator.disabled = !operator.disabled);
}

function makeCalculator() {
  const display = document.querySelector('#display');
  const digits = document.querySelectorAll('.digit');
  const operators = document.querySelectorAll('.operator');
  const decimal = document.querySelector('#decimal')
  const equals = document.querySelector('#equals');
  const clear = document.querySelector('#clear');

  const operation = [];

  let operatorsEnabled = true;
  //determines if display will clear on next update
  let willClear = false;

  digits.forEach(digit => digit.addEventListener('click', () => {
    updateDisplay(digit.textContent, display, willClear);
    if(willClear) {
      willClear = false;
    }
    if(!operatorsEnabled) {
      toggleOperators(operators);
      operatorsEnabled = true;
    }
  }));

  operators.forEach(operator => operator.addEventListener('click', () => {
    willClear = true;
    if(decimal.disabled) {
      decimal.disabled = false;
    }
    if(updateOperation(display.textContent, operator.textContent, operation)) {
      updateDisplay(operation[0], display, willClear);
    }
    toggleOperators(operators);
    operatorsEnabled = false;
  }))

  decimal.addEventListener('click', () => {
    decimal.disabled = true;
    updateDisplay('.', display, willClear)
    if(willClear) {
      willClear = false;
    }
    if(!operatorsEnabled) {
      toggleOperators(operators);
      operatorsEnabled = true;
    }
  })

  equals.addEventListener('click', () => {
    willClear = true;
    operation.push(Number(display.textContent));
    let result = operate(operation[1], operation[0], operation[2]);
    operation.splice(0);
    updateDisplay(result, display, willClear);
  })

  clear.addEventListener('click', () => {
    operation.splice(0);
    display.textContent = '';
    willClear = false;
    operatorsEnabled = true;
  })
}

makeCalculator();