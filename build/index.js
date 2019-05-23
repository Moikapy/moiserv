"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = require("express")();

var http = require("http").createServer(app);

var io = require("socket.io")(http);

var port = process.env.PORT || 5000;
app.use((0, _cors["default"])());
io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("chat message", function (msg) {
    if (msg.length !== 0) {
      io.emit("chat message", msg);
    }
  });
});
http.listen(port, function () {
  console.log("listening on *:".concat(port));
});