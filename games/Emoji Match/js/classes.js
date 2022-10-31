class Emoji {
  constructor(x, y) {
    this.pos = { x, y };
    this.dim = { w: 25, h: 25 };
    this.emoji = emojisIcons[Math.floor(Math.random() * emojisIcons.length)];
    this.mouseIn = false;
    this.moving = true;
  }
  update() {
    c.fillStyle = this.emoji;
    c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
    let collisionWithStuff = false;
    emojis.forEach(emoji => {
      let collisionWithEmoji = collision(emoji, this);
      if (collisionWithEmoji) {
        collisionWithStuff = true;
      }
    });
    if (!collision(bottom, this) && !collisionWithStuff) {
      this.pos.y += gravity;
      this.moving = true;
    } else
      this.moving = false;
  }
}

class CanvasRect {
  constructor(x, y, width, height) {
    this.pos = { x, y };
    this.dim = { w: width, h: height };
  }
  update() {
    c.fillStyle = 'black';
    c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
  }
}