let chocolate = new Upgrade({
  name: 'chocolate',
  type: 'money',
  max: 10,
  cost: 20,
  num: 0,
  total: 0,
  totalUp: 10,
  costUp: 1.5
});
let lettuce = new Upgrade({
  name: 'lettuce',
  type: 'money',
  max: 30,
  cost: 30,
  num: 0,
  total: 0,
  totalUp: 15,
  costUp: 1.4
});
let sourCream = new Upgrade({
  name: 'sourCream',
  type: 'money',
  max: 50,
  cost: 10,
  num: 0,
  total: 0,
  totalUp: 0.01,
  costUp: 1.3
});
let meat = new Upgrade({
  name: 'meat',
  type: 'money',
  action: '*',
  max: 2,
  cost: 2500,
  num: 0,
  total: 1,
  totalUp: 2,
  costUp: 3
});
let avocados = new Upgrade({
  name: 'avocados',
  type: 'money',
  max: 20,
  cost: 25,
  num: 0,
  total: 0,
  totalUp: 8,
  costUp: 1.4
});
let salsa = new Upgrade({
  name: 'salsa',
  type: 'money',
  action: '*',
  max: 2,
  cost: 250000,
  num: 0,
  total: 1,
  totalUp: 10,
  costUp: 2.5
});
let tacoYumminess = new Upgrade({
  name: 'tacoYumminess',
  type: 'diamond',
  max: 100,
  cost: 1000,
  num: 0,
  total: 0,
  totalUp: 5,
  costUp: 1.3
});
let tomatoes = new Upgrade({
  name: 'tomatoes',
  type: 'diamond',
  max: 100,
  cost: 600,
  num: 0,
  total: 0,
  totalUp: 10,
  costUp: 1.3
});
let upgrades = [chocolate, lettuce, sourCream, meat, avocados, salsa];
let diamondUpgrades = [tacoYumminess, tomatoes];