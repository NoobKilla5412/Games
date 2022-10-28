/**
 * Converts the first alphabetic character in a string to uppercase.
 * @param {*} string String to capitalize
 * @returns String with first letter capitalized
 */
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Reset the cost, num, and total of the upgrades.
 */
function resetValues() {
  cheese.cost = multiplier * 20
  cheese.num = 0
  cheese.total = 0
  lettuce.cost = multiplier * 30
  lettuce.num = 0
  lettuce.total = 0
  sourCream.cost = multiplier * 10
  sourCream.num = 0
  sourCream.total = 0
  meat.cost = multiplier * 2500
  meat.num = 0
  meat.total = 1
  avocados.cost = multiplier * 25
  avocados.num = 0
  avocados.total = 0
  salsa.cost = multiplier * 250000
  salsa.num = 0
  salsa.total = 1
}
/**
 * Test if the evolve count is not at 100
 */
function evolve() {
  if (evolveNum < tacos.length - 1) {
    newEvolve()
  }
}
/**
 * Increase the evolve count
 */
function newEvolve() {
  if (displayMoneyRate >= moneyPerSecNextEvolve) {
    multiplier = 7 * (2 ** evolveNum + 2);

    moneyPerSecNextEvolve = (2 ** (evolveNum + 2)) * 1000 * 1.5;

    money = 0;
    frameNo = 0;

    evolveNum++;
    clickSound.play();
    cheese.max += 5;
    lettuce.max += 5;
    sourCream.max += 5;
    tacoYumminess.max += 2;
    tomatoes.max += 2;
    resetValues();
  }
}
/**
 * Start the game
 */
function startGame() {
  document.getElementById('stats').style.display = 'block'
  document.getElementById('save').style.display = 'inline'
  document.getElementById('evolveButton').style.display = 'inline'
  document.getElementById('maxUpgradesButton').style.display = 'inline';
  for (let i = 0; i < upgrades.length + diamondUpgrades.length; i++) {
    document.getElementsByClassName('upgrades')[i].style.display = 'inline';
  }
  interval = setInterval(main, 10);
  interval1 = setInterval(addMoney, 10);

  window.addEventListener('keydown', function (e) {
    keys = (keys || [])
    keys[e.key] = true
  })
  window.addEventListener('keyup', function (e) {
    keys[e.key] = false
  })
  saveInterval = setInterval(save, 2500);
  console.log('Loaded');
}
/**
 * Every interval
 * @param {*} n The interval
 */
function everyInterval(n) {
  if ((frameNo / n) % 1 == 0) { return true }
  return false
}
/**
 * Every interval Accurate
 * @param {*} n The interval
 */
function everyIntervalAccurate(n) {
  if ((new Date().getTime() / n) % 1 == 0) { return true }
  return false
}
/**
 * Toggle the info menu
 */
function info() {
  if (!infoActive) {
    document.getElementById('info').style.display = 'block'
    infoActive = true
  } else if (infoActive) {
    document.getElementById('info').style.display = 'none'
    infoActive = false
  }
}
/**
 * Toggle the options menu
 */
function options() {
  if (!optionsActive) {
    document.getElementById('options').style.display = 'block'
    optionsActive = true
  } else if (optionsActive) {
    document.getElementById('options').style.display = 'none'
    optionsActive = false
  }
}
/**
 * Change keybinds
 * @param {*} bind The keybind to change
 * @param {*} newKey The new key to change ``bind`` to
 */
function keybinds(bind, newKey) {
  // console.log('bind: ' + bind)
  // console.log('newKey: ' + newKey)
  // console.log('keyEvolve: ' + keyEvolve)
  // console.log('newKey != keyEvolve: ' + (newKey != keyEvolve))
  if (newKey && !(newKey == (keyCheese || keyLettuce || keySourCream || keyMeat || keyAvocadoes || keySalsa || keyTacoYumminess || keyTomatoes || keyEvolve)) && (newKey.length == 1) && (newKey != keyEvolve)) {
    switch (bind) {
      case 'cheese':
        keyCheese = newKey
        break
      case 'lettuce':
        keyLettuce = newKey
        break
      case 'sourCream':
        keySourCream = newKey
        break
      case 'meat':
        keyMeat = newKey
        break
      case 'avocados':
        keyAvocadoes = newKey
        break
      case 'salsa':
        keySalsa = newKey
      case 'tacoYumminess':
        keyTacoYumminess = newKey
        break
      case 'tomatoes':
        keyTomatoes = newKey
        break
      case 'evolve':
        keyEvolve = newKey
        break
      default:
        alert('Key Error')
        console.error('Key Error')
        break
    }
  } else if (newKey.length != 1) {
    alert('Error: Invalid key')
    console.error('Error: Invalid key')
  } else {
    alert('Error: Key already bound')
    console.error('Error: Key already bound')
  }
}
/**
 * Add money for clicking on the Taco
 */
function clickTaco() {
  if (clickTacoTimer == 0) {
    money += (Math.round(10000 * moneyValue) / 100) * 5
    clickTacoTimer = 500
    clickSound.play()
  }
}

function toggleMaxUpgrades() {
  if (interval) {
    if (!maxUpgrades)
      maxUpgrades = true;
    else
      maxUpgrades = false;
  }
}