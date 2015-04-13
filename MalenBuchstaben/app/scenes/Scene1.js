alert('SceneScene1.js loaded');

/**
 * Initializes the canvas, creates and draws the letter, 
 * and handles the actions.
 * @returns
 */
function SceneScene1() {

}

/** Canvas Variables */
var canvas;
var ctx;
var sketch;
var sketch_style;
var onPaint;

var act_lineWidth = 2;
var act_lineJoin = 'round';
var act_lineCap = 'round';
var act_strokeStyle = 'red';

var mouse = {
	x : 0,
	y : 0
};

var hCanvas;
var hctx;

/** Extern objects */
var act_letter;
var eval;

/** Settings */
var random = false;
var r = 20;
var w = 15;
var lx = 400;
var ly = 100;
var messageDiv = "messageBox";
var alphabet;

/**
 * Fill alphabet array.
 */
function fillAlphabet () {
	alphabet[0] = new LetterA("LetterA", r, w, lx, ly, messageDiv);
	alphabet[1] = new LetterB("LetterB", r, w, lx, ly, messageDiv);
	alphabet[2] = new LetterC("LetterC", r, w, lx, ly, messageDiv);
	alphabet[3] = new LetterD("LetterD", r, w, lx, ly, messageDiv);
	alphabet[4] = new LetterE("LetterE", r, w, lx, ly, messageDiv);
	alphabet[5] = new LetterF("LetterF", r, w, lx, ly, messageDiv);
//	alphabet[6] = new LetterG("LetterG", r, w, lx, ly, messageDiv);
//	alphabet[7] = new LetterH("LetterH", r, w, lx, ly, messageDiv);
//	alphabet[8] = new LetterI("LetterI", r, w, lx, ly, messageDiv);
} 

/**
 * Chooses randomly a letter from the alphabet
 */
function getLetter() {
	var i = Math.floor(Math.random() * alphabet.length);
	var l = alphabet[i];

	// remove letter from array, so that every letter can be chosen only once
	alphabet.splice(i, 1);
	return l;
}

/**
 * this function will be called only once when the scene manager show this scene
 * first time.
 * initialize the scene controls and styles, and initialize your variables here.
 * scene HTML and CSS will be loaded before this function is called.
 */
SceneScene1.prototype.initialize = function() {
	alert("SceneScene1.initialize()");

	initalizeCanvas();

	eval = new Evaluation("Evaluation");
	drawLetter();
};

/**
 * Initializes the canvas and all EventHandler functions.
 */
initalizeCanvas = function() {
	$('#helpbox').hide();
	
	alphabet = new Array();
	if(random) {
		$('#random').css("text-decoration", "line-through");
	}
	else {
		$('#random').css("text-decoration", "none");
	}
	
	canvas = null;
	ctx = null;
	canvas = document.getElementById('paint');
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

	/* Mousedown */
	canvas.addEventListener('mousedown', function(e) {
		ctx.beginPath();
		ctx.moveTo(mouse.x, mouse.y);

		// if we are in the start point, start drawing green!
		if (act_letter.checkStart(mouse.x, mouse.y)) {
			// mark start point
			ctx.strokeStyle = "rgb(0, 128,0)";
			ctx.fillStyle = "rgb(0, 128,0)";
			act_letter.drawStartPoint();
		}
		
		alert("Clicks vor act_letter.start" + eval.clicks_part);
		alert("Started Letter? " + act_letter.start);
		if(act_letter.start) {
			eval.addClick();
		}
		
		alert("Clicks nach act_letter.start " + eval.clicks_part);
		if(eval.clicks_part > 1) {
			$('#info').html("Zeichne jeden Teil durchgehend! Beginne noch mal ;)");
			$('#info').fadeIn();
			
			return;
		}
		
		canvas.addEventListener('mousemove', onPaint, false);
		canvas.addEventListener('mousemove', checkMove, false);
	}, false);

	/* Mouseup */
	canvas.addEventListener('mouseup', function(e) {
		canvas.removeEventListener('mousemove', onPaint, false);
		canvas.removeEventListener('mousemove', checkMove, false);
	}, false);
};

