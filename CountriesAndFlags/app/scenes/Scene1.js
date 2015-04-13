alert('SceneScene1.js loaded');

function SceneScene1() {

}

var flagsArray = [ "at", "cz", "de", "dk", "es", "fi", "fr", "gr", "it", "jp", "no", "pt", "ro", "se", "tr", "uk"];
var mapsArray = [ "lat", "lcz", "lde", "ldk", "les", "lfi", "lfr", "lgr", "lit", "ljp", "lno", "lpt", "lro", "lse", "ltr", "luk"];

var counter = 0;

function getFlag() {
	var i = Math.floor(Math.random() * flagsArray.length);
	var c = flagsArray[i];

	// remove card from array
	flagsArray.splice(i, 1);
	return c;
};

function getMap() {
	var i = Math.floor(Math.random() * mapsArray.length);
	var c = mapsArray[i];

	// remove card from array
	mapsArray.splice(i, 1);
	return c;
};

SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called

	var arrayLenth = flagsArray.length;
	
	// create maps
	for ( var i = 0; i < arrayLenth; i++) {

		var board = document.getElementById("boardMap");
		var div = document.createElement("div");
		div.setAttribute("class", "mapDroppable");

		var card = document.createElement("image");
		var country = getMap();
		card.setAttribute("src", "images/laender/"+country+".jpg");	
		card.setAttribute("id", country);
		card.setAttribute("style", "height: 100px;");
		
		div.appendChild(card);
		board.appendChild(div);
	
		$("#" + country).droppable({
  			drop: function(event, ui) { 
  				var draggableID = ui.draggable.attr("id");
  				var map = $(this).attr("id");
	  					
	  			if (("l"+ draggableID) == map) {
		  			$("#"+draggableID).draggable({disabled : true, revert:false});
		  			document.getElementById(draggableID).style.visibility = "hidden";
		  			$("#" + map).attr("src", "images/correct/" + map + ".jpg");
		  			counter++;
		  			// everything correct assigned
	  				if (counter == (arrayLenth)) {
	  					// You won message
	  					var won = document.getElementById("won");
	  				  	won.style.display = "block";
	  				  	won.style.fontSize = "50px";
	  				  	won.style.color = "#FFFFFF";
	  				  	won.style.backgroundColor = "#58ACFA";
	  				  	won.style.border = "solid #08298A 2px";
	  				  	won.style.padding = "20px";
	  				}
	  			} 
  			}		
		});	
	}
	
	// create flags
	for ( var i = 0; i < arrayLenth; i++) {

		var boardFlag = document.getElementById("board");
		var divFlag = document.createElement("div");
		divFlag.setAttribute("class", "flagDraggable");

		var flag = document.createElement("image");
		var name = getFlag();
		flag.setAttribute("src", "images/flags/"+name+".jpg");
		flag.setAttribute("id", name);
		flag.setAttribute("style", "height: 35px; border: 1px solid #D8D8D8;");
		
		divFlag.appendChild(flag);
		boardFlag.appendChild(divFlag);
		
		$("#" + name).draggable({revert:true});
	}
		
};

/**
 * Create new Game
 */
function newGame() {
	
	flagsArray = [ "at", "cz", "de", "dk", "es", "fi", "fr", "gr", "it", "jp", "no", "pt", "ro", "se", "tr", "uk"];
	mapsArray = [ "lat", "lcz", "lde", "ldk", "les", "lfi", "lfr", "lgr", "lit", "ljp", "lno", "lpt", "lro", "lse", "ltr", "luk"];
	
	counter = 0;
	
	// delete all flags
	var cellFlag = document.getElementById("board");
	if ( cellFlag.hasChildNodes() )
	{
	    while ( cellFlag.childNodes.length >= 1 )
	    {
	    	cellFlag.removeChild( cellFlag.firstChild );       
	    } 
	}
	
	// delete all maps
	var cellMap = document.getElementById("boardMap");
	if ( cellMap.hasChildNodes() )
	{
	    while ( cellMap.childNodes.length >= 1 )
	    {
	    	cellMap.removeChild( cellMap.firstChild );       
	    } 
	}
	
	// hide won-text
	var won = document.getElementById("won");
	won.style.display = "none";
	
	// initialize all	
	SceneScene1.prototype.initialize();
}

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
