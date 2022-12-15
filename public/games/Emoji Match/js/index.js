const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
var frameNo = 0;

const gravity = 1.5;
var emojis = [];
var emojisIcons = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var mouseX = 0;
var mouseY = 0;
var lastClicked = {
  elements: [],
  color: undefined
};

c.fillStyle = 'lightblue';
c.fillRect(0, 0, canvas.width, canvas.height);

window.addEventListener('mousemove', mouse, false);

window.addEventListener('click', () => {
  emojis.forEach((emoji, i) => {
    if (emoji.mouseIn) {
      if (lastClicked.elements.length == 0) {
        lastClicked.elements.push({ emoji, i });
        lastClicked.color = emoji.emoji;
      } else if (lastClicked.color == emoji.emoji) {
        if (lastClicked.elements.length >= 2) {
          lastClicked.elements.forEach(element => {
            emojis[element.i] = new Emoji(1000, 1000);
          });
          emojis[i] = new Emoji(1000, 1000);
          lastClicked.elements = [];
          // emojis.splice(lastClicked.i, 1);
        } else
          lastClicked.elements.push({ emoji, i });
        // emojis.splice(i, 1);
        // emojis.splice(lastClicked.i, 1);
      }
      canvas.style.cursor = 'default';
      // lastClicked.emoji = emoji;
      // lastClicked.i = i;
    }
  });
});

for (let b = 0; b < 8; b++) {
  for (let a = 0; a < 10; a++) {
    emojis.push(new Emoji((a * (25 + 5)) + 100, b * -27))
  }
}
var bottom = new CanvasRect(100, 500, 295, 20);