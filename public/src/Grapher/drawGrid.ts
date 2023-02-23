import { c, canvas, xOffset, yOffset, zoom } from ".";

export function drawGrid(scX?: number, scY?: number) {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  scX = scX || 1;
  scY = scY || 1;
  const fontSize = Math.abs(zoom / (10 / 3)) * ((scX + scY) / 2);
  c.font = `${fontSize}px Arial`;
  c.strokeStyle = "#00000050";
  c.lineWidth = 1;
  const rounding = 10 ** scX.toString().split(".")[0].length;
  let x = canvas.width / 2;
  while (x < canvas.width + Math.abs(xOffset)) {
    c.moveTo(x + xOffset, 0);
    c.lineTo(x + xOffset, canvas.height);
    c.fillText(Math.round(((x - canvas.width / 2) / zoom) * rounding) / rounding + "", x + xOffset + 2, canvas.height / 2 + yOffset + fontSize);
    x += scX * zoom;
  }
  let y = canvas.height / 2;
  while (y < canvas.height - yOffset + fontSize) {
    c.moveTo(0, y + yOffset);
    c.lineTo(canvas.width, y + yOffset);
    if (-(y - canvas.height / 2) / zoom != 0)
      c.fillText(Math.round((-(y - canvas.height / 2) / zoom) * rounding) / rounding + "", canvas.width / 2 + 2 + xOffset, yOffset + fontSize + y);
    y += scY * zoom;
  }

  x = canvas.width / 2;
  while (x > -xOffset - fontSize) {
    c.moveTo(x + xOffset, -Math.abs(yOffset));
    c.lineTo(x + xOffset, canvas.height);
    if ((x - canvas.width / 2) / zoom != 0)
      c.fillText(Math.round(((x - canvas.width / 2) / zoom) * rounding) / rounding + "", x + xOffset + 2, canvas.height / 2 + yOffset + fontSize);
    x -= scX * zoom;
  }
  y = canvas.height / 2;
  while (y > -yOffset - fontSize) {
    c.moveTo(0, y + yOffset);
    c.lineTo(canvas.width, y + yOffset);
    if (-(y - canvas.height / 2) / zoom != 0)
      c.fillText(Math.round((-(y - canvas.height / 2) / zoom) * rounding) / rounding + "", canvas.width / 2 + 2 + xOffset, yOffset + fontSize + y);
    y -= scY * zoom;
  }
  c.stroke();
  c.beginPath();
  c.strokeStyle = "black";
  c.lineWidth = 1;
  c.moveTo(0, canvas.height / 2 + yOffset);
  c.lineTo(canvas.width + 0, canvas.height / 2 + yOffset);
  c.moveTo(canvas.width / 2 + xOffset, 0);
  c.lineTo(canvas.width / 2 + xOffset, canvas.height);
  c.stroke();
}
