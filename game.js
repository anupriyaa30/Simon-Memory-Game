var level=0;

var gamePattern=[];

var start=true;

var userClickedPattern=[];

var buttonColours= ["red", "blue", "green", "yellow"]

var randomNumber, randomChosenColour;

$(document).keypress(function(){
    if(start== true)
    {
        $("body").removeClass("game-over");
        start = false;
        nextSequence();
    }
});

function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    randomNumber= Math.floor(Math.random()*4);
    randomChosenColour= buttonColours[randomNumber];
    $("#"+randomChosenColour).delay(100).fadeOut().fadeIn('slow');
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    
}





var userChosenColour;

$(".btn").click(function(){
    userChosenColour= $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1);
});


function playSound(name){
    var song= new Audio('./sounds/'+name+'.mp3');
    song.play();
}


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern=[];
        }
    }
    else{
        var wrong= new Audio('./sounds/wrong.mp3');
        wrong.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over! Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    start=true;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}