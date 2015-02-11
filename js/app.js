
// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // The enemy sprite is determined by calling the
    // enemyTypes function and the speed is random
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * 100 + 80);
    if(this.y === 145) {
        this.sprite = 'images/rock.png';
    } else {
        this.sprite = sprite;
    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Once enemy leaves the canvas, this generates a new enemy
    // with random speed
    var buglength;
    if (this.x > 625) {
        this.x = -200;
        this.speed = Math.floor(Math.random() * 100 + 80);
        if(this.y === 145) {
            this.sprite = 'images/rock.png';
        } else {
            this.sprite = enemyTypes();
        }
    }
    // Collision detection with variances for different sprites
    // used for enemies
    switch (this.sprite){
        case 'images/enemy-bug.png':
            buglength = 65;
            break;
        case 'images/enemy-bug2.png':
            buglength = 160;
            break;
        case 'images/enemy-bug3.png':
            buglength = 260;
        default:
        break;
    }

    if (
        player.x <= (this.x + buglength)
        && this.x <= (player.x + 42)
        && player.y <= (this.y + 42)
        && this.y <= (player.y + 42)

    ) {
        playerReset();
    } else if (
        this.sprite === 'images/rock.png'
        && player.x <= (this.x + 65)
        && this.x <= (player.x + 42)
        && player.y <= (this.y + 25)
        && this.y <= (player.y + 25)

    ) {
        player.x = this.x;
        if (this.x > 550) {
            playerReset();
        }
    }
};

//enemyType function randomly determines enemy types
var enemyTypes = function() {
    var numbugs = Math.floor((Math.random() * 21) + 1);
    if(numbugs <= 9) {
        return 'images/enemy-bug.png';
    } else if(numbugs <= 18) {
        return 'images/enemy-bug2.png';
    } else {
        return 'images/enemy-bug3.png';
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 251;
    this.y = 450;
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.speed = this.speed * dt;
    if(
        this.y > 115
        && this.y < 160
        && this.x !== rock.x
    ) {
        playerReset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            this.sprite = 'images/boy-left.png';
            this.x = this.x - 51;
            if (this.x < -1) {
                this.x = -1;
            }
            break;
        case 'up':
            this.sprite = 'images/boy-back.png';

            this.y = this.y - 42;
            if (this.y < 15){
                    this.y = 15;
            }
            break;
        case 'right':
            this.sprite = 'images/boy-right.png';
            this.x = this.x + 51;
            if (this.x > 507) {
                this.x = 507;
            }
           break;
        case 'down':
            this.sprite = 'images/char-boy.png';
            this.y = this.y + 45;
            if (this.y > 450) {
                this.y = 450;
            }
        default:
            break;
    }
};

//Reset player to initial position after collision
var playerReset = function() {
    player.x = 251;
    player.y = 450;
    livesLeft();
};

//Draw jewels in top row
var Jewels = function(x, color) {

    this.y = 63;
    this.x = x;
    switch (color) {
        case 1:
            this.sprite = 'images/Gem Blue.png';
            this.marker = 1;
            this.endplace = 480;
            break;
        case 2:
            this.sprite = 'images/Gem Orange.png';
            this.marker = 2;
            this.endplace = 490;
            break;
        default:
            this.sprite = 'images/Gem Green.png';
            this.marker = 3;
            this.endplace = 500;
    }
};

Jewels.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var gemcount;
Jewels.prototype.update = function() {
    if (
            this.marker === 1
            && gemcount !== 2
            && gemcount !== 3
            && this.y <= 425
            && player.y <= (this.y + 45)
            && this.y <= (player.y + 55)
            && player.x <= (this.x + 55)
            && this.x <= (player.x + 55)
        ) {
            this.x = player.x;
            this.y = player.y;
            gemcount = 1;
        } else if (
            this.marker === 2
            && gemcount !== 1
            && gemcount !==3
            && this.y <= 425
            && player.y <= (this.y + 45)
            && this.y <= (player.y + 55)
            && player.x <= (this.x + 55)
            && this.x <= (player.x + 55)
        ) {
            this.x = player.x;
            this.y = player.y;
            gemcount = 2;
        } else if (
            this.marker === 3
            && gemcount !== 1
            && gemcount !== 2
            && this.y <= 425
            && player.y <= (this.y + 45)
            && this.y <= (player.y + 55)
            && player.x <= (this.x + 55)
            && this.x <= (player.x + 55)
        ) {
            this.x = player.x;
            this.y = player.y;
            gemcount = 3;
        } else if (this.y >= 425) {
            this.x = 125;
            this.y = this.endplace;
            gemcount = 0;
        }
};

// Create the princess class
var Princess = function() {
    this.sprite = 'images/char-princess-girl-sad.png';
    this.x = 5;
    this.y = 450;
};

Princess.prototype.update = function() {
    if (
        jewel1.y === 480
        && jewel2.y === 490
        && jewel3.y === 500) {
        this.sprite = 'images/char-princess-girl.png';
        gameWin();
    } else if (lives === 0) {
        gameLose();
    }
};

// Draw the princess on the screen
Princess.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //console.log(this.x);
};

var livesLeft = function(){
    lives = lives - 1;

};

livesLeft.prototype.render = function(){
    ctx.font='20px Comic Sans MS';
    ctx.fillStyle = 'yellow';
    ctx.fillText('Lives Remaining: ' + lives,415,525);
};

//Game endings -win or lose- displayed
var gameWin = function() {
    princess.x = 225;
    player.x = 285;
    player.y = 450;
    for (var i = 0; i < enemiesLength; i++) {
        allEnemies[i].sprite = 'images/heart.png';
    }
};

var gameLose = function() {
    princess.x = 225;
    player.x = 265;
    player.y = 485;
    player.sprite = 'images/boy-dead.png';
    for (var i = 0; i < enemiesLength; i++) {
        allEnemies[i].sprite = 'images/broken-heart.png';
    }
};

// Now instantiate your objects.
var enemy1 = new Enemy(25, 62, enemyTypes());
var enemy2 = new Enemy(125, 227, enemyTypes());
var enemy3 = new Enemy(250, 310, enemyTypes());
var rock = new Enemy(249, 145);
var jewel1 = new Jewels(73, 1);
var jewel2 = new Jewels(275, 2);
var jewel3 = new Jewels(477, 3);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, rock];
var enemiesLength = allEnemies.length;
// Place all jewel objects in an array called allJewels
var allJewels = [jewel1, jewel2, jewel3];
// Place the player object in a variable called player
var player = new Player();
var princess = new Princess();
var numlives = new livesLeft();
var lives = 3;
var instructions =
'INSTRUCTIONS FOR PLAYING THE GAME:' + '\n' +
'1) USE ARROW KEYS TO MOVE PLAYER AROUND GAMEBOARD.' + '\n' +
'2) AVOID ALL BUGS!' + '\n' +
'3) AVOID WATER. JUMP ON THE ROCK TO CROSS OVER WATER.' + '\n' +
'4) GATHER GEMS TO RETURN TO THE PRINCESS. ONLY ONE GEM MAY BE CARRIED AT A TIME.' + '\n' +
'5) PLAYER BEGINS WITH 3 LIVES. ANY COLLISIONS WITH BUGS OR WATER WILL SUBTRACT 1 LIFE.' + '\n' +
'6) GAME IS OVER WHEN ONE OF THE FOLLOWING OCCURS:' + '\n' +
    'a) ALL GEMS ARE RETURNED TO THE PRINCESS' + '\n' +
    'b) ALL LIVES HAVE BEEN USED';

alert(instructions);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
