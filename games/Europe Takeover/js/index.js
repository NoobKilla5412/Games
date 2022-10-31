const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

var version = "0.1";
document.title += ' v' + version;
canvas.width = 1024;
canvas.height = 576;

let money = 0;
let totalCapacity = 0;

let mouseX = 0;
let mouseY = 0;

let enemies = []
let troops = []
let elements = []
let keys = []

let moneyText = new CanvasText(0, 30, 30, 'black', '$' + toValues(money));
let goldMine = new GoldMine(100, 100, 'goldMine');
let goldStorage = new GoldStorage(100, 400, 'goldStorage');
let goldMine1 = new GoldMine(250, 100, 'goldMine1');
let barracks = new Barracks(400, 100, 'barracks');

let things = [goldMine, goldMine1, barracks, goldStorage]
let attackButton = new CanvasElement(canvas.width - 50, canvas.height - 50, 30, 30, 'red', 'image', 'image/attack.svg')

c.fillStyle = '#b5651e'
c.fillRect(0, 0, canvas.width, canvas.height)
window.addEventListener('mousemove', mouse, false)
window.addEventListener('click', () => {
  things.forEach((thing, i, array) => {
    if (thing.type == 'goldMine') {
      if (thing.collectButton.mouseIn && thing.money + money < totalCapacity) {
        money += thing.money
        thing.money = 0
      } else if (thing.collectButton.mouseIn && thing.money + money > totalCapacity) {
        let moneyDiff = totalCapacity - money;
        money = totalCapacity;
        thing.money -= moneyDiff;
      }
    }
    if (thing.menuClose.mouseIn) {
      thing.menu = false
    } else if (thing.type != 'pauseMenu' && thing.upgradeButton.mouseIn) {
      if (money >= Math.round(thing.cost)) {
        if (thing.type == 'goldStorage') {
          thing.total += 6
        } else {
          thing.total += 15
        }
        thing.level++
        money -= Math.round(thing.cost)
        if (thing.type == 'goldStorage') {
          thing.cost *= 1.5
        } else {
          thing.cost *= 1.15
        }
      }
    } else if (thing.mouseIn) {
      thing.menu = true
      if (thing.name == 'goldMine' && goldMine.menu == true) {
        goldMine1.menu = false
        barracks.menu = false
        goldStorage.menu = false
      } else if (thing.name == 'goldMine1' && goldMine1.menu == true) {
        goldMine.menu = false
        barracks.menu = false
        goldStorage.menu = false
      } else if (thing.name == 'barracks' && barracks.menu == true) {
        goldMine.menu = false
        goldMine1.menu = false
        goldStorage.menu = false
      } else if (thing.name == 'goldStorage' && goldStorage.menu == true) {
        goldMine.menu = false
        goldMine1.menu = false
        barracks.menu = false
      }
    }
    // i == 0 ? array[1].menu = false : array[0].menu = false
  })
  // if (goldMine.menu) {
  //   goldMine1.menu = false
  //   barracks.menu = false
  // } else if (goldMine1.menu) {
  //   goldMine.menu = false
  //   barracks.menu = false
  // } else if (barracks.menu) {
  //   goldMine.menu = false
  //   goldMine1.menu = false
  // }
}, false) // end click addEventListener
window.addEventListener('keydown', function (e) {
  keys = (keys || [])
  keys[e.key] = true;
})
window.addEventListener('keyup', function (e) {
  keys[e.key] = false;
})
let grassImage = createImage('image/grass.png');
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#b5651e';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.drawImage(grassImage, 0, 0, canvas.width, canvas.height);

  moneyText.content = '$' + toValues(money) + '/' + toValues(totalCapacity);
  totalCapacity = goldStorage.capacity;
  goldMine.draw()
  goldMine1.draw()

  goldStorage.draw();

  barracks.draw()

  moneyText.draw()
  attackButton.draw()

  things.forEach((thing, i, array) => {
    if (thing.menu) {
      thing.menuObj.update()
      thing.upgradeButton.update()
      if (thing.type == 'goldMine') {
        thing.collectButton.update()
      }
      thing.menuClose.update()
      if (thing.type != 'goldStorage') {
        thing.perSecond.draw()
      } else {
        thing.capacityText.draw()
      }
      thing.upgradeCostText.draw()
      thing.levelText.draw()
    }
  })

  goldMine.money += goldMine.rate / 100
  goldMine1.money += goldMine1.rate / 100

  barracks.troops += barracks.rate / 100

  // console.log(Math.round(mouseX) + ',' + Math.round(mouseY))
  // console.log(goldMine.menuClose.mouseIn)

  if (insideElement(goldMine)) {
    canvas.style.cursor = 'pointer'
    goldMine.mouseIn = true
  } else if (insideElement(goldMine.upgradeButton) && goldMine.menu) {
    canvas.style.cursor = 'pointer'
    goldMine.upgradeButton.mouseIn = true
  } else if (insideElement(goldMine.collectButton) && goldMine.menu) {
    canvas.style.cursor = 'pointer'
    goldMine.collectButton.mouseIn = true
  } else if (insideElement(goldMine.menuClose) && goldMine.menu) {
    canvas.style.cursor = 'pointer'
    goldMine.menuClose.mouseIn = true
  }
  else if (insideElement(goldMine1)) {
    canvas.style.cursor = 'pointer'
    goldMine1.mouseIn = true
  } else if (insideElement(goldMine1.upgradeButton) && goldMine1.menu) {
    canvas.style.cursor = 'pointer'
    goldMine1.upgradeButton.mouseIn = true
  } else if (insideElement(goldMine1.collectButton) && goldMine1.menu) {
    canvas.style.cursor = 'pointer'
    goldMine1.collectButton.mouseIn = true
  } else if (insideElement(goldMine1.menuClose) && goldMine1.menu) {
    canvas.style.cursor = 'pointer'
    goldMine1.menuClose.mouseIn = true
  }
  else if (insideElement(goldStorage)) {
    canvas.style.cursor = 'pointer'
    goldStorage.mouseIn = true
  } else if (insideElement(goldStorage.upgradeButton) && goldStorage.menu) {
    canvas.style.cursor = 'pointer'
    goldStorage.upgradeButton.mouseIn = true
  } else if (insideElement(goldStorage.menuClose) && goldStorage.menu) {
    canvas.style.cursor = 'pointer'
    goldStorage.menuClose.mouseIn = true
  }
  else if (insideElement(barracks)) {
    canvas.style.cursor = 'pointer'
    barracks.mouseIn = true
  } else if (insideElement(barracks.upgradeButton) && barracks.menu) {
    canvas.style.cursor = 'pointer'
    barracks.upgradeButton.mouseIn = true
  } else if (insideElement(barracks.menuClose) && barracks.menu) {
    canvas.style.cursor = 'pointer'
    barracks.menuClose.mouseIn = true
  } else {
    canvas.style.cursor = 'default';
    goldMine.upgradeButton.mouseIn = false;
    goldMine.collectButton.mouseIn = false;
    goldMine.menuClose.mouseIn = false;
    goldMine.mouseIn = false;

    goldStorage.mouseIn = false;
    goldStorage.upgradeButton.mouseIn = false;
    goldStorage.menuClose.mouseIn = false;

    goldMine1.upgradeButton.mouseIn = false;
    goldMine1.collectButton.mouseIn = false;
    goldMine1.menuClose.mouseIn = false;
    goldMine1.mouseIn = false;

    barracks.mouseIn = false;
    barracks.menuClose.mouseIn = false;
    barracks.upgradeButton.mouseIn = false;
  }
};
let interval = setInterval(animate, 10);
let saveInterval = setInterval(save, 2500);
load()