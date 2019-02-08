var socket = io();
var userData = window.localStorage.getItem("user");
if (userData == undefined) { changeLocation(); }
var data = JSON.parse(userData);

function changeLocation()
{
	//window.location.href = "";
	//window.alert("The location would have been changed.");
}

if (data.UserKey == undefined) { changeLocation(); }
if (new Date().getTime() - data.KeyRefresh > 86400) { changeLocation(); }

socket.on('ValidateTokenResponse', function(data)
{
	if (data.success == undefined || data.success == false)
	{
		changeLocation();
	}
});

socket.emit("ValidateToken", userData);