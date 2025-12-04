let numbers = [];
let operator = '';
let equation = '';
let answer = '';
let userEntry = '';
let operatorIsEqualsAndNextOp = '';
let lastButton = '';
let bkspOperator = '';
let decimalActive = true;
let bkspActive = false;

// ~~~~~~~~~~Direct DOM Effects~~~~~~~~~~
const calculatorBodyDiv = document.querySelector('div.frame');
const displayEquationDiv = calculatorBodyDiv.querySelector('div#equation');
const displayAnswerDiv = calculatorBodyDiv.querySelector('div.vcenter');
const buttons = calculatorBodyDiv.querySelectorAll('button');
const displayAnswerContainer = document.querySelector('.display.answer')
    displayAnswerContainer.appendChild(displayAnswerDiv);
    calculatorBodyDiv.prepend(displayAnswerContainer);
    calculatorBodyDiv.prepend(displayEquationDiv);
const decimalBtn = calculatorBodyDiv.querySelector('button#nDot');
const bkspBtn = calculatorBodyDiv.querySelector('button#bksp')

function changeDisplayTo(idName='empty',value='') {
    //idName values should be one of: empty, answer, userEntry
    if ( idName === 'empty' ) { deactivateBksp() };
    if ( displayAnswerDiv.id = 'empty' && idName !== 'empty' ) { activateBksp() };
    displayAnswerDiv.id = idName;
    if (idName === 'userEntry' || idName === 'empty' || value === '' || value === 'Impossible' ) {
        displayAnswerDiv.textContent = value;
    } else {
        displayAnswerDiv.textContent = roundNumbers( value, 2) ;
    };
    displayEquationDiv.textContent = equation;
};

function updateEquation (button = '') {
        logCurrentStateOfVars ('PRE-updateEquation')
    let showDecimalPlaces = 2;
    if (operator) {
        if (numbers.length >= 1 ) { 
            equationNum1 = roundNumbers( numbers[0], showDecimalPlaces) 
        } else { equationNum1 = 0 };
        if (numbers.length === 2) { 
            equationNum2 = roundNumbers( numbers[1], showDecimalPlaces) 
        } else { equationNum2 = '' };
        equation = equationNum1 + ' ' + operator + ' ' + equationNum2;
        return equation; 
    } else if (button === '=') {
        if (numbers.length >= 1) { 
            equationNum1 = roundNumbers( numbers[0], showDecimalPlaces) 
        } else { equationNum1 = 0 };
        equation = equationNum1 + ' =';
        return equation; 
    } else if (button === 'BKSP') {
        if (numbers.length >= 1 ) { 
            equationNum1 = roundNumbers( numbers[0], showDecimalPlaces);
            equation = equationNum1 + ' __';
            return equation; 
        } else { return '' };
    } else { return '' ; };
};

function roundNumbers(num, decimalPlaces) { 
    //note: only intended for display of answers, unrounded numbers to be retained in numbers variable
    let numSign = Math.sign(num);
    let absNum = Math.abs(num);
    let roundedNumber = numSign * ( Math.round(absNum * 10 ** decimalPlaces) / 10 ** decimalPlaces );
    return roundedNumber;
}

//~~~~~~~~~~Listener & Directing~~~~~~~~~~
buttons.forEach( (button) => {
    button.addEventListener( "click", (e) => directButtonValues(e) );
});

function deactivateDecimal () {
// when '. button' pressed: 
    decimalBtn.classList.add('disabled');
    decimalActive = false;
    return decimalActive;
};

function activateDecimal () {
    decimalBtn.classList.remove('disabled');
    decimalActive = true;
    return decimalActive;
    //activate when:
        //userEntry is cleared/recorded
        //decimal is BKSP away!*** when BKSP runs, check if sliced off item is '.'
};

function deactivateBksp () {
    bkspBtn.classList.add('disabled');
    bkspActive = false;
    return bkspActive;
};

function activateBksp () {
    bkspBtn.classList.remove('disabled');
    bkspActive = true;
    return bkspActive;
};

function directButtonValues(e) {
    let userButton = e.target.textContent;
    logCurrentStateOfVars ('PRE-event routing')
    switch (userButton) {
        case 'CLEAR':
            clearAll();
        break;
        case 'BKSP': 
            if (bkspActive = true) {routeBksp(userButton);}
        break;
        case 'x':
        case '+':
        case '-':
        case '/':
            if (lastButton === 'operator') {
                routeOperatorChange(userButton);
                break;
            };
            recordNumber('operator');
            if (operatorIsEqualsAndNextOp === true) {
                routeOperatorEquals(userButton);
            } else {
                routeOperatorByStage(userButton);
            };
        lastButton = 'operator';
        break;
        case '=':
            recordNumber('equals');
            routeEquals(userButton);
            lastButton = '=';
        break;
        case '.': 
            if ( decimalActive = false) {break;}
            deactivateDecimal();
        default : //any number button pressed
            displayNumberPress(userButton);
            lastButton = 'number';
    };
};

