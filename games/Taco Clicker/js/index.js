document.getElementById('version').innerHTML = 'Version: ' + version;
document.querySelector('title').innerHTML = 'Taco Clicker v' + version;
if (evolveNum == 0) multiplier = 7 * (2 ** evolveNum + 1)
else if (evolveNum > 0) multiplier = 7 * (2 ** evolveNum)

resetValues()

upgrades.forEach((upgrade) => {
  document.getElementById('upgradeButtons').innerHTML += '<button onclick="' + upgrade.name + '.upgrade()" id="' + upgrade.name + '" class="upgrades"></button>'
  document.getElementById('keyBindsDiv').innerHTML += '<button id="keybinds" onclick="keybinds(\'' + upgrade.name + '\',prompt(\'Rebind ' + capitalizeFirstLetter(upgrade.name) + ' to:\').toLowerCase())" class="gray">Change Key Bind for ' + capitalizeFirstLetter(upgrade.name) + '</button><br>'
})
diamondUpgrades.forEach((upgrade) => {
  document.getElementById('diamondUpgrades').innerHTML += '<button onclick="' + upgrade.name + '.upgrade()" id="' + upgrade.name + '" class="upgrades"></button>'
  document.getElementById('keyBindsDiv').innerHTML += '<button id="keybinds" onclick="keybinds(\'' + upgrade.name + '\',prompt(\'Rebind ' + capitalizeFirstLetter(upgrade.name) + ' to:\').toLowerCase())" class="gray">Change Key Bind for ' + capitalizeFirstLetter(upgrade.name) + '</button><br>'
})
document.getElementById('keyBindsDiv').innerHTML += '<button id="keybinds" onclick="keybinds(\'evolve\',prompt(\'Rebind Evolve to:\').toLowerCase())" class="gray">Change Key Bind for Evolve</button>'


