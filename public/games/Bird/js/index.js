var version = 1.6;
var changes = {
  1.4: {
    content: "Make the obstacles thicker"
  },
  1.5: {
    content: "Fix bugs"
  },
  1.6: {
    content: "Fix bugs"
  }
};
var changeLogTop = "<br>";
for (const key in changes) {
  if (Object.hasOwnProperty.call(changes, key)) {
    const value = changes[key];
    changeLogTop += `v${key}: ${value.content}<br>`;
  }
}
// let version += " Beta";
// let version += " Alpha";
// Declaring the variables
var myGamePiece;
var myObstacles = [];
var myScore;
var scores = { mouse: 0, arrows: 0 };
var isPaused = false;
var pauseGame;
var lengthOfGap = 150;
var maxLengthOfHole = 100;
var minLengthOfHole = 200;
var oBSSpeed = -1.3;
var controlMethod = 0;
var highScore = 0;
var blockSpeed = 1.5; // Speed for arrow use only
var score = 0;
/**
 * Start the game using the mouse
 */
function startGame() {
  myGamePiece = new Component(30, 30, "red", 50, 120); // Spawn the player
  myScore = new Component("30px", "Consolas", "black", 280, 40, "text"); // Score
  winScore = new Component("30px", "Consolas", "black", 450, 200, "text");
  if (!localStorage.getItem("Bird")) {
    localStorage.setItem("Bird", JSON.stringify(scores));
    scores = JSON.parse(localStorage.getItem("Bird"));
  } else {
    scores = JSON.parse(localStorage.getItem("Bird"));
    highScore = parseInt(scores.mouse);
  }
  myGameArea.start();
  document.getElementById("start").style.display = "none";
  document.getElementById("controls").style.display = "none";
}
/**
 * Start the game using arrows
 */
function useArrows() {
  controlMethod = 1;
  myGamePiece = new Component(30, 30, "red", 50, 120); // Spawn the player
  myScore = new Component("30px", "Consolas", "black", 280, 40, "text"); // Score
  winScore = new Component("30px", "Consolas", "black", 450, 200, "text");
  if (!localStorage.getItem("Bird")) {
    localStorage.setItem("Bird", JSON.stringify(scores));
    scores = JSON.parse(localStorage.getItem("Bird"));
  } else {
    scores = JSON.parse(localStorage.getItem("Bird"));
    highScore = parseInt(scores.arrows);
  }
  myGameArea.start();
  document.getElementById("start").style.display = "none";
  document.getElementById("controls").style.display = "none";
}
/**
 * The game canvas
 */
var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 1000;
    this.canvas.height = 400;
    /**
     * hide the original cursor
     */
    if (controlMethod === 0) {
      this.canvas.style.cursor = "none";
    }
    this.canvas.id = "gameScreen";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea);
    window.addEventListener("keydown", function (e) {
      myGameArea.keys = myGameArea.keys || [];
      myGameArea.keys[e.keyCode] = true;
    });
    window.addEventListener("keyup", function (e) {
      myGameArea.keys[e.keyCode] = false;
    });
    window.addEventListener("mousemove", function (e) {
      myGameArea.x = e.pageX;
      myGameArea.y = e.pageY;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    /**
     * Show the original cursor
     */
    if (controlMethod == 0) {
      this.canvas.style.cursor = "default";
    }
    /**
     * Try to set the highScore var
     */
    if (controlMethod === 0) {
      if (score > parseInt(JSON.parse(localStorage.getItem("Bird")).mouse)) {
        scores = JSON.parse(localStorage.getItem("Bird"));
        scores.mouse = score;
        localStorage.setItem("Bird", JSON.stringify(scores));
      }
    } else {
      if (score > parseInt(JSON.parse(localStorage.getItem("Bird")).arrows)) {
        scores = JSON.parse(localStorage.getItem("Bird"));
        scores.arrows = score;
        localStorage.setItem("Bird", JSON.stringify(scores));
      }
    }
    /**
     * Stop the game
     */
    clearInterval(this.interval);
  }
};

class Component {
  constructor(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.color = color;
  }
  /**
   * Update ``this``
   */
  update() {
    let ctx = myGameArea.context;
    // console.log("this.y + this.height: ", this.y + this.height);

    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = this.color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      if (
        this.x >= 0 &&
        this.x + this.width <= myGameArea.canvas.width &&
        this.y >= 0 &&
        this.y + this.height <= myGameArea.canvas.height
      ) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }
  /**
   * Make ``this`` move
   */
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.hitRight();
    this.hitLeft();
  }
  /**
   * Check if ``this`` hits the right wall
   */
  hitRight() {
    if (this.x > myGameArea.canvas.width - this.width) {
      this.x = myGameArea.canvas.width - this.width;
    }
  }
  /**
   * check if ``this`` hits the left wall
   */
  hitLeft() {
    if (myGamePiece.x < 0) {
      this.x = 0;
    }
  }
  /**
   * check if ``this`` hits an obstacle
   * @param {object} otherobj The object to check
   * @returns true if hit; false if not
   */
  crashWith(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false;
    }
    return crash;
  }
}
/**
 * a function to update the game area
 * @returns void
 */
