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
let word = "magnolia";
//This array contains all the letters the player has guessed.
let guessedLetters = [];
//Remaining guesses
let guessesRemaining = 7;

//async function to get list of words.
const getWord = async function () {
  const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await response.text();
  //console.log (words);
  const wordArray = words.split("\n");
  //.log (wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  updateParagraph(word);
};
//Get a random word
getWord();

// Function to update the paragraph's innerText for "word-in-progress" element
const updateParagraph = function(word) {
  const paragraphLetters = [];
  for (const letter of word) {
    //console.log (letter);
    paragraphLetters.push("●");
  }
wordInProgress.innerText = paragraphLetters.join("");
};


  guessButton.addEventListener("click", function(e) {
    //to prevent the form submitting and then reloading the page
    e.preventDefault();
    // Empty the text of the message element
    message.innerText = "";
    //The value of the imput that was entered
    const guess = inputLetter.value;
    const userGuess = inputValue(guess);

     if(userGuess) {
       makeGuess(guess);
     }
    //empty the value of the input
     inputLetter.value = "";
  });


//Function to insure player inputs only accepted characters.
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
   // The variable guessedLetters, is an array
  if (guessedLetters.includes(guess)){
    message.innerText = "That letter has already been guessed. Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    showGuessedLetters();
    updateGuessesRemaining(guess);
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
//Function to count guesses remaining
const updateGuessesRemaining = function(guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes (guess)) {
   message.innerText = `Sorry, the word has no ${guess}.`;
   guessesRemaining -= 1;
  } else {
   message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (guessesRemaining === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;

    startOver();

  } else if (guessesRemaining === 1) {
    howManyGuesses.innerText = `${guessesRemaining} guess`;
  } else {
    howManyGuesses.innerText = `${guessesRemaining} guesses`;
  }
};

const guessedWordWon = function () {
   if(word.toUpperCase() === wordInProgress.innerText){
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`

    startOver();
   }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuesses.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function() {
  //reset game, get new word
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersElement.innerHTML = "";
  guessesRemaining = 7;
  guessedLetters = [];
  howManyGuesses.innerText = `${guessesRemaining} guesses`;
  getWord();
  //show the right elements
  guessButton.classList.remove("hide");
  playAgain.classList.add("hide");
  remainingGuesses.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
});
