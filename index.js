let lvlNum = 0;
let started = false;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

if ($(window).width() <= 1100) {
  $(document).click(function startGame() {
    if (!started) {
      $("#level-title").text("Level " + lvlNum);
      nextSequence();
      started = true;
    }
  });
}

$(document).keypress(function startGame() {
  if (!started) {
    $("#level-title").text("Level " + lvlNum);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColour = this.id;
  makeSound(this.id);
  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to restart!");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  lvlNum++;
  $("#level-title").text("Level " + lvlNum);
  let n = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[n];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  makeSound(randomChosenColour);
}

function buttonAnimation(color) {
  let newRandomButton = $("#" + color);
  newRandomButton.fadeIn(100).fadeOut(100).fadeIn(100);
}
function makeSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  buttonAnimation(color);
}

function startOver() {
  lvlNum = 0;
  gamePattern = [];
  started = false;
}
