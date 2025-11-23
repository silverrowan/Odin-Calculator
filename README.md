# Odin-Calculator

~~~Assignment~~~
Create a Calculator w all basic math functions

Operations will be a number, an operator, and another number (so 2 numbers)
    create variables: for each, they'll be needed for the display later
Create basic math functions
    - add
    - subtract
    - mutliply
    - divide
Create a function "operate" that calls math functions as appropriate

Create a basic HTML calculator to get the input
    (dont worry about function yet)
    fill calculator display w dummy numbers
    add a clear function
Create functions that populate the display when you click the digit buttons.
    store contents of display in a variable for next step
Make it work!
Make the display update w the result of the operation

~~~Watch out for~~~
- should only evaluate only one pair of numbers at a time.
    so, if user enters 12 + 7 - 2, the calculator shoudl complete 12+7 THEN do total-2 
    (so, ignore order of operations)
- round answers with long decimals to avoid display overflow
- pressing = before enterina all of the numbers or an operator could cause problems
- pressing clear should wipe out all existing data. Make sure user really is starting fresh
- display an error if user divides by 0 - don't let it crash the calculator
- Make sure only runs an operation when supplied 2 numbers and an operator by user
    eg. enter 2 + +, should NOT evaluate (yet), and jsut use the last entered operator
- when the result is displayed (w =) pressing a new digit should clear the result & start a new calculation instead of appending the digit to the existing result.

~~~Extra Credit~~~
    - add a '.' button and let users input decimals - but only allow one; disable it if theres already one in the display
    - add a backspace button
    - add keyboard support

