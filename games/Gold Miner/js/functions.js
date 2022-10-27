function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  };
}

function mouse(e) {
  var pos = getMousePos(canvas, e);
  mouseX = pos.x;
  mouseY = pos.y;
}

function insideElement(element) {
  return ((mouseX > element.pos.x) && (mouseX < element.dim.w + element.pos.x)) && (mouseY > element.pos.y) && (mouseY < element.dim.h + element.pos.y);
}

function collision(element, element1) {
  var myleft = element1.pos.x;
  var myright = element1.pos.x + (element1.dim.w);
  var mytop = element1.pos.y;
  var mybottom = element1.pos.y + (element1.dim.h);
  var otherleft = element.pos.x;
  var otherright = element.pos.x + (element.dim.w);
  var othertop = element.pos.y;
  var otherbottom = element.pos.y + (element.dim.h);
  var crash = true;
  if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
    crash = false;
  }
  return crash;
}

function mineClick(mine) {
  if (mine.collectButton.mouseIn) {
    money += mine.money;
    mine.money = 0;
  } else if (mine.menuClose.mouseIn) {
    mine.menu = false;
  } else if (mine.upgradeButton.mouseIn) {
    if (money >= 100) {
      mine.level++;
      money -= 100;
    }
  } else if (mine.mouseIn) {
    mine.menu = true;
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

function playerController(player) {
  miner.velocity.x = 0;
  miner.velocity.y = 0;
  if (keys && keys.w)
    player.velocity.y = -player.speed;
  if (keys && keys.s)
    player.velocity.y = player.speed;
  if (keys && keys.a)
    player.velocity.x = -player.speed;
  if (keys && keys.d)
    player.velocity.x = player.speed;
}

function newOre() {
  var maxPosX = canvas.width - 100,
    minPosX = 100,
    maxPosY = 100,
    minPosY = canvas.height - 100;
  var x = Math.floor(Math.random() * (maxPosX - minPosX + 1) + minPosX),
    y = Math.floor(Math.random() * (maxPosY - minPosY + 1) + minPosY);
  ores.push(new CanvasElement(x, y, 10, 10, 'gold'));
}

/**
 * Timings function
 * @param {*} n The interval
 */
function everyInterval(n = 1) {
  if ((frameNo / n) % 1 == 0) { return true; }
  return false;
}