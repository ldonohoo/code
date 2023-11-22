function ballDrop() {

    var body = document.getElementsByTagName("body");
    var ball = document.getElementById("ball");
    /*
    var photo = document.getElementById("photo");
    var name = document.getElementById("name");
    */
    var offset = 0;
    var initPos = 70;
    var currPos = 70;
    var dropPoint = 30;
    /*
    var dropLength = photo.offsetHeight;
    console.log(dropLength);
  */
    clearInterval(ballMovement);
    var ballMovement = setInterval(moveBall, 15);
  
    function moveBall() {
        if ( currPos <= dropPoint) {
          clearInterval(ballMovement);
          ball.style.backgroundColor = "orange";
        } else {
          offset++;
          curPos = initPos - offset; 
          name.innerHTML = loop;
          ball.style.right = curPos + "%";
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
  