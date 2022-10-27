var version = '1.7.3';
var multiplier = 10;
var keys = [];
var frameNo = 0;
var clickTacoTimer = 0;
var money = 0;
var diamonds = 0;
var moneyRate = 1;
var displayMoneyRate = 100;
var diamondRate = 0.005;
var moneyValue = 0.05;
var diamondValue = 0.0005;
var evolveNum = 0;
var moneyPerSecNextEvolve;
var musicActive = false;
var keyCheese = '1';
var keyLettuce = '2';
var keySourCream = '3';
var keyMeat = '4';
var keyAvocadoes = '5';
var keySalsa = '6';
var keyTacoYumminess = 'n';
var keyTomatoes = 'm';
var keyEvolve = 'e';
var clickSound = new Audio('sound/click.wav');
var clickUpgrade = new Audio('sound/upgradeClick.wav');
var backgroundMusic;
var buttons = {};
var infoActive = false;
var optionsActive = false;
var maxUpgrades = false;
const tacos = [
  "Plain Taco",
  "Meaty Taco",
  "Soft Taco",
  "Deluxe Soft Taco"
];