// TODO Template for new Letters
// TODO look for todos in this file and modify these parts
// Note: all parts that should draw like the same for all letters are in the general Letter.js

/**
 * Specific Objekt Letter A Draws the letter and handles the start, control and
 * end points.
 * 
 * @returns
 */
function LetterF() {
}

var name;
var messageDiv;

/** how many parts do we have to draw? */
var part1 = false;
var part2 = false;

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
function LetterF(n, r, w, x, y, messageDiv) {
	alert("n: " + n + "; r: " + r + "; w: " + w + "; x: " + x + "; y: " + y
			+ "; message: " + messageDiv);

	this.name = n;
	alert("Letter " + n + " initalized!");
	this.messageDiv = messageDiv;

	this.canvas = document.getElementById('paint');
	this.ctx = canvas.getContext('2d');

	// TODO is there more than one part?
	this.part1 = false;
	this.part2 = false;
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
	this.pt_start_x[0] = x + 100;
	this.pt_start_y[0] = y;
	this.pt_start_x[1] = x;
	this.pt_start_y[1] = y + 100;
	/** end points */
	this.pt_end_x[0] = x;
	this.pt_end_y[0] = y + 200;
	this.pt_end_x[1] = x + 80;
	this.pt_end_y[1] = y + 100;
	/** control points */
	this.pt_control_x[0] = x;
	this.pt_control_y[0] = y;
	this.controlNr[0] = false;

	// Methods
	this.drawStartPoint = LetterF_drawStartPoint;
	this.drawEndPoint = LetterF_drawEndPoint;
	this.drawControlPoints = LetterF_drawControlPoints;
	this.drawHelpLines = LetterF_drawHelpLines;

	this.checkStart = LetterF_checkStart;
	this.handleControls = LetterF_handleControls;
	this.checkEnd = LetterF_checkEnd;

	this.drawNextPart = LetterF_drawNextPart;

	this.drawPreview = LetterF_drawPreview;
};

/*******************************************************************************
 * METHODS TO DRAW ALL LETTER RELATED POINTS AND LINES
 ******************************************************************************/

/**
 * Draws the start points. Regarding to the actual part of the letter.
 */
function LetterF_drawStartPoint() {
	alert("letterF: draw start point");

	if (!this.part1 && !this.part2) {
		alert("letterF: draw first start point");

		drawStartPoint(this, 0, 0);
	} else if (this.part1 && !this.part2) {
		alert("letterF: draw second start point");

		drawStartPoint(this, 1, 0);
	}
};

/**
 * Draws the end points. Regarding to the actual part of the letter.
 */
function LetterF_drawEndPoint() {
	alert("letterF: draw end point");

	if (!this.part1 && !this.part2 || this.part1 && !this.part2 && this.end) {
		alert("letterF: draw first end point!");

		drawEndPoint(this, 0, -(this.radius / 2));
	} else if (this.part1 && !this.part2 && !this.end || this.part1
			&& this.part2 && this.end) {
		alert("letterF: draw second end point!");

		drawEndPoint(this, 1, -(this.radius / 2));
	}
};

/**
 * Draws the control points. Regarding to the actual part of the letter.
 */
function LetterF_drawControlPoints() {
	alert("letterF: draw control points");

	// draw all control points
	for ( var i = 0; i < this.pt_control_x.length; i++) {
		drawControlPoint(this, i, 0);
	}
};

/**
 * Draws the help lines and lines of the letter, Regarding to the actual part of
 * the letter.
 */
function LetterF_drawHelpLines() {
	alert("letterF: draw help lines");

	this.ctx.lineWidth = this.lineWidth;

	if (!this.part1 && !this.part2) {
		alert("letterF: draw first help lines!");
		this.ctx.beginPath();
		this.ctx.moveTo(this.pt_start_x[0], this.pt_start_y[0]);
		this.ctx.lineTo(this.pt_control_x[0], this.pt_control_y[0]);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(this.pt_control_x[0], this.pt_control_y[0]);
		this.ctx.lineTo(this.pt_end_x[0], this.pt_end_y[0]);
		this.ctx.stroke();
	} else if (this.part1 && !this.part2) {
		alert("letterF: draw second help lines!");
		this.ctx.beginPath();
		this.ctx.moveTo(this.pt_start_x[1], this.pt_start_y[1]);
		this.ctx.lineTo(this.pt_end_x[1], this.pt_end_y[1]);
		this.ctx.stroke();
	}
};

/**
 * Draws a smaller version - a preview - of the letter.
 */
function LetterF_drawPreview(xPos, yPos) {
	alert("letterF: draw preview");

	this.ctx.lineWidth = this.lineWidth - (this.lineWidth / 2);

	// 1st start point - 1st control point
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_start_x[0] / 2, yPos + this.pt_start_y[0]
			/ 2);
	this.ctx.lineTo(xPos + this.pt_control_x[0] / 2, yPos
			+ this.pt_control_y[0] / 2);
	this.ctx.stroke();

	// 1nd control point - 1st end point
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_control_x[0] / 2, yPos
			+ this.pt_control_y[0] / 2);
	this.ctx.lineTo(xPos + this.pt_end_x[0] / 2, yPos + this.pt_end_y[0] / 2);
	this.ctx.stroke();

	// 2nd start point - 2nd end point
	this.ctx.beginPath();
	this.ctx.moveTo(xPos + this.pt_start_x[1] / 2, yPos + this.pt_start_y[1]
			/ 2);
	this.ctx.lineTo(xPos + this.pt_end_x[1] / 2, yPos + this.pt_end_y[1] / 2);
	this.ctx.stroke();
}

/*******************************************************************************
 * METHODS TO CHECK USERS MOVEMENT
 ******************************************************************************/

/**
 * Checks if user starts in the start point. Regarding to the actual part of the
 * letter.
 */
function LetterF_checkStart(x, y) {
	// alert("checking start point...mouse-x: " + x + ", mouse-y: " + y);

	// TODO for each part

	if (!this.start) {
		if (!this.part1 && !this.part2) {
			if (x >= (this.pt_start_x[0] - this.radius)
					&& x <= (this.pt_start_x[0] + this.radius)
					&& y >= (this.pt_start_y[0] - this.radius)
					&& y <= (this.pt_start_y[0] + this.radius)) {
				alert("letterF: in the first start point!");

				this.start = true;
				return true;
			}
		} else if (this.part1 && !this.part2) {
			if (x >= (this.pt_start_x[1] - this.radius)
					&& x <= (this.pt_start_x[1] + this.radius)
					&& y >= (this.pt_start_y[1] - this.radius)
					&& y <= (this.pt_start_y[1] + this.radius)) {
				alert("letterF: in the second start point!");

				this.start = true;
				return true;
			}
		}

	}
};

/**
 * Checks if the user passes the control point(s). Regarding to the actual part
 * of the letter.
 */
function LetterF_handleControls(x, y) {
	// alert("checking control points...mouse-x: " + x + ", mouse-y: " + y);

	// TODO for each control point (also look LetterB)

	if (this.start) {
		if (!this.part1 && !this.part2) {
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
//		else if(this.part1 && !this.part2) {
//			
//		}
	}
};

/**
 * Checks if the user ends in the end point. Regarding to the actual part of the
 * letter.
 */
function LetterF_checkEnd(x, y) {

	// TODO for each part

	if (this.start && this.control && !this.part1 && !this.part2) {
		if (x >= this.pt_end_x[0] && x <= this.pt_end_x[0] + this.radius
				&& y >= this.pt_end_y[0] && y <= this.pt_end_y[0] + this.radius) {
			alert("letterF: in the first end point!");

			// first part is finished
			// this.part1=true;
			this.part1 = true;
			this.end = true;

			// second not
			this.part2 = false;

			this.writeMessage("Toll! Jetzt Teil 2!");
		}
	} else if (this.start && this.control && this.part1 && !this.part2) {
		if (x >= this.pt_end_x[1] && x <= this.pt_end_x[1] + this.radius
				&& y >= this.pt_end_y[1] && y <= this.pt_end_y[1] + this.radius) {
			alert("letterF: in the second end point!");

			// second part is finished
			this.part2 = true;
			this.end = true;

			// letter is finished
			this.endAll = true;
		}
	}
}

/**
 * Draws after finishing one part the next part of the letter. (If there are
 * more).
 */
function LetterF_drawNextPart() {
	alert("letterF: draw next part!");

	this.start = false;
	this.control = true; // no hay puntos de control
	this.end = false;

	// draw second part
	this.drawStartPoint();
	this.drawHelpLines();
	this.drawEndPoint();
}