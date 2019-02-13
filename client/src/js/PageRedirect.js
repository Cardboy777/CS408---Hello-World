//var socket = io();
var userData = window.localStorage.getItem("user");
var defaultLocation = "http://localhost:3000/";
setTimeout(function()
{
	if (userData == undefined || userData.length < 1) 
	{ 
		changeLocation("login"); 
	}
	else
	{
		var data = JSON.parse(userData);
		if (data.UserKey == undefined) { changeLocation("login"); }
		else if (new Date().getTime() - data.KeyRefresh > 86400) { changeLocation("login"); }
	}
}, 1000);


function changeLocation(str)
{
	if (str == "login")
	{
		if (window.location.href == defaultLocation) { return; }
		console.log("Link: '" + window.location.href + "'");
		window.location.href = defaultLocation;
	}
}


/*socket.on('ValidateTokenResponse', function(data)
{
	if (data.success == undefined || data.success == false)
	{
		changeLocation();
	}
});

socket.emit("ValidateToken", userData);*/