let numbers = [];
let operator;
let equation;
let answer;
let activeNumber;
let displayNumber;


const calculatorBodyDiv = document.querySelector('div.frame');
const displayEquationDiv = calculatorBodyDiv.querySelector('div#equation');
const displayAnswerDiv = calculatorBodyDiv.querySelector('div.vcenter');
const buttons = calculatorBodyDiv.querySelectorAll('button');
const displayAnswerContainer = document.querySelector('.display.answer')
    displayAnswerContainer.appendChild(displayAnswerDiv);
    calculatorBodyDiv.prepend(displayAnswerContainer);
    calculatorBodyDiv.prepend(displayEquationDiv);

buttons.forEach( (button) => {
    button.addEventListener( "click", (e) => directButtonValues(e) );
});

function directButtonValues(e) {
    let userButton = e.target.textContent;
    switch (userButton) {
        case 'CLEAR':
            clearAll()
        case '.': break;
        case 'BKSP': break;
        case 'x':
        case '+':
        case '-':
        case '/':
            operator = userButton;
        case '=':
            if (activeNumber) {numbers.push(activeNumber)} ;
            console.log(numbers);
            activeNumber = '';
            displayNumber = calcEquation();
            updateDisplay();
        break;
        default :
            if (activeNumber) { activeNumber += userButton } else { activeNumber = userButton};
            displayNumber = activeNumber;
            updateDisplay();
    };
};

function updateDisplay() {
    displayEquationDiv.textContent = equation;
    displayAnswerDiv.textContent = displayNumber;
}

function calcEquation() {
    if (numbers.length > 2) {
        displayNumber = 'error';
        return displayNumber;
    } else if ( numbers.length < 2) {;} 
    else {
        switch (operator) {
            case '+' :
                answer = addNumbers();
            break;
            case '-' :
                answer = subtractNumbers();
            break;
            case '*' :
                answer = multiplyNumbers();
            break;
            case '/' :
                answer = divideNumbers();
            break;
        }
        numbers.shift()
        operator = '';
    };
    return answer;
};

function addNumbers() {
    return answer = +numbers[0] + +numbers[1];
};
function subtractNumbers() {
    return answer = +numbers[0] - +numbers[1];
};
function multiplyNumbers() {
    return answer = +numbers[0] * +numbers[1];
};
function divideNumbers() {
    if (+numbers[1] === 0) {
        return answer = 'Impossible';
    } else {
        return answer = +numbers[0] / +numbers[1];
    }
};

function ClearAll() {
    numbers = [];
    operator;
    equation;
    answer;
    activeNumber;
    displayNumber;
}