if (!window) var prompt = require("prompt-sync")();
var min = 1;
var max = 1000;
function getRandom() {
  return Math.floor(Math.random() * (max - min) + min);
}
function main() {
  // var randomNum = getRandom();
  var tries = 0;
  var interval = setInterval(() => {
    var randomInt = getRandom();
    // console.log("Guess:", randomInt);
    tries++;
    var ltGt = prompt(`${randomInt} is greater or less than number (1 = >; 0 = <; 2 = ==)${window ? "" : "\n> "}`);
    if (!ltGt) {
      clearInterval(interval);
      return;
    }
    if (ltGt == 0) {
      min = randomInt;
    } else if (ltGt == 1) {
      max = randomInt;
    } else if (ltGt == 2) {
      clearInterval(interval);
      console.log("Tries:", tries);
    } else if (ltGt == "exit") {
      clearInterval(interval);
    }
  }, 100);
}
main();
