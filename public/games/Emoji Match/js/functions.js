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

function startGame() {
  setInterval(main, 10);
}

function collision(element, element1) {
  if (element == element1)
    return false;
  var myleft = element1.pos.x;
  var myright = element1.pos.x + (element1.dim.w);
  var mytop = element1.pos.y;
  var mybottom = element1.pos.y + (element1.dim.h);
  var otherleft = element.pos.x;
  var otherright = element.pos.x + (element.dim.w);
  var othertop = element.pos.y;
  var otherbottom = element.pos.y + (element.dim.h);
  if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
    return false;
  } else
    return true;
}