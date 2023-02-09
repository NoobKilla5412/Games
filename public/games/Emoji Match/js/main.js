function main() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = 'lightblue';
  c.fillRect(0, 0, canvas.width, canvas.height);
  frameNo++;
  bottom.update();
  emojis.forEach(emoji => {
    emoji.update();
    if (insideElement(emoji) && !emoji.moving) {
      canvas.style.cursor = 'pointer';
      emoji.mouseIn = true;
    } else {
      canvas.style.cursor = 'default';
      emoji.mouseIn = false;
    }
  });
}