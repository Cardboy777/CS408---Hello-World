const request = require('request');
const express = require('express'),
  path = require('path'),
  nodeMailer = require('nodemailer');
const router = express.Router();
const http = require('http');
const app = express();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
var port = process.env.PORT || 8080;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
var userList = {};
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
    if(mainUserPot){
      for(var i = 0; i < mainUserPot.length; i++){
        if(mainUserPot[i]["user"] == likedUserName){
          match = mainUserPot[i];
          inMatches = true;
        }
      }
    }

    if(!inMatches){
      console.log("404");
      return "404";
    }
    var liked = false;
    var likedNum;
    if(likedUsersLiked){
      for(var i = 0; i < likedUsersLiked.length; i++){
        if(likedUsersLiked[i]["user"] == userName){
          liked = true;
          likedNum = i;
        }
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
    var dislikedUsersPot = dislikedUser["data"]["potentialMatches"]
    var inMatches = false;
    var match;
    if(mainUserPot){
      for(var i = 0; i < mainUserPot.length; i++){
        if(mainUserPot[i]["user"] == dislikedUserName){
          match = mainUserPot[i];
          inMatches = true;
        }
      }
    }


    if(!inMatches){
      return "404";
    }
    var liked = false;
    var pot = false;
    var likedNum;
    if(dislikedUsersLiked){
      for(var i = 0; i < dislikedUsersLiked.length; i++){
        if(dislikedUsersLiked[i]["user"] == userName){
          liked = true;
          likedNum = i;
        }
      }
    }
    if(!liked){
      for(var i = 0; i < dislikedUsersPot.length; i++){
        if(dislikedUsersPot[i]["user"] == userName){
          pot = true;
          likedNum = i;
        }
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
    else if(pot){
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(match)
      });
      matchRef = db.collection('usersPQ').doc(dislikedUser["id"]);
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(dislikedUsersPot[likedNum])
      });
    }
    else{
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var remPot = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayRemove(match)
      });
    }
    return findMatches(userName);

  });
  return finalMatches;
}
function getMatches(userName){
  var db = admin.firestore();
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
    if(mainUserMatches){
      for(var i = 0; i < mainUserMatches.length; i++){
        if(mainUserMatches[i]["user"] == removeUserName){
          match = mainUserMatches[i];
          inMatches = true;
        }
      }
    }

    if(!inMatches){
      return "404";
    }
    var matchedNum
    for(var i = 0; i < dislikedUserMatches.length; i++){
      if(dislikedUserMatches[i]["user"] == userName){

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
    return getMatches(userName);

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
        else if(doc.data().user != userName || doc.data().user.includes(userName) == false){
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

    if(temp && temp.length > 0){
      //console.log(temp);
      return temp;
    }
    var scores = []
    if(users.length < 100){
      for(i = 0; i < users.length;i++){
        var score = 0;
        var valid = true;
        var mainUserPrev = mainUser["data"]["prevMatchedUsers"];
        if(mainUserPrev){
          for(var k = 0; k < mainUserPrev.length; k++){
            if(mainUserPrev[k] == users[i]["id"]){
              valid = false;
            }
          }
        }
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
        if((thisScore["data"]["gender"] == mainUser["data"]["attractGender"] || mainUser["data"]["attractGender"] == "Both") && (thisScore["data"]["attractGender"] == "Both" || thisScore["data"]["attractGender"] == mainUser["data"]["gender"])){
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
          if((thisScore["data"]["gender"] == mainUser["data"]["attractGender"] || mainUser["data"]["attractGender"] == "Both") && (thisScore["data"]["attractGender"] == "Both" || thisScore["data"]["attractGender"] == mainUser["data"]["gender"])){
            if(valid){
                scores.push(thisScore);
            }
          }
          users.splice(random, 1);
          count++;
        }
    }
    //console.log(scores);
    var storedMatches = [];
    for(i = 0; i < 10; i++){
      if(scores.length == 0) {
        break;
      }
      var highMatch = {
        "data" : "temp",
        "match_percent" : -1,
        "uid": 0
      };
      var storedMatch = {
        "user": "temp",
        "match_percent" : -1,
        "uid": 0
      }
      var matchNumber = -1;
      for(j = 0; j < scores.length; j++){
        if(Math.floor(scores[j]["score"]*100/27) > highMatch["match_percent"]){
          highMatch = {
            "data" : scores[j]["data"],
            "match_percent" : Math.floor(scores[j]["score"]*100/27),
            "uid" : scores[j]["userID"],
          };
          storedMatch = {
            "user": scores[j]["data"]["user"],
            "match_percent" : Math.floor(scores[j]["score"]*100/27),
            "uid" : scores[j]["userID"],
          }
          matchNumber = j;
        }
      }
      scores.splice(matchNumber, 1);
      finalMatches.push(highMatch);
      storedMatches.push(storedMatch);

    }
    if(finalMatches.length > 0){
      var matchesIDS = [];
      for(i = 0; i < finalMatches.length; i++){
        main = {
          "user" : mainUser["data"]["user"],
          "match_percent" : finalMatches[i]["match_percent"],
          "uid" : mainUser["id"],
        }
        var db = admin.firestore();
        //console.log(finalMatches[i])
        var matchRef = db.collection('usersPQ').doc(finalMatches[i]["uid"]);
        //console.log(finalMatches[i]["uid"]);
        var setMatched = matchRef.update({
          potentialMatches: admin.firestore.FieldValue.arrayUnion(main)
        });
        var setPrevMatched = matchRef.update({
          prevMatchedUsers: admin.firestore.FieldValue.arrayUnion(mainUser["id"])
        });
        matchesIDS.push(finalMatches[i]["uid"]);
      }
      var db = admin.firestore();
      var matchRef = db.collection('usersPQ').doc(mainUser["id"]);
      var setMatched = matchRef.update({
        potentialMatches: admin.firestore.FieldValue.arrayUnion.apply(null, storedMatches)
      });
      var setPrevMatched = matchRef.update({
        prevMatchedUsers: admin.firestore.FieldValue.arrayUnion.apply(null, matchesIDS)
      });
    }
    return finalMatches;

  });
  return finalMatches;
}

//Database access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cs-408-hello-world.firebaseio.com'
});

