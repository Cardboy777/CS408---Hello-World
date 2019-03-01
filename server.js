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

var users = {};
var userSocketMap = {};
function reportUser(userName){
  var user;
  var db = admin.firestore();
  mainUser = db.collection("usersPQ").where("user", "==", userName)
  .get()
  .then(function(querySnapshot) {
    var matchRef = db.collection('reportedUsers').doc(querySnapshot.docs[0].id);
    var setMatched = matchRef.update({
      reportedUser: querySnapshot.docs[0].data()
    });
  });

}
function likeUser(userName, likedUserName){
  var mainUser;
  var likedUser;
  var db = admin.firestore();
  mainUser = db.collection("usersPQ").where("user", "==", userName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  likedUser = db.collection("usersPQ").where("user", "==", likedUserName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  var finalMatches = [];

  finalMatches = Promise.all([mainUser, likedUser]).then(function(values){
    var mainUser = values[0];
    var likedUser = values[1];
    var mainUserPot = mainUser["data"]["potentialMatches"];
    var likedUsersLiked = likedUser["data"]["likedUsers"];
    var inMatches = false;
    var match;
    for(var i = 0; i < mainUserPot.length; i++){
      if(mainUserPot[i]["name"] === likedUserName){
        match = mainUserPot[i];
        inMatches = true;
      }
    }

    if(!inMatches){
      return "404";
    }
    var liked = false;
    var likedNum;
    for(var i = 0; i < likedUsersLiked.length; i++){
      if(likedUsersLiked[i]["name"] === userName){
        liked = true;
        likedNum = i;
      }
    }
    var db = admin.firestore();
    if(liked){
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var setMatched = matchRef.update({
        matchedUsers: admin.firestore.FieldValue.arrayUnion(match)
      });
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(match)
      });
      matchRef = db.collection('usersPQ').doc(likedUser["id"]);
      var setMatched = matchRef.update({
        matchedUsers: admin.firestore.FieldValue.arrayUnion(likedUsersLiked[likedNum])
      });
      var remLiked = matchRef.update({
        likedUsers: admin.firestore.FieldValue.arrayRemove(likedUsersLiked[likedNum])
      });

    }
    else{
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var setLiked = matchRef.update({
        likedUsers: admin.firestore.FieldValue.arrayUnion(match)
      });
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(match)
      });

    }
    return findMatches(userName);

  });
  return finalMatches;

}

function dislikeUser(userName, dislikedUserName){
  var mainUser;
  var dislikedUser;
  var db = admin.firestore();
  mainUser = db.collection("usersPQ").where("user", "==", userName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  dislikedUser = db.collection("usersPQ").where("user", "==", dislikedUserName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  var finalMatches = [];

  finalMatches = Promise.all([mainUser, dislikedUser]).then(function(values){
    var mainUser = values[0];
    var dislikedUser = values[1];
    var mainUserPot = mainUser["data"]["potentialMatches"];
    var dislikedUsersLiked = dislikedUser["data"]["likedUsers"];
    var inMatches = false;
    var match;
    for(var i = 0; i < mainUserPot.length; i++){
      if(mainUserPot[i]["name"] === dislikedUserName){
        match = mainUserPot[i];
        inMatches = true;
      }
    }

    if(!inMatches){
      return "404";
    }
    var liked = false;
    var likedNum;
    for(var i = 0; i < dislikedUsersLiked.length; i++){
      if(dislikedUsersLiked[i]["name"] === userName){
        liked = true;
        likedNum = i;
      }
    }
    var db = admin.firestore();
    if(liked){
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(match)
      });
      matchRef = db.collection('usersPQ').doc(dislikedUser["id"]);
      var remLiked = matchRef.update({
        likedUsers: admin.firestore.FieldValue.arrayRemove(dislikedUsersLiked[likedNum])
      });

    }
    else{
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(match)
      });
      matchRef = db.collection('usersPQ').doc(dislikedUser["id"]);
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(dislikedUsersLiked[likedNum])
      });

    }
    return findMatches(userName);

  });
  return finalMatches;
}
function getMatches(userName){
  var mainUserMatches;
  mainUserMatches = db.collection("usersPQ").where("user", "==", userName)
  .get()
  .then(function(querySnapshot) {
    return querySnapshot.docs[0].data()["matchedUsers"];
  });
  return mainUserMatches;
}

