/**
 * Specific Objekt Letter B Draws the letter and handles the start, control and
 * end points.
 * 
 * @returns
 */
function LetterB() {
}

var name;
var messageDiv;

/** variable to check the points */
var start = false;
var control = false;
/** Array with boolean variables for every control point */
var controlNr;
var end = false;
var endAll = false;

/** size and dimensions */
var radius;
var x, y;
var lineWidth;

/** Array for start points */
var pt_start_x, pt_start_y;
/** Array for control points */
var pt_control_x, pt_control_y;
/** Array for end points */
var pt_end_x, pt_end_y;

/** Mouse Coordinates */
var save_x, save_y;

/** variable for canvas */
var canvas, ctx;

/**
 * Initializes a new Letter B
 */
function LetterB(n, r, w, x, y, messageDiv) {
	this.name = n;
	alert("Letter " + n + " initalized!");
	this.messageDiv = messageDiv;

	this.canvas = document.getElementById('paint');
	this.ctx = canvas.getContext('2d');

	this.start = false;
	this.control = false;
	this.controlNr = new Array();
	this.end = false;
	this.endAll = false;

	this.radius = r;
	this.x = x;
	this.y = y;
	this.lineWidth = w;

	this.pt_start_x = new Array();
	this.pt_start_y = new Array();
	this.pt_end_x = new Array();
	this.pt_end_y = new Array();
	this.pt_control_x = new Array();
	this.pt_control_y = new Array();

	this.pt_start_x[0] = x;
	this.pt_start_y[0] = y + 200;
	this.pt_end_x[0] = x + 30;
	this.pt_end_y[0] = y + 190;
	this.pt_control_x[0] = x;
	this.pt_control_y[0] = y;
	this.controlNr[0] = false;
	this.pt_control_x[1] = x + 30;
	this.pt_control_y[1] = y + 100;
	this.controlNr[1] = false;

	// Methods
	this.drawStartPoint = LetterB_drawStartPoint;
	this.drawEndPoint = LetterB_drawEndPoint;
	this.drawControlPoints = LetterB_drawControlPoints;
	this.drawHelpLines = LetterB_drawHelpLines;

	this.checkStart = LetterB_checkStart;
	this.handleControls = LetterB_handleControls;
	this.checkEnd = LetterB_checkEnd;

	this.drawPreview = LetterB_drawPreview;
};

/*******************************************************************************
 * METHODS TO DRAW ALL LETTER RELATED POINTS AND LINES
 ******************************************************************************/

/**
 * Draws the start points. Regarding to the actual part of the letter.
 */
function LetterB_drawStartPoint() {
	alert("letterB: draw start point");

	drawStartPoint(this, 0, 0);
};

/**
 * Draws the end points. Regarding to the actual part of the letter.
 */
function LetterB_drawEndPoint() {
	alert("letterB: draw end point");

	drawEndPoint(this, 0, 0);
};

/**
 * Draws the control points. Regarding to the actual part of the letter.
 */
function LetterB_drawControlPoints() {
	alert("letterB: draw control points");

	// draw all control points
	for ( var i = 0; i < this.pt_control_x.length; i++) {
		drawControlPoint(this, i, 0);
	}
};

/**
 * Draws the help lines and lines of the letter, Regarding to the actual part of
 * the letter.
 */
function LetterB_drawHelpLines() {
	alert("letterB: draw help lines");

	this.ctx.lineWidth = this.lineWidth;

	this.ctx.beginPath();
	this.ctx.moveTo(this.pt_start_x[0], this.pt_start_y[0]);
	this.ctx.lineTo(this.pt_control_x[0], this.pt_control_y[0]);
	this.ctx.stroke();

	// curve1
	this.ctx.beginPath();
	this.ctx.moveTo(this.pt_control_x[0], this.pt_control_y[0]);
	ctx.bezierCurveTo(this.pt_control_x[0] + 100, this.pt_control_y[0],
			this.pt_control_x[1] + 100, this.pt_control_y[1],
			this.pt_control_x[1], this.pt_control_y[1]);
	this.ctx.stroke();

	// curve2
	this.ctx.beginPath();
	this.ctx.moveTo(this.pt_control_x[1], this.pt_control_y[1]);
	ctx.bezierCurveTo(this.pt_control_x[1] + 100, this.pt_control_y[1],
			this.pt_end_x[0] + 100, this.pt_end_y[0] + this.radius / 2,
			this.pt_end_x[0], this.pt_end_y[0] + this.radius / 2);
	this.ctx.stroke();
};

