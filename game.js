
var gamePattern=[];

var userClickedPattern=[];

var buttonColor=[ "red", "blue", "green", "yellow"];

var level = 0;
var temp=0;
function nextSequence(){
    $(document).unbind("keypress");
    var random=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[random];

    gamePattern.push(randomChosenColor);
    function doSetTimeout(){
        playSound(gamePattern[i]);
        i++;
        if(i<gamePattern.length)
            setTimeout(doSetTimeout,600);
    }
    var i=0;
    setTimeout(doSetTimeout,600);
    
    level=level +1;
    temp=level;
    $("h1").html("Level "+level);
    
}
if(level==0){
    $(document).on("keypress",nextSequence);
}

$(".btn").on("click",function(e){
    var userChoosenButton=e.currentTarget.getAttribute("id");
    userClickedPattern.push(userChoosenButton);
    playSound(userChoosenButton);
    if(temp>1){
        temp=temp-1;
        var array1=userClickedPattern;
        var array2=gamePattern.slice(0,level-temp);
        if(!(array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]}))){
            gameover();
        }
    }else{
        checkAnswer(gamePattern,userClickedPattern);
    }
});


function checkAnswer(array1,array2){
    if(array1.length === array2.length && array1.every(function(value, index) { return value === array2[index]})){
        while(userClickedPattern.length!=0){
            userClickedPattern.pop();
        }
        setTimeout(function(){
            nextSequence();
        },1000);
    }else{
        gameover();
    }
}

function gameover(){
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100);
    $("h1").html("Game over press anykey to Restart");
    level=0;
    while(gamePattern.length!=0){
        gamePattern.pop();
    }
    while(userClickedPattern.length!=0){
        userClickedPattern.pop();
    }
    $(document).on("keypress",nextSequence);
}

function playSound(name){

    $("#"+name).fadeOut(100).fadeIn(100);

    var audio=new Audio("sounds/"+name+".mp3");

    audio.play();

    animatePress(name);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
