/**
 * Specific object to handle all evaluation related stuff.
 * @returns
 */
function Evaluation() {}

var name;

var bad;
var good;
var percentage;

var clicks_part;

Evaluation = function(n) {
	this.name = n;
	
	this.bad = 0;
	this.good = 0;
	this.percentage = -1;
	
	this.clicks_part = 0;
	
	this.calculate = calculatePoints;	
	this.addClick = addClick;
	this.resetClicks = resetClicks;
	this.reset = reset;
};

/**
 * Resets all variables of the evaluation.
 */
function reset() {
	alert("Reset Evaluaton.");
	
	this.bad = 0;
	this.good = 0;
	this.percentage = -1;
	
	this.clicks_part = 0;
}

/**
 * Calculates points.
 */
function calculatePoints() {
	this.percentage = this.good / (this.good + this.bad) * 100;

	alert("good: " + this.good);
	alert("bad: " + this.bad);
	
	

	alert("percentage " + this.percentage);
}

/**
 * Adds a click for the actual part.
 */
function addClick() {
	alert("Add a click per part.");
	
	this.clicks_part++;
}

/**
 * Resets clicks
 */
function resetClicks() {
	alert("Reset Clicks per Part.");
	
	this.clicks_part = 0;
}
