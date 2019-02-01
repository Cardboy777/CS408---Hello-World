const request = require('request');
const express = require('express'); 
const http = require('http');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;

const router = express.Router();

//Client-callable API call
router.get("/getTestMessage", (req, res) => {
    const msg = "David is the one and only match";
    res.json(msg);
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

module.exports = router;