// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  document.getElementById("start-screen").style.display = "none";
  // un-hide questions section
  document.getElementById("questions").style.display = "block";
  // start timer
  timerId = setInterval(clockTick, 1000);
  // show starting time
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var question = questions[currentQuestionIndex];
  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = question.title;
  // clear out any old question choices
  choicesEl.innerHTML = " ";
  // loop over choices
  for (var i = 0; i < question.choices.length; i++) {
  // create new button for each choice
  var answerButton = document.createElement("button");
    answerButton.innerText = question.choices[i];
    answerButton.setAttribute('value', question.choices[i]);
    answerButton.onclick = questionClick
    choicesEl.appendChild(answerButton);
  // attach click event listener to each choice
  // display on the page
  };
};

function questionClick() {
  // check if user guessed wrong
  if (answer !== questions[currentQuestionIndex].answer) {
  // penalize time
  time -= time -10;
  
  // display new time on page
  timerEl.textContent = time;
  // play "wrong" sound effect
  sfxWrong.play();
  feedbackEl.textContent = "WRONG!";
}
  // else
else {
  // play "right" sound effect
  sfxRight.play();
    feedbackEl.textContent = "CORRECT!";
  }
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
  // quizEnd
  quizEnd();
  }
  // else
 else {
  // getQuestion
    getQuestion();
  }
};

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;
  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input 
  var initials = initialsEl.value.trim();
  // make sure value wasn't empty
  if (initials !== " ") {
  // get saved scores from localstorage, or if not any, set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  // format new score object for current user
  var newScore = {
    score: time,
    initials: initials
  };
  // save to localstorage
  window.localStorage.setItem("highscores", JSON.stringify(newScore.score));
  // redirect to next page
  window.location.href = "highscores.html";
}
}

function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
  if (event.key === "enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
