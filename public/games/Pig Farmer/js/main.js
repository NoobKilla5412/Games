var interval;
var moneyRate = 1;
function run() {
  interval = setInterval(() => {
    for (const key in upgrades) {
      if (Object.hasOwnProperty.call(upgrades, key)) {
        const element = upgrades[key];
        document.getElementById(key).innerHTML = `Buy ${element.displayName || capFirstLetter(key)}<br>$${toValues(element.cost)}<br>Level: ${toValues(element.lvl)}`;
      }
    }
    document.getElementById('stats').innerHTML = `Money: $${toValues(money)}`;
    for (const key in upgrades) {
      if (Object.hasOwnProperty.call(upgrades, key)) {
        const element = upgrades[key];
        moneyRate *= (element.lvl * element.effectiveness) / 10 + 1;
        console.log(element.lvl * element.effectiveness);
      }
    }
    money += moneyRate;
    moneyRate = 1;
  }, 10);
}