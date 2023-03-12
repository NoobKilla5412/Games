import { displayResults, evalInput, scX, scY, xOffset, zoom } from ".";
import { draw } from "./draw";
import { drawGrid } from "./drawGrid";

export function dragElement(elmnt: HTMLElement) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(`title-${elmnt.id}`)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(`title-${elmnt.id}`)!.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    // @ts-ignore
    yOffset -= pos2;
    // @ts-ignore
    xOffset -= pos1;
    evalInput.value = Math.round((-xOffset / zoom / scX) * 10 ** 10) / 10 ** 10 + "";

    displayResults();
    drawGrid(scX, scY);
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    draw();
  }
}
