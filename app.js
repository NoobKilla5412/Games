const express = require('express');
const app = express();
const http = require('http');
const serv = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(serv);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/', express.static(__dirname + '/public/'));
serv.listen(2000);

// setInterval(() => { }, 10000);
