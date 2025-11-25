let userNum1;
let userNum2;
let userOperator;
let displayEquation;
let displayAnswer;

const calculatorBodyDiv = document.querySelector('div.frame');
const displayEquationDiv = calculatorBodyDiv.querySelector('div#equation');
const displayAnswerDiv = calculatorBodyDiv.querySelector('div.vcenter');
const buttons = calculatorBodyDiv.querySelectorAll('button');
const displayAnswerContainer = document.querySelector('.display.answer')
console.log(buttons);

buttons.forEach( (button) => {
    button.addEventListener( "click", (e) => directButtonValues(e) );
});

function directButtonValues(e) {
    displayAnswer = e.target.textContent;
    updateDisplay(equation, displayAnswer);
};

function updateDisplay(equation, answer) {
    displayEquationDiv.textContent = equation;
    displayAnswerDiv.textContent = answer;
    displayAnswerContainer.appendChild(displayAnswerDiv);
    calculatorBodyDiv.prepend(displayAnswerContainer);
    calculatorBodyDiv.prepend(displayEquationDiv);
}

function evaluateCalculation(userNum1, userNum2, userOperator, equation) {
    switch (userOperator) {
        case '+' :
            displayAnswer = addNumbers(userNum1, userNum2);
        break;
        case '-' :
            displayAnswer = subtractNumbers(userNum1, userNum2);
        break;
        case '*' :
            displayAnswer = multiplyNumbers(userNum1, userNum2);
        break;
        case '/' :
            displayAnswer = divideNumbers(userNum1, userNum2);
        break;
    };
    updateDisplay(equation, displayAnswer);
    return displayAnswer;
};

function addNumbers(num1, num2) {
    return displayAnswer = num1 + num2;
};
function subtractNumbers(num1, num2) {
    return displayAnswer = num1 - num2;
};
function multiplyNumbers(num1, num2) {
    return displayAnswer = num1 * num2;
};
function divideNumbers(num1, num2) {
    if (num2 === 0) {
        return displayAnswer = 'Impossible';
    } else {
        return displayAnswer = num1 / num2;
    }
};

// console.log(evaluateCalculation (1,2,'+','1+2'));