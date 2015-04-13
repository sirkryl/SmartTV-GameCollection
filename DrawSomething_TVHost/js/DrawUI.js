
var draw;
var ctx;
var activeUserInt = 0;
var activeUser;
var userColors = new Array("#FF0000","#0000FF", "#00FF00", "#FF00FF","#000000");
var activeTerm = "";
var terms = new Array("Fernbedienung","Haus","Pflanze","Banane","Apfel","Baum","Fisch","Flagge","Fernseher","Fenster",
		"Herz","Giraffe","Pferd","Maus","Brille","Uhr","Tisch","Sessel","Boot");

function DrawUI(game) {
	this.game = game;
};

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

DrawUI.prototype.displayUsers = function() {
	var userList = this.game.client.getRoom().getControllers().getUserList();
	var html = '<table width="100%" border="0" cellpadding="4" cellspacing="0" id="users"><tr class="players"><td>Spieler</td><td>Pt</td></tr>';
	for(var i = 0; i < userList.length; i++) {
		if(activeUser == null) {
			activeUser = userList[0];
			activeTerm = terms[Math.floor(Math.random()*terms.length)];
			this.game.client.sendToUser(userList[0],'activate',{text: activeTerm});
		}
		var user = userList[i];
		html+= '<tr><td>' + decodeURI(user.name) + ' </td><td>' + user.attributes['score'] + '</td></tr>';
	}
	html+= '</table>';
	var element = document.getElementById('users');
	element.innerHTML = html;
};

DrawUI.prototype.displayUserScores = function() {
	this.displayUsers();
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
	if (draw == null) {
		draw = document.getElementById('draw');
		ctx = draw.getContext('2d');
	}
	ctx.strokeStyle = userColors[activeUserInt];
	ctx.lineWidth = 2;
	ctx.beginPath();
	var x = msgText.split('x')[0].substring(5);
	var y = msgText.split('x')[1].split('y')[0];
	ctx.moveTo(x,y);
};

DrawUI.prototype.draw = function(sender, text) {
	var msgText = decodeURI(text);
	var html = '' + decodeURI(sender.name) + ' zeichnet gerade.. ';
	var element = document.getElementById('contentView');
	element.innerHTML = html;
	var x = msgText.split('x')[0];
	var y = msgText.split('x')[1].split('y')[0];
	ctx.lineTo(x,y);
	ctx.stroke();
};

DrawUI.prototype.stopDraw = function(sender, text) {
	var element = document.getElementById('contentView');
	var html = '' + decodeURI(sender.name) + ' hat aufgehört zu zeichnen. ';
	element.innerHTML = html;
	ctx.closePath();
};

DrawUI.prototype.skip = function(sender, text) {
	var element = document.getElementById('contentView');
	var html = '' + decodeURI(sender.name) + ' lässt seinen/ihren Zug aus. ';
	element.innerHTML = html;
	if(ctx != null) ctx.clearRect(0, 0, draw.width, draw.height);
	this.nextActiveUser();
};

DrawUI.prototype.clear = function(sender, text) {
	var html = '' + decodeURI(sender.name) + ' hat die Zeichenfläche gelöscht. ';
	var element = document.getElementById('contentView');
	element.innerHTML = html;
	if(ctx != null) ctx.clearRect(0, 0, draw.width, draw.height);
};

DrawUI.prototype.answer = function(sender, text) {
	var element = document.getElementById('contentView');
	if(decodeURI(text).toLowerCase().trim() == activeTerm.toLowerCase()) {
		element.innerHTML = '' + decodeURI(sender.name) + ' hat die richtige Antwort '+decodeURI(text)+' erraten! Der nächste Spieler ist jetzt an der Reihe!';
		var newScore = sender.attributes['score'] + 3;
		this.game.client.setUserAttributes(sender, {score:newScore});
		newScore = activeUser.attributes['score'] + 2;
		this.game.client.setUserAttributes(activeUser, {score:newScore});
		this.displayUserScores();
		this.game.client.sendToUser(activeUser,'deactivate',{text: activeTerm});
		if(ctx != null)	window.setTimeout(ctx.clearRect(0, 0, draw.width, draw.height),5000);
		this.nextActiveUser();		
	}
	else {
		element.innerHTML = 'Nein, ' + decodeURI(sender.name) + ', es ist kein(e) '+decodeURI(text)+'!';
	}
};

DrawUI.prototype.addChat = function(sender, text) {
	

};

DrawUI.prototype.nextActiveUser = function() {
	
	var userList = this.game.client.getRoom().getControllers().getUserList();
	if(activeUserInt < userList.length-1) {
		activeUserInt++;
	}
	else if(activeUserInt >= userList.length-1) {
		activeUserInt = 0;
	}
	activeUser = userList[activeUserInt];
	activeTerm = terms[Math.floor(Math.random()*terms.length)];
	this.game.client.sendToUser(activeUser,'activate',{text: activeTerm});
};

DrawUI.prototype.userLeft = function(user) {
	if(activeUser == user) {
		var element = document.getElementById('contentView');
		if(ctx != null) ctx.clearRect(0, 0, draw.width, draw.height);
		this.nextActiveUser();
		element.innerHTML = '' + decodeURI(user.name) + ' hat das Spiel verlassen, '+activeUser.name+' ist jetzt an der Reihe!';
	}
};
