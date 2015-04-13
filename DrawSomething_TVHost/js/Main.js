
var version = '0.8';

var appKey = '9f16a349-1c4e-4cef-9dcb-cc90f92fd4d1';

var game = new DrawHost(appKey);

function onPageLoaded() {
	util.log('onPageLoaded()');
	game.ui.displayName("Draw Something");
	game.createRoom('DrawHost');
};

// THIS WILL INITIALIZE SAMSUNG TV's
(function() {
	var head = document.getElementsByTagName('head')[0];
	function addScript(path, callback) {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = path;
		script.onload = callback;
		head.appendChild(script);
	};
	// IF THIS IS A SamsungTV, ADD THE WIDGET API AND SEND THE READY EVENT
	if (navigator && navigator.appCodeName) {
		var appCodeName = navigator.appCodeName.toLowerCase();
		if (appCodeName.indexOf('maple') != -1) {
			addScript("$MANAGER_WIDGET/Common/API/Widget.js", function() {});
			document.attachEvent('load', function(event) {
				if (Common && Common.API && Common.API.Widget) {
					alert('SENDING READY EVENT TO SAMSUNG TV');
					var widgetAPI = new Common.API.Widget();
					widgetAPI.sendReadyEvent();
				}
			});
		}
	}
})();