function animate() {
  // if(!musicActive){
  //   backgroundMusic.pause();
  //   backgroundMusic.currentTime = 0;
  // }
  moneyPerSecNextEvolve = (2 ** (evolveNum + 2)) * 1000 * 1.5
  if (evolveNum == 0) multiplier = 7 * (2 ** evolveNum + 1)
  else if (evolveNum > 0) multiplier = 7 * (2 ** evolveNum)
  buttons = {
    'chocolate': 'Chocolate (' + keyChocolate.toUpperCase() + '): Increase Size by 10% <span title="Size upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br><img src="img/money.svg" height="12pt" /><b>' + toValues(chocolate.cost) + '</b><br>Total: +' + chocolate.total + '%<br>Level: ' + chocolate.num + '/' + chocolate.max,
    'chocolateMax': 'Chocolate (' + keyChocolate.toUpperCase() + '): Increase Size by 10%<br>✅<br>Total: +' + chocolate.total + '%<br>Level: MAX',
    'lettuce': 'Lettuce (' + keyLettuce.toUpperCase() + '): Increase Tastiness by 15% <span title="Tastiness upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br><img src="img/money.svg" height="12pt" /><b>' + toValues(lettuce.cost) + '</b><br>Total: +' + lettuce.total + '%<br>Level: ' + lettuce.num + '/' + lettuce.max,
    'lettuceMax': 'Lettuce (' + keyLettuce.toUpperCase() + '): Increase Tastiness by 15% <span title="Tastiness upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br>✅<br>Total: +' + lettuce.total + '%<br>Level: MAX',
    'sourCream': 'Sour Cream (' + keySourCream.toUpperCase() + '): Increase Idle Earnings by 1/sec<br><img src="img/money.svg" height="12pt" /><b>' + toValues(sourCream.cost) + '</b><br>Total: +' + sourCream.total * 100 + '/sec<br>Level: ' + sourCream.num + '/' + sourCream.max,
    'sourCreamMax': 'Sour Cream (' + keySourCream.toUpperCase() + '): Increase Idle Earnings by 1/sec<br>✅<br>Total: +' + sourCream.total * 100 + '/sec<br>Level: MAX',
    'meat': 'Taco Meat (' + keyMeat.toUpperCase() + '): Double Meat <span title="Meat upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br><img src="img/money.svg" height="12pt" /><b>' + toValues(meat.cost) + '</b><br>Total: ' + meat.total + 'x<br>Level: ' + meat.num + '/' + meat.max,
    'meatMax': 'Taco Meat (' + keyMeat.toUpperCase() + '): Double Meat <span title="Meat upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br>✅<br>Total: ' + meat.total + 'x<br>Level: MAX',
    'avocados': 'Avocados (' + keyAvocadoes.toUpperCase() + '): Increase Earnings by 8%<br><img src="img/money.svg" height="12pt" /><b>' + toValues(avocados.cost) + '</b><br>Total: +' + avocados.total + '%<br>Level: ' + avocados.num + '/' + avocados.max,
    'avocadosMax': 'Avocados (' + keyAvocadoes.toUpperCase() + '): Increase Earnings by 8%<br>✅<br>Total: +' + avocados.total + '%<br>Level: MAX',
    'salsa': 'Salsa (' + keySalsa.toUpperCase() + '): 10x Salsa <span title = "Salsa upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span> <br><img src="img/money.svg" height="12pt" /><b>' + toValues(salsa.cost) + '</b><br>Total: ' + salsa.total + 'x<br>Level: ' + salsa.num + '/' + salsa.max,
    'salsaMax': 'Salsa (' + keySalsa.toUpperCase() + '): 10x Salsa <span title="Salsa upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br>✅<br>Total: ' + salsa.total + 'x<br>Level: MAX',
    'tacoYumminess': 'Taco Yumminess (' + keyTacoYumminess.toUpperCase() + '): Increase Diamond Speed by 5%<br>💎<b>' + toValues(tacoYumminess.cost) + '</b><br>Total: +' + tacoYumminess.total + '%<br>Level: ' + tacoYumminess.num + '/' + tacoYumminess.max,
    'tacoYumminessMax': 'Taco Yumminess (' + keyTacoYumminess.toUpperCase() + '): Increase Diamond Speed by 5%<br>✅<br>Total: +' + tacoYumminess.total + '%<br>Level: MAX',
    'tomatoes': 'Tomatoes (' + keyTomatoes.toUpperCase() + '): Increase Flavor by 10% <span title="Flavor upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br>💎<b>' + toValues(tomatoes.cost) + '</b><br>Total: +' + tomatoes.total + '%<br>Level: ' + tomatoes.num + '/' + tomatoes.max,
    'tomatoesMax': 'Tomatoes (' + keyTomatoes.toUpperCase() + '): Increase Flavor by 10% <span title="Flavor upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br>✅<br>Total: +' + tomatoes.total + '%<br>Level: MAX'
  }
  document.getElementById('evolveButton').innerHTML = 'Evolve (' + keyEvolve.toUpperCase() + ')'
  frameNo += 1

  // if (displayMoneyRate >= moneyPerSecNextEvolve && evolveNum <= 100) {
  //   document.getElementById('evolveButton').classList = 'green'
  // } else {
  //   document.getElementById('evolveButton').classList = 'gray'
  // }
  if (evolveNum == 0) {
    moneyValue = 5 * (chocolate.total / 100 + 1) * (lettuce.total / 100 + 1) * meat.total * (tomatoes.total / 100 + 1) * (avocados.total / 100 + 1) * salsa.total
    diamondValue = (tacoYumminess.total / 100 + 1) - 0.7
  } else {
    moneyValue = 5 * (2 ** evolveNum + 2) * (chocolate.total / 100 + 1) * (lettuce.total / 100 + 1) * meat.total * (tomatoes.total / 100 + 1) * (avocados.total / 100 + 1) * salsa.total
    diamondValue = (2 ** evolveNum + 2) * (tacoYumminess.total / 100 + 1)
  }
  idleMoneyValue = Math.round(10 * (10000 * (sourCream.total / 100))) / 1000
  upgrades.forEach((upgrade) => {
    upgrade.color()
    upgrade.message()
  })
  diamondUpgrades.forEach((upgrade) => {
    upgrade.color()
    upgrade.message()
  })

  document.getElementById('money').innerHTML = '<img src="img/money.svg" height="12pt" />: <b class="large-money">' + toValuesExt(money) + '</b>'

  displayMoneyRate = Math.round(10 * (10000 * idleMoneyValue)) / 1000

  document.getElementById('moneyPerSec').innerHTML = '<img src="img/money.svg" height="12pt" />/sec: <b>' + toValues(displayMoneyRate) + '</b>'// + '/' + toValues(moneyPerSecNextEvolve) + '</b>'
  document.getElementById('value').innerHTML = '<img src="img/money.svg" height="12pt" />Value: <b>' + toValues(Math.round((1000 * moneyValue)) / 1000)


  document.getElementById('diamonds').innerHTML = '💎: <b>' + toValues(diamonds) + '</b>'


  document.getElementById('evolve').innerHTML = 'Evolve: <b>' + toValues(evolveNum) + '</b>'

  money += idleMoneyValue

  diamonds += diamondValue

  if (keys && keys[keyChocolate]) {
    chocolate.upgrade()
  }
  if (keys && keys[keyLettuce]) {
    lettuce.upgrade()
  }
  if (keys && keys[keySourCream]) {
    sourCream.upgrade()
  }
  if (keys && keys[keyMeat]) {
    meat.upgrade()
  }
  if (keys && keys[keyAvocadoes]) {
    avocados.upgrade()
  }
  if (keys && keys[keySalsa]) {
    salsa.upgrade()
  }
  if (keys && keys[keyTacoYumminess]) {
    tacoYumminess.upgrade()
  }
  if (keys && keys[keyTomatoes]) {
    tomatoes.upgrade()
  }
  if (keys && keys[keyEvolve]) {
    evolve()
  }
}

// let creditsActive = false
// function credits() {
//   if (!creditsActive) {
//     document.getElementById('credits').style.display = 'block'
//     creditsActive = true
//   } else if (creditsActive) {
//     document.getElementById('credits').style.display = 'none'
//     creditsActive = false
//   }
// }
let infoActive = false

let optionsActive = false


// function toggleMusic() {
//   if (!musicActive) {
//     if (typeof backgroundMusic.loop == 'boolean') {
//       backgroundMusic.loop = true;
//     }
//     else {
//       backgroundMusic.addEventListener('ended', function () {
//         this.currentTime = 0;
//         this.play();
//       }, false);
//     }
//     backgroundMusic.play();
//   } else if (musicActive) {
// backgroundMusic.pause();
// backgroundMusic.currentTime = 0;
//   }
// }


// function openChest() {
//   clickSound.play()
//   document.getElementById('chestScreen').style.display = 'block'
//   document.getElementById('chestScreen').innerHTML = chests[(Math.floor(Math.random() * (5 - 0)) + 0)] + `<span onclick="document.getElementById('chestScreen').style.display = 'none'" id="closeChestScreen">X&nbsp</span>`
// }
// function diamondToMoney() {
//   if (diamonds * .1 >= 0) {
//     diamonds -= diamonds * .1
//     money += (diamonds * .1) * 5
//   }
// }