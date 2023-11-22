
/*

function ballDrop() {

  var body = document.getElementsByTagName("body");
  var ball = document.getElementById("ball");
  
  var photo = document.getElementById("photo");
  var name = document.getElementById("name");

  var initPos = 0;
  var finalPos = 0;
  var currPos = 0;
  var bounceNo = null;
  const rampUpDistance = 10;

 

  
  var dropLength = photo.offsetHeight;
  console.log(dropLength);
  
 
  clearInterval(ballMovement);
  var ballMovement = setInterval(moveBall(70, 60, "rampUp", "horizontal"), 100);

  function moveBall(initPos, finalPos, moveType, moveDirection) {
      var percentMoved = Math.abs(initPos-currPos) / Math.abs(initPos-finalPos);
      (moveDirection == horizontal) ? direction = "left" : direction = "top";
      if (percentMoved < 1.00 || bounceNo < 5) {
        clearInterval(ballMovement);
        bounceNo = 0;
      } else {
        if (moveType == "rampUp") {
            currPos = currPos + rampUpIncrease(percentMoved);    
            ball.style.direction = currPos + "%"; 
          } else if (moveType == "roll") {
            currPos+= .25;
            ball.style.direction = currPos + "%"; 
          } else if (moveType == "bounce") {
            (bounceNo == null) ? bounceNo = 0;
            currPos = currPos + bounceIncrease(percentMoved, bounceNo);
            bounceNo++;
        }
      }
      
      function rampUpIncrease(percentMoved) {
        return (0.07)* ((1 + .2) ** percentMoved);
      }
      
      function bounceIncrease(percentMoved, bounceNo) {
          if (percentMoved >= 1.00) {
            bounceNo++;
          }
          switch (bounceNo) {
              case (0) {
                return 0.25;
                break;
              }
              case (1) {
                return -(0.07* ((1 +.2) ** percentMoved));
                break;
              }
          }
          if (bounceNo == 0) {  }
          if (b)
   


            return (0.07* ((1 + .2) ** percentMoved));
        
            }
          }
      }



 
      } else if ((bounce) &&  (distanceMoved >= bounceDistance)) {
         currPos = currPos + bounceIncrease(percentMoved, bounceDistance, bounceNo);    
         ball.style.left = currPos + "%"; 


      }

    
      }
      switch (true) {
        case (currPos >= startSlowPeriod) :
            offset = rampUpSpeed(offset, startPos, rampUpDistance);    
            currPos = initPos - offset; 
            ball.style.left = currPos + "%";
        break;
        case (currPos <= dropPoint):
          clearInterval(ballMovement);
          ball.style.backgroundColor = "orange";
          break;
      }
  }
  
}

*/