/**
 * Draws a smaller version - a preview - of the letter.
 */
function LetterB_drawPreview(xPos, yPos) {
	this.ctx.lineWidth = this.lineWidth - (this.lineWidth / 2);

	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_start_x[0] / 2, yPos + this.pt_start_y[0]
			/ 2);
	this.ctx.lineTo(xPos + this.pt_control_x[0] / 2, yPos
			+ this.pt_control_y[0] / 2);
	this.ctx.stroke();

	// curve1
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_control_x[0] / 2, yPos
			+ this.pt_control_y[0] / 2);
	this.ctx.bezierCurveTo(xPos + (this.pt_control_x[0] + 100) / 2, yPos
			+ this.pt_control_y[0] / 2,
			xPos + (this.pt_control_x[1] + 100) / 2, yPos
					+ this.pt_control_y[1] / 2,
			xPos + this.pt_control_x[1] / 2, yPos + this.pt_control_y[1] / 2);
	this.ctx.stroke();

	// curve2
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_control_x[1] / 2, yPos
			+ this.pt_control_y[1] / 2);
	ctx.bezierCurveTo(xPos + (this.pt_control_x[1] + 100) / 2, yPos
			+ this.pt_control_y[1] / 2, xPos + (this.pt_end_x[0] + 100) / 2,
			yPos + (this.pt_end_y[0] + this.radius / 2) / 2, xPos
					+ this.pt_end_x[0] / 2, yPos
					+ (this.pt_end_y[0] + this.radius / 2) / 2);
	this.ctx.stroke();
}

/*******************************************************************************
 * METHODS TO CHECK USERS MOVEMENT
 ******************************************************************************/

/**
 * Checks if user starts in the start point. Regarding to the actual part of the
 * letter.
 */
function LetterB_checkStart(x, y) {
	// alert("checking start point...mouse-x: " + x + ", mouse-y: " + y);

	if (!this.start) {
		if (x >= (this.pt_start_x[0] - this.radius)
				&& x <= (this.pt_start_x[0] + this.radius)
				&& y >= (this.pt_start_y[0] - this.radius)
				&& y <= (this.pt_start_y[0] + this.radius)) {
			alert("letterB: in the start point!");

			this.start = true;
			return true;
		}
	}
};

/**
 * Checks if the user passes the control point(s). Regarding to the actual part
 * of the letter.
 */
function LetterB_handleControls(x, y) {
	// alert("checking control points...mouse-x: " + x + ", mouse-y: " + y);

	if (this.start) {
		for ( var c = 0; c < this.controlNr.length; c++) {
			if (!this.controlNr[c]) {
				if (x >= this.pt_control_x[c] - this.radius
						&& x <= this.pt_control_x[c] + this.radius
						&& y >= this.pt_control_y[c] - this.radius
						&& y <= this.pt_control_y[c] + this.radius) {
					alert("letterB: in the control point nr. " + c);
					this.controlNr[c] = true;

					if (c == this.controlNr.length - 1) {
						this.control = true;
					}

					// save coordinates and remove eventlistener
					saveToRedrawControlPoint();

					// draw controlpoint new in green
					this.ctx.strokeStyle = "green";
					drawControlPoint(this, c, 0);

					// move mouse and add evenlistener again
					addToRedrawControlPoint();
				}
				return;
			}
		}
	}
};

/**
 * Checks if the user ends in the end point. Regarding to the actual part of the
 * letter.
 */
function LetterB_checkEnd(x, y) {

	if (this.start) {
		var tmp = 0;
		for ( var c = 0; c < this.controlNr.length; c++) {
			if (this.controlNr[c]) {
				tmp++;
			}
		}

		if (tmp == this.controlNr.length) {
			if (x >= this.pt_end_x[0] && x <= this.pt_end_x[0] + this.radius
					&& y >= this.pt_end_y[0]
					&& y <= this.pt_end_y[0] + this.radius) {
				alert("letterA: in the  end point!");

				this.end = true;
				this.endAll = true;
			}
		}
	}
}