const randomNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    const userNumber = Number(document.getElementById("guess").value);
    const result = document.getElementById("result");

    if (userNumber == randomNumber) {
        result.innerHTML = "Correct!";
    } else if (userNumber < randomNumber) {
        result.innerHTML = "Higher! Try again.";
    } else {
        result.innerHTML = "Lower! Try again.";
    }
}