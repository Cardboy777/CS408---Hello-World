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
    temp = mainUser["data"]["matchedUsers"];

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
          "user" : users[i]["data"]["user"],
          "score" : score,
          "desc" : users[i]["data"]["describe"],
          "gender" : users[i]["data"]["gender"],
          "age" : users[i]["data"]["age"],
          "usersPQID" : users[i]["id"],
          "attractGender": users[i]["data"]["attractGender"]
        };
        if(thisScore["gender"] == mainUser["data"]["attractGender"] && thisScore["attractGender"] == mainUser["data"]["gender"]){
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
            "user" : users[i]["data"]["user"],
            "score" : score,
            "desc" : users[i]["data"]["describe"],
            "gender" : users[i]["data"]["gender"],
            "age" : users[i]["data"]["age"],
            "usersPQID" : users[i]["id"],
            "attractGender": users[i]["data"]["attractGender"]
          };
          if(thisScore["gender"] == mainUser["data"]["attractGender"] && thisScore["attractGender"] == mainUser["data"]["gender"]){
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
            "name" : scores[i]["user"],
            "match_percent" : Math.floor(scores[i]["score"]*100/27),
            "description" : scores[i]["desc"],
            "gender" : scores[i]["gender"],
            "age" : scores[i]["age"],
            "uid" : scores[i]["usersPQID"],
            "fav_lang" : "TEST",
            "attractGender": scores[i]["attractGender"]
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
        "name" : mainUser["data"]["user"],
        "match_percent" : finalMatches[i]["match_percent"],
        "description" : mainUser["data"]["describe"],
        "gender" : mainUser["data"]["gender"],
        "age" : mainUser["data"]["age"],
        "uid" : mainUser["id"],
        "fav_lang" : "TEST",
        "attractGender": mainUser["data"]["attractGender"]
      }
      var db = admin.firestore();
      var matchRef = db.collection('usersPQ').doc(finalMatches[i]["uid"]);
      var setMatched = matchRef.set({
        matchedUsers: [main]
      }, {merge: true});
      var setPrevMatched = matchRef.set({
        prevMatchedUsers: [mainUser["id"]]
      }, {merge: true});
      matchesIDS.push(finalMatches[i]["uid"]);
    }
    var db = admin.firestore();
    var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
    var setMatched = matchRef.set({
      matchedUsers: finalMatches
    }, {merge: true});
    var setPrevMatched = matchRef.set({
      prevMatchedUsers: matchesIDS
    }, {merge: true});
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

//Returns an array of 5 User Objects
//NEEDS REAL IMPLEMENTATION, RETURNING DUMMY DATA FOR THE MOMENT
router.get("/getMorePotentialMatches", (req, res) => {
    //const users = getPotentialMatches(5);
    result = findMatches("ReidK");
    result.then(function(ret){
      console.log(ret);
      /**const users = [
          {uid: 12345, name: "John Smith", description: "I like long walks on the beach", fav_lang: "Java", match_percent: 92},
          {uid: 12341234, name: "John Doe", description: "I like People named David", fav_lang: "Ruby on Rails", match_percent: 73},
          {uid: 234432432, name: "Jane Does", description: "I'm an engineer", fav_lang: "MatLab", match_percent:60},
          {uid: 324363, name: "Yo Low", description: "I will try anything", fav_lang: "HTML", match_percent:45},
          {uid: 35234, name: "Cardboy777", description: "I like card games", fav_lang: "Visual Basic", match_percent:8}
      ];**/
      res.json(ret);
    });

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
