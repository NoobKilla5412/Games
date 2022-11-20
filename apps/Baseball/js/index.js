var first = [
  {
    name: 'foul',
    weight: 1
  },
  {
    name: 'ball',
    weight: 1
  },
  {
    name: 'hit',
    weight: 2
  },
  {
    name: 'strike',
    weight: 4
  }
]
var out = [
  {
    name: 'out',
    weight: 4
  },
  {
    name: 'safe',
    weight: 6
  }
]
var bases = {
  first: false,
  second: false,
  third: false
}
var team = 0;
var weightedFirst = [];
var weightedOut = [];
var totalWeightFirst = 0;
var totalWeightOut = 0;
var scores = {
  score: [
    0,
    0
  ],
  strikes: 0,
  balls: 0,
  outs: 0
}
function weight(array) {
  var finalList = [];
  array.forEach(element => {
    for (let i = 0; i < element.weight; i++) {
      finalList.push(element);
    }
  });
  return finalList;
}
function weightTotal(array) {
  var finalCount = 0;
  array.forEach(element => {
    finalCount += element.weight;
  });
  return finalCount;
}
function run() {
  if (!bases.first) {
    bases.first = true;
  } else if (bases.first && bases.second && bases.third) {
    scores.score[team]++;
    bases.first = false;
    bases.second = false;
    bases.third = false;
  } else if (bases.first && bases.second) {
    bases.first = false;
    bases.second = false;
    bases.third = true;
  } else if (bases.first) {
    bases.first = false;
    bases.second = true;
  }
}

totalWeightFirst = weightTotal(first);
totalWeightOut = weightTotal(out);
first = weight(first);
out = weight(out);
function randomOut() {
  var random = Math.floor(Math.random() * totalWeightOut);
  return out[random].name == 'out';
}
const scoresDiv = document.getElementById('score');
const action = document.getElementById('action');
function testHit() {
  var randomAction = Math.floor(Math.random() * totalWeightFirst);
  var whatToDo = first[randomAction] || '';
  if (whatToDo.name == 'foul') {
    if (randomOut()) {
      scores.outs++;
    } else if (scores.strikes != 2) {
      scores.strikes++;
    }
  } else if (whatToDo.name == 'ball') {
    scores.balls++;
  } else if (whatToDo.name == 'hit') {
    run();
  } else if (whatToDo.name == 'strike') {
    scores.strikes++;
  }
  action.innerHTML = whatToDo.name;
}

var interval = setInterval(() => {
  if (scores.balls >= 4) {
    scores.balls = 0;
    run();
  }
  if (scores.strikes >= 3) {
    scores.strikes = 0;
    scores.outs++;
  }
  if (scores.outs >= 3) {
    messageBox.innerHTML = 'Change Sides <button onclick="messageBox.innerHTML = \'\';">Ok</button>';
    scores = {
      score: scores.score,
      strikes: 0,
      balls: 0,
      outs: 0
    }
  }
  scoresDiv.innerHTML =
    `Score: ${scores.score[0]}-${scores.score[1]}<br>
    Strikes: ${scores.strikes}<br>
    Balls: ${scores.balls}<br>
    Outs: ${scores.outs}<br>
    Bases: ${bases.first ? 'First' : ''}${bases.second ? ', Second' : ''}${bases.third ? ', Third' : ''}`;
}, 10);