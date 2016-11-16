var c = document.getElementById("myCanvas");
var lastts = Date.now();
var offsetx = 0; var offset = 5;
var lastx = 0;
var brickLen = 70;
var maxx = Number(c.width);
var maxy = Number(c.height);
var count= 0;
var xdir = 'r';
var ydir= 'd';	
var myVar;
var audio = new Audio('ping.mp3');
var audio1 = new Audio('Lost.wav');
var audio2 = new Audio('bar.wav');
var audio3 = new Audio('whack.mp3');
var brickArray = [];
var ca = document.getElementById("myCanvas");
var ctx = ca.getContext("2d");
window.addEventListener('load', function() { 
document.getElementById("xposition").value = 0;
document.getElementById("yposition").value = 0;
var xs; var ys;
for (var xs = 0; xs <= maxx/brickLen ; xs++) { brickArray[xs] = []; for ( var ys = 0; ys <= 5; ys++) { brickArray[xs][ys] = 'red';}}
brickWall();
}, false);
window.addEventListener('click', function(event) {
var xpos = event.clientX;     // Get the horizontal coordinate
document.getElementById("xbat").value = xpos; 
lastx = xpos;
offsetx = 0;  offset = 5;
count = 0;
clearInterval(myVar);
document.getElementById("xposition").value = xpos + 3;
document.getElementById("yposition").value = maxy;
ydir = 'u';
startRun();
}, false);

window.addEventListener('mousemove', function(event) {
var xpos = event.clientX;     // Get the horizontal coordinate
document.getElementById("xbat").value = xpos; 
}, false);

function brickWall() {
	for (var xi = 0; xi <= maxx/brickLen ; xi++) { for ( var yi = 0; yi <= 5; yi++) { drawBrick(xi, yi); }}
}
function drawBrick(arx, ary) {
var lx = (arx * brickLen) + 1;
var ux = (arx * brickLen) + (brickLen - 1);
var ly = (ary * 20) + 1;
var uy = (ary * 20) + 19;
ctx.fillStyle = brickArray[arx][ary];
ctx.fillRect(lx, ly, (brickLen - 2), 18); 
}

function startRun()
{myVar = setInterval(bounce, 10);}

function bounce() {
var xaxis = document.getElementById("xposition").value;
var yaxis = document.getElementById("yposition").value;
var xbat = document.getElementById("xbat").value;
if (xdir == 'l') { xaxis = xaxis - offset;} else { xaxis = xaxis + offset; }
if (ydir == 'u') { yaxis = yaxis - 5;} else { yaxis = yaxis + 5; }

/*var spotcol = ctx.getImageData(xaxis, yaxis, 1, 1).data;
if (spotcol == 'red') */


var qx = Math.floor(xaxis/brickLen);
var rx = (xaxis/brickLen) - qx;
var qy = Math.floor((yaxis)/20);
var ry = (yaxis/20) - qy ;
console.log(xaxis/brickLen + " : "   + rx + " : " + yaxis/20 + " : " + ry + " : " + qx + " : " + qy ); 
ballHitx = false; ballHity = false;
if (qy <= 5) { if (qx < 0) {qx = 0;}
if (brickArray[qx][qy] == 'red' && ((rx > 0.1 && rx < 0.9) || (ry > 0.1 && ry < 0.9 )))
{
audio3.play();
brickArray[qx][qy] = 'white'; 
if (rx > 0.1 && rx < 0.9) {ballHitx = true; ballHity = false} 
else if (ry > 0.1 && ry < 0.9) {ballHity= true; ballHitx = false}
else { ballHitx = true; ballHity  = true;}
}}

if (xaxis >= maxx || xaxis <= 0 || ballHity) { audio2.play(); if (xdir == 'l') { xdir = 'r';} else xdir = 'l'; }
if ((xaxis >= xbat-5 && xaxis <= xbat+ 63) && yaxis >= maxy ) { audio.play();
count = count + 1; document.getElementById("Point").innerHTML = count; if (ydir == 'u') { ydir = 'd';} else ydir = 'u'; }
if ( yaxis <= 0 || ballHitx) {audio2.play(); if (ydir == 'u') { ydir = 'd';} else ydir = 'u'; offset = offset + offsetx}
if ((xaxis < xbat - 5 || xaxis > xbat+ 73) && yaxis >=maxy) { audio1.play(); clearInterval(myVar); xaxis = 100; yaxis= maxy;}
ctx.clearRect(0,0,ca.width,ca.height);
placebat(xbat);
brickWall();
drawcircle(xaxis, yaxis, "green");
document.getElementById("xposition").value = xaxis;
document.getElementById("yposition").value = yaxis;
}

function drawcircle(xa, ya, col) {
ctx.fillStyle = col;
ctx.beginPath();
ctx.arc(xa, ya, 8, 0, 2 * Math.PI);
ctx.fill();}

function placebat(xp) {
var now = Date.now();
ctx.fillStyle = "black";
ctx.fillRect(xp, maxy-10, 70, 8); 
if ((now - lastts) >= 500) {
var speed = (lastx - xp) / (now - lastts);
offsetx = speed/100;console.log(offset);
lastts = now;
lastx = xp;}
}