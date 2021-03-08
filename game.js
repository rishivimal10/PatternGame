var buttonColours = ["red", "blue","green","yellow"];
var gamePattern = [];
var chosenPattern = [];
var level = 0;
var gameStarted = false;
var highScore = 0;

$(document).keypress(function(){
  if (!gameStarted){
    gameStarted = true;
    nextSequence();
  }
})

function nextSequence(){

  var randomNumber = Math.floor((Math.random()*4));
  var randomColour = buttonColours[randomNumber];

  gamePattern.push(randomColour);

  animateClick(randomColour);
  buttonSound(randomColour);

  level+= 1;
  $("#level-title").text("Level " + level);

}

$(".btn").click(function(event){

  chosenColour = event.target.id;
  chosenPattern.push(chosenColour);
  buttonSound (chosenColour);
  animateClick(chosenColour)
  checkAnswer();
})


function buttonSound(colour){
  var sound = new Audio("sounds/" + colour + ".mp3");
  sound.play();
}

function animateClick (colour){
  $("#" + colour).addClass("pressed");
  setTimeout(function(){
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function checkAnswer(){
  var n = chosenPattern.length - 1;
  if (chosenPattern [n] == gamePattern [n]){

      if (n == (gamePattern.length - 1)){
        chosenPattern = [];

        if (level > highScore){
          highScore = level;
          $("#high-score").text("High Score: " + highScore);
        }

        setTimeout (function(){
          nextSequence();
        }, 1000);

      }

  }

  else{
      wrongAnswer();
  }
}

function wrongAnswer(){
  gameOverAudio = new Audio ("sounds/wrong.mp3");
  gameOverAudio.play();

  $(document.body).addClass("game-over");
  setTimeout(function(){
    $(document.body).removeClass("game-over");
  }, 100);

  gameStarted = false;
  gamePattern = [];
  chosenPattern = [];
  level = 0;
  $("#level-title").text("Game Over! Press any key to restart")
}
