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
//! click start game
function startGame(){
  setTimeout(function(){
    location.href = "game.html";
  }, 1000)
}

//! -------------------------- Show high Score ----------------

const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map(score => {
  return `<li class="high-score">${score.urName} - ${score.urScore}</li>`
}).join('');
