const express = require("express");
const app = express();
const app2 = express();
const socketIO = require("socket.io");
const server = require("http").Server(app);
const server2 = require("http").Server(app2);
const io = socketIO(server);
const io2 = socketIO(server2);

module.exports = {express,app,app2,socketIO,server,server2,io,io2};