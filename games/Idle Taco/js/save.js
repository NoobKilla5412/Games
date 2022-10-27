let data = {
  money: 0,
  diamonds: 0,
  "cheese.cost": 0,
  "cheese.num": 0,
  "cheese.total": 0,
  "lettuce.cost": 0,
  "lettuce.num": 0,
  "lettuce.total": 0,
  "sourCream.cost": 0,
  "sourCream.num": 0,
  "sourCream.total": 0,
  "meat.cost": 0,
  "meat.num": 0,
  "meat.total": 0,
  "avocados.cost": 0,
  "avocados.num": 0,
  "avocados.total": 0,
  "salsa.cost": 0,
  "salsa.num": 0,
  "salsa.total": 0,
  "tacoYumminess.cost": 0,
  "tacoYumminess.num": 0,
  "tacoYumminess.total": 0,
  "tomatoes.cost": 0,
  "tomatoes.num": 0,
  "tomatoes.total": 0,
  evolveNum: 0,
  multiplier: 0,
  clickTacoTimer: 0,
  "cheese.max": 0,
  "lettuce.max": 0,
  "sourCream.max": 0,
  "meat.max": 0,
  "avocados.max": 0,
  "salsa.max": 0,
  "tacoYumminess.max": 0,
  "tomatoes.max": 0,
  moneyValue: 0,
  diamondValue: 0,
  lastDate: new Date().getTime()
}
/**
 * Save the game
 */
function save() {
  data = {
    money,
    diamonds,
    "cheese.cost": cheese.cost,
    "cheese.num": cheese.num,
    "cheese.total": cheese.total,
    "lettuce.cost": lettuce.cost,
    "lettuce.num": lettuce.num,
    "lettuce.total": lettuce.total,
    "sourCream.cost": sourCream.cost,
    "sourCream.num": sourCream.num,
    "sourCream.total": sourCream.total,
    "meat.cost": meat.cost,
    "meat.num": meat.num,
    "meat.total": meat.total,
    "avocados.cost": avocados.cost,
    "avocados.num": avocados.num,
    "avocados.total": avocados.total,
    "salsa.cost": salsa.cost,
    "salsa.num": salsa.num,
    "salsa.total": salsa.total,
    "tacoYumminess.cost": tacoYumminess.cost,
    "tacoYumminess.num": tacoYumminess.num,
    "tacoYumminess.total": tacoYumminess.total,
    "tomatoes.cost": tomatoes.cost,
    "tomatoes.num": tomatoes.num,
    "tomatoes.total": tomatoes.total,
    evolveNum,
    multiplier,
    clickTacoTimer,
    "cheese.max": cheese.max,
    "lettuce.max": lettuce.max,
    "sourCream.max": sourCream.max,
    "meat.max": meat.max,
    "avocados.max": avocados.max,
    "salsa.max": salsa.max,
    "tacoYumminess.max": tacoYumminess.max,
    "tomatoes.max": tomatoes.max,
    moneyValue,
    diamondValue,
    lastDate: new Date().getTime()
  }
  localStorage.setItem('IdleTaco', JSON.stringify(data));
  console.log('Saved');
}
/**
 * Load from save
 */
function load() {
  if (!localStorage.getItem('IdleTaco')) {
    localStorage.setItem('IdleTaco', data);
  } else {
    money = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).money);
    let currentDate = new Date().getTime();
    let lastDate = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).lastDate);
    let offlineTime = currentDate - lastDate;
    let offlineFrames = offlineTime / 10;
    moneyValue = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).moneyValue);
    diamondValue = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).diamondValue);

    diamonds = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).diamonds);
    // Cheese:
    cheese.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['cheese.cost']);
    cheese.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['cheese.num']);
    cheese.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['cheese.total']);
    // Lettuce:
    lettuce.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['lettuce.cost']);
    lettuce.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['lettuce.num']);
    lettuce.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['lettuce.total']);
    // Sour Cream:
    sourCream.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['sourCream.cost']);
    sourCream.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['sourCream.num']);
    sourCream.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['sourCream.total']);
    // Meat:
    meat.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['meat.cost']);
    meat.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['meat.num']);
    meat.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['meat.total']);
    // Avocados:
    avocados.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['avocados.cost']);
    avocados.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['avocados.num']);
    avocados.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['avocados.total']);
    // Salsa:
    salsa.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['salsa.cost']);
    salsa.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['salsa.num']);
    salsa.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['salsa.total']);
    // Taco Yumminess:
    tacoYumminess.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tacoYumminess.cost']);
    tacoYumminess.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tacoYumminess.num']);
    tacoYumminess.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tacoYumminess.total']);
    // Tomatoes:
    tomatoes.cost = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tomatoes.cost']);
    tomatoes.num = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tomatoes.num']);
    tomatoes.total = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tomatoes.total']);
    // Evolve:
    evolveNum = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).evolveNum);
    multiplier = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).multiplier);
    // Misc.:
    clickTacoTimer = parseFloat(JSON.parse(localStorage.getItem('IdleTaco')).clickTacoTimer);

    cheese.max = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['cheese.max']);
    lettuce.max = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['lettuce.max']);
    sourCream.max = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['sourCream.max']);
    meat.max = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['meat.max']);
    tacoYumminess.max = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tacoYumminess.max']);
    tomatoes.max = parseFloat(JSON.parse(localStorage.getItem('IdleTaco'))['tomatoes.max']);
    if (offlineTime < 7200000) {
      money += offlineFrames * moneyValue;
      diamonds += offlineFrames * diamondValue;
      alert(`While you were away for ${Math.floor(offlineTime / 1000 / 60 / 60) + 'h '}${Math.floor(offlineTime / 1000 / 60) % 60 + 'm '}${Math.floor(offlineTime / 1000) % 60 + 's'}, you earned\n$${toValuesExt(offlineFrames * moneyValue)}\n💎${toValuesExt(offlineFrames * diamondValue)}`);
    } else {
      money += 720000 * moneyValue;
      diamonds += 720000 * diamondValue;
      alert(`While you were away for 2h, you earned \n$${toValuesExt(720000 * moneyValue)}\n💎${toValuesExt(720000 * diamondValue)}`);
    }
  }
  clickSound.play();
  document.getElementById('load').style.display = 'none';
  startGame();
}