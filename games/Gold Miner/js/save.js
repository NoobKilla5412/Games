let data = {
  money: 0,
  "miner.level": 0,
  "miner.speedLvl": 0
};
function load() {
  if (!localStorage.getItem('GoldMiner')) {
    localStorage.setItem('GoldMiner', JSON.stringify(data));
  } else {
    money = parseFloat(JSON.parse(localStorage.getItem('GoldMiner')).money);
    miner.level = parseFloat(JSON.parse(localStorage.getItem('GoldMiner'))["miner.level"]);
    miner.speedLvl = parseFloat(JSON.parse(localStorage.getItem('GoldMiner'))["miner.speedLvl"]);
  }
}
function save() {
  data = {
    money,
    "miner.level": miner.level,
    "miner.speedLvl": miner.speedLvl
  };
  localStorage.setItem('GoldMiner', JSON.stringify(data));
  console.log('saved');
}