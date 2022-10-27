function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function resetValues() {
  chocolate.cost = multiplier * 20
  chocolate.num = 0
  chocolate.total = 0
  lettuce.cost = multiplier * 30
  lettuce.num = 0
  lettuce.total = 0
  sourCream.cost = multiplier * 10
  sourCream.num = 0
  sourCream.total = 0
  meat.cost = multiplier * 2500
  meat.num = 0
  meat.total = 1
  avocados.cost = multiplier * 25
  avocados.num = 0
  avocados.total = 0
  salsa.cost = multiplier * 250000
  salsa.num = 0
  salsa.total = 1
}
function evolve() {
  if (evolveNum <= 100) {
    newEvolve()
  }
}
function newEvolve() {
  if (displayMoneyRate >= moneyPerSecNextEvolve) {
    multiplier = 7 * (2 ** evolveNum + 2)

    moneyPerSecNextEvolve = (2 ** (evolveNum + 2)) * 1000 * 1.5

    money = 0
    frameNo = 0

    evolveNum++
    clickSound.play()
    chocolate.max += 5
    lettuce.max += 5
    sourCream.max += 5
    tacoYumminess.max += 2
    tomatoes.max += 2
    resetValues()
  }
}
function startGame() {
  document.getElementById('start').style.display = 'none'
  document.getElementById('load').style.display = 'none'
  document.getElementById('stats').style.display = 'block'
  document.getElementById('save').style.display = 'inline'
  document.getElementById('exit').style.display = 'inline'
  document.getElementById('evolveButton').style.display = 'inline'
  for (let i = 0; i < upgrades.length + diamondUpgrades.length; i++) {
    document.getElementsByClassName('upgrades')[i].style.display = 'inline'
  }
  setInterval(animate, 10)

  window.addEventListener('keydown', function (e) {
    keys = (keys || [])
    keys[e.key] = true
  })
  window.addEventListener('keyup', function (e) {
    keys[e.key] = false
  })
  gameRunning = true
  console.log('Loaded')
  setInterval(save, 2500)
}
function everyInterval(n) {
  if ((frameNo / n) % 1 == 0) { return true }
  return false
}
function info() {
  if (!infoActive) {
    document.getElementById('info').style.display = 'block'
    infoActive = true
  } else if (infoActive) {
    document.getElementById('info').style.display = 'none'
    infoActive = false
  }
}
function options() {
  if (!optionsActive) {
    document.getElementById('options').style.display = 'block'
    optionsActive = true
  } else if (optionsActive) {
    document.getElementById('options').style.display = 'none'
    optionsActive = false
  }
}
function keybinds(bind, newKey) {
  // console.log('bind: ' + bind)
  // console.log('newKey: ' + newKey)
  // console.log('keyEvolve: ' + keyEvolve)
  // console.log('newKey != keyEvolve: ' + (newKey != keyEvolve))
  if (newKey && !(newKey == (keyChocolate || keyLettuce || keySourCream || keyMeat || keyAvocadoes || keySalsa || keyTacoYumminess || keyTomatoes || keyEvolve)) && (newKey.length == 1) && (newKey != keyEvolve)) {
    switch (bind) {
      case 'chocolate':
        keyChocolate = newKey
        break
      case 'lettuce':
        keyLettuce = newKey
        break
      case 'sourCream':
        keySourCream = newKey
        break
      case 'meat':
        keyMeat = newKey
        break
      case 'avocados':
        keyAvocadoes = newKey
        break
      case 'salsa':
        keySalsa = newKey
      case 'tacoYumminess':
        keyTacoYumminess = newKey
        break
      case 'tomatoes':
        keyTomatoes = newKey
        break
      case 'evolve':
        keyEvolve = newKey
        break
      default:
        alert('Key Error')
        console.error('Key Error')
        break
    }
  } else if (newKey.length != 1) {
    alert('Error: Invalid key')
    console.error('Error: Invalid key')
  } else {
    alert('Error: Key already bound')
    console.error('Error: Key already bound')
  }
}
function clickTaco() {
  if (gameRunning) {
    money += moneyValue
    // clickSound.play()
  }
}
let saveData = {
  "money": 0,
  "diamonds": 0,
  "chocolate.cost": 0,
  "chocolate.num": 0,
  "chocolate.total": 0,
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
  "evolveNum": 0,
  "multiplier": 0,
  "chocolate.max": 0,
  "lettuce.max": 0,
  "sourCream.max": 0,
  "meat.max": 0,
  "avocados.max": 0,
  "salsa.max": 0,
  "tacoYumminess.max": 0,
  "tomatoes.max": 0
}
function load() {
  if (!localStorage.getItem('TacoClicker')) {
    localStorage.setItem('TacoClicker', JSON.stringify(saveData))
  } else {
    money = parseFloat(JSON.parse(localStorage.getItem('TacoClicker')).money)
    diamonds = parseFloat(JSON.parse(localStorage.getItem('TacoClicker')).diamonds)

    // chocolate:
    chocolate.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['chocolate.cost'])
    chocolate.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['chocolate.num'])
    chocolate.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['chocolate.total'])
    // Lettuce:
    lettuce.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['lettuce.cost'])
    lettuce.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['lettuce.num'])
    lettuce.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['lettuce.total'])
    // Sour Cream:
    sourCream.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['sourCream.cost'])
    sourCream.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['sourCream.num'])
    sourCream.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['sourCream.total'])
    // Meat:
    meat.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['meat.cost'])
    meat.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['meat.num'])
    meat.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['meat.total'])
    // Avocados:
    avocados.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['avocados.cost'])
    avocados.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['avocados.num'])
    avocados.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['avocados.total'])
    // Salsa:
    salsa.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['salsa.cost'])
    salsa.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['salsa.num'])
    salsa.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['salsa.total'])
    // Taco Yumminess:
    tacoYumminess.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tacoYumminess.cost'])
    tacoYumminess.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tacoYumminess.num'])
    tacoYumminess.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tacoYumminess.total'])
    // Tomatoes:
    tomatoes.cost = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tomatoes.cost'])
    tomatoes.num = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tomatoes.num'])
    tomatoes.total = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tomatoes.total'])
    // Evolve:
    evolveNum = parseFloat(JSON.parse(localStorage.getItem('TacoClicker')).evolveNum)
    multiplier = parseFloat(JSON.parse(localStorage.getItem('TacoClicker')).multiplier)
    // Misc.:
    chocolate.max = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['chocolate.max'])
    lettuce.max = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['lettuce.max'])
    sourCream.max = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['sourCream.max'])
    meat.max = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['meat.max'])
    tacoYumminess.max = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tacoYumminess.max'])
    tomatoes.max = parseFloat(JSON.parse(localStorage.getItem('TacoClicker'))['tomatoes.max'])
    clickSound.play()
    document.getElementById('load').style.display = 'none'
    startGame()
  }
}
function save() {
  saveData = {
    "money": money,
    "diamonds": diamonds,
    "chocolate.cost": chocolate.cost,
    "chocolate.num": chocolate.num,
    "chocolate.total": chocolate.total,
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
    "evolveNum": evolveNum,
    "multiplier": multiplier,
    "moneyPerSecNextEvolve": moneyPerSecNextEvolve,
    "chocolate.max": chocolate.max,
    "lettuce.max": lettuce.max,
    "sourCream.max": sourCream.max,
    "meat.max": meat.max,
    "avocados.max": avocados.max,
    "salsa.max": salsa.max,
    "tacoYumminess.max": tacoYumminess.max,
    "tomatoes.max": tomatoes.max
  }
  localStorage.setItem('TacoClicker', JSON.stringify(saveData))
  console.log('saved')
}