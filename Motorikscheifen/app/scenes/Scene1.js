alert('SceneScene1.js loaded');

function SceneScene1() {

}

var searchDl = 1;
var l = 0;

var r;
var p;
var pt;
var e;
var totLen;


SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	
	// Creates canvas 960 × 540 at 10, 100
	r = Raphael(10, 100, 960, 540);

	// Curves
	p= r.path("M100,350 l 50,-25, " +
			"a50,50 -30 0,1 100,-25 l 50,-25, " +
			"a50,100 -30 0,1 100,-25 l 50,-25, " +
			"a50,150 -30 0,1 100,-25 l 50,-25, " +
			"a50,200 -30 0,1 100,-25 l 50,-25").attr({stroke: "black", "stroke-width":5});
	
	pt = p.getPointAtLength(l);
	e = r.ellipse(pt.x, pt.y, 10, 10).attr({stroke: "none", fill: "r(.3,.25) white-red"});
	totLen = p.getTotalLength();
	
	// Function from Raphael.js
	e.drag(move, start, up);
	
};

/**
 * where to start from
 */
start = function () {
    // storing original coordinates
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.attr({opacity: 1});
},

/**
 * move on the line
 */ 
move = function (dx, dy) {
    var tmpPt = {
        x : this.ox + dx, 
        y : this.oy + dy
    };
    l = gradSearch(l, tmpPt);
    pt = p.getPointAtLength(l);
    this.attr({cx: pt.x, cy: pt.y});
},

/**
 * endpoint
 */
up = function () {
    this.attr({opacity: 1});
},

/**
 * calculation
 */ 
gradSearch = function (l0, pt) {
    l0 = l0 + totLen;
    var l1 = l0,
        dist0 = dist(p.getPointAtLength(l0 % totLen), pt),
        dist1,
        searchDir;

    if (dist(p.getPointAtLength((l0 - searchDl) % totLen), pt) > 
       dist(p.getPointAtLength((l0 + searchDl) % totLen), pt)) {
        searchDir = searchDl;
    } else {
        searchDir = -searchDl;
    }

    l1 += searchDir;
    dist1 = dist(p.getPointAtLength(l1 % totLen), pt);
    while (dist1 < dist0) {
        dist0 = dist1;
        l1 += searchDir;
        dist1 = dist(p.getPointAtLength(l1 % totLen), pt);
    }
    l1 -= searchDir;

    return (l1 % totLen);
},

dist = function (pt1, pt2) {
    var dx = pt1.x - pt2.x;
    var dy = pt1.y - pt2.y;
    return Math.sqrt(dx * dx + dy * dy);
};

// different beat frames

function infinite() {
	l = 0;
	p.remove();
	e.remove();
	p = r.path("M50,200c0,400 800-400 800,0c0,400 -800-400 -800,0z").attr({stroke: "black", "stroke-width":5});
	pt = p.getPointAtLength(l);
	e = r.ellipse(pt.x, pt.y, 10, 10).attr({stroke: "none", fill: "r(.3,.25) white-red"});
	totLen = p.getTotalLength();
		
	e.drag(move, start, up);
};

function circle() {
	l = 0;
	p.remove();
	e.remove();
	p = r.path("M280, 320, A 180 180 0 1 1 281, 321, z").attr({stroke: "black", "stroke-width":5});
	pt = p.getPointAtLength(l);
	e = r.ellipse(pt.x, pt.y, 10, 10).attr({stroke: "none", fill: "r(.3,.25) white-red"});
	totLen = p.getTotalLength();
		
	e.drag(move, start, up);
};

function curves() {
	l = 0;
	p.remove();
	e.remove();
	p= r.path("M100,350 l 50,-25, " +
			"a50,50 -30 0,1 100,-25 l 50,-25, " +
			"a50,100 -30 0,1 100,-25 l 50,-25, " +
			"a50,150 -30 0,1 100,-25 l 50,-25, " +
			"a50,200 -30 0,1 100,-25 l 50,-25").attr({stroke: "black", "stroke-width":5});
	pt = p.getPointAtLength(l);
	e = r.ellipse(pt.x, pt.y, 10, 10).attr({stroke: "none", fill: "r(.3,.25) white-red"});
	totLen = p.getTotalLength();
		
	e.drag(move, start, up);
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
