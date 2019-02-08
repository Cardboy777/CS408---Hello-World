var socket = io();
var userData = window.localStorage.getItem("user");
var data = JSON.parse(userData);

function signup()
{
	
}

function login()
{
	
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

$(".display-4")[0].onmouseover = function()
{
	$(".display-4")[0].innerHTML = "Meat likeminded programmers";
}
$(".display-4")[0].onmouseout = function()
{
	$(".display-4")[0].innerHTML = "Meet likeminded programmers";
}

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


