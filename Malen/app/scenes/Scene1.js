alert('Scene1.js loaded');

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

function SceneScene1() {

}

SceneScene1.prototype.initialize = function() {
	alert("SceneLetters.initialize()");
	// this function will be called only once when the scene manager show this
	// scene first time
	// initialize the scene controls and styles, and initialize your variables
	// here
	// scene HTML and CSS will be loaded before this function is called
		
	canvas = document.getElementById('paint');
	ctx = canvas.getContext('2d');
	
//	sketch = document.getElementById('sketch');
//	sketch_style = getComputedStyle(sketch);
//	canvas.width = parseInt(sketch_style.getPropertyValue('width'));
//	canvas.height = parseInt(sketch_style.getPropertyValue('height'));	
		
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
	}, false);
	 
	onPaint = function() {
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
	};
	
	setUpItemCanvases();	
	
	/* bind items listeners */
	$('#color_red').bind("click", {choice : "red"}, this.clickHandler);
	$('#color_blue').bind("click", {choice : "blue"}, this.clickHandler);
	$('#color_green').bind("click", {choice : "green"}, this.clickHandler);
	$('#color_yellow').bind("click", {choice : "yellow"}, this.clickHandler);
	
	$('#eraser').bind("click", {choice : "white"}, this.clickHandler);
	
	$('#width_1').bind("click", {choice : "1"}, this.clickHandler);
	$('#width_3').bind("click", {choice : "3"}, this.clickHandler);
	$('#width_5').bind("click", {choice : "5"}, this.clickHandler);
	$('#width_8').bind("click", {choice : "8"}, this.clickHandler);
	$('#width_10').bind("click", {choice : "10"}, this.clickHandler);
	
};
SceneScene1.prototype.handleShow = function(data) {
	alert("SceneLetters.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneScene1.prototype.handleHide = function() {
	alert("SceneLetters.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function() {
	alert("SceneLetters.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function() {
	alert("SceneLetters.handleBlur()");
	// this function will be called when the scene manager move focus to another
	// scene from this scene
};

SceneScene1.prototype.handleKeyDown = function(keyCode) {
	alert("SceneLetters.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
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

SceneScene1.prototype.clickHandler = function(event) {
	alert("SceneLetters.clickHandler(" + event.data.choice + ")");
	
	if(event.data.choice == 'red' || event.data.choice == 'blue' || event.data.choice == 'green' || event.data.choice == 'yellow' || event.data.choice == 'white') {
		act_strokeStyle = event.data.choice;
		ctx.strokeStyle = act_strokeStyle;
	}
	else if(event.data.choice == '1' || event.data.choice == '3' || event.data.choice == '5' || event.data.choice == '8' || event.data.choice == '10') {
		act_lineWidth = event.data.choice;
		ctx.lineWidth = act_lineWidth;
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
	context.arc(20,20,20,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_green').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "green";
	context.beginPath();
	context.arc(20,20,20,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_yellow').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "yellow";
	context.beginPath();
	context.arc(20,20,20,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_1').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20,20,1,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_3').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20,20,3,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_5').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20,20,5,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_8').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20,20,8,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_10').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "grey";
	context.beginPath();
	context.arc(20,20,10,0,Math.PI*2,true);
	context.closePath();
	context.stroke();
	context.fill();
	
	var context = document.getElementById('canvas_eraser').getContext('2d');
	context.strokeStyle = "#000000";
	context.fillStyle = "white";
	context.beginPath();
	context.rect(0,0,30,30);
	context.closePath();
	context.stroke();
	context.fill();
}