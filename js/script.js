// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    runGame("addition");
})

function runGame(gameType) {

    // Generate two random numbers between 1 and 25
    // Math.floor rounds down to the whole number
    // Math.random generates random numbers

    let num1 = Math.floor(Math.random() * 25) + 1; // Personal comment: Instead of Math.floor and then adding 1, Math.ceil should be more efficient
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType ==="addition") { // Personal comment: Since we're always checking for exact matches, along with 1 error catch, a switch would be preferable for legibility.
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }
}

function checkAnswer() {

    // Checks the answer against the first element in
    // the returned calculateCorrectAnswer array

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

function calculateCorrectAnswer() {
    
    // Gets the operands (the numbers) and the operator (plus, minus etc)
    // directly from the DOM

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") { // Personal comment: Since we're always checking for exact matches, along with 1 error catch, a switch would be preferable for legibility.
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {
    
    // Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;

}

function incrementWrongAnswer() {

  // Gets the current tally of incorrect answers from the DOM and increments it

  let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;

}

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";

}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand2, result) {
    document.getElementById("operand1").textContent = operand2 * result;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "/";
}