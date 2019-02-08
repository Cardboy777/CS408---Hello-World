var socket = io();
var userData = window.localStorage.getItem("user");
var data = JSON.parse(userData);

function signup()
{
	var username = $("#usernameBox")[0].value;
	var email = $("#emailBox")[0].value;
	var pass = $("#passwordBox")[0].value;
	
	if (checkUsername() == true && checkPassword() == true && checkEmail() == true)
	{
		var signupData = {
			"username": username,
			"email": email,
			"password": pass
		}
		$.post("/signup", signupData, function(data)
		{
			alert("Logging in...");
		});
	}
}

function validateEmail(email) //shamelessly taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkUsername()
{
	var usernameError = $("#signupUsernameError")[0];
	var username = $("#usernameBox")[0].value;
	if (username.length < 6 || username.length > 20)
	{
		usernameError.innerHTML = "Username must be 6-20 characters long and contain only alphanumeric characters.";
		usernameError.style.display = "inline-block";
	}
	else if (!username.match(/^[0-9a-z]+$/))
	{
		usernameError.innerHTML = "Your username may only contain letters and numbers.";
		usernameError.style.display = "inline-block";
	}
	else if (false)///check if username is already taken
	{
		
	}
	else
	{
		usernameError.style.display = "none";
		return true;
	}
	return false;
	///else check if username is already taken
}

function checkPassword()
{
	var passwordError = $("#signupPasswordError")[0];
	var pass = $("#passwordBox")[0].value;
	if (pass.length < 8 || pass.length > 256)
	{
		passwordError.innerHTML = "Your password must be between 8-256 characters long.";
		passwordError.style.display = "inline-block";
	}
	else
	{
		passwordError.style.display = "none";
		return true;
	}
	return false;
}

function checkEmail()
{
	var emailError = $("#signupEmailError")[0];
	var email = $("#emailBox")[0].value;
	if (validateEmail(email))
	{
		emailError.style.display = "none";
		return true;
	}
	else
	{
		emailError.innerHTML = "You must enter a valid email."
		emailError.style.display = "inline-block";
	}
	return false;
}

function login()
{
	var usernameBox = $("#loginUsername")[0].value;
	var passwordBox = $("#loginPassword")[0].value;
	var usernameError = $("#loginUsernameError")[0];
	var passwordError = $("#loginPasswordError")[0];
	
	if ((usernameBox.length > 5 || usernameBox.length < 21) && (passwordBox.length > 7 && passwordBox.length < 256))
	{
		var loginData = {
			"username": usernameBox,
			"password": passwordBox
		}
		$.post("/login", loginData, function(data)
		{
			alert("Logging in...");
		});
	}
}

function showModal()
{
	document.getElementById('id01').style.display='block';
	$("#modalButton")[0].style.display = "none";
}

function closeModal()
{
	document.getElementById('id01').style.display = "none";
	document.getElementById('id02').style.display='none';
	$("#modalButton")[0].style.display = "inline-block";
}

function showSignup()
{
	closeModal();
	document.getElementById('id02').style.display='block';
}

function hideSignup()
{
	document.getElementById('id02').style.display='none';
	$("#modalButton")[0].style.display = "inline-block";
}

window.onclick = function(event) {
	if (event.target == document.getElementById('id01') || event.target == document.getElementById('id02')) {
		closeModal();
	}
}

$("#usernameBox")[0].onchange = function() { checkUsername(); }
$("#passwordBox")[0].onchange = function() { checkPassword(); }
$("#emailBox")[0].onchange = function() { checkEmail(); }

/*$(".display-4")[0].onmouseover = function()
{
	$(".display-4")[0].innerHTML = "Meat likeminded programmers";
}
$(".display-4")[0].onmouseout = function()
{
	$(".display-4")[0].innerHTML = "Meet likeminded programmers";
}*/


//picture cycle
var pictures = ["HomepageImage1.jpeg", "HomepageImage2.jpg", "HomepageImage3.png"];
var transitionTime = 5000;

var tempCount = 0;
var tempLoop = setInterval(function()
{
	document.body.style["background-image"] = 'url("../img/' + pictures[tempCount] + '")';
	tempCount++;
	if (tempCount == pictures.length) { window.clearInterval(tempLoop); }
}, transitionTime);
var outerLoop = setInterval(function()
{
	var i = 0;
	var innerLoop = setInterval(function()
	{
		document.body.style["background-image"] = 'url("../img/' + pictures[i] + '")';
		i++;
		if (i == pictures.length) { window.clearInterval(innerLoop); }
	}, transitionTime);
}, transitionTime * pictures.length + 10);


