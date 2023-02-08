// Noob Killa's file
var i = 1;
var upgrades = {
  pigs: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  carrots: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  potatoes: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  corn: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  peppers: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  celery: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  cucumbers: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  zucchini: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  squash: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  pumpkins: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  sweetPotatoes: {
    displayName: 'Sweet Potatoes',
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  apples: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  grapes: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  pears: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  beets: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
  },
  spinach: {
    lvl: 1,
    cost: 100 * i++,
    costUp: 1.2,
    effectiveness: (i - 1) / 5
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
    upgradesDiv.innerHTML += `<button id="${key}" class="upgrade-button"></button>`;
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