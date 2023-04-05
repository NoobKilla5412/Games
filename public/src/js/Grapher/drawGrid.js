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