/**
 * added when MOUSEDOWN, removed MOUSEUP
 * 
 * checks the color to know if you are drawing 
 * inside or outside the letter object
 */ 
checkMove = function(e) {
	// check only if the letter is started
	if (act_letter.start) {
		
		// check color of point where we are at the moment
		// mouse position + 1 to correct buggy colors
		data = ctx.getImageData(mouse.x+1, mouse.y+1, 1, 1).data;
//		alert([data[0] +" " + data[1] + " " + data[2] + " alpha " + data[3]]);
		 
		// count GREEN & GREY pixel as positive points
		// count WHITE pixel as negative points
		
		 // grey and green are good
		if (data[0] == 136 && data[1] == 136 && data[2] == 136) {
//			 alert("GREY!");
			eval.good++;
		} else if (data[0] == 0 && data[1] == 128 && data[2] == 0) {
//			 alert("GREEN!");
			eval.good++;
		} else if (data[0] == 0 && data[1] == 0 && data[2] == 0){
			eval.bad++;
		}
	}
};

/**
 * added when MOUSEDOWN, removed when MOUSEUP
 * 
 * draws the path and makes checks for start, end and control points.
 */ 
onPaint = function(e) {
	ctx.lineWidth = act_lineWidth;

	ctx.lineTo(mouse.x, mouse.y);
	ctx.stroke();

	if (act_letter.start && !act_letter.control) {
		act_letter.handleControls(mouse.x, mouse.y);
	} else if (act_letter.start && act_letter.control) {
		act_letter.checkEnd(mouse.x, mouse.y);

		if (act_letter.end && !act_letter.endAll) {			
			// mark end point
			ctx.strokeStyle = "rgb(0, 128,0)";
			ctx.fillStyle = "rgb(0, 128,0)";			
			act_letter.drawEndPoint();

			eval.calculate();

			// start with next part
			ctx.strokeStyle = "rgb(136, 136, 136)";
			ctx.fillStyle = "rgb(136, 136, 136)";
			act_letter.drawNextPart();
			
			eval.resetClicks();
			
			// to stop drawing a line after reaching a end point
			canvas.removeEventListener('mousemove', onPaint, false);
			canvas.removeEventListener('mousemove', checkMove, false);
		} else if (act_letter.endAll) {
			// mark end point
			ctx.strokeStyle = "rgb(0, 128,0)";
			ctx.fillStyle = "rgb(0, 128,0)";
			act_letter.drawEndPoint();

			eval.calculate();

			// canvas = null;
			ctx = null;
			success();
		}
	}
};

/**
 * Draws the letter on the canvas.
 */
function drawLetter() {
	alert("draw Letter...");
	
	/* Drawing on Paint App */
	ctx.lineJoin = act_lineJoin;
	ctx.lineCap = act_lineCap;

	ctx.lineWidth = 10;
	ctx.strokeStyle = "rgb(136, 136, 136)";
	ctx.fillStyle = "rgb(136, 136, 136)";
	
	act_letter = null;
	if(random) {
		if(alphabet.length == 0) {
			fillAlphabet();
		}
		
		act_letter = getLetter();
	}
	else {
//		act_letter = new LetterA("LetterA", r, w, lx, ly, messageDiv);
//		act_letter = new LetterB("LetterB", r, w, lx, ly, messageDiv);
//		act_letter = new LetterC("LetterC", r, w, lx, ly, messageDiv);
//		act_letter = new LetterD("LetterD", r, w, lx, ly, messageDiv);
//		act_letter = new LetterE("LetterE", r, w, lx, ly, messageDiv);
		act_letter = new LetterF("LetterF", r, w, lx, ly, messageDiv);
	}
	
	// drawing the actual letter
	act_letter.drawPreview(0, 0);

	act_letter.drawStartPoint();
	act_letter.drawEndPoint();
	act_letter.drawControlPoints();
	act_letter.drawHelpLines();

	ctx.strokeStyle = act_strokeStyle;
	ctx.lineWidth = act_lineWidth;
	alert(act_strokeStyle);
};

/**
 * Resets everything for a new try.
 */
