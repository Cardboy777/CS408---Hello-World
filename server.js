const request = require('request');
const express = require('express'); 
const http = require('http');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

var users = [];

app.use(express.static('public'));//public
app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/public/html/login.html');
});

server.listen(port, function()
{
    console.log('listening on ' + port);
});


io.on('connection', function(socket)
{
	console.log('a user connected');
	socket.id = Math.random();
	
	users[socket.id] = [];
	var user = users[socket.id];
	socket.on('disconnect', function()
	{
		delete[users[socket.id]];
	});
	
	socket.on('ValidateToken', function(data)
	{
		///no idea how to validate user key
		socket.emit("ValidateTokenResponse", {"success": false});
	});
	
	socket.on('Login', function(data)
	{
		
	});
	
	socket.on('Signup', function(data)
	{
		
	});
});