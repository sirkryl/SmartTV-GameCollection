var canvas;
var ctx;
var sketch;
var sketch_style;
var onPaint;

var act_lineWidth = 5;
var act_lineJoin = 'round';
var act_lineCap = 'round';
var act_strokeStyle = 'red';

var mouse = {x: 0, y: 0};

function DrawUI(game) {
	this.game = game;
};

DrawUI.prototype.init = function() {
	canvas = document.getElementById('draw');
	ctx = canvas.getContext('2d');

	/* Drawing on Paint App */
	ctx.lineWidth = act_lineWidth;
	ctx.lineJoin = act_lineJoin;
	ctx.lineCap = act_lineCap;
	ctx.strokeStyle = act_strokeStyle;

	/* Mouse Capturing Work */
	canvas.addEventListener('mousemove', function(e) {
		mouse.x = e.pageX - this.offsetLeft;
		mouse.y = e.pageY - this.offsetTop;
	}, false);

	canvas.addEventListener('mousedown', function(e) {
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);

		canvas.addEventListener('mousemove', onPaint, false);
	}, false);

	canvas.addEventListener('mouseup', function() {
		canvas.removeEventListener('mousemove', onPaint, false);
		ctx.closePath();
	}, false);

	onPaint = function() {
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
	};

	setUpItemCanvases();

	/* bind items listeners */
	$('#color_red').bind("click", {
		choice : "red"
	}, this.clickHandler);
	$('#color_blue').bind("click", {
		choice : "blue"
	}, this.clickHandler);
	$('#color_green').bind("click", {
		choice : "green"
	}, this.clickHandler);
	$('#color_yellow').bind("click", {
		choice : "yellow"
	}, this.clickHandler);

	$('#eraser').bind("click", {
		choice : "white"
	}, this.clickHandler);
	
	$('#clear').bind("click", {
		choice : "clear"
	}, this.clickHandler);

	$('#width_1').bind("click", {
		choice : "1"
	}, this.clickHandler);
	$('#width_3').bind("click", {
		choice : "3"
	}, this.clickHandler);
	$('#width_5').bind("click", {
		choice : "5"
	}, this.clickHandler);
	$('#width_8').bind("click", {
		choice : "8"
	}, this.clickHandler);
	$('#width_10').bind("click", {
		choice : "10"
	}, this.clickHandler);
};

DrawUI.prototype.handleShow = function(data) {
	alert("DrawUI.handleShow()");
	// this function will be called when the scene manager show this scene
};

DrawUI.prototype.handleHide = function() {
	alert("DrawUI.handleHide()");
	// this function will be called when the scene manager hide this scene
};

