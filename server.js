import dotenv from "dotenv";
dotenv.config();
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

const port = process.env.PORT || 5000;
app.get("/", function(req, res) {
	res.send("<h1>Hello world</h1>");
});
io.on("connection", (socket) =>{
	console.log("a user connected");
	socket.on("chat message", (msg) => {
		if(msg.length !== 0){
			io.emit("chat message", msg);
		}
	});
});

http.listen(port, () =>{
	console.log(`listening on *:${port}`);
});
