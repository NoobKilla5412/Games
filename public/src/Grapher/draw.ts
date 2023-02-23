import { HTMLEquation, displayResults, equations, equationsDiv, graph, parseEqn, replaceEquation, scX, scY, setLines } from ".";
import { drawGrid } from "./drawGrid";

export function draw() {
  setLines(0);
  drawGrid(scX, scY);
  equationsDiv.innerHTML = "";
  equations.forEach(async (equation, i) => {
    graph(equation[0]);
    equationsDiv.innerHTML += `<div id="equation-${i}">
      y = ${HTMLEquation(equation[1])}
      <div id="delete-${i}" class="delete">X</div>
    </div>`;
  });
  equations.forEach((equation, i) => {
    let elem = document.getElementById(`delete-${i}`);
    if (elem)
      elem.onclick = (e) => {
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        equations.splice(i, 1);
        draw();
      };
    else console.error(`Could not find element delete-${i}`);

    elem = document.getElementById(`equation-${i}`);
    if (elem)
      elem.onclick = () => {
        let newEquation = replaceEquation(prompt("Equation?", equation[1]) || equation[1]);
        equations.splice(i, 1, [parseEqn(newEquation), newEquation]);
        draw();
      };
    else console.error(`Could not find element equation-${i}`);
  });
  let equationsSave: string[] = [];
  equations.forEach((equation) => {
    equationsSave.push(equation[1]);
  });
  localStorage.setItem("equations", JSON.stringify(equationsSave));
  displayResults();
}
