const request = require('request');
const express = require('express'); 
const http = require('http');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;


app.use(express.static('public'));
app.get('/', function(req, res)
{
	res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, function()
{
    console.log('listening on ' + port);
});