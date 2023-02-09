/**
 * Player class
 */
class Player {
  /**
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   */
  constructor(x, y) {
    this.speed = 2;
    this.pos = {
      x,
      y
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.dim = {
      w: 50,
      h: 100
    }
    this.cost = 100;
    this.speedCost = 100;
    this.level = 1;
    this.speedLvl = 1;
    this.total = 0;
    this.menu = false;
    this.menuObj = new CanvasElement(80, 200, 200, 100, 'white');
    this.menuButton = new CanvasElement(0, 35, 30, 30, 'green', 'image', 'image/up.svg');
    this.upgradeButton = new CanvasElement(90, 210, 30, 30, 'green', 'image', 'image/up.svg');
    this.upgradeSpeedButton = new CanvasElement(130, 210, 30, 30, 'green', 'image', 'image/up.svg');
    this.menuClose = new CanvasElement(260, 210, 10, 10, 'red', 'image', 'image/close.svg');
    this.levelText = new CanvasText(170, 240, 15, 'black', 'LVL: ' + this.level);
    this.upgradeCostText = new CanvasText(90, 290, 15, 'black', '$' + toValues(Math.round(this.cost)));
  }
  /**
   * Draw the player
   */
  draw() {
    c.fillStyle = 'blue';
    c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
    this.upgradeCostText.content = '$' + toValues(Math.round(this.cost));
    this.levelText.content = 'LVL: ' + toValues(this.level);
  }
  /**
   * Update the player
   */
  update() {
    this.draw();
    this.pos.y += this.velocity.y;
    this.pos.x += this.velocity.x;
  }
}
/**
 * Draw text to the canvas
 */
class CanvasText {
  /**
   * Draw text to the canvas
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   * @param {*} size The font-size in px
   * @param {*} color The font-color
   * @param {*} content The value of the text
   */
  constructor(x, y, size, color, content) {
    this.pos = {
      x,
      y
    }
    this.dim = {
      w: c.measureText(content).width
    }
    this.content = content
    this.color = color
    this.size = size
  }

  draw() {
    c.fillStyle = this.color
    c.font = this.size + 'px Arial';
    c.fillText(this.content, this.pos.x, this.pos.y);
  }
}
/**
 * Generic rectangle
 */
class CanvasElement {
  /**
   * 
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   * @param {*} width The width of the element
   * @param {*} height The height of the element
   * @param {*} color The color of the element
   * @param {*} type The type
   * @param {*} imageSrc The link to the image
   */
  constructor(x, y, width, height, color = 'black', type = 'rect', imageSrc = '') {
    this.pos = {
      x,
      y
    };
    this.dim = {
      w: width,
      h: height
    };
    this.color = color;
    this.mouseIn = false;
    this.image = createImage(imageSrc);
    this.type = type;
  }

  draw() {
    if (this.type == 'rect') {
      c.fillStyle = this.color;
      c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h);
    } else if (this.type == 'image') {
      c.drawImage(this.image, this.pos.x, this.pos.y, this.dim.w, this.dim.h);
    }
  }

  update() {
    this.draw();
  }
}