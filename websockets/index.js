var express = require("express");
var socketio = require("socket.io");

var app = express();
var server = app.listen(3000);
var io = socketio.listen(server);
var messages = [];

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
	console.log("client connected");

	socket.emit("chat history", messages);

	socket.on("disconnect", function() {
		console.log("client disconnected");
	});

	socket.on("chat message", function(message) {
		messages.push(message);
		io.emit("chat message", message);
	});
});
