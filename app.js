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


