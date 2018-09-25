

const wordList = ["car","bird","book","tree","coffee","pond","dog","cat"];

var secret;
var blankArr;
var numWrongGuess = 0;
var wins = 0;
var losses = 0;

function pickSecret(wordList) {
   let randNum = Math.floor(Math.random() * (wordList.length))
   return wordList[randNum];
}  

function createBlankArray(copyWord) {
   blankArr =[]
   for (let i = 0; i < copyWord.length; i++) {
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
      letterBtn.addClass("letter-button");
      letterBtn.attr("dataLetter",letter);
      letterBtn.text(letter);
      $("#buttons").append(letterBtn);
    }

}

function userGuess(guess,secret) {
  console.log(secret,guess);
  console.log(secret.indexOf(guess));
  if(secret.indexOf(guess) !== -1) {
    addLetter(guess,secret,blankArr);
  } else {
    numWrongGuess++;
    $("#wrongGuess").text("Number of Wrong Guesses: " + numWrongGuess);
  }
}

function addLetter(guess,secret,blankArr) {
  let i = 0;
  while(i < secret.length) {
    let index = secret.indexOf(guess,i);
    if(index !== -1) {
      blankArr[index] = guess;
      i = index +1
    } else {
      i = secret.length;
    }
  }
  displayArray(blankArr);
}

function checkWin() {
  if(blankArr.includes("_") === false && numWrongGuess < 5) {
    alert("You Win!");
  } else if (numWrongGuess >= 5) {
    alert("You Lose! :(")
  }
}

function main() {
   secret = pickSecret(wordList).toUpperCase();
   console.log(secret);
   blankArr = createBlankArray(secret);
   displayArray(blankArr);
   createKeys();
}

main();

$(".letter-button").on("click", function() { 
  let guess = $(this).attr("dataLetter");
  userGuess(guess,secret);
  $(this).remove();
  checkWin();
});