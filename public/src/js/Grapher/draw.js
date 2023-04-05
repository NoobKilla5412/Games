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