function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  /**
   * check if you have ran into an obstacle
   */
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      return;
    }
  }
  /**
   * clear the canvas
   */
  myGameArea.clear();
  /**
   * make it harder each level
   */
  if (everyInterval(lengthOfGap * 10)) {
    oBSSpeed -= 0.1;
    lengthOfGap -= 10;
  }
  if (lengthOfGap < 10) {
    lengthOfGap = 10;
  }
  /**
   * Generate the obstacles
   */
  if (everyInterval(lengthOfGap)) {
    x = myGameArea.canvas.width;
    minHeight = 100;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = minLengthOfHole;
    maxGap = maxLengthOfHole;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new Component(15, height, "green", x, 0));
    myObstacles.push(
      new Component(
        15,
        x - height - gap > myGameArea.canvas.height
          ? myGameArea.canvas.height - (height + gap)
          : x - height - gap,
        "green",
        x,
        height + gap
      )
    );
    score++;
    //myObstacles.push(new Component(10, 201, "green", x, 0));
    //myObstacles.push(new Component(10, x - height, "green", x, height));
  }
  myObstacles.forEach((obs, i) => {
    if (obs.x + obs.width + obs.speedX < 0) {
      myObstacles.splice(i, 1);
      console.log("myObstacles: ", myObstacles);
    }
  });
  //myScore.text = "SCORE: " + Math.floor(myGameArea.frameNo/100);// + ", OBSTACLES: " + myObstacles.length / 2;
  //myScore.text = "OBSTACLES: " + myObstacles.length / 2;
  myGamePiece.speedX = 0; // reset the player's X speed
  myGamePiece.speedY = 0; // reset the player's Y speed
  if (controlMethod === 1 && !isPaused) {
    // if using arrows and not paused
    if (myGameArea.keys && myGameArea.keys[37]) {
      // Up arrow
      myGamePiece.speedX = -blockSpeed; // Left
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
      // Right arrow
      myGamePiece.speedX = blockSpeed; // Right
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
      // Up arrow
      myGamePiece.speedY = -blockSpeed; // Up
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
      // Down arrow
      myGamePiece.speedY = blockSpeed; // Down
    }
    /**
     * if using mouse and not paused
     */
  } else if (!isPaused) {
    if (myGameArea.x && myGameArea.y) {
      myGamePiece.x = myGameArea.x;
      myGamePiece.y = myGameArea.y;
    }
  }
  /**
   * check if ` is pressed
   */
  if (myGameArea.keys && myGameArea.keys[192]) {
    if (!isPaused) {
      pauseGame = true; // pause the game
      isPaused = true;
    }
  }
  /**
   * check if 1 is pressed
   */
  if (myGameArea.keys && myGameArea.keys[49]) {
    if (isPaused) {
      pauseGame = false; // unpause the game
      isPaused = false;
    }
  }
  /**
   * pause the game
   */
  if (pauseGame) {
    for (i = 0; i < myObstacles.length; i += 1) {
      myObstacles[i].speedX = 0;
      myObstacles[i].newPos();
      myObstacles[i].update();
    }
  } else {
    // normal game
    for (i = 0; i < myObstacles.length; i += 1) {
      myObstacles[i].speedX = oBSSpeed;
      myObstacles[i].newPos();
      myObstacles[i].update();
    }
    myGameArea.frameNo += 1; // count the frames
    myGamePiece.newPos(); // move the player
  }
  myGamePiece.update(); // redraw the player
  // see if you have won:
  if (controlMethod == 0 && score >= 100) {
    winScore.text = "You Win! :D";
    myGameArea.clear();
    winScore.update();
    myGameArea.stop();
  } else {
    // normal
    // update the text of the scoreboard:
    myScore.text =
      "SCORE: " + score + " LEVEL: " + (Math.trunc(score / 10) + 1) + " HIGH SCORE: " + highScore;
    // document.getElementById('speed').innerHTML = "Speed: " + Math.round(10 * oBSSpeed) / 10;
    myScore.update(); // update the scoreboard
  }
  // win if using the arrows:
  if (controlMethod == 1 && score >= 80) {
    winScore.text = "You Win! :D";
    myGameArea.clear();
    winScore.update();
    myGameArea.stop();
  } else {
    // normal
    // update the text of the scoreboard:
    myScore.text =
      "SCORE: " + score + " LEVEL: " + (Math.trunc(score / 10) + 1) + " HIGH SCORE: " + highScore;
    myScore.update(); // update the scoreboard
  }
}

function everyInterval(n) {
  // timings function
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}
