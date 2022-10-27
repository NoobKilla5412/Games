function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

  return {
    x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}
function mouse(e) {
  var pos = getMousePos(canvas, e);
  mouseX = pos.x;
  mouseY = pos.y;
}
function insideElement(element) {
  return ((mouseX > element.pos.x) && (mouseX < element.dim.w + element.pos.x)) && (mouseY > element.pos.y) && (mouseY < element.dim.h + element.pos.y)
}
function mineClick(mine) {
  if (mine.collectButton.mouseIn) {
    money += mine.money
    mine.money = 0
  } else if (mine.menuClose.mouseIn) {
    mine.menu = false
  } else if (mine.upgradeButton.mouseIn) {
    if (money >= 100) {
      mine.level++
      money -= 100
    }
  } else if (mine.mouseIn) {
    mine.menu = true
  }
}
let data = {
  money: 0,
  goldMine: {
    money: 0,
    cost: 0,
    total: 0,
    level: 0
  },
  goldMine1: {
    money: 0,
    cost: 0,
    total: 0,
    level: 0
  },
  goldStorage: {
    cost: 0,
    total: 0,
    level: 0
  },
  barracks: {
    troops: 0,
    cost: 0,
    total: 0,
    level: 0
  }
}
function load() {
  if (!localStorage.getItem('EuropeTakeover')) {
    localStorage.setItem('EuropeTakeover', JSON.stringify(data))
  } else {
    money = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).money)
    goldMine.money = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine.money)
    goldMine.cost = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine.cost)
    goldMine.total = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine.total)
    goldMine.level = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine.level)

    goldMine1.money = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine1.money)
    goldMine1.cost = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine1.cost)
    goldMine1.total = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine1.total)
    goldMine1.level = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldMine1.level)

    goldStorage.cost = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldStorage.cost)
    goldStorage.total = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldStorage.total)
    goldStorage.level = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).goldStorage.level)

    barracks.troops = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).barracks.troops)
    barracks.cost = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).barracks.cost)
    barracks.total = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).barracks.total)
    barracks.level = parseFloat(JSON.parse(localStorage.getItem('EuropeTakeover')).barracks.level)
  }
}
function save() {
  data = {
    money,
    goldMine: {
      money: goldMine.money,
      cost: goldMine.cost,
      total: goldMine.total,
      level: goldMine.level
    },
    goldMine1: {
      money: goldMine1.money,
      cost: goldMine1.cost,
      total: goldMine1.total,
      level: goldMine1.level
    },
    goldStorage: {
      cost: goldStorage.cost,
      total: goldStorage.total,
      level: goldStorage.level
    },
    barracks: {
      troops: barracks.troops,
      cost: barracks.cost,
      total: barracks.total,
      level: barracks.level
    }
  }
  localStorage.setItem('EuropeTakeover', JSON.stringify(data));
  console.log('saved');
}
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}