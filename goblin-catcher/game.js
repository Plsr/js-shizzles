// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
console.log("Width: " + windowWidth + " | " + "Height: " + windowHeight);
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

// Quest image
var questReady = false;
var questImage = new Image();
questImage.onload = function () {
	questReady = true;
};
questImage.src = "hero.png";

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

var quest = {

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
};

var setQuest = function () {
	quest.x = 100;
	quest.y = 100;
}

// Randomly place a monster
var setMonster = function () {

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown && hero.y > 32) { // Player holding up
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown && hero.y < canvas.height - 64) { // Player holding down
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown && hero.x > 32) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown && hero.x < canvas.width - 64) { // Player holding right
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
		newPosition = true;
		setMonster();
	}
};

var newPosition = true;
var randomX = 0;
var randomY = 0;
var monsterMove = function(modifier) {
	if(newPosition) {
		newPosition = false;

		randomX = parseInt(Math.floor(Math.random() * (canvas.width - 32)));
		randomY = parseInt(Math.floor(Math.random() * (canvas.height - 32)));	
	}
	

		if(monster.x < randomX && monster.x > 32) {
			monster.x += monster.speed * modifier;
		}
		if(monster.x > randomX && monster.x < canvas.width - 32) {
			monster.x -= monster.speed * modifier;
		}
		if(monster.y < randomY && monster.y > 32) {
			monster.y += monster.speed * modifier;
		}
		if(monster.y > randomY && monster.y < canvas.height -32) {
			monster.y -= monster.speed * modifier;
		}
		//console.log("x: " + parseInt(monster.x) + " | " + "y: " + parseInt(monster.y));
		if(parseInt(monster.y) == (randomY - 1)  && parseInt(monster.x) == (randomX - 1)){
			newPosition = true;
			//console.log("x: " + parseInt(monster.x) + " | " + "y: " + parseInt(monster.y));
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

	if(questReady) {
		ctx.drawImage(questImage, quest.x, quest.y);
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
setQuest();
setMonster();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible