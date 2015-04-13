// TODO Template for new Letters
// TODO change name of all LetterD and letterD to appropriate new letter
// TODO look for todos in this file and modify these parts
// Note: all parts that should draw like the same for all letters are in the general Letter.js

/**
 * Specific Objekt Letter A Draws the letter and handles the start, control and
 * end points.
 * 
 * @returns
 */
function LetterD() {
}

var name;
var messageDiv;

/** how many parts do we have to draw? */

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
 * Initializes a new Letter A
 */
function LetterD(n, r, w, x, y, messageDiv) {
	alert("n: " + n + "; r: " + r + "; w: " + w + "; x: " + x + "; y: " + y
			+ "; message: " + messageDiv);

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

	// TODO add coordinates of all start, end and control points
	/** start points */
	this.pt_start_x[0] = x;
	this.pt_start_y[0] = y + 200;
	/** end points */
	this.pt_end_x[0] = x + 25;
	this.pt_end_y[0] = y + 195;
	/** control points */
	this.pt_control_x[0] = x;
	this.pt_control_y[0] = y;
	this.controlNr[0] = false;
	this.pt_control_x[1] = x + 150;
	this.pt_control_y[1] = y + 100;
	this.controlNr[1] = false;

	// Methods
	this.drawStartPoint = LetterD_drawStartPoint;
	this.drawEndPoint = LetterD_drawEndPoint;
	this.drawControlPoints = LetterD_drawControlPoints;
	this.drawHelpLines = LetterD_drawHelpLines;

	this.checkStart = LetterD_checkStart;
	this.handleControls = LetterD_handleControls;
	this.checkEnd = LetterD_checkEnd;

	this.drawNextPart = LetterD_drawNextPart;

	this.drawPreview = LetterD_drawPreview;
};

/*******************************************************************************
 * METHODS TO DRAW ALL LETTER RELATED POINTS AND LINES
 ******************************************************************************/

/**
 * Draws the start points. Regarding to the actual part of the letter.
 */
function LetterD_drawStartPoint() {
	alert("letterD: draw start point");

	// TODO if there is more than one part, modify this respectively

	if (!this.part1 && !this.part2) {
		alert("letterD: draw first start point");

		drawStartPoint(this, 0, 0);
	} else if (this.part1 && !this.part2) {
		alert("letterD: draw second start point");

		drawStartPoint(this, 1, 0);
	}
};

/**
 * Draws the end points. Regarding to the actual part of the letter.
 */
function LetterD_drawEndPoint() {
	alert("letterD: draw end point");

	// TODO if there is more than one part, modify this respectively

	if (!this.part1 && !this.part2 || this.part1 && !this.part2 && this.end) {
		alert("letterD: draw first end point!");

		drawEndPoint(this, 0, 0);
	} else if (this.part1 && !this.part2 && !this.end || this.part1
			&& this.part2 && this.end) {
		alert("letterD: draw second end point!");

		drawEndPoint(this, 1, -(this.radius / 2));
	}
};

/**
 * Draws the control points. Regarding to the actual part of the letter.
 */
function LetterD_drawControlPoints() {
	alert("letterD: draw control points");

	// draw all control points
	for ( var i = 0; i < this.pt_control_x.length; i++) {
		drawControlPoint(this, i, 0);
	}
};

/**
 * Draws the help lines and lines of the letter, Regarding to the actual part of
 * the letter.
 */
function LetterD_drawHelpLines() {
	alert("letterD: draw help lines");

	this.ctx.lineWidth = this.lineWidth;

	this.ctx.beginPath();
	this.ctx.moveTo(this.pt_start_x[0], this.pt_start_y[0]);
	this.ctx.lineTo(this.pt_control_x[0], this.pt_control_y[0]);
	this.ctx.stroke();

	// curve
	this.ctx.beginPath();
	this.ctx.moveTo(this.pt_control_x[0], this.pt_control_y[0]);
	ctx.bezierCurveTo(this.pt_control_x[0] + 180, this.pt_control_y[0],
			this.pt_end_x[0] + 180, this.pt_end_y[0], this.pt_end_x[0],
			this.pt_end_y[0] + this.radius / 2);
	this.ctx.stroke();
};

/**
 * Draws a smaller version - a preview - of the letter.
 */
function LetterD_drawPreview(xPos, yPos) {
	alert("letterD: draw preview");

	this.ctx.lineWidth = this.lineWidth - (this.lineWidth / 2);

	// TODO modify preview

	// start point - control point
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_start_x[0] / 2, yPos + this.pt_start_y[0]
			/ 2);
	this.ctx.lineTo(xPos + this.pt_control_x[0] / 2, yPos
			+ this.pt_control_y[0] / 2);
	this.ctx.stroke();

	// curve
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_control_x[0] / 2, yPos
			+ this.pt_control_y[0] / 2);
	this.ctx.bezierCurveTo(xPos + (this.pt_control_x[0] + 180) / 2, yPos
			+ this.pt_control_y[0] / 2, xPos + (this.pt_end_x[0] + 180) / 2,
			yPos + this.pt_end_y[0] / 2, xPos + this.pt_end_x[0] / 2, yPos
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
function LetterD_checkStart(x, y) {
	// alert("checking start point...mouse-x: " + x + ", mouse-y: " + y);

	// TODO for each part

	if (!this.start) {
		if (x >= (this.pt_start_x[0] - this.radius)
				&& x <= (this.pt_start_x[0] + this.radius)
				&& y >= (this.pt_start_y[0] - this.radius)
				&& y <= (this.pt_start_y[0] + this.radius)) {
			alert("letterD: in the first start point!");

			this.start = true;
			return true;
		}
	}
};

/**
 * Checks if the user passes the control point(s). Regarding to the actual part
 * of the letter.
 */
function LetterD_handleControls(x, y) {
	// alert("checking control points...mouse-x: " + x + ", mouse-y: " + y);

	// TODO for each control point (also look LetterB)

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
function LetterD_checkEnd(x, y) {

	// TODO for each part

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

/**
 * Draws after finishing one part the next part of the letter. (If there are
 * more).
 */
function LetterD_drawNextPart() {
	alert("letterD: draw next part!");

	this.start = false;
	this.control = true; // no hay puntos de control
	this.end = false;

	// draw second part
	this.drawStartPoint();
	this.drawHelpLines();
	this.drawEndPoint();
}