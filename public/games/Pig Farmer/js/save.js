// Noob Killa's file
var options = {
  music: true
};
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
    localStorage.setItem('pigFarmer:hasDoneIntro', hasDoneIntro);
  }
  console.log('Saved');
}
var loaded = false;
function load(id) {
  data = JSON.parse(localStorage.getItem('pigFarmer')) || data;
  money = data[id].money;
  upgrades = data[id].upgrades;
  document.getElementById('game').style.display = 'block';
  document.getElementById('saves').style.display = 'none';
  music.menu[0].stop();
  if (options.music)
    music.menu[0].play();
  run();
  saveInterval = setInterval(() => {
    save(id);
  }, 2500);
  loaded = true;
}
function loadOptions() {
  if (!localStorage.getItem('pigFarmer:options'))
    localStorage.setItem('pigFarmer:options', JSON.stringify(options));
  options = JSON.parse(localStorage.getItem('pigFarmer:options')) || options;
}
function saveOptions() {
  localStorage.setItem('pigFarmer:options', JSON.stringify(options));
}
function newSave(id) {
  if (!localStorage.getItem('pigFarmer')) {
    localStorage.setItem('pigFarmer', JSON.stringify(data));
  } else {
    data[id] = { money, upgrades };
    localStorage.setItem('pigFarmer', JSON.stringify(data));
    localStorage.setItem('pigFarmer:hasDoneIntro', hasDoneIntro);
  }
  console.log('Saved');
}