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
