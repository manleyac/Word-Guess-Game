

const wordList = ["car","bird","book","tree","coffee","pond","dog","cat"];

var secret;
var blankArr;
var guesses = [];
var numWrongGuess = 0;
var wins = 0;
var losses = 0;

function pickSecret(wordList) {
   let randNum = Math.floor(Math.random() * (wordList.length))
   return wordList[randNum];
}  

function createBlankArray(copyArr) {
   blankArr =[]
   for (let i = 0; i < copyArr.length; i++) {
      blankArr.push("_");
   }
   return blankArr;
}

function displayArray(arr) {
   let displayString = arr.join(" ");

   $("#secretWord").text(displayString);
}

function createKeys() {
   let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

   for (let letter of letters) {
      var letterBtn = $("<button>");
      letterBtn.addClass("letter-button letter letter-button-color");
      letterBtn.attr("data-letter",letter);
      letterBtn.text(letter);
      $("#buttons").append(letterBtn);
    }

}

function main() {
   secret = pickSecret(wordList).split("");
   blankArr = createBlankArray(secret);
   displayArray(blankArr);
   createKeys();
}

main();