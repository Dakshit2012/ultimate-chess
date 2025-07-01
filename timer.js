let whiteTime = 300;  // default 5 minutes
let blackTime = 300;
let increment = 0;
let currentTimer = null;

function setMode(mode) {
  switch (mode) {
    case "bullet": whiteTime = blackTime = 60; increment = 0; break;
    case "blitz":  whiteTime = blackTime = 180; increment = 0; break;
    case "blitz5": whiteTime = blackTime = 300; increment = 0; break;
    case "rapid":  whiteTime = blackTime = 600; increment = 0; break;
    case "rapidInc": whiteTime = blackTime = 900; increment = 10; break;
    case "classical": whiteTime = blackTime = 1800; increment = 0; break;
    case "classicalInc": whiteTime = blackTime = 3600; increment = 30; break;
  }
  updateClock("white", whiteTime);
  updateClock("black", blackTime);
}

function startClock() {
  if (currentTimer) clearInterval(currentTimer);
  currentTimer = setInterval(() => {
    const turn = game.turn();
    if (turn === 'w') {
      whiteTime--;
      roomRef.child("white").set(whiteTime);
      if (whiteTime <= 0) endGame("Black wins on time!");
    } else {
      blackTime--;
      roomRef.child("black").set(blackTime);
      if (blackTime <= 0) endGame("White wins on time!");
    }
  }, 1000);
}

function updateClock(color, seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  document.getElementById(color + "Clock").textContent = `${min}:${sec}`;
}

function decrementClock(playerColor) {
  if (playerColor === 'w') {
    whiteTime += increment;
    roomRef.child("white").set(whiteTime);
  } else {
    blackTime += increment;
    roomRef.child("black").set(blackTime);
  }
}

function endGame(message) {
  alert(message);
  clearInterval(currentTimer);
  updateStatus("Game over");
}
