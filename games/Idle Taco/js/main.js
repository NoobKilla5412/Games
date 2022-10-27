function main() {
  // if(!musicActive){
  //   backgroundMusic.pause();
  //   backgroundMusic.currentTime = 0;
  // }
  moneyPerSecNextEvolve = 3000 * (2.5 ** (evolveNum + 2));
  if (evolveNum == 0)
    multiplier = 7 * (2 ** evolveNum + 1);
  else if (evolveNum > 0)
    multiplier = 7 * (2 ** evolveNum);
  buttons = {
    'cheese': 'Cheese (' + keyCheese.toUpperCase() + '): Increase Size by 10% <span title="Size upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br><img src="img/money.svg" height="12pt" /><b>' + toValues(cheese.cost) + '</b><br>Total: +' + cheese.total + '%<br>Level: ' + cheese.num + '/' + cheese.max,
    'cheeseMax': 'Cheese (' + keyCheese.toUpperCase() + '): Increase Size by 10%<br>✅<br>Total: +' + cheese.total + '%<br>Level: MAX',
    'lettuce': 'Lettuce (' + keyLettuce.toUpperCase() + '): Increase Tastiness by 15% <span title="Tastiness upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br><img src="img/money.svg" height="12pt" /><b>' + toValues(lettuce.cost) + '</b><br>Total: +' + lettuce.total + '%<br>Level: ' + lettuce.num + '/' + lettuce.max,
    'lettuceMax': 'Lettuce (' + keyLettuce.toUpperCase() + '): Increase Tastiness by 15% <span title="Tastiness upgrades are the same as Earnings upgrades in their effect.">[ ? ]</span><br>✅<br>Total: +' + lettuce.total + '%<br>Level: MAX',
    'sourCream': 'Sour Cream (' + keySourCream.toUpperCase() + '): Increase Earnings by 1%<br><img src="img/money.svg" height="12pt" /><b>' + toValues(sourCream.cost) + '</b><br>Total: +' + sourCream.total + '%<br>Level: ' + sourCream.num + '/' + sourCream.max,
    'sourCreamMax': 'Sour Cream (' + keySourCream.toUpperCase() + '): Increase Earnings by 1%<br>✅<br>Total: +' + sourCream.total + '%<br>Level: MAX',
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
  };
  document.getElementById('evolveButton').innerHTML = 'Evolve (' + keyEvolve.toUpperCase() + ')';
  frameNo += 1;
  if (clickTacoTimer != 0) {
    clickTacoTimer--;
  }
  document.getElementById('clickTacoTimer').innerText = Math.round(clickTacoTimer / 100);
  if (displayMoneyRate >= moneyPerSecNextEvolve && !(evolveNum < tacos.length - 1)) {
    document.getElementById('evolveButton').classList = 'darkBlue';
  } else if (displayMoneyRate >= moneyPerSecNextEvolve) {
    document.getElementById('evolveButton').classList = 'green';
  } else if (displayMoneyRate <= moneyPerSecNextEvolve) {
    document.getElementById('evolveButton').classList = 'gray';
  } else if (!(evolveNum < tacos.length - 1)) {
    document.getElementById('evolveButton').classList = 'darkBlue';
  }
  if (evolveNum == 0) {
    moneyValue = (cheese.total / 100 + 1) * (lettuce.total / 100 + 1) * (sourCream.total / 100 + 1) * meat.total * (tomatoes.total / 100 + 1) * (avocados.total / 100 + 1) * salsa.total;
    diamondValue = (tacoYumminess.total / 100 + 1) - 0.7;
  } else {
    moneyValue = (2 ** evolveNum + 1) * (cheese.total / 100 + 1) * (lettuce.total / 100 + 1) * (sourCream.total / 100 + 1) * meat.total * (tomatoes.total / 100 + 1) * (avocados.total / 100 + 1) * salsa.total;
    diamondValue = (2 ** evolveNum + 1) * (tacoYumminess.total / 100 + 1);
  }
  upgrades.forEach((upgrade) => {
    upgrade.color();
    upgrade.message();
  });
  diamondUpgrades.forEach((upgrade) => {
    upgrade.color();
    upgrade.message();
  });

  document.getElementById('money').innerHTML = '<img src="img/money.svg" height="12pt" />: <b class="large-money">' + toValuesExt(money) + '</b>';

  displayMoneyRate = Math.round(10 * (10000 * moneyValue)) / 1000;

  document.getElementById('moneyPerSec').innerHTML = '<img src="img/money.svg" height="12pt" />/sec: <b>' + toValues(displayMoneyRate) + '/' + toValues(moneyPerSecNextEvolve) + '</b>';

  document.getElementById('diamonds').innerHTML = '💎: <b>' + toValues(diamonds) + '</b>';

  document.getElementById('evolve').innerHTML = `Evolve: <b>${tacos[evolveNum]} (${evolveNum + 1})</b>`;

  money += moneyValue;
  diamonds += diamondValue;

  if (keys && keys[keyCheese]) {
    cheese.upgrade();
  }
  if (keys && keys[keyLettuce]) {
    lettuce.upgrade();
  }
  if (keys && keys[keySourCream]) {
    sourCream.upgrade();
  }
  if (keys && keys[keyMeat]) {
    meat.upgrade();
  }
  if (keys && keys[keyAvocadoes]) {
    avocados.upgrade();
  }
  if (keys && keys[keySalsa]) {
    salsa.upgrade();
  }
  if (keys && keys[keyTacoYumminess]) {
    tacoYumminess.upgrade();
  }
  if (keys && keys[keyTomatoes]) {
    tomatoes.upgrade();
  }
  if (keys && keys[keyEvolve]) {
    evolve();
  }

  if (maxUpgrades)
    maxUpgradesButton.innerHTML = 'Max';
  else
    maxUpgradesButton.innerHTML = '1x';
}