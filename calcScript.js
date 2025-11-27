let numbers = [];
let operator = '';
let equation = '';
let answer = '';
let userEntry = '';

// ==========Direct DOM Effects==========
const calculatorBodyDiv = document.querySelector('div.frame');
const displayEquationDiv = calculatorBodyDiv.querySelector('div#equation');
const displayAnswerDiv = calculatorBodyDiv.querySelector('div.vcenter');
const buttons = calculatorBodyDiv.querySelectorAll('button');
const displayAnswerContainer = document.querySelector('.display.answer')
    displayAnswerContainer.appendChild(displayAnswerDiv);
    calculatorBodyDiv.prepend(displayAnswerContainer);
    calculatorBodyDiv.prepend(displayEquationDiv);

function changeDisplayTo(idName='empty',value='') {
    //idName values should be one of: empty, answer, userEntry
    displayAnswerDiv.id = idName;
    displayAnswerDiv.textContent = value;
    updateEquationDisplay();
}

function updateEquationDisplay() {
    updateEquation ();
    displayEquationDiv.textContent = equation;
};

function updateEquation () {
    if (operator) {
        if (numbers[0]) { equasionNum1 = numbers[0] } else { equasionNum1 = 0 };
        if (numbers[1]) { equasionNum2 = numbers[1] } else { equasionNum2 = '' };
        equation = equasionNum1 + ' ' + operator + ' ' + equasionNum2;
        return equation; 
    } else { return '' ; }
}

//==========Listener & Directing==========
//NOT YET RE-ASSESSED
buttons.forEach( (button) => {
    button.addEventListener( "click", (e) => directButtonValues(e) );
});

function directButtonValues(e) {
    let userButton = e.target.textContent;
    switch (userButton) {
        case 'CLEAR':
            clearAll();
        case '.': break;
        case 'BKSP': break;
        case 'x':
        case '+':
        case '-':
        case '/':
            checkForOperator(userButton);
        case '=':
            checkForOperatorEquals(userButton)
        break;
        default : //any number button pressed
            displayNumberPress(userButton)
    };
};

//==========Number Buttons==========
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
    changeDisplayTo('userEntry', userEntry);    
};

//==========Operation Buttons + - / x==========
function checkForOperator(button) {
    let wasEmpty;
    if (!operator) { 
        operator = button; 
        wasEmpty = 'true';
    }; 
    checkDisplay(button, wasEmpty, 'operator');    
};

//==========Check Display Contents, Update Number - NO PREV OPERATOR VER, opp pushed==========
function checkDisplay(btn, wasEmpty, source) {
    let dispID = displayAnswerDiv.id

    if (source = 'operator') {
        switch (dispID) { //WHEN NO OPERATOR (and operation pushed)
            case 'empty' : 
                if (wasEmpty) {numbers.push(0)};
                checkNumCount();
                operator = btn;
                wasEmpty = '';
                changeDisplayTo()
            break;
            case 'answer' :
                numbers = [answer];
                // numbers = [displayAnswerDiv.textContent]
                answer = '';
                operator = btn;
                wasEmpty = ''
                changeDisplayTo()
            break;
            case 'userEntry' :
                numbers.push(userEntry);
                checkNumCount();
                userEntry = '';
                if (!wasEmpty) { getAnswerDisplayed() }
                changeDisplayTo(); //double check these
                operator = ''   //double check thse
                wasEmpty = ''
            break;
            default : 
                console.log('ERROR - problem in checkDisplay(operator source), Div ID invalid');
        };
        return dispID;
    } else if (source = 'equals') {
        switch (dispID) { //WHEN NO OPERATOR (and operation pushed)
            case 'empty' : 
                {numbers.push(0)};
                checkNumCount();
                getAnswerDisplayed();
                break;
            case 'answer' :
                numbers = [answer];
                changeDisplayTo('answer', answer);
                equation = '';
                answer = '';
                operator = '';
            break;
            case 'userEntry' :
                numbers.push(userEntry);
                checkNumCount()
                userEntry = '';
                    if (number.length = 1) { answer = numbers[0] };
                    if (number.length = 2) {getAnswerDisplayed()};
            break;
            default : 
                console.log('ERROR - problem in checkDisplay(equals source), Div ID invalid');
        };
        return dispID
    };
};

//==========Operator Button '='==========
function checkForOperatorEquals(button) {
    if (!operator) { 
        if (userEntry) { answer = userEntry } else { answer = 0 };
        numbers = [];
        equation = '';
        userEntry = '';
    } else {
        checkDisplay(button, '', source);
    };
};

//==========Number Check==========
function checkNumCount() {
    while ( numbers.length > 2 ) {
        numbers.shift();
    };
};

//==========MATH==========
function checkReady() {
    let ready;
    (numbers.length === 2 && operator) ? ready = 'true' : ready = 'false' ;
    return ready;
}

function getAnswerDisplayed() {
            if ( checkReady() ) { answer = calcEquation() } else { console.log('checkReady returned false, but...')}; 
            changeDisplayTo('answer', answer); //double check these
            answer = ''
            equation = ''
            operator = ''   //double check thse
            userEntry = ''
}

function calcEquation() {
if ( checkReady() === 'false' ) { 
    return answer = displayNumber;
    } else {
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

//==========Clear Button==========
function clearAll() {
    numbers = [];
    operator = '';
    answer = '';
    userEntry = '';
    changeDisplayTo(); //also updates eqn, which will pull newly empty values
}

//==========Log all variables to Console==========
function logCurrentStateOfVars (header) {
                console.group( header );
                console.log(`nums: `+ numbers+' operator: '+operator+' equation:'+equation);
                console.log(`ans:${answer}, userEntry: ${userEntry} dispID:${displayAnswerDiv.id}`);
                console.groupEnd();
}