var name, tries, pairs;

function MemoryPlayer() {
}

MemoryPlayer = function(n) {
	alert("MemoryPlayer " + n + " initialize!");
	
	this.name = name;
	this.tries = 0;
	this.pairs = 0;
	
	this.addTry = addTry;
	this.addPair = addPair;
};


function addTry() {
	this.tries += 1;
}

function addPair() {
	this.pairs += 1;
}