function removeMatch(userName, removeUserName){
  var mainUser;
  var dislikedUser;
  var db = admin.firestore();
  mainUser = db.collection("usersPQ").where("user", "==", userName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  dislikedUser = db.collection("usersPQ").where("user", "==", removeUserName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  var finalMatches = [];

  finalMatches = Promise.all([mainUser, dislikedUser]).then(function(values){
    var mainUser = values[0];
    var dislikedUser = values[1];
    var mainUserMatches = mainUser["data"]["matchedUsers"];
    var dislikedUserMatches = dislikedUser["data"]["matchedUsers"];
    var inMatches = false;
    var match;
    for(var i = 0; i < mainUserPot.length; i++){
      if(mainUserMatches[i]["name"] === removeUserName){
        match = mainUserMatches[i];
        inMatches = true;
      }
    }

    if(!inMatches){
      return "404";
    }
    var matchedNum
    for(var i = 0; i < dislikedUserMatches.length; i++){
      if(dislikedUserMatches[i]["name"] === userName){

        matchedNum = i;
      }
    }
    var db = admin.firestore();

    var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
    var remMatch = matchRef.update({
      matchedUsers: admin.firestore.FieldValue.arrayRemove(match)
    });
    matchRef = db.collection('usersPQ').doc(dislikedUser["id"]);
    var remMatch = matchRef.update({
      matchedUsers: admin.firestore.FieldValue.arrayRemove(dislikedUserMatches[matchedNum])
    });
    return findMatches(userName);

  });
  return finalMatches;

}
function findMatches(userName){
  var mainUser;
  var users = [];
  var db = admin.firestore();
  //Query to get the quiz data for the user
  mainUser = db.collection("usersPQ").where("user", "==", userName)
  .get()
  .then(function(querySnapshot) {
    return {
      "id": querySnapshot.docs[0].id,
      "data": querySnapshot.docs[0].data()
    }
  });

  //Query to get the quiz data for all the other users
  users = db.collection("usersPQ")
  .get()
  .then(function(querySnapshot) {
    var users = [];
    querySnapshot.forEach(function(doc) {
        if(doc.data().user == null || doc.data().user == ''){

        }
        else if(doc.data().user != userName || doc.data().user.includes(userName) === false){
          this.push({
            "id": doc.id,
            "data": doc.data()
          });
        }

    }, users);

    return users;
  });


  var finalMatches = [];

  finalMatches = Promise.all([mainUser, users]).then(function(values){

    var finalMatches = [];
    var mainUser = values[0];
    var users = values[1];
    temp = mainUser["data"]["potentialMatches"];

    if(temp.length > 0){
      console.log(temp);
      return temp;
    }
    var scores = []
    if(users.length < 100){
      for(i = 0; i < users.length;i++){
        var score = 0;
        var valid = true;
        for(j = 1; j < 18; j++){
          var str = "panswer"+j;
          if(users[i]["data"][str] == null || users[i]["data"][str] == ''){

            valid = false;
          }
          if(mainUser["data"][str] == users[i]["data"][str]){
            score++;
          }
        }
        for(j = 1; j < 11; j++){
          var str = "canswer"+j;
          if(users[i]["data"][str] == null || users[i]["data"][str] == ''){
            valid = false;
          }
          if(mainUser["data"][str] == users[i]["data"][str]){
            score++;
          }
        }
        thisScore = {
          "score": score,
          "userID": users[i]["id"],
          "data": users[i]["data"]
        };
        if(thisScore["data"]["gender"] == mainUser["data"]["attractGender"] && thisScore["data"]["attractGender"] == mainUser["data"]["gender"]){
          if(valid){
            scores.push(thisScore);
          }

        }

      }
    } else {
        var count = 0;
        while(count < 100){
          var random = Math.floor(Math.random() * users.length);
          var score = 0;
          var valid = true;
          for(j = 1; j < 18; j++){
            var str = "panswer"+j;
            if(users[random]["data"][str] == null || users[random]["data"][str] == ''){
              valid = false;
            }
            if(mainUser["data"][str] == users[random]["data"][str]){
              score++;
            }
          }
          for(j = 1; j < 11; j++){
            var str = "canswer"+j;
            if(users[random]["data"][str] == null || users[random]["data"][str] == ''){
              valid = false;
            }
            if(mainUser["data"][str] == users[random]["data"][str]){
              score++;
            }
          }
          thisScore = {
            "score": score,
            "userID": users[random]["id"],
            "data": users[random]["data"]
          };
          if(thisScore["data"]["gender"] == mainUser["data"]["attractGender"] && thisScore["data"]["attractGender"] == mainUser["data"]["gender"]){
            if(valid){
                scores.push(thisScore);
            }
          }
          users.splice(random, 1);
          count++;
        }
    }
    //console.log(scores);
    for(i = 0; i < 10; i++){
      if(scores.length === 0) {
        break;
      }
      var highMatch = {
        "user" : "temp",
        "score" : -1
      };
      var matchNumber = -1;
      for(j = 0; j < scores.length; j++){
        if(scores[j]["score"] > highMatch["score"]){
          highMatch = {
            "data" : scores[i]["data"],
            "match_percent" : Math.floor(scores[i]["score"]*100/27),
            "uid" : scores[i]["userID"],
          };
          matchNumber = j;
        }
      }
      scores.splice(matchNumber, 1);
      finalMatches.push(highMatch);

    }
    var matchesIDS = [];
    for(i = 0; i < finalMatches.length; i++){
      main = {
        "data" : mainUser["data"],
        "match_percent" : finalMatches[i]["match_percent"],
        "uid" : mainUser["id"],
      }
      var db = admin.firestore();
      var matchRef = db.collection('usersPQ').doc(finalMatches[i]["uid"]);
      var setMatched = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayUnion(match)
      });
      var setPrevMatched = matchRef.update({
        prevMatchedUsers: admin.firestore.FieldValue.arrayUnion(mainUser["id"])
      });
      matchesIDS.push(finalMatches[i]["uid"]);
    }
    var db = admin.firestore();
    var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
    var setMatched = matchRef.update({
      potentialMatches: admin.firestore.FieldValue.arrayUnion(finalMatches)
    });
    var setPrevMatched = matchRef.update({
      prevMatchedUsers: admin.firestore.FieldValue.arrayUnion(matchesIDS)
    });
    return finalMatches;

  });
  return finalMatches;
}

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

