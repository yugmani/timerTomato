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
var isPaused = false;
var seconds;

function startTimer() {
  isPaused = false;
  clearInterval(myVar);
  stopButton.classList.remove("active");
  pauseButton.classList.remove("active");
  playButton.classList.add("active");

  // Write code to start the timer here
  interval = workMinutesInput.value;
  if (interval <= 0){
    alert("Not valid");
    return;
  }
  else {
    seconds = 60;
    myVar = setInterval( myTimer, 1000);
  }
 }
    

 function myTimer() {
    if (isPaused === false ){
    // interval -= 1;
    seconds -= 1;

    if ( (interval <= 0) && (seconds <= 0 ) ){
      
      restTimer();
      clearinterval(myVar);
    }
    else if (seconds <= 0) {
        seconds = 60;
        interval -= 1;
      } 

    secondsDisplay.innerHTML = seconds;
    minutesDisplay.innerHTML = interval- 1;
    }
    else return;
 }


function pauseTimer() {
  if (!isPaused){
    isPaused = true;
  }
  else {
    isPaused = false;
  }
  playButton.classList.remove("active");
  stopButton.classList.remove("active");
  pauseButton.classList.toggle("active");
}

function stopTimer(){
  clearInterval(myVar);
  seconds = 0;
  interval = 0;
  stopButton.setAttribute("class", "active");
  playButton.classList.remove("active");
  pauseButton.classList.remove("active");
}


function restTimer() {
  restInterval = 5;
  restSeconds = 60;

  var restVar = setInterval(restTimer, 1000);
}

function restTimer() {
  if (isPaused === false ){
  // interval -= 1;
  restSeconds -= 1;

  if ( (restInterval <= 0) && (restSeconds <= 0 ) ){
    clearintervalerval(restVar);
    pauseTimer();
  }
  else if (restSeconds <= 0) {
      restSeconds = 60;
      restInterval -= 1;
    } 

  secondsDisplay.innerHTML = restSeconds;
  minutesDisplay.innerHTML = restInterval- 1;
  }
  else return;
}

playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);