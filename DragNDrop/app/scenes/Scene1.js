alert('SceneScene1.js loaded');

function SceneScene1() {

}

var counter = 0;

var interval;
var minutes = 1;
var seconds = 5;

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	
	countdown("countdown");
	
	var el = document.getElementById("counter");
	el.innerHTML = counter;

	// create wooden box
	$('#droppable').droppable({
  			drop: function(event, ui) { SceneScene1.prototype.drop(event, ui); }
	});
	
	// create apples
	for ( var i = 0; i < 10; i++) {

		var board = document.getElementById("board");
		var div = document.createElement("div");
		div.setAttribute("class", "apple");

		var apple = document.createElement("image");
		var name = "apple" + i;
		apple.setAttribute("src", "images/apple.png");
		apple.setAttribute("id", name);		
		
		//random top position
		var randomTop = 200*Math.random(); 
		//random left position
        var randomLeft = 200*Math.random(); 
		
		apple.setAttribute("style", "height: 50px; top:" + randomTop + "px; left:"+ randomLeft + "px;");
		
		
		div.appendChild(apple);
		board.appendChild(div);


		$('#' + name).draggable();
	}
	
};

/**
 * Initialize countdown
 */
function countdown(element) {
	var el = document.getElementById(element);
	var minute_text;
	var second_text;
	
    interval = setInterval(function() {
    	if (counter != 10) {
	        if(seconds == 0) {
	            if(minutes == 0) {
	                el.innerHTML = "AUS!";                    
	                clearInterval(interval);
	                return;
	            } else {
	                minutes--;
	                seconds = 59;
	            }
	        }
	        if(minutes > 0) {
	        	minute_text = "0" + minutes + ":";
	        } else {
	            minute_text = "00:";
	        }
	        if (seconds < 10) {
	        	second_text = "0" + seconds;
	        } else {
	            second_text = seconds;
	        }
	        
	        el.innerHTML = minute_text + second_text;
	          
	        seconds--;
        } else {
        	// stop countdown
        	clearInterval(interval);
        	
        	// You won message
        	var won = document.getElementById("won");
        	won.style.display = "block";
        	won.style.fontSize = "50px";
        	won.style.color = "#ACFA58";
        	won.style.backgroundColor = "#58ACFA";

        }
    }, 1000);

};


/**
 * Settings for drop
 */
SceneScene1.prototype.drop = function (event, ui) {
	// droppable only if time not over
	// dropped apples are not visible anymore
	if (minutes != 0 || seconds != 0) {
		var draggableID = ui.draggable.attr('id');
		$("#"+draggableID).draggable({disabled : true});
		document.getElementById(draggableID).style.visibility = "hidden";
		counter++;
		var el = document.getElementById("counter");
		el.innerHTML = counter;
	} else {
		var droppableId = $(this).attr("id");	
		$( "#"+droppableId).droppable({ disabled: true });
	}
	
};

/**
 * Creates new Game
 */
function newGame() {
	alert("new Game ---------------------");
	
	// clear countdown
	clearInterval(interval);

	counter = 0;

	minutes = 1;
	seconds = 5;
	
	// hide won-text
	var won = document.getElementById("won");
	won.style.display = "none";
	
	// delete all apples
	var cell = document.getElementById("board");
	if ( cell.hasChildNodes() )
	{
	    while ( cell.childNodes.length >= 1 )
	    {
	        cell.removeChild( cell.firstChild );       
	    } 
	}
	
	SceneScene1.prototype.initialize();
};


SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
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
