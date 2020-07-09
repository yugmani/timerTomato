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
var status = "Working";
var interval;

getTimePreferences();

// Minutes Formatting
function getFormattedMinutes() {
  //
  var secondsLeft = totalSeconds - secondsElapsed;

  var minutesLeft = Math.floor(secondsLeft / 60);

  var formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}

// Seconds Formatting
function getFormattedSeconds() {
  var secondsLeft = (totalSeconds - secondsElapsed) % 60;

  var formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}


function startTimer() {

  // Write code to start the timer here
  interval = setInterval(function(){
    secondsElapsed++;
    renderTime();
  }, 1000);

}


function setTime() {
  var minutes;

  if (status === "Working") {
    minutes = workMinutesInput.value.trim();
  } else {
    minutes = restMinutesInput.value.trim();
  }

  clearInterval(interval);
  totalSeconds = minutes * 60;
}
    
function renderTime() {
  // When renderTime is called it sets the textContent for the timer html...
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

 // ..and then checks to see if the time has run out
  if (secondsElapsed >= totalSeconds) {
    if (status === "Working") {
      alert("Time for a break!");
    } else {
      alert("Time to get back to work!");
    }

    stopTimer();
  }
}
 

function pauseTimer() {
  clearInterval(interval);
  renderTime();
}

function stopTimer(){
  secondsElapsed = 0;
  setTime();
  renderTime();
}


function toggleStatus(event) {
  var checked = event.target.checked;

  if (checked) {
    status = "Working";
  } else {
    status = "Resting";
  }

  statusSpan.textContent = status;

  secondsElapsed = 0;
  setTime();
  renderTime();
}



function getTimePreferences() {
  /* Here we check to see if any preferences have 
     been set in the local storage via "setTimePreferences()" */
  var preferences = JSON.parse(localStorage.getItem("preferences"));

  /* "setTimePreferences()" is actually never called so the below code will never run 
     (ie. the "preferences" variable checked below will always be null.
     The settings are always set by directly checking the input elements in the setTime() function) */
  if (preferences) {
    if (preferences.workMinutes) {
      workMinutesInput.value = preferences.workMinutes;
    }

    if (preferences.restMinutes) {
      restMinutesInput.value = preferences.restMinutes;
    }
  }

  //This is where the app is really kicked-off, setTime and renderTime are the two main routines.
  setTime();
  renderTime();
}


//This function is defined but never used.
function setTimePreferences() {
  localStorage.setItem(
    "preferences",
    JSON.stringify({
      workMinutes: workMinutesInput.value.trim(),
      restMinutes: restMinutesInput.value.trim()
    })
  );
}

playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);