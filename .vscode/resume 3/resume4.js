var innerbox = document.getElementById("innername");
var outerbox = document.getElementById("name");
var deg = 45;
/*
function spinColor() {
thing.style.backgroundImage = "linear-gradient("+ deg + "deg, red, yellow)";
}
*/
function ballDrop() {
  var ball = document.getElementById("ball");
  
  var loop, drop = 0;
  clearInterval(ballMovement);
  var ballMovement = setInterval(moveBall, 15);
  function moveBall() {
      if (loop > 200) {
        clearInterval(ballMovement);
        ball.backgroundColor = "orange";
      } else {
        drop++;
        loop++;
        ball.style.top = drop*10 + "px";
      }
  }

}


function spinColor() {
    var thing = document.getElementById("name");
    var loop =0;
    clearInterval(id);
    var id = setInterval(frame, 500);
    function frame() {
        if (loop > 1000) {
          innerbox.style.backgroundImage = "linear-gradient("+ deg + "deg, purple, green)";
          innerbox.style.zIndex = -1;
          outerbox.style.backgroundColor = "red";
            clearInterval(id);
        } else {
            innerbox.style.backgroundImage = "linear-gradient("+ deg + "deg, purple, yellow)";
            innerbox.style.zIndex = -1;

            loop++;
        }
    }
}

/*
function getRandomGradient() {
    return 'linear-gradient('+ loop +'deg, '+getRandomColor()+' 0%, '+getRandomColor()+' 100%)';
}

function ballDrop {
  var ball = document.getElementById("ball");
  
  clearInterval(id);


}

var id = null;
function myMove() {
  var elem = document.getElementById("myAnimation");   
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}
*/
