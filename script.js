var statusSpan = document.querySelector("#status");
var statusToggle = document.querySelector("#status-toggle");
var playButton = document.querySelector("#play");
var pauseButton = document.querySelector("#pause");
var stopButton = document.querySelector("#stop");
var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");
var workMinutesInput = document.querySelector("#work-minutes");
var restMinutesInput = document.querySelector("#rest-minutes");

var totalSeconds = 0;
var secondsElapsed = 0;
var interval;
var myVar;

function startTimer() {
  // Write code to start the timer here
  var totalMinutes = workMinutesInput.value;
  if (totalMinutes <= 0){
    alert("Not valid");
    return;
  }
  var seconds = 60;
  myVar = setInterval(myTimer, 1000);

  function myTimer() {
    // totalMinutes -= 1;
    seconds -= 1;
    
      if ( (totalMinutes <= 0) && (seconds <= 0 ) ){
        clearInterval(myVar);
        pauseTimer();
      }
       else if (seconds <= 0) {
          seconds = 60;
          totalMinutes -= 1;
        } 
      
      secondsDisplay.innerHTML = seconds;
      minutesDisplay.innerHTML = totalMinutes;
      }
 }
    
function pauseTimer() {
    clearInterval(myVar);
}

function stopTimer(){
    window.stop();
}

// startTimer();
playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);