//~~~~~~~~~~Number Buttons~~~~~~~~~~
function recordNumber(source) {
    if ( displayAnswerDiv.textContent === 'Impossible') {
        numbers = [];
    } else {
        switch (displayAnswerDiv.id) {
            case 'Impossible' : 

            break;
            case 'empty' :
                numbers.push(0);
            break;
            case 'userEntry' : 
                if (bkspOperator === true) { 
                    numbers = [userEntry] 
                } else {
                    if (operator && source === 'operator') { 
                        operatorIsEqualsAndNextOp = true;
                    };
                    numbers.push(userEntry);
                };
            break;
            case 'answer' :
                numbers = [answer];
            };
        checkNumCount();
    };
};

function displayNumberPress(button) {
    switch (displayAnswerDiv.id) {
        case 'empty' : 
        case 'answer':
            userEntry = button;
        break;
        case 'userEntry' :
            userEntry += button;
        break;
        default : 
            userEntry = 'ERROR: displayID invalid'; 
    };
    changeDisplayTo(`userEntry`, userEntry);    
    logCurrentStateOfVars('displayNumberPressFinish')
};

//~~~~~~~~~~Operation Buttons + - / x~~~~~~~~~~
function routeOperatorByStage(button) {
    operator = button;
    calcEquation();
    updateEquation();
    if ( calcEquation.calcSuccess === true ) {
        changeDisplayTo('answer', calcEquation.answer);
        operator = '';
    } else {
        changeDisplayTo('empty', calcEquation.answer);
        userEntry = '';
    };
    logCurrentStateOfVars ('Show Math Result')
};

function routeOperatorEquals(button) {
    calcEquation();
    operator = button;
    equation += ` = ${roundNumbers( answer, 2 ) } ${operator}`;
    numbers = [answer];
    operatorIsEqualsAndNextOp = '';
    changeDisplayTo('answer', calcEquation.answer);
    logCurrentStateOfVars ('Show Math Result')
};

function routeOperatorChange (button) {
    operator = button;
    updateEquation();
    changeDisplayTo();
};

//~~~~~~~~~~Operator Button '='~~~~~~~~~~
function routeEquals(button) {
    if (!operator) {
        if (userEntry) { answer = userEntry } else if (!answer) { answer = 0 };
        numbers = [answer];
        updateEquation(button);
        changeDisplayTo('answer', answer)
        userEntry = '';
    } else {
        if (numbers.length === 1) { 
            answer = numbers[0]; 
            updateEquation(button);
            operator = '';
            userEntry = '';
            changeDisplayTo('answer', answer);
        };
        if (numbers.length === 2) {
            calcEquation();
            operator = '';
            userEntry = '';
            changeDisplayTo('answer', answer); //parameters answer?
        };
    };
};

//~~~~~~~~~~Number Check~~~~~~~~~~
function checkNumCount() {
    while ( numbers.length > 2 ) {
        numbers.shift();
    };
    logCurrentStateOfVars ("remove old numbers")
};

//~~~~~~~~~~Backspace~~~~~~~~~~
function routeBksp(button) {
    if ( displayAnswerDiv.id === 'userEntry' ) {
        userEntry = displayAnswerDiv.textContent.slice(0,-1);
        changeDisplayTo('userEntry', userEntry);
        return;
    } else if ( lastButton = 'operator' ) {
        operator = '';
        bkspOperator = true;
        updateEquation(button);
        changeDisplayTo();
    } else {
        changeDisplayTo();
        answer = '';
    };
};

//~~~~~~~~~~MATH~~~~~~~~~~
function checkReady() {
    let ready;
    (numbers.length === 2 && operator) ? ready = 'true' : ready = 'false' ;
    logCurrentStateOfVars ('checked if ready for Math')
    return ready;
}

function calcEquation() {
    updateEquation();
    if ( checkReady() === 'false' ) { 
        let calcReply = {
            calcSuccess : false,
            answer : displayAnswerDiv.textContent, };
        return calcReply;
    } else {
        switch (operator) {
            case '+' :
                answer = addNumbers();
            break;
            case '-' :
                answer = subtractNumbers();
            break;
            case 'x' :
                answer = multiplyNumbers();
            break;
            case '/' :
                answer = divideNumbers();
            break;
            }
        operator = '';
        numbers = [];
    };
    let calcReply = {
        calcSuccess : true,
        answer : answer, };
    return calcReply;
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

//~~~~~~~~~~Clear Button~~~~~~~~~~
function clearAll() {
    numbers = [];
    operator = '';
    answer = '';
    userEntry = '';
    equation = '';
    operatorIsEqualsAndNextOp = '';
    changeDisplayTo();
    lastButton = '';
    bkspOperator = '';
    decimalActive = true;
    bkspActive = false;
    logCurrentStateOfVars ('clearAll')
}

//~~~~~~~~~~Log all variables to Console~~~~~~~~~~
function logCurrentStateOfVars (header) {
                console.group( header );
                console.log(`nums: `+ numbers+' operator: '+operator+' equation:'+equation);
                console.log(`ans:${answer}, userEntry: ${userEntry} dispID:${displayAnswerDiv.id}`);
                console.log(`lastButton: ${lastButton} activeDisplay: ${displayAnswerDiv.id}`);
                console.groupEnd();
}