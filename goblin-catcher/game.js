// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {
	speed: 128
};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Set the Hero in the middle of the canvas
var setHero = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
}

// Randomly place a monster
var setMonster = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown && hero.y > 0) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y < canvas.height - 32) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x > 0) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x < canvas.width -32) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	

	

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		setMonster();
	}
};

var newPosition = true;
var monsterMove = function(modifier) {
	if(newPosition) {
		newPosition = false;
	
		var randomX = Math.floor(Math.random() * canvas.width);
		var randomY = Math.floor(Math.random() * canvas.height);
	}

		if(monster.x < randomX) {
			monster.x -= monster.speed * modifier;
		}
		if(monster.x > randomX) {
			monster.x += monster.speed * modifier;
		}
		if(monster.y < randomY) {
			monster.y -= monster.speed * modifier;
		}
		if(monster.y > randomY) {
			monster.y += monster.speed * modifier;
		}
		if(monster.x == randomX && monster.y == randomY){
			newPosition = true
		}

	

};




// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	monsterMove(delta / 1000);
	render();

	then = now;
};


// Let's play this game!
setHero();
setMonster();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible