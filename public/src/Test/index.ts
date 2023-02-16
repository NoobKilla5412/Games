const canvas = document.querySelector("canvas")!;
canvas.width += 100;
const c = canvas.getContext("2d")!;

const level: number[][] | string[][] = [
  [1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1]
];

const colorMap: {
  [index: string]: string;
  R: "red";
  G: "green";
  B: "blue";
  Y: "yellow";
  O: "orange";
  I: "indigo";
  V: "violet";
  BL: "black";
} = {
  R: "red",
  G: "green",
  B: "blue",
  Y: "yellow",
  O: "orange",
  I: "indigo",
  V: "violet",
  BL: "black"
};

const brickGap: number = 0;
const brickWidth: number = 16;
const brickHeight: number = 16;

const wallSize: number = 12;
const bricks: {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
}[] = [];
function gen(type: string = "color") {
  for (let row = 0; row < level.length; row++) {
    for (let col = 0; col < level[row].length; col++) {
      const colorCode = level[row][col];
      if (type == "color") {
        var resColor: string = "#0000";
        if (colorCode.toString()[0] == "#") {
          resColor = colorCode.toString();
        } /*  else if (colorCode.slice(0, 3) == 'rgb(') {
      resColor = colorCode;
    } */ else if (colorCode != " " && colorCode != "  " && colorCode) {
          resColor = colorMap[colorCode.toString().toUpperCase()];
        }
      } else {
        if (colorCode) resColor = "black";
        else resColor = "white";
      }

      bricks.push({
        x: wallSize + (brickWidth + brickGap) * col,
        y: wallSize + (brickHeight + brickGap) * row,
        color: resColor,
        width: brickWidth,
        height: brickHeight
      });
    }
  }
}
gen("1");

setInterval(() => {
  bricks.forEach((brick) => {
    c.fillStyle = brick.color;
    c.fillRect(brick.x, brick.y, brick.width, brick.height);
  });
}, 10);
// function genFunction(arg0: any): Function {
//   return () => {
//     return () => {
//       return () => {
//         return ;
//       };
//     };
//   };
// }
// function a() {
//   return genFunction('hi');
// }
// console.log(a()()());
