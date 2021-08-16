/**
 *      Animation button
 */
 var animateButton = function (e) {
  e.preventDefault;
  //reset animation
  e.target.classList.remove("animate");

  e.target.classList.add("animate");
  setTimeout(function () {
    e.target.classList.remove("animate");
  }, 700);
};
var bubblyButtons = document.getElementsByClassName("bubbly-button");
for (var i = 0; i < bubblyButtons.length; i++) {
  bubblyButtons[i].addEventListener("click", animateButton, false);
}
/**
 *      Game
 */

const questionElement = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const choicesContainer = document.querySelectorAll(".choice-container")
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const answerContainer = document.querySelector("#answers-container");
const yourScore = document.getElementById('yourScore');
const gamePage = document.getElementById('game');
const endGamePage = document.querySelector('.end-page');

const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer: [
      {text: "&lt;javascript&gt;", correct: false},
      {text: "&lt;js&gt;", correct: false},
      {text: "&lt;javascript&gt;", correct: false},
      {text: "&lt;script&gt;", correct: true},
    ]
  },
  {
    question: "Where is the correct place to insert a JavaScript?",
    answer: [
      {text: "The &lt;head&gt; section", correct: false},
      {text: "The &lt;body&gt; section", correct: false},
      {text: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct", correct: true},
      {text: "Everywhere in file HTML", correct: false},
    ]
  },
  {
    question: 'What is the correct JavaScript syntax to change the content of the HTML element below? \n <p id="demo">This is a demonstration.</p>',
    answer: [
      {text: 'document.getElement("p").innerHTML = "HelloWorld!";', correct: false},
      {text: 'document.getElementById("demo").innerHTML ="Hello World!";', correct: true},
      {text: '#demo.innerHTML = "Hello World!";', correct: false},
      {text: 'document.getElementByName("p").innerHTML = "Hello World!";', correct: false},
    ],
  },
  {
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    answer: [
      {text: '&lt;script href="xxx.js"&gt;', correct: false},
      {text: '&lt;script ref="xxx.js"&gt;', correct: false},
      {text: '&lt;script name="xxx.js"&gt;', correct: false},
      {text: '&lt;script src="xxx.js"&gt;', correct: true},
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answer: [
      {text: ' msg("Hello World");', correct: false},
      {text: ' msgBox("Hello World");', correct: false},
      {text: ' alertBox("Hello World");', correct: false},
      {text: ' alert("Hello World");', correct: true},
    ]
  },
  {
    question: "How do you create a function in JavaScript?",
    answer: [
      {text: "function:myFunction()", correct: false},
      {text: "function myFunction()", correct: true},
      {text: "function = myFunction()", correct: false},
      {text: "&lt;script&gt;", correct: false},
    ]
  },
  {
    question: 'How do you call a function named "myFunction"?',
    answer: [
      {text: " call function myFunction()", correct: false},
      {text: "&lt;script&gt;", correct: false},
      {text: " call myFunction()", correct: false},
      {text: " myFunction()", correct: true},
    ]
  },
  {
    question: "How to write an IF statement in JavaScript?",
    answer: [
      {text: "if (i == 5)", correct: true},
      {text: "if i = 5", correct: false},
      {text: "if i = 5 then", correct: false},
      {text: "if i == 5 then", correct: false},
    ]
  },
  {
    question:'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
      answer: [
        {text: "if i=! 5 then", correct: false},
        {text: "if i <> 5", correct: false},
        {text: "if (i <> 5)", correct: false},
        {text: "if (i != 5)", correct: true},
      ]
  },
  {
    question: "How does a FOR loop start?",
    answer: [
      {text: "for (i = 0; i <= 5)", correct: false},
      {text: "for i = 1 to 5", correct: false},
      {text: "for (i <= 5; i++)", correct: false},
      {text: "for (i = 0; i <= 5; i++)", correct: true},
    ]
  },
];

let shuffledQuestions;
let currentQuestionIndex = 0;
let score = 0;
let amountQuestions = questions.length;
let checkScore;

window.addEventListener('DOMContentLoaded', function(){
  startGame();
})

function startGame(){
  score = 0;
  shuffledQuestions = questions.sort(() => Math.random - 0.5);
  setNextQuestion(); 
}
function setNextQuestion(){
  if(currentQuestionIndex < questions.length){
    printQuestion(currentQuestionIndex);
    printProgressBar(currentQuestionIndex);
    printScore(currentQuestionIndex, checkScore);
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else{
    printScore(currentQuestionIndex, checkScore);
    endGame();
  }
}
/** -------------- print --------------------------- */
function printQuestion(currentQuestionIndex){
  progressText.innerHTML = 'Question ' + (currentQuestionIndex + 1) + ' / ' + amountQuestions;
}
function printProgressBar(currentQuestion){
  widthProgress = (currentQuestionIndex + 1) / amountQuestions;
  progressBarFull.style.width = widthProgress * 20 + 'rem';
}
function printScore(currentQuestionIndex, checkScore){
  if(checkScore === true){
    scoreText.innerText = ++score + ' / ' + amountQuestions;
  }
  else{
    scoreText.innerText = score + ' / ' + amountQuestions;
  }
}
/**--------------------------------------------- */
function resetState(){
  while(answerContainer.firstChild){
    answerContainer.removeChild(answerContainer.firstChild)
  }
}
showQuestion = question => {
  questionElement.innerText = question.question;
  question.answer.forEach(answer => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('choice-container');
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerContainer.appendChild(button)
  });
}
function selectAnswer(e){
  const selectBtn = e.target;
  const correct = selectBtn.dataset.correct;
  if(selectBtn.dataset.correct === 'true'){
    setStatusClass(selectBtn, 'true');
  }
  else{
    setStatusClass(selectBtn, 'false');
  }
}
function setStatusClass(element, boolean){
  if(boolean === 'true'){
    element.classList.add('correct');
    checkScore = true;
  }
  else{
    element.classList.add('wrong');
    checkScore = false;
  }
  currentQuestionIndex++;
  setTimeout(setNextQuestion, 800);
}
function endGame(){
  gamePage.classList.add('hide');
  endGamePage.classList.remove('hide');
  yourScore.innerHTML = score + ' / ' + amountQuestions;
  confettiEffect();
}

//! ---------------- Save Game and Storage High Score -------------
const userName = document.querySelector('#name');
const saveScoreBtn = document.querySelector('#saveGame');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

yourScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !userName.value;
})

saveHighScore = e => {
  alert('Your score has been saved')
  e.preventDefault();
  const yourScore = {
    urScore: score,
    urName: userName.value,
  }
  highScores.push(yourScore);
  highScores.sort((a,b) => {
    return b.urScore - a.urScore;
  })

  highScores.splice(10);
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

//! -------------- Click startGame and highScores-----------------
function startGameBtn(){
  setTimeout(function(){
    location.href = "game.html";
  }, 1000)
}

function highScoresLink(){
  setTimeout(function(){
    location.href = "highScores.html";
  }, 1000)
}

//! -----------------Confetti effect----------------
function confettiEffect(){
  var count = 200;
  var defaults = {
    origin: { y: 0.7 }
  };

function fire(particleRatio, opts) {
    confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
    }));
}

fire(0.25, {
    spread: 26,
    startVelocity: 55,
});
fire(0.2, {
    spread: 60,
});
fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
});
fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
});
fire(0.1, {
    spread: 120,
    startVelocity: 45,
});
}