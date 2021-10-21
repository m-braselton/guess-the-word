const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const howManyGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const updateParagraph = function(word) {
  const paragraphLetters = [];
  for (const letter of word) {
    console.log (letter);
    paragraphLetters.push("●");
  }
wordInProgress.innerText = paragraphLetters.join("");
};
  updateParagraph(word);

  guessButton.addEventListener("click", function(e){
    e.preventDefault();
    const guess = inputLetter.value;
    console.log(guess);
    inputLetter.value = "";
  });
