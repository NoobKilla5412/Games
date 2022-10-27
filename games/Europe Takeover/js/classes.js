/**
 * This is for spawning troops.
 */
class Troop {
  constructor(x, y, vx, vy, color) {
    this.speed = 10
    this.pos = {
      x,
      y
    }
    this.velocity = {
      x: vx,
      y: vy
    }
    this.dim = {
      w: 46,
      h: 90
    }
    this.color = color
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h)
  }

  update() {
    this.draw()
    this.pos.y += this.velocity.y
    this.pos.x += this.velocity.x
  }
}
/**
 * Enemies class
 */
class Enemy {
  /**
   * Create enemy
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   * @param {*} vx The x-velocity
   * @param {*} vy The y-velocity
   * @param {*} color The color of the enemy
   */
  constructor(x, y, vx, vy, color) {
    this.speed = 10
    this.pos = {
      x,
      y
    }
    this.velocity = {
      x: vx,
      y: vy
    }
    this.dim = {
      w: 46,
      h: 90
    }
    this.color = color
  }

  draw() {
    c.fillStyle = this.color
    c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h)
  }

  update() {
    this.draw()
    this.pos.y -= this.velocity.y
    this.pos.x += this.velocity.x
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
  constructor(x, y, width, height, color, type = 'rect', imageSrc = '') {
    this.pos = {
      x,
      y
    }
    this.dim = {
      w: width,
      h: height
    }
    this.color = color
    this.mouseIn = false
    this.image = createImage(imageSrc)
    this.type = type
  }

  draw() {
    if (this.type == 'rect') {
      c.fillStyle = this.color
      c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    } else if (this.type == 'image') {
      c.drawImage(this.image, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    }
  }

  update() {
    this.draw()
  }
}

/**
 * Spawn a gold mine
 */
class GoldMine {
  /**
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   * @param {*} name Which gold mine is this?
   */
  constructor(x, y, name) {
    this.pos = {
      x,
      y
    }
    this.dim = {
      w: 50,
      h: 50
    }
    this.type = 'goldMine'
    this.name = name
    this.money = 0
    this.mouseIn = false
    this.color = 'gold'
    this.level = 1
    this.total = 0
    this.cost = 100
    this.rate = (((this.total / 100) + 1) * .05) * 100
    this.menu = false
    this.menuObj = new CanvasElement(80, 200, 200, 100, 'white')
    this.upgradeButton = new CanvasElement(90, 210, 30, 30, 'green', 'image', 'image/up.svg')
    this.collectButton = new CanvasElement(130, 210, 30, 30, 'blue', 'image', 'image/collect.svg')
    // this.menuClose = new CanvasText(260, 210, 15, 'red', 'X')
    this.menuClose = new CanvasElement(260, 210, 10, 10, 'red', 'image', 'image/close.svg')
    this.perSecond = new CanvasText(210, 285, 15, 'black', Math.round(this.rate * 1000) / 1000 + '/sec')
    this.levelText = new CanvasText(170, 240, 15, 'black', 'LVL: ' + this.level)
    this.text = new CanvasText(this.pos.x - 20, this.pos.y - 3, 30, 'black', '$' + toValues(this.money))
    this.upgradeCostText = new CanvasText(90, 290, 15, 'black', '$' + toValues(Math.round(this.cost)))
    this.image = createImage('image/goldMine.png');
  }
  /**
   * Draw the gold mine to the screen
   */
  draw() {
    c.fillStyle = this.color
    // c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    c.drawImage(this.image, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    this.upgradeCostText.content = '$' + toValues(Math.round(this.cost))
    this.perSecond.content = toValues(Math.round(this.rate * 1000) / 1000) + '/sec'
    this.levelText.content = 'LVL: ' + toValues(this.level)
    this.text.content = '$' + toValues(this.money)
    this.rate = (((this.total / 100) + 1) * .05) * 100
    this.text.draw()
  }
}
/**
 * Spawn a gold mine
 */
class GoldStorage {
  /**
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   * @param {*} name Which gold storage is this?
   */
  constructor(x, y, name) {
    this.pos = {
      x,
      y
    }
    this.dim = {
      w: 50,
      h: 50
    }
    this.type = 'goldStorage'
    this.name = name
    this.mouseIn = false
    this.color = 'gold'
    this.level = 1
    this.total = 0
    this.capacity = (((this.total) + 1)) * 100
    this.cost = 100
    this.menu = false
    this.menuObj = new CanvasElement(80, 200, 200, 100, 'white')
    this.upgradeButton = new CanvasElement(90, 210, 30, 30, 'green', 'image', 'image/up.svg')
    // this.menuClose = new CanvasText(260, 210, 15, 'red', 'X')
    this.menuClose = new CanvasElement(260, 210, 10, 10, 'red', 'image', 'image/close.svg')
    this.capacityText = new CanvasText(180, 285, 15, 'black', '/')
    this.levelText = new CanvasText(130, 240, 15, 'black', 'LVL: ' + this.level)
    // this.text = new CanvasText(this.pos.x - 20, this.pos.y - 3, 30, 'black', '$' + toValues(this.money))
    this.upgradeCostText = new CanvasText(90, 290, 15, 'black', '$' + toValues(Math.round(this.cost)))
    this.image = createImage('image/goldStorage.svg');
  }
  /**
   * Draw the gold storage to the screen
   */
  draw() {
    c.fillStyle = this.color
    // c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    c.drawImage(this.image, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    this.upgradeCostText.content = '$' + toValues(Math.round(this.cost))
    this.capacityText.content = toValues(money) + '/' + toValues(this.capacity);
    this.levelText.content = 'LVL: ' + toValues(this.level)
    // this.text.content = '$' + toValues(this.money)
    this.capacity = (((this.total) + 1)) * 100
    // this.text.draw()
  }
}
/**
 * Spawn a barracks
 */
class Barracks {
  /**
   * @param {*} x The x-pos
   * @param {*} y The y-pos
   * @param {*} name Which barracks is this?
   */
  constructor(x, y, name) {
    this.pos = {
      x,
      y
    }
    this.dim = {
      w: 30,
      h: 30
    }
    this.type = 'barracks'
    this.name = name
    this.troops = 0
    this.mouseIn = false
    this.color = 'red'
    this.level = 1
    this.total = 0
    this.cost = 100
    this.rate = 1
    this.menu = false
    this.menuObj = new CanvasElement(80, 200, 200, 100, 'white')
    this.upgradeButton = new CanvasElement(90, 210, 30, 30, 'green', 'image', 'image/up.svg')
    // this.collectButton = new CanvasElement(130, 210, 30, 30, 'blue', 'image', 'image/collect.svg')
    this.menuClose = new CanvasElement(260, 210, 10, 10, 'red', 'image', 'image/close.svg')
    this.perSecond = new CanvasText(210, 285, 15, 'black', Math.round(this.rate * 1000) / 1000 + '/sec')
    this.levelText = new CanvasText(130, 240, 15, 'black', 'LVL: ' + this.level)
    this.text = new CanvasText(this.pos.x - 5, this.pos.y - 3, 30, 'black', toValues(this.troops))
    this.upgradeCostText = new CanvasText(90, 290, 15, 'black', '$' + toValues(Math.round(this.cost)))
    this.image = createImage('image/barracks.svg')
  }
  /**
   * Draw the barracks to the screen
   */
  draw() {
    c.fillStyle = this.color
    // c.fillRect(this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    c.drawImage(this.image, this.pos.x, this.pos.y, this.dim.w, this.dim.h)
    this.upgradeCostText.content = '$' + toValues(Math.round(this.cost))
    this.perSecond.content = toValues(Math.round(this.rate * 1000) / 1000) + '/sec'
    this.levelText.content = 'LVL: ' + toValues(this.level)
    this.text.content = toValues(Math.floor(this.troops))
    this.rate = (((this.total / 100) + 1) * .002) * 100
    this.text.draw()
  }
}