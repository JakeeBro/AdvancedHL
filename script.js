let validInput = false;
let maxValue;

while (!validInput) {
    maxValue = Number(window.prompt("What should the Maximum Number be?"));

    // if maxValue is NOT NOT (double negative) a Number and is GREATER THAN Zero...
    if ((!Number.isNaN(parseInt(maxValue)) && maxValue > 0)) {
        maxValue = Math.round(maxValue);
        validInput = true;
    }
}

// Document Elements
let container = document.getElementById('guess-container');
let input = document.getElementById('guess-input');;
input.onkeydown = function(e) {
    if (e.key === 'Enter') {
        guessNumber();
    }
}
let button = document.getElementById('guess-button');
let description = document.getElementById('description');
let feedback = document.getElementById('feedback');
let amount = document.getElementById('amount');
let list = document.getElementById('list');
let message = document.getElementById('message');
let reset = document.getElementById('reset');

description.innerHTML = `Guess a Number between ${st(1)} and ${st(maxValue)}`;
let answer = Math.floor(Math.random() * maxValue) + 1;

let guess;
let guessList = [];

function guessNumber() {
    // input = document.getElementById('guess-input');

    // if input.value is empty or not a number...
    if (input.value.length === 0 || Number.isNaN(parseInt(input.value))) {
        feedback.innerHTML = `Please enter a ${st('number')}`;
        showElement(feedback, true);
        showElement(amount, false);
        showElement(list, false);
        resetInput();
        return;
    }

    guess = parseInt(input.value);

    showElement(message, false);

    if (guessList.includes(guess)) {
        feedback.innerHTML = `You ${st('already guessed')} that number, try again!`;
        showElement(feedback, true);
        resetInput();
        return;
    } else if (guess < 1 || guess > maxValue) {
        feedback.innerHTML = `That guess is ${st('out of range')}, try again!`
    } else if (guess < answer) {
        guessList.push(guess);
        feedback.innerHTML = `Please choose a ${st('higher')} number`;
    } else if (guess > answer) {
        guessList.push(guess);
        feedback.innerHTML = `Please choose a ${st('lower')} number`;
    } else if (guess >= 1 && guess <= maxValue) {
        guessList.push(guess);
        compareGuess();
    }

    showElement(feedback, true);
    resetInput();
}

function compareGuess() {
    if (guess === answer) {
        showElement(description, false);
        showElement(container, false);

        feedback.innerHTML = `The number ${st(guess)} is correct!`;

        amount.innerHTML = `It took you ${st(guessList.length)} guesses!`;
        showElement(amount, true);

        list.innerHTML = `You guessed ${stringifyList()}`;
        showElement(list, true);

        message.innerHTML = `${st('Good Guess!')}`;
        showElement(message, true);
        colorFeedback(true);

        input.disabled = true;
        button.disabled = true;

        showElement(reset, true);
    } else {
        resetInput();

        showElement(amount, false);
        showElement(list, false);

        message.innerHTML = `${st('Try Again!')}`;
        showElement(message, true);
        colorFeedback(false);
    }
}

function stringifyList() {
    let listString = "";

    // I did separate checks for 1 and 2 for purely grammatical/cosmetic reasons (Oxford Comma)
    if (guessList.length === 0) {
        return listString;
    } else if (guessList.length === 1) {
        return `${st(guessList[0])}`;
    } else if (guessList.length === 2) {
        return `${st(guessList[0])} and ${st(guessList[1])}`;
    } else {
        listString += `${st(guessList[0])}`;

        for (let i = 1; i < guessList.length; i++) {
            listString += `, ${st(guessList[i])}`;
        }

        let lastComma = listString.lastIndexOf(',') + 1;
        let str1 = listString.slice(0, lastComma);
        let str2 = listString.slice(lastComma);
        listString = str1 + ' and' + str2;

        return listString;
    }
}

function resetGame() {
    showElement(description, true);
    showElement(container, true);
    showElement(feedback, false);
    showElement(amount, false);
    showElement(list, false);
    showElement(message, false);
    showElement(reset, false);

    input.disabled = false;
    button.disabled = false;

    validInput = false;
    maxValue = 0;

    while (!validInput) {
        maxValue = Number(window.prompt("What should the Maximum Number be?"));

        if ((!Number.isNaN(parseInt(maxValue)) && maxValue > 0)) {
            maxValue = Math.round(maxValue);
            validInput = true;
        }
    }

    description.innerHTML = `Guess a Number between ${st(1)} and ${st(maxValue)}`;
    answer = Math.floor(Math.random() * maxValue) + 1;

    guess = 0;
    guessList = [];
}

// Utility Functions
// Toggles Element Visibility
function showElement(elem, vis) {
    if (vis) {
        elem.classList.remove('hide');
    } else {
        elem.classList.add('hide');
    }
}

// Reset the Input Field so the user doesn't have to hit backspace
function resetInput() { input.value = ""; }

// I got tired of typing the tag out
function st(x) {
    return `<strong>${x}</strong>`;
}

// I don't like looking at this so its way down here as a function
function colorFeedback(isCorrect) {
    if (isCorrect) {
        message.classList.remove('wrong');
        message.classList.add('right');
    } else {
        message.classList.remove('right');
        message.classList.add('wrong');
    }
}