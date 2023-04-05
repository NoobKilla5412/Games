import express from "express";
import fs from "fs";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://os.mechnosense.org",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket", "polling"],
  allowEIO3: true
});
const port = 2102;

let dirname = "C:\\Websites\\Noob Killa's OS\\public\\games\\Pellet-Chomper";

let users = 0;

app.get("/", (req, res) => {
  res.send("<div></div>");
});

io.on("connection", (socket) => {
  if (users == 0) socket.emit("msg", "You are the first to play, try to get the highest score!");
  users++;
  socket.on("highScore", (newHighScore: number) => {
    console.log("newHighScore: ", newHighScore);
    fs.readFile(dirname + "/highScore.txt", (_, data) => {
      let oldHighScore = +data.toString();
      if (+newHighScore > oldHighScore) {
        fs.writeFile(dirname + "/highScore.txt", "" + newHighScore, {}, () => {});
      }
    });
  });
  socket.on("getHighScore", () => {
    fs.readFile(dirname + "/highScore.txt", (_, data) => {
      socket.emit("highScore", +data.toString());
    });
  });
});

io.listen(port);
console.log(`listening on *:${port}`);