//Returns an array of Objects [{userpq, percent_match}] that are matches for the given User
router.post("/getMorePotentialMatches", (req, res) => {
  result = findMatches(req.body.username);
  result.then(function(ret){
    res.json(ret);
  })
});

router.post("/getMatches", (req, res) => {
  result = getMatches(req.body.username);
  result.then(function(ret){
    res.json(ret);
  })
});

//Handles Liking a user on the Matching Page
router.post("/likeUser", (req, res) => {
  console.log(req.body.userName + " Liked " + req.body.likedUserName);
  result = likeUser(req.body.userName, req.body.likedUserName);
  result.then(function(ret){
    result2 = findMatches(req.body.userName);
    result2.then(function(ret){
      if(ret){
        for(var x = 0; x < ret.length; x++){
          if(ret[x]["user"] == req.body.likedUserName){
            ret.splice(x,1);
          }
        }
      }
      res.json(ret);
    })
  })
});

router.post("/dislikeUser", (req, res) => {
  console.log(req.body.userName + " Disiked " + req.body.dislikedUserName);
  result = dislikeUser(req.body.userName, req.body.dislikedUserName);
  result.then(function(ret){
    result2 = findMatches(req.body.userName);
    result2.then(function(ret){
      if(ret){
        for(var x = 0; x < ret.length; x++){
          if(ret[x]["user"] == req.body.dislikedUserName){
            ret.splice(x,1);
          }
        }
      }
      res.json(ret);
    })
  })
});

router.post("/unlikeUser", (req, res) => {
  console.log(req.body.userName + " Unliked " + req.body.unlikedUserName);
  result = removeMatch(req.body.userName, req.body.unlikedUserName);
  result.then(function(ret){
    if(ret){
      for(var x = 0; x < ret.length; x++){
        if(ret[x]["user"] == req.body.unlikedUserName){
          ret.splice(x,1);
        }
      }
    }

    res.json(ret);
  });
});

router.post("/emailReportedUser", (req, res) => {
  let msg = '<p>You have been reported for the following:</p><b>' + req.body.reason +
  '</b><p>This report has been filed on our servers for review.</p>' +
  '<p>Please be careful of the data you keep on your profile. We want HƐ>LO WORLD to be a site where anyone can enjoy the thrills of bonding over programming.</p>' +
  '<p>Happy Programming,</p>' +
  '<p>-The HƐ>LO WORLD Team (and David)</p>'

  let result = admin.auth().getUser(req.body.reportedUid)
  .then( (uAuth) =>{
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'helloworlddatingsite@gmail.com',
          pass: 'HelloWorld1'
      }
    });
    let mailOptions = {
      from: '"HƐ>LO WORLD" <helloworlddatingsite@gmail.com>', // sender address
      to: uAuth.email, // list of receivers
      subject: "Your HƐ>LO WORLD profile has been Reported", // Subject line
      text: msg, // plain text body
      html: '<div>' + msg + '</div>' // html body
    };
    transporter.sendMail(mailOptions);
    result = dislikeUser(req.body.userName, req.body.reportedUser);
    result.then(function(retu){
      result2 = findMatches(req.body.userName);
      result2.then(function(ret){
        res.json(ret);
      })
    })
  }).catch(message =>{
    res.json(message);
  })
})

