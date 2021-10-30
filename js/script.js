//where the guessed letters appear
const guessedLettersElement = document.querySelector(".guessed-letters");
//button with the text "guess" in it.
const guessButton = document.querySelector(".guess");
//text input where player will input a letter
const inputLetter = document.querySelector(".letter");
//the empty paragraph where the word progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
//the paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
//the span inside the paragraph where the remaining guesses will display
const howManyGuesses = document.querySelector(".remaining span");
//the empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// the hidden button that will appear prompting the player to play again.
const playAgain = document.querySelector(".play-again");
//the word
const word = "magnolia";
const guessedLetters = [];
// Function to update the paragraph's innerText for "word-in-progress" element
const updateParagraph = function(word) {
  const paragraphLetters = [];
  for (const letter of word) {
    console.log (letter);
    paragraphLetters.push("●");
  }
wordInProgress.innerText = paragraphLetters.join("");
};
// call the function and pass it the word variable as the argument.
  updateParagraph(word);

  guessButton.addEventListener("click", function(e) {
    //to prevent the form submitting and then reloading the page
    e.preventDefault();
    // Empty the text of the message element
    message.innerText = "";
    const guess = inputLetter.value;
    const userGuess = inputValue(guess);
     if(userGuess) {
       makeGuess(guess);
     }
    //empty the value of the input
     inputLetter.value = "";
  });



const inputValue = function(input) {
  // A "regular" expression to ensure the player inputs a letter.
  const acceptedLetter = /[a-zA-Z]/;
   if( input.length === 0) {
     message.innerText = "Please enter a letter."
   }else if(input.length > 1) {
     message.innerText = "Please enter only one letter."
   //Using the .match() method here to make sure a number or other special
   //character was not input
   }else if (!input.match(acceptedLetter)) {
     message.innerText = "Please inter a letter from A to Z."
   }
   else{
     return input;
   }
};
//Function to update the page with the letters guessed.
const makeGuess = function(guess) {
   guess = guess.toUpperCase();
   if (guessedLetters.includes(guess)){
   message.innerText = "That letter has already been guessed. Try again.";
 } else {
   guessedLetters.push(guess);
   console.log(guessedLetters);
   showGuessedLetters();
   updateWordInProgress(guessedLetters);
 }
};

const showGuessedLetters = function() {
  //clear the list first
guessedLettersElement.innerHTML = "";
for (const letter of guessedLetters) {
  const li = document.createElement("li");
  li.innerText = letter;
  guessedLettersElement.append(li);
  }
};
const updateWordInProgress = function (guessedLetters) {
   const wordUpper = word.toUpperCase();
   const wordArray = wordUpper.split("");
   const revealWord = [];
   for (const letter of wordArray) {
     if (guessedLetters.includes (letter)) {
       revealWord.push (letter.toUpperCase());
      } else {
  revealWord.push("●");
  }
}
wordInProgress.innerText = revealWord.join("");
guessedWordWon();
};


const guessedWordWon = function () {
  if(word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
  }
};
