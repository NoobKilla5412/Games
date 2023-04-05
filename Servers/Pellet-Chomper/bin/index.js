"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
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
    if (users == 0)
        socket.emit("msg", "You are the first to play, try to get the highest score!");
    users++;
    socket.on("highScore", (newHighScore) => {
        console.log("newHighScore: ", newHighScore);
        fs_1.default.readFile(dirname + "/highScore.txt", (_, data) => {
            let oldHighScore = +data.toString();
            if (+newHighScore > oldHighScore) {
                fs_1.default.writeFile(dirname + "/highScore.txt", "" + newHighScore, {}, () => { });
            }
        });
    });
    socket.on("getHighScore", () => {
        fs_1.default.readFile(dirname + "/highScore.txt", (_, data) => {
            socket.emit("highScore", +data.toString());
        });
    });
});
io.listen(port);
console.log(`listening on *:${port}`);
