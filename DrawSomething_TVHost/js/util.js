
// UTILITIES
var util = {};

util.log = function(message) {
	if (window && window.console) {
		console.log('Draw-Host: ' + message);
	}
};

util.createDelegate = function(instance, method) {
	return function() { 
		return method.apply(instance, arguments); 
	}; 	
};

util.trim = function(str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
};