const digitBtns = document.querySelectorAll('.digits button');
const functionBtns = document.querySelectorAll('.functions button');
const equalBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');

const display = document.querySelector('.display');

let operation = [];
let displayValue = [];

digitBtns.forEach(digitBtn => digitBtn.addEventListener('click', () => {
    displayValue.push(digitBtn.textContent);
    display.value = displayValue.join('');
}))

functionBtns.forEach(functionBtn => functionBtn.addEventListener('click', () => {
    //if no operand in display
    if(!displayValue.length && !operation.length){
        display.value = "Error";
    }
    else{
        if(operation.length !== 1){
            operation.push(displayValue.join(''));
        }
        operation.push(functionBtn.textContent);
        displayValue.splice(0);
    }
    //if two operand/operator pairs exist
    if(operation.length >= 3){
        //evaluate operands and first operator
        const a = parseInt(operation[0]);
        const b = parseInt(operation[2]);
        const operator = operation[1];
        const result = operate(operator, a, b);

        //update display with result
        display.value = result;

        //replace operands and first operator with result
        operation.splice(0, 3);
        operation.unshift(result);
    }
}))

equalBtn.addEventListener('click', () => {
    //if no operand in display
    if(!displayValue.length){
        display.value = 'Error';
    }
    //if no operators
    else if(!operation.length){
        operation.push(displayValue.join(''));
        display.value = displayValue.join('');
    }
    //if one operand
    else if(operation.length === 1){
        operation.splice(0);
        operation.push(displayValue.join(''));
        display.value = displayValue.join('');
    }
    //if operator/operand pair
    else{
        const a = parseInt(operation[0]);
        const b = parseInt(displayValue.join(''));
        const operator = operation[1];
        const result = operate(operator, a, b);

        display.value = result;

        operation.splice(0);
        operation.push(result);
    }
    displayValue.splice(0);
})

clearBtn.addEventListener('click', () => {
    displayValue.splice(0);
    operation.splice(0);
    display.value = '';
})

//operations
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    switch(operator){
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "Invalid operator";
    }
}