router.post("/emailReportedMatchedUser", (req, res) => {
  let msg = '<p>You have been reported for the following:</p><b>' + req.body.reason +
  '</b><p>This report has been filed on our servers for review.</p>' +
  '<p>Please be careful of the data you keep on your profile. We want HƐ>LO WORLD to be a site where anyone can enjoy the thrills of bonding over programming.</p>' +
  '<p>Happy Programming,</p>' +
  '<p>-The HƐ>LO WORLD Team (and David)</p>'

  //console.log(req.body.reportedUid)
  let result = admin.auth().getUser(req.body.reportedUid)
  .then( (uAuth) =>{
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'helloworlddatingsite@gmail.com',
          pass: 'HelloWorld1'
      }
    });
    let mailOptions = {
      from: '"HƐ>LO WORLD" <helloworlddatingsite@gmail.com>', // sender address
      to: uAuth.email, // list of receivers
      subject: "Your HƐ>LO WORLD profile has been Reported", // Subject line
      text: msg, // plain text body
      html: '<div>' + msg + '</div>' // html body
    };
    transporter.sendMail(mailOptions);
    //console.log(req.body.userName, req.body.reportedUser)
    result = removeMatch(req.body.userName, req.body.reportedUser);
    result.then(function(ret){
      if(ret){
        for(var x = 0; x < ret.length; x++){
          if(ret[x]["user"] == req.body.reportedUser){
            ret.splice(x,1);
          }
        }
      }
      //console.log(ret)
      res.json(ret);
    })
  })
})


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

var socketList = [];

io.on('connection', function(socket)
{
	//console.log('a user connected');
	//console.log(socket.id);

	socketList.push(socket);

	socket.on('disconnect', function()
	{
        socketList.splice(socketList.indexOf(socket), 1);
    });

	socket.on('giveSocketData', function(data)
	{
		if (data.email) { socket.email = data.email; }
		if (data.token) { socket.token = data.token;}
		if (data.username) { socket.username = data.username; }
		var str = data.token || data.email;

		console.log(data.email + ": " + socket.id);
	});

	socket.on('sendMessageToUser', function(messageData)
	{
		var id = messageData.id;
		var sender = messageData.sender; //{email: fq, uid: fefew}
		var receiver = messageData.receiver;//token
		var message = messageData.message;

		console.log(sender.uid + " is sending a message to " + receiver);

		var newMessageData = {};
		newMessageData.id = id;
		newMessageData.sender = sender.uid;
		newMessageData.message = message;

		for (var i = 0; i < socketList.length; i++)
		{
			//console.log(i + ": " + socketList[i].token + ", " + socketList[i].id + ", " + socketList[i].email);
			//socketList[i].emit('testMessage', i);
			//if (socketList[i].token != undefined && socketList[i].token.length > 1) { console.log(socketList[i].token + ": " + receiver); }
			if (receiver.length > 0 && socketList[i].token == receiver && socketList[i + 1])
			{
				//socketList[i].emit('testMessage', "SDFsdfsd");
				//console.log("Sent ^");
				//console.log("Socket token: " + socketList[i].token + "\nSocket id: " + socketList[i].id);
				//console.log("My id: " + socket.id);
				io.to(socketList[i].id).emit('incomingMessage', newMessageData);
				io.to(socketList[i + 1].id).emit('incomingMessage', newMessageData);
				//io.to(socketList[i + 1].id).emit('testMessage', "asfasf");

				//socketList[i].emit('incomingMessage', newMessageData);
			}

		}
	});

	var messageData = {
				"from":"cowboyman123@gmail.com",
				"message":"sup",
				"id":Math.random()
			}
	//io.to(socket.id).emit('incomingMessage', messageData);


	setInterval(function()
	{
		setTimeout(function()
		{
			var messageData = {
				"from":"cowboyman123@gmail.com",
				"message":"sup",
				"id":Math.random()
			}
			//socket.emit('incomingMessage', messageData);
			//userList[socket.id].socket.emit('incomingMessage', messageData);
		}, Math.floor(1000 + Math.random() * 1400));
	}, 7500);
});

module.exports = router;
