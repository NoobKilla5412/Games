var interval;
function run() {
  interval = setInterval(() => {
    for (const key in upgrades) {
      if (Object.hasOwnProperty.call(upgrades, key)) {
        const element = upgrades[key];
        document.getElementById(key).innerHTML = `Buy ${capFirstLetter(key)} for $${toValues(element.cost)}<br> level: ${toValues(element.lvl)}`;
      }
    }
    document.getElementById('stats').innerHTML = `Money: $${toValues(money)}`;
    money++;
  }, 10);
}