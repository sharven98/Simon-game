alert("How to play this game: Inorder to play this game all you have to do is press the button that blinks and you will reach the next level, then when the next button blinks you have to press the previous button followed by the current button and so on....Enjoyy")

var buttonColours =["red","blue","green","yellow"];

var gamePattern =[];

var userClickedPattern =[];

var level = 0;

var started = false;

$(document).keypress(function(){
	if(!started){
		$("#level-title").text("level " +level);
		nextSequence();
		started = true;
	}
});

$(".btn").click(function(){
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	console.log(userClickedPattern);

	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
	if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
		console.log("success");

		if(userClickedPattern.length === gamePattern.length){
			setTimeout(function(){
				nextSequence();
			}, 1000);
		}
	}else{
		console.log("wrong");
		playSound("wrong");

		$("#level-title").text("Game Over, Press Any Key to Restart");

		$("body").addClass("game-over");
		setTimeout(function(){
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}

}

function nextSequence(){

	userClickedPattern=[];

	level++;

	$("#level-title").text("level "+level);

	var randomNumber = Math.floor(Math.random()*4);
	console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
        console.log(gamePattern);

    var chooseBox = "#"+randomChosenColour;

    $(chooseBox).fadeOut(150).fadeIn(150);

   playSound(randomChosenColour)
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed");

	setTimeout(function(){
		$("#"+currentColour).removeClass("pressed");
	} ,100);
}

function startOver(){
	level = 0;
	gamePattern =[];
	started = false;
}
