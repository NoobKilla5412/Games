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
