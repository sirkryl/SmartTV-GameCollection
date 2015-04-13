alert('SceneGame.js loaded');

function SceneGame() {

}

var nrPairs = 12;
var remainingPairs = nrPairs;
var isOver = false;
var player1, player2;

// contains all memory cards
var cardsArray = [ "at", "at", "cz", "cz", "de", "de", "dk", "dk", "es", "es",
		"fi", "fi", "fr", "fr", "gr", "gr", "it", "it", "jp", "jp", "kr", "kr",
		"no", "no" ];

// choose randomly a card from the array and
function getCard() {
	var i = Math.floor(Math.random() * cardsArray.length);
	var c = cardsArray[i];

	// remove card from array, so that every card can be chosen only once
	cardsArray.splice(i, 1);
	return c;
}

SceneGame.prototype.initialize = function() {
	alert("SceneGame.initialize()");
	// this function will be called only once when the scene manager show this
	// scene first time
	// initialize the scene controls and styles, and initialize your variables
	// here
	// scene HTML and CSS will be loaded before this function is called

	var that = this;

	alert("init new Memory Game!");
	// add cards to play_area
	for ( var i = 0; i < nrPairs * 2; i++) {

		var board = document.getElementById("board");
		var div = document.createElement("div");
		div.setAttribute("class", "memoryCard");

		var card = document.createElement("image");
		var name = "card" + i;
		var country = getCard();
		// card.setAttribute("class", "memoryCard");
		card.setAttribute("src", "images/card_background.png");
		card.setAttribute("alt", country);
		card.setAttribute("id", name);

		div.appendChild(card);
		board.appendChild(div);

		$('#' + name).bind("click", {
			choice : name
		}, that.clickHandler);
	}

	// initalize players
	player1 = new MemoryPlayer("Player 1");
	player2 = new MemoryPlayer("Player 2");

	// set values
	$('#player1_pairs').html(player1.pairs);
	$('#player2_pairs').html(player2.pairs);
	$('#player1_tries').html(player1.tries);
	$('#player2_tries').html(player2.tries);

	$('#remainingPairs').html(remainingPairs);

	$('#player_msg').html("Player 1 starts!");
	isPlayer1 = true;
};

// GAME STUFF
var check = false; // do I have to check cards?
var firstCard = null; // cardId
var isPlayer1 = true; // boolean to switch between players

SceneGame.prototype.clickHandler = function(event) {
	alert("Card clicked: " + event.data.choice);

	// var sound = new Audio("images/test.mp3");
	// sound.play();

	event.stopPropagation();

	if (!check) {
		// 1. card
		check = true;

		country = $('#' + event.data.choice).attr('alt');
		firstCard = event.data.choice;

		$('#' + event.data.choice).attr('src',
				'images/cards/' + country + '.jpg');

	} else {
		// hasta luego bug! just do something when player clicked different cards
		if (firstCard != event.data.choice) {
			check = false;

			// 2. card
			country = $('#' + event.data.choice).attr('alt');
			$('#' + event.data.choice).attr('src',
					'images/cards/' + country + '.jpg');

			firstC = $('#' + firstCard).attr('alt');

			// do the cards match?
			if (firstC == country) {
				alert("MATCH!!");

				// update values
				if (isPlayer1) {
					player1.addPair();
					$('#player1_pairs').html(player1.pairs);
				} else {
					player2.addPair();
					$('#player2_pairs').html(player2.pairs);
				}

				remainingPairs -= 1;
				$('#remainingPairs').html(remainingPairs);

				if (remainingPairs == 0) {
					// game over
					isOver = true;

					if (player1.pairs > player2.pairs) {
						$('#player_msg').html("Game over! Player 1 wins!");
					} else if (player1.pairs == player2.pairs) {
						$('#player_msg').html("Game over! You both won!");
					} else {
						$('#player_msg').html("Game over! Player 2 wins!");
					}
				} else {
					// same player continues
					if (isPlayer1) {
						$('#player_msg').html(
								"Player 1: Well done. It's your turn again!");
					} else {
						$('#player_msg').html(
								"Player 2: Well done. It's your turn again!");
					}
				}

				// dont hide cards again but unbind them
				$('#' + name).unbind(that.clickHandler);
			} else {
				alert("NO MATCH!!");

				// hide the cards
				fCardToHide = firstCard;
				sCardToHide = event.data.choice;
				setTimeout(function() {
					alert("hide cards!");
					$('#' + fCardToHide).attr('src',
							'images/card_background.png');
					$('#' + sCardToHide).attr('src',
							'images/card_background.png');
					fCardToHide = null;
					sCardToHide = null;
				}, 1000);

				// update values
				alert("update values");
				if (isPlayer1) {
					player1.addTry();
					$('#player1_tries').html(player1.tries);
				} else {
					player2.addTry();
					$('#player2_tries').html(player2.tries);
				}

				// other player continues
				alert("other player continues");
				isPlayer1 = !isPlayer1;
				if (isPlayer1) {
					$('#player_msg').html("Player 1: It's your turn!");
				} else {
					$('#player_msg').html("Player 2: It's your turn!");
				}
			}
			firstCard = null;
		}
	}
};

function newGame() {
	alert("new Game ---------------------");
	// (document.getElementById("board")).removeChild(div);
	var cell = document.getElementById("board");
	if (cell.hasChildNodes()) {
		while (cell.childNodes.length >= 1) {
			cell.removeChild(cell.firstChild);
		}
	}
	check = false; // do I have to check cards?
	firstCard = null; // cardId
	isPlayer1 = true; // boolean to switch between players

	cardsArray = [ "at", "at", "cz", "cz", "de", "de", "dk", "dk", "es", "es",
			"fi", "fi", "fr", "fr", "gr", "gr", "it", "it", "jp", "jp", "kr",
			"kr", "no", "no" ];

	nrPairs = 12;
	remainingPairs = nrPairs;
	isOver = false;
	// document.getElementById("board").removeChild(div);
	SceneGame.prototype.initialize();
};

SceneGame.prototype.handleShow = function(data) {
	alert("SceneGame.handleShow()");
	// this function will be called when the scene manager show this scene
};

SceneGame.prototype.handleHide = function() {
	alert("SceneGame.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneGame.prototype.handleFocus = function() {
	alert("SceneGame.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneGame.prototype.handleBlur = function() {
	alert("SceneGame.handleBlur()");
	// this function will be called when the scene manager move focus to another
	// scene from this scene
};

SceneGame.prototype.handleKeyDown = function(keyCode) {
	alert("SceneGame.handleKeyDown(" + keyCode + ")");
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
