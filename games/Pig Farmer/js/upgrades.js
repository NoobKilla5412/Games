// Noob Killa's file
var upgrades = {
  pigs: {
    lvl: 1,
    cost: 100,
    costUp: 1.2
  },
  carrots: {
    lvl: 1,
    cost: 100,
    costUp: 1.2
  },
  potatoes: {
    lvl: 1,
    cost: 100,
    costUp: 1.2
  },
  corn: {
    lvl: 1,
    cost: 100,
    costUp: 1.2
  },
  peppers: {
    lvl: 1,
    cost: 100,
    costUp: 1.2,
  }
};

function upgrade(upgrade) {
  upgrade = upgrades[upgrade];
  if (upgradeType == 'x1') {
    if (money >= upgrade.cost) {
      upgrade.lvl++;
      money -= upgrade.cost;
      upgrade.cost *= upgrade.costUp;
    }
  } else if (upgradeType == 'max') {
    while (money >= upgrade.cost) {
      upgrade.lvl++;
      money -= upgrade.cost;
      upgrade.cost *= upgrade.costUp;
    }
  }
}

for (const key in upgrades) {
  if (Object.hasOwnProperty.call(upgrades, key)) {
    const element = upgrades[key];
    const upgradesDiv = document.getElementById('upgrades');
    upgradesDiv.innerHTML += `<button id="${key}"></button>`;
  }
}
for (const key in upgrades) {
  if (Object.hasOwnProperty.call(upgrades, key)) {
    const element = upgrades[key];
    document.getElementById(key).addEventListener('click', (e) => {
      upgrade(key);
    });
  }
}