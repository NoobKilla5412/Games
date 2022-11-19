// Noob Killa's file
var data = [
  { money: 0, upgrades },
  { money: 0, upgrades },
  { money: 0, upgrades }
];
function save(id) {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data[id] = { money, upgrades };

    localStorage.setItem('pigFarmer', JSON.stringify(data));
    localStorage.setItem('hasDonePigIntro', hasDoneIntro);
  }
  console.log('Saved');
}
function load(id) {
  data = JSON.parse(localStorage.getItem('pigFarmer')) || data;
  money = data[id].money;
  upgrades = data[id].upgrades;
  document.getElementById('game').style.display = 'block';
  document.getElementById('saves').style.display = 'none';
  music.menu[0].stop();
  run();
  saveInterval = setInterval(() => {
    save(id);
  }, 2500);
}
function newSave(id) {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data[id] = { money };
    localStorage.setItem('pigFarmer', JSON.stringify(data));
    localStorage.setItem('hasDonePigIntro', hasDoneIntro);
  }
  console.log('Saved');
}