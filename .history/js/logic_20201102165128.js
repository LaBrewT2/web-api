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
  var startScreenEl = document.querySelector("#start-screen");
  startScreenEl.setAttribute("class", "hide");
  // un-hide questions section
  questionsEl.setAttribute("class", "show");
  // start timer
  timerId = setInterval(clockTick, 1000);
  // show starting time
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex].title;
  // update title with current question
  let questionTitleElement = document.querySelector("#question-title");
  questionTitleElement.innerHTML = currentQuestion;
  questionsEl.setAttribute('class', 'show');
  choicesEl.setAttribute('class', 'choices show');
  // clear out any old question choices
  choicesEl.innerHTML = " ";
  // loop over choices
  // create new button for each choice
  // attach click event listener to each choice
  // display on the page
  for (const choices of questions[currentQuestionIndex].choices) {
    var button = document.createElement('button');
    button.setAttribute('class', "button");
    button.innerHTML = choices;
    document.querySelector("#choices").append(button);
  }
  document.querySelector('#choices').addEventListener('click', function (event) {
    event.stopPropagation()
    questionClick(event.target.innerHTML);
  })
}

function questionClick() {
  // check if user guessed wrong
  if (answer !== questions[currentQuestionIndex].answer) {
  // penalize time
  time -= 10;
  if (time < 0) {
    time = 0;
  }
  // display new time on page
  timerEl.textContent = time;
  // play "wrong" sound effect
  sfxWrong.play();
  feedbackEl.textContent = "WRONG!";
  // else
} else {
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
    quizEnd();
  // quizEnd
  // else
} else {
  // getQuestion
  
  
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  // show end screen
  // show final score
  // hide questions section
}

function clockTick() {
  // update time
  // check if user ran out of time
}

function saveHighscore() {
  // get value of input box
  // make sure value wasn't empty
  // get saved scores from localstorage, or if not any, set to empty array
  // format new score object for current user
  // save to localstorage
  // redirect to next page
}

function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
