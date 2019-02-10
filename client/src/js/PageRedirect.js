//var socket = io();
var userData = window.localStorage.getItem("user");
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
		//document.getElementById("loginLogoutButton").innerHTML = "Login";
		console.log("Redirect them to login.");
	}
	if (str == "login")
	{
		//window.alert("The location would have been changed: " + window.location.href);
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