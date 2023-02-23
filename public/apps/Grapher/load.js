(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dragElement = void 0;
const _1 = require(".");
const draw_1 = require("./draw");
const drawGrid_1 = require("./drawGrid");
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(`title-${elmnt.id}`)) {
        // if present, the header is where you move the DIV from:
        document.getElementById(`title-${elmnt.id}`).onmousedown = dragMouseDown;
    }
    else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        // @ts-ignore
        _1.yOffset -= pos2;
        // @ts-ignore
        _1.xOffset -= pos1;
        _1.evalInput.value = Math.round((-_1.xOffset / _1.zoom / _1.scX) * 10 ** 10) / 10 ** 10 + "";
        (0, _1.displayResults)();
        (0, drawGrid_1.drawGrid)(_1.scX, _1.scY);
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        (0, draw_1.draw)();
    }
}
exports.dragElement = dragElement;

},{".":4,"./draw":2,"./drawGrid":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draw = void 0;
const _1 = require(".");
const drawGrid_1 = require("./drawGrid");
function draw() {
    (0, _1.setLines)(0);
    (0, drawGrid_1.drawGrid)(_1.scX, _1.scY);
    _1.equationsDiv.innerHTML = "";
    _1.equations.forEach(async (equation, i) => {
        (0, _1.graph)(equation[0]);
        _1.equationsDiv.innerHTML += `<div id="equation-${i}">
      y = ${(0, _1.HTMLEquation)(equation[1])}
      <div id="delete-${i}" class="delete">X</div>
    </div>`;
    });
    _1.equations.forEach((equation, i) => {
        let elem = document.getElementById(`delete-${i}`);
        if (elem)
            elem.onclick = (e) => {
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                _1.equations.splice(i, 1);
                draw();
            };
        else
            console.error(`Could not find element delete-${i}`);
        elem = document.getElementById(`equation-${i}`);
        if (elem)
            elem.onclick = () => {
                let newEquation = (0, _1.replaceEquation)(prompt("Equation?", equation[1]) || equation[1]);
                _1.equations.splice(i, 1, [(0, _1.parseEqn)(newEquation), newEquation]);
                draw();
            };
        else
            console.error(`Could not find element equation-${i}`);
    });
    let equationsSave = [];
    _1.equations.forEach((equation) => {
        equationsSave.push(equation[1]);
    });
    localStorage.setItem("equations", JSON.stringify(equationsSave));
    (0, _1.displayResults)();
}
exports.draw = draw;

},{".":4,"./drawGrid":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawGrid = void 0;
const _1 = require(".");
function drawGrid(scX, scY) {
    _1.c.clearRect(0, 0, _1.canvas.width, _1.canvas.height);
    _1.c.beginPath();
    scX = scX || 1;
    scY = scY || 1;
    const fontSize = Math.abs(_1.zoom / (10 / 3)) * ((scX + scY) / 2);
    _1.c.font = `${fontSize}px Arial`;
    _1.c.strokeStyle = "#00000050";
    _1.c.lineWidth = 1;
    const rounding = 10 ** scX.toString().split(".")[0].length;
    let x = _1.canvas.width / 2;
    while (x < _1.canvas.width + Math.abs(_1.xOffset)) {
        _1.c.moveTo(x + _1.xOffset, 0);
        _1.c.lineTo(x + _1.xOffset, _1.canvas.height);
        _1.c.fillText(Math.round(((x - _1.canvas.width / 2) / _1.zoom) * rounding) / rounding + "", x + _1.xOffset + 2, _1.canvas.height / 2 + _1.yOffset + fontSize);
        x += scX * _1.zoom;
    }
    let y = _1.canvas.height / 2;
    while (y < _1.canvas.height - _1.yOffset + fontSize) {
        _1.c.moveTo(0, y + _1.yOffset);
        _1.c.lineTo(_1.canvas.width, y + _1.yOffset);
        if (-(y - _1.canvas.height / 2) / _1.zoom != 0)
            _1.c.fillText(Math.round((-(y - _1.canvas.height / 2) / _1.zoom) * rounding) / rounding + "", _1.canvas.width / 2 + 2 + _1.xOffset, _1.yOffset + fontSize + y);
        y += scY * _1.zoom;
    }
    x = _1.canvas.width / 2;
    while (x > -_1.xOffset - fontSize) {
        _1.c.moveTo(x + _1.xOffset, -Math.abs(_1.yOffset));
        _1.c.lineTo(x + _1.xOffset, _1.canvas.height);
        if ((x - _1.canvas.width / 2) / _1.zoom != 0)
            _1.c.fillText(Math.round(((x - _1.canvas.width / 2) / _1.zoom) * rounding) / rounding + "", x + _1.xOffset + 2, _1.canvas.height / 2 + _1.yOffset + fontSize);
        x -= scX * _1.zoom;
    }
    y = _1.canvas.height / 2;
    while (y > -_1.yOffset - fontSize) {
        _1.c.moveTo(0, y + _1.yOffset);
        _1.c.lineTo(_1.canvas.width, y + _1.yOffset);
        if (-(y - _1.canvas.height / 2) / _1.zoom != 0)
            _1.c.fillText(Math.round((-(y - _1.canvas.height / 2) / _1.zoom) * rounding) / rounding + "", _1.canvas.width / 2 + 2 + _1.xOffset, _1.yOffset + fontSize + y);
        y -= scY * _1.zoom;
    }
    _1.c.stroke();
    _1.c.beginPath();
    _1.c.strokeStyle = "black";
    _1.c.lineWidth = 1;
    _1.c.moveTo(0, _1.canvas.height / 2 + _1.yOffset);
    _1.c.lineTo(_1.canvas.width + 0, _1.canvas.height / 2 + _1.yOffset);
    _1.c.moveTo(_1.canvas.width / 2 + _1.xOffset, 0);
    _1.c.lineTo(_1.canvas.width / 2 + _1.xOffset, _1.canvas.height);
    _1.c.stroke();
}
exports.drawGrid = drawGrid;

},{".":4}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumArray = exports.displayResults = exports.evaluateEqn = exports.evalInput = exports.fakeExponentialGraph = exports.equations = exports.HTMLEquation = exports.replaceEquation = exports.addEquation = exports.equationsDiv = exports.graph = exports.parseEqn = exports.yOffset = exports.xOffset = exports.setLines = exports.lines = exports.zoom = exports.scY = exports.scX = exports.c = exports.canvas = void 0;
const dragElement_1 = require("./dragElement");
const draw_1 = require("./draw");
exports.canvas = document.createElement("canvas");
// let zoom = prompt("Zoom?") || "100";
exports.canvas.width = innerWidth;
exports.canvas.height = innerHeight;
exports.c = exports.canvas.getContext("2d");
document.body.append(exports.canvas);
addEventListener("resize", () => {
    exports.canvas.width = innerWidth;
    exports.canvas.height = innerHeight;
    (0, draw_1.draw)();
});
// let x: number[] = [0, 0, 0, 0];
// let y: number[] = [0, 0, 0, 0];
// let width = 2;
// let interval = setInterval(() => {
//   const controllers = navigator.getGamepads();
//   for (let i = 0; i < 4; i++) {
//     const controller = controllers[i]!;
//     if (controller) {
//       // // if (Math.abs(controller.axes[0]) >= 0.2 || controller.buttons[14].pressed || controller.buttons[15].pressed)
//       // //   x[i].push(controller.axes[0] - controller.buttons[14].value + controller.buttons[15].value);
//       // // if (Math.abs(controller.axes[1]) >= 0.2 || controller.buttons[12].pressed || controller.buttons[13].pressed)
//       // //   y[i].push(controller.axes[1] - controller.buttons[12].value + controller.buttons[13].value);
//       // if (Math.abs(controller.axes[0]) >= 0.2) x[i] += controller.axes[0];
//       // if (Math.abs(controller.axes[1]) >= 0.2) y[i] += controller.axes[1];
//       // if (controller.buttons[6].touched) {
//       //   width -= controller.buttons[6].value;
//       //   if (width < 1) width = 1;
//       // }
//       // if (controller.buttons[7].touched) {
//       //   width += controller.buttons[7].value;
//       // }
//       // if (controller.buttons[0].pressed) c.fillRect(x[i] - width / 2, y[i] - width / 2, width, width);
//       // else if (controller.buttons[1].pressed) c.clearRect(x[i] - width / 2, y[i] - width / 2, width, width);
//       // else if (controller.buttons[2].pressed) {
//       //   c.beginPath();
//       //   c.arc(x[i], y[i], width, 0, 2 * Math.PI);
//       //   c.stroke();
//       // }
//     }
//   }
//   console.log(width);
//   // console.log(x);
// }, 1 / 60);
// setInterval(() => {
//   // for (let i = 0; i < x.length; i++) {
//   //   // let currentX = 0;
//   //   // let currentY = 0;
//   //   // x[i].forEach((element, j) => {
//   //   //   currentX += element;
//   //   //   currentY += y[i][j];
//   //   //   c.lineTo(currentX, currentY);
//   //   // });
//   //   c.lineTo(sumArray(x), sumArray(y));
//   // }
//   // console.log(sumArray(x));
//   // c.stroke();
// });
exports.scX = 1;
exports.scY = 2;
exports.zoom = 100 / (exports.scX + exports.scY);
const colors = ["red", "blue", "green", "purple"];
exports.lines = 0;
const setLines = (value) => {
    exports.lines = value;
};
exports.setLines = setLines;
exports.xOffset = 0;
exports.yOffset = 0;
function parseEqn(eqn) {
    eqn = eqn
        .replace(/(\d)x/g, "$1 * x")
        .replace(/(.+?)\^(\d)/g, "$1 ** $2")
        .replace(/([^x\d*/\-+\^\s\(\).]+)/g, "Math.$1")
        .replace(/(\w{2,32})\(([^]+?)\)/g, "$1($2)")
        .replace(/\bPI\b/gi, "PI")
        .replace(/\be\b/gi, "E");
    if (eqn.includes(";"))
        throw new Error("Invalid character");
    return new Function("x", `return ${eqn};`);
}
exports.parseEqn = parseEqn;
function graph(eqn) {
    exports.c.strokeStyle = colors[exports.lines++ % colors.length];
    let x = -exports.canvas.width / 2 - exports.xOffset;
    exports.c.beginPath();
    while (x < exports.canvas.width + Math.abs(exports.xOffset)) {
        exports.c.lineTo(x + exports.canvas.width / 2 + exports.xOffset, -eqn(x / exports.zoom) * exports.zoom + exports.canvas.height / 2 + exports.yOffset);
        x++;
    }
    exports.c.stroke();
}
exports.graph = graph;
exports.equationsDiv = document.getElementById("equations");
function addEquation(equation) {
    let functionEqn = parseEqn(replaceEquation(equation));
    exports.equations.push([functionEqn, replaceEquation(equation)]);
    (0, draw_1.draw)();
}
exports.addEquation = addEquation;
function replaceEquation(equation) {
    return equation
        .replace(/\+-/g, "-")
        .replace(/-(\d+)\+\1/, "+0")
        .replace(/(\d+)-\1/, "+0")
        .replace(/[\+-]0/, "");
}
exports.replaceEquation = replaceEquation;
function HTMLEquation(equation) {
    return equation.replace(/([^\^]+?)\^(\d+)/g, "$1<sup>$2</sup>");
}
exports.HTMLEquation = HTMLEquation;
exports.equations = [];
let tempEquations = JSON.parse(localStorage.getItem("equations") || "[]");
tempEquations.forEach((equation) => {
    exports.equations.push([parseEqn(equation), equation]);
});
(0, dragElement_1.dragElement)(exports.canvas);
function fakeExponentialGraph() {
    for (let i = 0; i < 100; i++) {
        addEquation(i + "x+" + -(i ** 2));
        addEquation(-i + "x+" + -(i ** 2));
    }
}
exports.fakeExponentialGraph = fakeExponentialGraph;
// addEquation("x^2");
// fakeExponentialGraph();
document.getElementById("add").addEventListener("click", () => {
    let equation = prompt("Equation?");
    if (equation)
        addEquation(equation);
});
exports.evalInput = document.getElementById("eval-input");
const results = document.getElementById("results");
document.getElementById("eval-form").addEventListener("submit", (e) => {
    e.preventDefault();
    let x = -+exports.evalInput.value * exports.zoom * exports.scX;
    if (!Number.isNaN(x)) {
        exports.xOffset = x;
        (0, draw_1.draw)();
    }
});
function evaluateEqn(eqn, x) {
    return Math.round(eqn(x / exports.zoom) * 10 ** 10) / 10 ** 10;
}
exports.evaluateEqn = evaluateEqn;
function displayResults() {
    let x = +exports.evalInput.value * exports.zoom * exports.scX;
    results.innerHTML = "";
    exports.equations.forEach((equation, i) => {
        results.innerHTML += `<div id="result-${i}">y = ${HTMLEquation(equation[1])}: ${evaluateEqn(equation[0], x)}</div>`;
    });
    exports.equations.forEach((equation, i) => {
        document.getElementById(`result-${i}`).addEventListener("click", () => {
            exports.yOffset = evaluateEqn(equation[0], x) * exports.zoom * exports.scY;
            (0, draw_1.draw)();
        });
    });
}
exports.displayResults = displayResults;
exports.evalInput.value = -exports.xOffset / exports.zoom / exports.scX + "";
exports.canvas.addEventListener("wheel", (e) => {
    if (e.deltaY > 1) {
        exports.zoom -= 1.5 / ((exports.scX + exports.scY) / 2);
        exports.xOffset += (e.clientX - exports.canvas.width + exports.canvas.width / 2) / exports.zoom;
        exports.yOffset += (e.clientY - exports.canvas.height + exports.canvas.height / 2) / exports.zoom;
        if (exports.zoom < 2 / ((exports.scX + exports.scY) / 2)) {
            exports.zoom = 2 / ((exports.scX + exports.scY) / 2);
        }
        console.log(exports.zoom);
    }
    else {
        exports.zoom += 1.5 / ((exports.scX + exports.scY) / 2);
        exports.xOffset -= (e.clientX - exports.canvas.width + exports.canvas.width / 2) / exports.zoom;
        exports.yOffset -= (e.clientY - exports.canvas.height + exports.canvas.height / 2) / exports.zoom;
    }
    (0, draw_1.draw)();
});
function sumArray(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        for (let j = 0; j < element.length; j++) {
            const element1 = element[j];
            sum += element1;
        }
    }
    return sum;
}
exports.sumArray = sumArray;
(0, draw_1.draw)();

},{"./dragElement":1,"./draw":2}]},{},[4]);