DrawUI.prototype.handleFocus = function() {
	alert("DrawUI.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

DrawUI.prototype.handleBlur = function() {
	alert("DrawUI.handleBlur()");
	// this function will be called when the scene manager move focus to another
	// scene from this scene
};

DrawUI.prototype.handleKeyDown = function(keyCode) {
	alert("DrawUI.handleKeyDown(" + keyCode + ")");
	switch (keyCode) {
	case sf.key.LEFT:
		break;
	case sf.key.RIGHT:
		break;
	case sf.key.UP:
		break;
	case sf.key.DOWN:
		break;
	case sf.key.ENTER:
		break;
	}
};

DrawUI.prototype.clickHandler = function(event) {
	alert("DrawUI.clickHandler(" + event.data.choice + ")");

	if (event.data.choice == 'red' || event.data.choice == 'blue'
			|| event.data.choice == 'green' || event.data.choice == 'yellow'
			|| event.data.choice == 'white') {
		act_strokeStyle = event.data.choice;
		ctx.strokeStyle = act_strokeStyle;
	} else if (event.data.choice == '1' || event.data.choice == '3'
			|| event.data.choice == '5' || event.data.choice == '8'
			|| event.data.choice == '10') {
		act_lineWidth = event.data.choice;
		ctx.lineWidth = act_lineWidth;
	} else if (event.data.choice == 'clear') {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
};

function setUpItemCanvases() {
	/* items */
	var context = document.getElementById('canvas_red').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "red";
	context.beginPath();
	context.arc(20, 20, 20, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_blue').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "blue";
	context.beginPath();
	context.arc(20, 20, 20, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_green').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "green";
	context.beginPath();
	context.arc(20, 20, 20, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_yellow').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "yellow";
	context.beginPath();
	context.arc(20, 20, 20, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_1').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20, 20, 1, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_3').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20, 20, 3, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_5').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20, 20, 5, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_8').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20, 20, 8, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_10').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20, 20, 10, 0, Math.PI * 2, true);
	context.closePath();
	context.stroke();
	context.fill();

	var context = document.getElementById('canvas_eraser').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "white";
	context.beginPath();
	context.rect(0, 0, 30, 30);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_clear').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "white";
	context.beginPath();
	context.rect(0, 0, 30, 30);
	context.closePath();
	context.stroke();
	context.fill();
	context.strokeStyle = "#FF0000";
	context.beginPath();
	context.moveTo(0,0);
	context.lineTo(30,30);
	context.closePath();
	context.stroke();
	context.beginPath();
	context.moveTo(30,0);
	context.lineTo(0,30);
	context.closePath();
	context.stroke();
}

DrawUI.prototype.displayName = function(name) {
	var element = document.getElementById('gameName');
	element.innerHTML = name;
};
DrawUI.prototype.displayRoomCode = function(roomCode) {
	var roomCode = null;
	if (this.game.client != null) {
		var room = this.game.client.getRoom();
		if (room != null) {
			roomCode = room.code;
		}
	}

	var element = document.getElementById('roomCode');
	element.innerHTML = ' ' + (roomCode ? roomCode : ' - ');
};

DrawUI.prototype.displayUser = function(user) {
	var element = document.getElementById('contentView');
	element.innerHTML = '' + DecodeURI(user.name) +' entered the room.';
};

DrawUI.prototype.displayChatView = function(show) {
	var element = document.getElementById('chatView');
	element.style.display = show ? 'inline' : 'none';
};

DrawUI.prototype.startDraw = function(sender, text) {
	var msgText = decodeURI(text);
	var element = document.getElementById('contentView');
	var html = '' + decodeURI(sender.name) + ' zeichnet gerade.. ';
	element.innerHTML = html;
	ctx.beginPath();
	var splitText = msgText.split('_');
	var color = splitText[0];
	var size = splitText[1];
	var x = splitText[2];
	var y = splitText[3];
	ctx.lineWidth = size;
	ctx.strokeStyle = color;
	ctx.moveTo(x, y);
};

DrawUI.prototype.draw = function(sender, text) {
	var msgText = decodeURI(text);
	var html = '' + decodeURI(sender.name) + ' zeichnet gerade.. ';
	var element = document.getElementById('contentView');
	element.innerHTML = html;
	var x = msgText.split('x')[0];
	var y = msgText.split('x')[1].split('y')[0];
	ctx.lineTo(x, y);
	ctx.stroke();
};

DrawUI.prototype.stopDraw = function(sender, text) {
	var element = document.getElementById('contentView');
	var html = '' + decodeURI(sender.name) + ' hat aufgehört zu zeichnen. ';
	element.innerHTML = html;
	ctx.closePath();
	ctx.lineWidth = act_lineWidth;
	ctx.strokeStyle = act_strokeStyle;
};

DrawUI.prototype.clear = function(sender, text) {
	var html = '' + decodeURI(sender.name)
			+ ' hat die Zeichenfläche gelöscht. ';
	var element = document.getElementById('contentView');
	element.innerHTML = html;
	if (ctx != null)
		ctx.clearRect(0, 0, canvas.width, canvas.height);
};

DrawUI.prototype.addChat = function(sender, text) {

};

DrawUI.prototype.userLeft = function(user) {
	var element = document.getElementById('contentView');
	element.innerHTML = '' + decodeURI(user.name) + ' hat das Spiel verlassen.';
};

DrawUI.prototype.userJoined = function(user) {
	var element = document.getElementById('contentView');
	element.innerHTML = '' + decodeURI(user.name) + ' ist dem Spiel beigetreten!';
};
