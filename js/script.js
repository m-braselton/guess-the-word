const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const howManyGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const updateParagraph = function(word) {
  const paragraphLetters = [];
  for (const letter of word) {
    console.log (letter);
    paragraphLetters.push("●");
  }
wordInProgress.innerText = paragraphLetters.join("");
};
  updateParagraph(word);

  guessButton.addEventListener("click", function(e) {
    e.preventDefault();

    message.innerText = "";
    const guess = inputLetter.value;
    const userGuess = inputValue(guess);
     if(userGuess) {
       makeGuess(guess);
     }
     inputLetter.value = "";
  });

const inputValue = function(input) {
  const acceptedLetter = /[a-zA-Z]/;
   if( input.length === 0) {
     message.innerText = "Please enter a letter."
   }else if(input.length > 1) {
     message.innerText = "Please enter one letter."
   }else if (!input.match(acceptedLetter)) {
     message.innerText = "Please inter a letter from A to Z."
   }
   else{
     return input;
   }
};

const makeGuess = function(guess) {
   guess = guess.toUpperCase();
   if (guessedLetters.includes(guess)){
   message.innerText = "That letter has already been guessed. Try again.";
 } else {
   guessedLetters.push(guess);
   console.log(guessedLetters);
 }
};
