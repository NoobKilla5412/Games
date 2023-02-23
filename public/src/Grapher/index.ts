import { dragElement } from "./dragElement";
import { draw } from "./draw";

export const canvas = document.createElement("canvas");
// let zoom = prompt("Zoom?") || "100";
canvas.width = innerWidth;
canvas.height = innerHeight;
export const c = canvas.getContext("2d")!;
document.body.append(canvas);

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  draw();
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
export let scX = 1;
export let scY = 2;
export let zoom = 100 / (scX + scY);

const colors = ["red", "blue", "green", "purple"];

export let lines = 0;

export const setLines = (value: typeof lines) => {
  lines = value;
};

export let xOffset = 0;
export let yOffset = 0;

export function parseEqn(eqn: string) {
  eqn = eqn
    .replace(/(\d)x/g, "$1 * x")
    .replace(/(.+?)\^(\d)/g, "$1 ** $2")
    .replace(/([^x\d*/\-+\^\s\(\).]+)/g, "Math.$1")
    .replace(/(\w{2,32})\(([^]+?)\)/g, "$1($2)")
    .replace(/\bPI\b/gi, "PI")
    .replace(/\be\b/gi, "E");
  if (eqn.includes(";")) throw new Error("Invalid character");
  return new Function("x", `return ${eqn};`);
}

export function graph(eqn: Function) {
  c.strokeStyle = colors[lines++ % colors.length];
  let x = -canvas.width / 2 - xOffset;
  c.beginPath();
  while (x < canvas.width + Math.abs(xOffset)) {
    c.lineTo(x + canvas.width / 2 + xOffset, -eqn(x / zoom) * zoom + canvas.height / 2 + yOffset);
    x++;
  }
  c.stroke();
}

export const equationsDiv = document.getElementById("equations")!;

export function addEquation(equation: string) {
  let functionEqn = parseEqn(replaceEquation(equation));
  equations.push([functionEqn, replaceEquation(equation)]);
  draw();
}

export function replaceEquation(equation: string) {
  return equation
    .replace(/\+-/g, "-")
    .replace(/-(\d+)\+\1/, "+0")
    .replace(/(\d+)-\1/, "+0")
    .replace(/[\+-]0/, "");
}

export function HTMLEquation(equation: string) {
  return equation.replace(/([^\^]+?)\^(\d+)/g, "$1<sup>$2</sup>");
}

export let equations: [Function, string][] = [];
let tempEquations: string[] = JSON.parse(localStorage.getItem("equations") || "[]");
tempEquations.forEach((equation) => {
  equations.push([parseEqn(equation), equation]);
});

dragElement(canvas);

export function fakeExponentialGraph() {
  for (let i = 0; i < 100; i++) {
    addEquation(i + "x+" + -(i ** 2));
    addEquation(-i + "x+" + -(i ** 2));
  }
}

// addEquation("x^2");
// fakeExponentialGraph();

document.getElementById("add")!.addEventListener("click", () => {
  let equation = prompt("Equation?");
  if (equation) addEquation(equation);
});
export const evalInput = <HTMLInputElement>document.getElementById("eval-input");
const results = document.getElementById("results")!;

document.getElementById("eval-form")!.addEventListener("submit", (e) => {
  e.preventDefault();
  let x = -+evalInput.value * zoom * scX;
  if (!Number.isNaN(x)) {
    xOffset = x;
    draw();
  }
});

export function evaluateEqn(eqn: Function, x: number) {
  return Math.round(eqn(x / zoom) * 10 ** 10) / 10 ** 10;
}

export function displayResults() {
  let x = +evalInput.value * zoom * scX;
  results.innerHTML = "";
  equations.forEach((equation, i) => {
    results.innerHTML += `<div id="result-${i}">y = ${HTMLEquation(equation[1])}: ${evaluateEqn(equation[0], x)}</div>`;
  });
  equations.forEach((equation, i) => {
    document.getElementById(`result-${i}`)!.addEventListener("click", () => {
      yOffset = evaluateEqn(equation[0], x) * zoom * scY;
      draw();
    });
  });
}

evalInput.value = -xOffset / zoom / scX + "";

canvas.addEventListener("wheel", (e) => {
  if (e.deltaY > 1) {
    zoom -= 1.5 / ((scX + scY) / 2);
    xOffset += (e.clientX - canvas.width + canvas.width / 2) / zoom;
    yOffset += (e.clientY - canvas.height + canvas.height / 2) / zoom;
    if (zoom < 2 / ((scX + scY) / 2)) {
      zoom = 2 / ((scX + scY) / 2);
    }
    console.log(zoom);
  } else {
    zoom += 1.5 / ((scX + scY) / 2);
    xOffset -= (e.clientX - canvas.width + canvas.width / 2) / zoom;
    yOffset -= (e.clientY - canvas.height + canvas.height / 2) / zoom;
  }
  draw();
});

export function sumArray(array: number[][]) {
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

draw();
