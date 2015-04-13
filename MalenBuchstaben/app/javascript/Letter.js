/*******************************************************************************
 * DRAWING POINT METHODS
 ******************************************************************************/
function drawStartPoint(obj, nr, offset) {
	alert(obj.name + ": draw start point");
	
	obj.ctx.lineWidth = obj.lineWidth;
	
	// filled circle
	obj.ctx.beginPath();
	obj.ctx.arc(obj.pt_start_x[nr]+offset, obj.pt_start_y[nr]+offset, obj.radius, 0, Math.PI * 2, true);
	obj.ctx.closePath();
	obj.ctx.stroke();
	obj.ctx.fill();
}

function drawEndPoint(obj, nr, offset) {
	alert(obj.name + ": draw end point");
	
	obj.ctx.lineWidth = obj.lineWidth;
	
	// filled rectangle
	obj.ctx.beginPath();
	obj.ctx.rect(obj.pt_end_x[nr]+offset, obj.pt_end_y[nr]+offset, obj.radius+5, obj.radius+5);
	obj.ctx.closePath();
	obj.ctx.stroke();
	obj.ctx.fill();
}

function drawControlPoint(obj, nr, offset) {
	alert(obj.name + ": draw control point");
	
	obj.ctx.lineWidth = (obj.lineWidth - (obj.lineWidth / 2));
	
	// controlpoint - empty arc
	obj.ctx.beginPath();
	obj.ctx.arc(obj.pt_control_x[nr]+offset, obj.pt_control_y[nr]+offset, obj.radius,
			0, Math.PI * 2, true);
	obj.ctx.closePath();
	obj.ctx.stroke();
}

/*******************************************************************************
 * GENERAL LETTER METHODS
 ******************************************************************************/
function writeMessage(mes) {
	alert("letter: write message!");
	
	$('#'+this.messageDiv).html(mes);
}

/**
 * Helper Method to remove a bug.
 * Saves coordinates to redraw the control point.
 */
function saveToRedrawControlPoint() {
	// save coordinates and remove eventlistener to remove bug
	this.save_x = mouse.x;
	this.save_y = mouse.y;			
	canvas.removeEventListener('mousemove', onPaint, false);
	canvas.removeEventListener('mousemove', checkMove, false);		
	
	alert("x: " + this.save_x + " y: " + this.save_y);	
}

/**
 * Helper Method to remove a bug.
 * Saves coordinates to redraw the control point.
 */
function addToRedrawControlPoint() {
	// move mouse to saved coordinates and add eventlistener again
	ctx.beginPath();
	ctx.moveTo(this.save_x, this.save_y);
	
	canvas.addEventListener('mousemove', onPaint, false);
	canvas.addEventListener('mousemove', checkMove, false);
}

