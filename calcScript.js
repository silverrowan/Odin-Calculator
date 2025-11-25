let userNum1;
let userNum2;
let userOperator;
let displayEquation;
let displayAnswer;

const calculatorBodyDiv = document.querySelector('div.frame');
const displayEquationDiv = calculatorBodyDiv.querySelector('div#equation');
const displayAnserDiv = calculatorBodyDiv.querySelector('div.vcenter');
const buttons = calculatorBodyDiv.querySelectorAll('button')

console.log(calculatorBodyDiv);
console.log(displayEquationDiv);
console.log(displayAnserDiv);
console.log(calculatorBodyDiv);

function evaluateCalculation(userNum1, userNum2, userOperator) {
    switch (userOperator) {
        case '+' :
            return displayAnswer = addNumbers(userNum1, userNum2);
        case '-' :
            return displayAnswer = subtractNumbers(userNum1, userNum2);
        case '*' :
            return displayAnswer = multiplyNumbers(userNum1, userNum2);
        case '/' :
            return displayAnswer = divideNumbers(userNum1, userNum2);
    };
};

function addNumbers(num1, num2) {
    return num1 + num2;
};
function subtractNumbers(num1, num2) {
    return num1 - num2;
};
function multiplyNumbers(num1, num2) {
    return num1 * num2;
};
function divideNumbers(num1, num2) {
    if (num2 === 0) {
        return 'Impossible';
    } else {
        return num1 / num2;
    }
};