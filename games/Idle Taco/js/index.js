document.getElementById('version').innerHTML = `Version: ${version} Idle Mode`;
document.querySelector('title').innerHTML = `Idle Taco v${version}`;
if (evolveNum == 0) multiplier = 7 * (2 ** evolveNum + 1);
else if (evolveNum > 0) multiplier = 7 * (2 ** evolveNum);

resetValues();

upgrades.forEach((upgrade) => {
  document.getElementById('upgradeButtons').innerHTML += '<button onclick="' + upgrade.name + '.upgrade()" id="' + upgrade.name + '" class="upgrades"></button>';
  document.getElementById('keyBindsDiv').innerHTML += '<button id="keybinds" onclick="keybinds(\'' + upgrade.name + '\',prompt(\'Rebind ' + capitalizeFirstLetter(upgrade.name) + ' to:\').toLowerCase())" class="gray">Change Key Bind for ' + capitalizeFirstLetter(upgrade.name) + '</button><br>';
});
diamondUpgrades.forEach((upgrade) => {
  document.getElementById('diamondUpgrades').innerHTML += '<button onclick="' + upgrade.name + '.upgrade()" id="' + upgrade.name + '" class="upgrades"></button>';
  document.getElementById('keyBindsDiv').innerHTML += '<button id="keybinds" onclick="keybinds(\'' + upgrade.name + '\',prompt(\'Rebind ' + capitalizeFirstLetter(upgrade.name) + ' to:\').toLowerCase())" class="gray">Change Key Bind for ' + capitalizeFirstLetter(upgrade.name) + '</button><br>';
});
document.getElementById('keyBindsDiv').innerHTML += '<button id="keybinds" onclick="keybinds(\'evolve\',prompt(\'Rebind Evolve to:\').toLowerCase())" class="gray">Change Key Bind for Evolve</button>';
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