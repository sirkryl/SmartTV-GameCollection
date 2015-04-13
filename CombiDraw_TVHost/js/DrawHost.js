
function DrawHost(appKey) {
	
	this.appKey = appKey;
	this.ui = new DrawUI(this);
	
};


DrawHost.prototype.createClient = function(appKey) {
	var client = new movl.Connect(appKey);
	client.setDebug(true);
	client.on(movl.Connect.EVENTS.connectionLost, 			util.createDelegate(this, this.onConnectionLost));
	client.on(movl.Connect.EVENTS.createRoom, 				util.createDelegate(this, this.onCreateRoom));
	client.on(movl.Connect.EVENTS.userJoined, 				util.createDelegate(this, this.onUserJoined));
	client.on(movl.Connect.EVENTS.userLeft, 				util.createDelegate(this, this.onUserLeft));
	client.on(movl.Connect.EVENTS.activeHostChanged, 		util.createDelegate(this, this.onActiveHostChanged));
	client.on(movl.Connect.EVENTS.message, 					util.createDelegate(this, this.onMessage));
	return client;
};

DrawHost.prototype.onConnectionLost = function(event) {
	util.log('Connection Lost.');
	this.ui.addChat({name:'Error'}, 'Connection Lost');
};

DrawHost.prototype.createRoom = function(userName) {
	
	// INITIALIZE THE MOVLConnect CLIENT
	this.client = this.createClient(this.appKey);
	this.client.createRoomAsHost('DrawHost');
};

DrawHost.prototype.onCreateRoom = function(event) {
	var result = event.result;
	if (result.isOk()) {
		this.ui.init();
		this.ui.displayRoomCode(this.client.getRoom().code);
		this.ui.displayChatView(true);
	} else {
		util.log('Error: could not create room: ' + result.message);
		this.ui.addChat({name:'Error'}, result.message);
	}
};

DrawHost.prototype.onUserJoined = function(event) {
	this.ui.userJoined(event.data.user);
};

DrawHost.prototype.onUserLeft = function(event) {
	this.ui.userLeft(event.data.user);
};

DrawHost.prototype.onActiveHostChanged = function(event) {
	
};

DrawHost.prototype.onMessage = function(event) {
	
	var sender = event.data.sender;
	var messageId = event.data.id;
	var messageData = event.data.data;
	util.log('onMessage() sender: ' + sender.name + ', messageId: ' + messageId + ', messageData: ' + JSON.stringify(messageData));
	switch(messageId) {
		case('clear'):
			this.onReceiveClear(sender, messageData.text);
			break;
		case('start'):
			this.onReceiveStart(sender, messageData.text);
			break;
		case('draw'):
			this.onReceiveDraw(sender, messageData.text);
			break;
		case('stop'):
			this.onReceiveStop(sender, messageData.text);
			break;
	};
};

DrawHost.prototype.onReceiveChat = function(sender, text) {
	util.log('onReceiveChat() sender: ' + sender.name + ', text: ' + text);
	this.ui.addChat(sender, text);
};

DrawHost.prototype.onReceiveClear = function(sender, text) {
	util.log('onReceiveClear() sender: ' + sender.name + ', text: ' + text);
	this.ui.clear(sender, text);
};

DrawHost.prototype.onReceiveStart = function(sender, text) {
	util.log('onReceiveStart() sender: ' + sender.name + ', text: ' + text);
	this.ui.startDraw(sender, text);
};

DrawHost.prototype.onReceiveDraw = function(sender, text) {
	util.log('onReceiveDraw() sender: ' + sender.name + ', text: ' + text);
	this.ui.draw(sender, text);
};

DrawHost.prototype.onReceiveStop = function(sender, text) {
	util.log('onReceiveStop() sender: ' + sender.name + ', text: ' + text);
	this.ui.stopDraw(sender, text);
};