//Returns an array of new User Objects that are matches for the User
//NEEDS REAL IMPLEMENTATION, RETURNING DUMMY DATA FOR THE MOMENT
router.get("/getMorePotentialMatches", (req, res) => {
    //const users = getPotentialMatches(5);
    result = findMatches("ReidK");
    result.then(function(ret){
      console.log(ret);
      res.json(ret);
    });
  });

  //Returns an array of users that contains the current list of potential matches for a user (does NOT return NEW matches, just the list of already generated matches)
  //NEEDS REAL IMPLEMENTATION, RETURNING DUMMY DATA FOR THE MOMENT
  router.get("/getListOfPotentialMatches", (req, res) => {
    const users = [
          {uid: 12345, name: "John Smith", description: "I like long walks on the beach", fav_lang: "Java", match_percent: 92},
          {uid: 12341234, name: "John Doe", description: "I like People named David", fav_lang: "Ruby on Rails", match_percent: 73},
          {uid: 234432432, name: "Jane Does", description: "I'm an engineer", fav_lang: "MatLab", match_percent:60},
          {uid: 324363, name: "Yo Low", description: "I will try anything", fav_lang: "HTML", match_percent:45},
          {uid: 35234, name: "Cardboy777", description: "I like card games", fav_lang: "Visual Basic", match_percent:8}
        ];
        res.json(users);
    });

//Recieves json with 2 user objects. The two users should be removed from each other's list of potential users
//NEEDS REAL IMPLEMENTATION, RETURNING DUMMY DATA FOR THE MOMENT
router.get("/RemoveUsersFromPotentialMatches", (req, res) => {
  var user1 = req.param('user1');
  var user2 = req.param('user2');
  console.log(user1);
  res.json();
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

	socket.on('disconnect', function()
	{
		var str = user.token || user.email;
		if (str != undefined && userSocketMap[str])
		{
			userSocketMap[str][socket.id] = undefined;
		}
		if (users[socket.id] != undefined) { delete[users[socket.id]]; users[socket.id] = undefined; }
	});

	users[socket.id] = {};
	var user = users[socket.id];
	user.email = "";
	user.token = "";
	user.username = "";

	socket.on('giveSocketData', function(data)
	{
		if (data.email) { user.email = data.email; }
		if (data.token) { user.token = data.token;}
		if (data.username) { user.username = data.username; }
		var str = data.token || data.email;
		//console.log(str);
		if (userSocketMap[str] != undefined)
		{
			userSocketMap[str][socket.id] = true;
		}
		else
		{
			userSocketMap[str] = {};
			userSocketMap[str][socket.id] = true;
		}

		//console.log("Full user array: " + JSON.stringify(users));
		//console.log("Full user socket map: " + JSON.stringify(userSocketMap));
	});

	socket.on('testMessageClientToServer', function(msg)
	{
		console.log("C2S: " + msg);
	});

	setInterval(function()
	{
		setTimeout(function()
		{
			socket.emit('incomingMessage', {"from":"hotguy69@gmail.com", "msg":"hey babe"});
		}, Math.floor(1000 + Math.random() * 14000));
	}, 15000);

	setTimeout(function()
	{
		socket.emit('testFunc', "TESTING");
	}, 2000);
});

module.exports = router;
