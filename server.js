const request = require('request');
const express = require('express');
const router = express.Router();
const http = require('http');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
var port = process.env.PORT || 8080;

var users = [];

//Database access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cs-408-hello-world.firebaseio.com'
});

//Client-callable API call
router.get("/getTestMessage", (req, res) => {
    const msg = "David is the one and only match";
    res.json(msg);
});

//Returns an array of 5 User Objects
//NEEDS REAL IMPLEMENTATION, RETURNING DUMMY DATA FOR THE MOMENT
router.get("/getMorePotentialMatches", (req, res) => {
    //const users = getPotentialMatches(5);

    const users = [
        {uid: 12345, name: "John Smith", description: "I like long walks on the beach", fav_lang: "Java", match_percent: 92},
        {uid: 12341234, name: "John Doe", description: "I like People named David", fav_lang: "Ruby on Rails", match_percent: 73},
        {uid: 234432432, name: "Jane Does", description: "I'm an engineer", fav_lang: "MatLab", match_percent:60},
        {uid: 324363, name: "Yo Low", description: "I will try anything", fav_lang: "HTML", match_percent:45},
        {uid: 35234, name: "Cardboy777", description: "I like card games", fav_lang: "Visual Basic", match_percent:8}
    ];
    res.json(users);
});

app.use(express.static('public'));

// append /api for our http requests
app.use("/api", router);

//do nothing
app.get('/', function(req, res){
});

server.listen(port, function()
{
    console.log('Server is listening on ' + port);
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
});

module.exports = router;
