/*var email = JSON.parse(window.localStorage.getItem("user")).email;

if (window.location.href.indexOf("MyGarage") < 0) 
{
	window.localStorage.setItem('userSearch', '');
}

db.ref('/users/' + email.split("@").join("").split(".").join("") + '/stats/').once('value').then((snapshot) => {
	try {
		var lastSeen = new Date();
		db.ref('/users/' + email.split("@").join("").split(".").join("") + '/stats/').update({lastOnlineTime: lastSeen});	
	} catch(error) {
		var lastSeen = new Date();
		db.ref('/users/' + email.split("@").join("").split(".").join("") + '/stats/').update({lastOnlineTime: lastSeen});	
	}
});

setInterval(function()
{
	db.ref('/users/' + email.split("@").join("").split(".").join("") + '/stats/').once('value').then((snapshot) => {
		try {
			var lastSeen = new Date();
			db.ref('/users/' + email.split("@").join("").split(".").join("") + '/stats/').update({lastOnlineTime: lastSeen});	
		} catch(error) {
			var lastSeen = new Date();
			db.ref('/users/' + email.split("@").join("").split(".").join("") + '/stats/').update({lastOnlineTime: lastSeen});	
		}
	});
}, 5000);*/