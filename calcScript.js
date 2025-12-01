let numbers = [];
let operator = '';
let equation = '';
let answer = '';
let userEntry = '';

// ~~~~~~~~~~Direct DOM Effects~~~~~~~~~~
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
        logCurrentStateOfVars ('PRE-updateEquasion')
    if (operator) {
        if (numbers[0]) { equasionNum1 = numbers[0] } else { equasionNum1 = 0 };
        if (numbers[1]) { equasionNum2 = numbers[1] } else { equasionNum2 = '' };
        equation = equasionNum1 + ' ' + operator + ' ' + equasionNum2;
        return equation; 
    } else { return '' ; }
}

//~~~~~~~~~~Listener & Directing~~~~~~~~~~
//NOT YET RE-ASSESSED
buttons.forEach( (button) => {
    button.addEventListener( "click", (e) => directButtonValues(e) );
});

function directButtonValues(e) {
    let userButton = e.target.textContent;
    logCurrentStateOfVars ('PRE-event routing')
    switch (userButton) {
        case 'CLEAR':
            clearAll();
        case '.': break;
        case 'BKSP': break;
        case 'x':
        case '+':
        case '-':
        case '/':

            recordNumber();
            routeOperatorByStage(userButton);
            // changeDisplayTo(); //works w initial op, or after =
        break;
        case '=':
            recordNumber();
            checkForOperatorEquals(userButton)
        break;
        default : //any number button pressed
            displayNumberPress(userButton)
    };
};

//~~~~~~~~~~Number Buttons~~~~~~~~~~
function recordNumber() {
    switch (displayAnswerDiv.id) {
        case 'empty' :
            numbers.push(0);
        break;
        case 'userEntry' : 
            numbers.push(userEntry);
        break;
        case 'answer' :
            numbers = [answer];
        };
    checkNumCount();
}

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
    logCurrentStateOfVars('displayNumberPressFinish')
};

//~~~~~~~~~~Operation Buttons + - / x~~~~~~~~~~
function checkForOperator(button) {
    let wasEmpty;
    if (!operator) { 
        operator = button; 
        wasEmpty = true;
    }; 
    checkDisplay(button, wasEmpty, 'operator');    
        logCurrentStateOfVars ('CheckDisplay Result')
};

//~~~~~~~~~~Check Display Contents, Update Number - NO PREV OPERATOR VER, opp pushed~~~~~~~~~~
function checkCurrentDisplay() {
    let dispID = displayAnswerDiv.id;
    return dispID;
};

function routeOperatorByStage(button) {
    operator = button;
    calcEquation();
    changeDisplayTo('answer', answer);
    logCurrentStateOfVars ('Show Math Result')
}


function checkDisplay(btn, wasEmpty, source) {
    let dispID = checkCurrentDisplay()
    logCurrentStateOfVars ('PRE- check display, update number')
    if (source === 'operator') {
        switch (dispID) { //WHEN NO OPERATOR (and operation pushed)
            case 'empty' : 
                operator = btn;
                wasEmpty = '';
                changeDisplayTo()
            break;
            case 'answer' :
                answer = '';
                operator = btn;
                wasEmpty = ''
                changeDisplayTo()
            break;
            case 'userEntry' :
                userEntry = '';
                if (!wasEmpty) { 
                    calcEquation();
                    changeDisplayTo('answer', answer) //parameters answer?
                } else {
                    changeDisplayTo( ); //changed to part of prev if statement. Check works this way--prev--if we just calc'd the answer DONT WANT TO CLEAR
                }; 
                wasEmpty = ''
            break;
            default : 
                console.log('ERROR - problem in checkDisplay(operator source), Div ID invalid');
        };
        return dispID;
    } else if (source === 'equals') {
        switch (dispID) { //WHEN NO OPERATOR (and operation pushed)
            case 'empty' : 
                break;
            case 'answer' :
                changeDisplayTo('answer', answer);
                equation = '';
                answer = '';
                operator = '';
            break;
            case 'userEntry' :
                userEntry = '';
                    if (numbers.length === 1) { answer = numbers[0] };
                    if (numbers.length === 2) {
                        calcEquation();
                        changeDisplayTo('answer', answer) //parameters answer?
                    };
            break;
            default : 
                console.log('ERROR - problem in checkDisplay(equals source), Div ID invalid');
        };
        return dispID
    };
    logCurrentStateOfVars ('POST- check display, update number')
};

//~~~~~~~~~~Operator Button '='~~~~~~~~~~
function checkForOperatorEquals(button) {

    if (!operator) { 
        if (userEntry) { answer = userEntry } else if (!answer) { answer = 0 }; 
        // numbers = []; //this might be the problem? seem to clear it before its actually used. 
        equation = '';
        userEntry = '';
    } else {
        checkDisplay(button, '', 'equals');
    };
    logCurrentStateOfVars ('after checking if has operator (= pressed)')
};

//~~~~~~~~~~Number Check~~~~~~~~~~
function checkNumCount() {
    while ( numbers.length > 2 ) {
        numbers.shift();
    };
    logCurrentStateOfVars ("remove old numbers")
};

//~~~~~~~~~~MATH~~~~~~~~~~
function checkReady() {
    let ready;
    (numbers.length === 2 && operator) ? ready = 'true' : ready = 'false' ;
    logCurrentStateOfVars ('checked if ready for Math')
    return ready;
}

function calcEquation() {
    if ( checkReady() === 'false' ) { 
        return answer = displayAnswerDiv.textContent;
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
    operator = ''
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

//~~~~~~~~~~Clear Button~~~~~~~~~~
function clearAll() {
    numbers = [];
    operator = '';
    answer = '';
    userEntry = '';
    equation = '';
    changeDisplayTo(); //also updates eqn, which will pull newly empty values...except its not. Look into why?
    logCurrentStateOfVars ('clearAll')
}

//~~~~~~~~~~Log all variables to Console~~~~~~~~~~
function logCurrentStateOfVars (header) {
                console.group( header );
                console.log(`nums: `+ numbers+' operator: '+operator+' equation:'+equation);
                console.log(`ans:${answer}, userEntry: ${userEntry} dispID:${displayAnswerDiv.id}`);
                console.groupEnd();
}