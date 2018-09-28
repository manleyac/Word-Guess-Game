
//array of words for game
const wordList = ["car","bird","book","tree","coffee","pond","dog","cat","glass","speaker","mouse","laptop","picture","screen","key","forest","fish","why","weather","light","thunder","phone","guitar"];

//counter of wins and losses
var wins = 0;
var losses = 0;

//Constructor for Hangman object
class Hangman {
  constructor(secret) {
    this.secret = secret;
    this.wordArray = this.createBlankArray();
    this.wrongGuess = 0;
  }
  createBlankArray() {
    let blankArr = [];
    for (let i = 0; i < this.secret.length; i++) {
       blankArr.push("_");
    }
    return blankArr;
  }
  userGuess(guess) {
    if(this.secret.indexOf(guess) !== -1) {
      this.addLetter(guess);
    } else {
      this.wrongGuess++;
    }
  }
  addLetter(guess) {
    let i = 0;
    while(i < this.secret.length) {
      let index = this.secret.indexOf(guess,i);
      if(index !== -1) {
        this.wordArray[index] = guess;
        i = index +1
      } else {
          break;
      }
    }
  }
}

//Generates a random number to select a word from wordlist
function pickSecret(wordList) {
   let randNum = Math.floor(Math.random() * (wordList.length))
   return wordList[randNum];
}  


//accepts Hangman object, displays values to the webpage
function displayArray(game) {
   let displayString = game.wordArray.join(" ");
   $("#secretWord").text(displayString);
   $("#wrongGuess").text("Wrong Guesses: " + game.wrongGuess);
   $("#numWins").text("Wins: " + wins);
   $("#numLosses").text("Losses: " + losses);
   checkWin(game);
}


//creates keys on webpage
function createKeys() {
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

  for (let letter of letters) {
    var letterBtn = $("<button>");
    letterBtn.addClass("letter-button");
    letterBtn.attr("dataLetter",letter);
    letterBtn.text(letter);
    $("#buttons").append(letterBtn);
  }
}

//removes keys from webpage
function deleteKeys() {
  $("#buttons").off("click");
  $("#buttons").empty();
}


//resets game
function playAgain() {
  $("#replay").append("<h4>Click to Play Again</h4>");
  var replayBtn = $("<button>Play Again</button>");
  replayBtn.addClass("btn-success btn-large replayBtn");
  $("#replay").append(replayBtn);
  $(".replayBtn").on("click", function() {
    deleteKeys();
    main();
  });
}


//checks if user won or lost game
function checkWin(game) {
  if(game.wordArray.includes("_") === false && game.wrongGuess < 5) {
    wins++;
    $("#numWins").text("Wins: " + wins);
    $("#replay").append("<h3>You Win!<h3>");
    playAgain();
  } else if (game.wrongGuess >= 5) {
    losses++;
    $("#numLosses").text("Losses: " + losses);
    $("#replay").append("<h3>You Lose! The Word Was: " + game.secret + "<h3>");
    playAgain();
  } 
}


//runs when user clicks on a key
function clickEvent(event) {
  let guess = $(this).attr("dataLetter");
  game.userGuess(guess);
  $(this).remove();
  displayArray(game);
}


//runs to setup game
function main() {
  $("#replay").empty();
  $("#replay").off();
  var secret = pickSecret(wordList).toUpperCase();
  game = new Hangman(secret); 
  createKeys();
  displayArray(game);
  $(".letter-button").on("click", clickEvent);
}

main();