function newTry() {
	alert("Reset");
	
	$('#helpbox').hide();
	
//	initalizeCanvas();
	canvas.width = canvas.width;
	ctx = canvas.getContext('2d');
	
	$('#messageBox').html("");
	$('#points').html("");
	$('#info').slideUp();
		
	drawLetter();
	eval.reset();
	
	alert("Clicks " + eval.clicks_part);
}

function randomise() {	
	if(random) {
		alert("randomise: random modus deactivated");
		
		random = false;
		$('#random').css("text-decoration", "none");
	}
	else {
		alert("randomise: random modus activated");
		
		random = true;
		$('#random').css("text-decoration", "line-through");
	}
}

/**
 * Shows help.
 */
function help() {
	alert("Help");

	posX = 100;
	poxY = 80;

	$('#helpbox').show();

	hCanvas = document.getElementById('helpCanvas');
	hctx = canvas.getContext('2d');
	
	/* Drawing on Paint App */
	hctx.lineWidth = act_lineWidth;
	hctx.lineJoin = act_lineJoin;

	// background
	hctx.fillStyle = "white";
	hctx.beginPath();
	hctx.rect(50, 50, 405, 225);
	hctx.closePath();
	hctx.fill();

	hctx.strokeStyle = "rgb(136, 136, 136)";
	hctx.font = '20pt Calibri';

	// draw startpoint
	hctx.fillStyle = "rgb(136, 136, 136)";
	hctx.beginPath();
	hctx.arc(posX, poxY, 10, 0, Math.PI * 2, true);
	hctx.closePath();
	hctx.stroke();
	hctx.fill();

	hctx.fillStyle = "black";
	hctx.fillText("Starte hier", posX + 20, poxY + 10);

	// control points
	hctx.fillStyle = "rgb(136, 136, 136)";
	hctx.beginPath();
	hctx.arc(posX, poxY + 50, 10, 0, Math.PI * 2, true);
	hctx.closePath();
	hctx.stroke();

	hctx.fillStyle = "black";
	hctx.fillText("Kreuze diese Punkte", posX + 20, poxY + 60);

	// end point
	hctx.fillStyle = "rgb(136, 136, 136)";
	hctx.beginPath();
	hctx.rect(posX - 10, poxY + 90, 15, 15);
	hctx.closePath();
	hctx.stroke();
	hctx.fill();

	hctx.fillStyle = "black";
	hctx.fillText("Das ist dein letzter Punkt", posX + 20, poxY + 110);

	// hilfslinien
	hctx.moveTo(posX - 10, poxY + 140);
	hctx.lineTo(posX + 15, poxY + 170);
	hctx.stroke();

	hctx.fillStyle = "black";
	hctx.fillText("Folge diesen Linien", posX + 20, poxY + 160);
}

/**
 * Closes Help.
 */
function closeHelp() {
	newTry();
	//	
	$('#helpbox').hide();
}

/**
 * Shows and updates the points message.
 */
function points() {
	if(eval.percentage == 100) {
		$('#points').html(eval.percentage.toPrecision(3) + " Points");
	}
	else {
		$('#points').html(eval.percentage.toPrecision(2) + " Points");
	}	
}

/**
 * Shows a motivating message.
 */
function success() {
	alert("success...");
	
	points();
		
	if(eval.percentage.toPrecision(2) > 90) {
		$('#messageBox').html("SUPER! Versuch gleich den nächsten Buchstaben!");
	}
	else if(eval.percentage.toPrecision(2) > 80) {
		$('#messageBox').html("Toll! Versuch dich noch zu verbessern!");
	}
	else if(eval.percentage.toPrecision(2) > 70) {
		$('#messageBox').html("Das war schon ganz toll!");
	}
	else if(eval.percentage.toPrecision(2) > 50) {
		$('#messageBox').html("Übe noch ein bisschen.");
	}
	else {
		$('#messageBox').html("Das schaffst du besser. Versuch es nocheinmal!");
	}
}



// #####################################################################################

SceneScene1.prototype.handleShow = function(data) {
	alert("SceneScene1.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneScene1.prototype.handleHide = function() {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function() {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function() {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another
	// scene from this scene
};

SceneScene1.prototype.handleKeyDown = function(keyCode) {
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
