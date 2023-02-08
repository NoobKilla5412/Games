const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
let frameNo = 0;

let money = 0;

let mouseX = 0;
let mouseY = 0;

let ores = [];
let keys = [];

let moneyText = new CanvasText(0, 30, 30, 'black', '$' + toValues(money));
let miner = new Player(10, 100);
let things = [miner];

c.fillStyle = '#b5651e';
c.fillRect(0, 0, canvas.width, canvas.height);

window.addEventListener('mousemove', mouse, false);

window.addEventListener('click', () => {
  things.forEach(thing => {
    if (thing.menuButton.mouseIn) {
      thing.menu = true;
    } else if (thing.upgradeButton.mouseIn) {
      if (money >= Math.round(thing.cost)) {
        let maxUpgrades = Math.floor(money / thing.cost);
        thing.level += maxUpgrades;
        money -= maxUpgrades * thing.cost;
        // thing.level++;
        // money -= Math.round(thing.cost);
      }
    } else if (thing.upgradeSpeedButton.mouseIn) {
      if (money >= Math.round(thing.speedCost)) {
        thing.speedLvl += .5;
        money -= Math.round(thing.speedCost);
      }
    } else if (thing.menuClose.mouseIn) {
      thing.menu = false;
    }
  });
}, false); // end click addEventListener

window.addEventListener('keydown', function (e) {
  keys = (keys || [])
  keys[e.key] = true;
});

window.addEventListener('keyup', function (e) {
  keys[e.key] = false;
});

function animate() {
  frameNo++;
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = '#b5651e';
  c.fillRect(0, 0, canvas.width, canvas.height);

  playerController(miner);
  if (everyInterval(25)) {
    newOre();
  }
  ores.forEach((ore, i) => {
    if (collision(ore, miner)) {
      ores.splice(i, 1);
      money += miner.total;
    }
    ore.update();
  });
  miner.update();
  miner.menuButton.update();
  moneyText.content = '$' + toValuesExt(money);
  moneyText.draw();

  things.forEach((thing, i, array) => {
    if (thing.menu) {
      thing.menuObj.update();
      thing.upgradeButton.update();
      thing.upgradeSpeedButton.update();
      thing.menuClose.update();
      thing.upgradeCostText.draw();
      thing.levelText.draw();
    }
    thing.total = thing.level * 1.5;
    thing.speed = thing.speedLvl * 2;
  });
  if (insideElement(miner.menuButton)) {
    canvas.style.cursor = 'pointer';
    miner.menuButton.mouseIn = true;
  } else if (insideElement(miner.upgradeButton)) {
    canvas.style.cursor = 'pointer';
    miner.upgradeButton.mouseIn = true;
  } else if (insideElement(miner.upgradeSpeedButton)) {
    canvas.style.cursor = 'pointer';
    miner.upgradeSpeedButton.mouseIn = true;
  } else if (insideElement(miner.menuClose)) {
    canvas.style.cursor = 'pointer';
    miner.menuClose.mouseIn = true;
  } else {
    canvas.style.cursor = 'default';
    miner.menuButton.mouseIn = false;
    miner.upgradeButton.mouseIn = false;
    miner.upgradeSpeedButton.mouseIn = false;
    miner.menuClose.mouseIn = false;
  }
  if (money < 0) {
    clearInterval(interval);
    clearInterval(saveInterval);
  }
  // maxUpgrades = Math.floor(money / miner.cost);
  // if (money >= maxUpgrades * miner.cost) {
  //   miner.level += maxUpgrades;
  //   money -= maxUpgrades * miner.cost;
  //   // thing.level++;
  //   // money -= Math.round(thing.cost);
  // }
};

// miner.pos.x = NaN;
// miner.pos.y = NaN;

let interval = setInterval(animate, 10);
let saveInterval = setInterval(save, 2500);
load();