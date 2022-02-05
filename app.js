const digitBtns = document.querySelectorAll('.digits button');
const display = document.querySelector('.display');

let displayValue = [];

digitBtns.forEach(btn => btn.addEventListener('click', () => {
    displayValue.push(btn.textContent);
    display.value = displayValue.join('');
}))


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