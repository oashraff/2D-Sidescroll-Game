/*
The Game Project - Part 7

FINAL GAME
*/

let myFont;

let game_char_x;
let game_char_y;
let floorPos_y;

let isLeft;
let isRight;
let isPlummeting;
let isFalling;

let canyons;
let mountain;

let trees_x;
let cloud;

let collectables;
let game_score;
let flagpole;
let lives;
let enemies;

let platforms;
let level;
let currentLevel;

let jumpSound;
let collectSound;
let plummetSound;
let overSound;
let completedSound;
let victorySound;
let enemySound;

let gameOverSoundPlayed = false;
let levelCompletedSoundPlayed = false;
let victorySoundPlayed;

let gameOver;
let isVictory;

let cameraPosX = 0;

function preload()
{
    myFont = loadFont('joystix monospace.otf');
    
    soundFormats('mp3', 'wav');
    jumpSound = loadSound('assets/jump.wav')
    jumpSound.setVolume(0.1);
    collectSound = loadSound('assets/collectSound.mp3');
    collectSound.setVolume(0.1);
    plummetSound = loadSound('assets/plummet.mp3');
    plummetSound.setVolume(0.1);
    overSound = loadSound('assets/gameOver.mp3');
    overSound.setVolume(0.1);
    completedSound = loadSound('assets/levelComplete.mp3');
    completedSound.setVolume(0.1);
    victorySound = loadSound('assets/victory.mp3');
    victorySound.setVolume(0.1);
    enemySound = loadSound('assets/enemy.mp3');
    enemySound.setVolume(0.1);  
}

function setup()
{
    textFont(myFont);
	createCanvas(1024, 576);
    lives = 3;
    level = 1;
    floorPos_y = height * 3/4;
    startGame();
}
const startGame = () =>
{
    game_char_y = floorPos_y;

    victorySoundPlayed = false;
    
    isLeft = false;
    isRight = false;
    isPlummeting = false;
    isFalling = false;
    gameOver = false;
    isVictory = false;

	treePos_y = height/2;
    
    canyons = [
        {x_pos: 0, width: 100}, 
        {x_pos: 550, width: 100}, 
        {x_pos: 900, width: 100}, 
        {x_pos: 1200, width: 100}, 
        {x_pos: 1700, width: 100},
        {x_pos: 1900, width: 100},
        {x_pos: 2300, width: 100},
        {x_pos: 2600, width: 100},
        {x_pos: 2800, width: 100},
        {x_pos: 3100, width: 100},
        {x_pos: 3500, width: 100},
        {x_pos: 3700, width: 100},
        {x_pos: 4000, width: 100},
        {x_pos: 4400, width: 100},
        {x_pos: 4800, width: 100},
        {x_pos: 5200, width: 100},
        {x_pos: 5500, width: 100},
        {x_pos: 5700, width: 100},
        {x_pos: 6000, width: 100},
        {x_pos: 6120, width: 100},
        {x_pos: 6300, width: 100},
        {x_pos: 6400, width: 100},
        {x_pos: 6800, width: 100},
        {x_pos: 7100, width: 100},
        {x_pos: 7300, width: 100},
        {x_pos: 7500, width: 100},
        {x_pos: 7600, width: 100},
        {x_pos: 7900, width: 100},
        {x_pos: 8100, width: 100},
        {x_pos: 8300, width: 100},
        {x_pos: 8400, width: 100},
        {x_pos: 8700, width: 100},
        {x_pos: 8850, width: 100}
    ];

    cloud = [
        {x_pos: 100, y_pos: 100, size: 50}, 
        {x_pos: 500, y_pos: 100, size: 50}, 
        {x_pos: 900, y_pos: 100, size: 50}, 
        {x_pos: 1300, y_pos: 100, size: 50},
        {x_pos: 1700, y_pos: 100, size: 50},
        {x_pos: 2100, y_pos: 100, size: 50},
        {x_pos: 2500, y_pos: 100, size: 50},
        {x_pos: 2900, y_pos: 100, size: 50},
        {x_pos: 3300, y_pos: 100, size: 50},
        {x_pos: 3700, y_pos: 100, size: 50},
        {x_pos: 4100, y_pos: 100, size: 50},
        {x_pos: 4500, y_pos: 100, size: 50},
        {x_pos: 4900, y_pos: 100, size: 50},
        {x_pos: 5300, y_pos: 100, size: 50},
        {x_pos: 5700, y_pos: 100, size: 50},
        {x_pos: 6100, y_pos: 100, size: 50},
        {x_pos: 6500, y_pos: 100, size: 50},
        {x_pos: 6900, y_pos: 100, size: 50},
        {x_pos: 7300, y_pos: 100, size: 50},
        {x_pos: 7700, y_pos: 100, size: 50},
        {x_pos: 8100, y_pos: 100, size: 50},
        {x_pos: 8500, y_pos: 100, size: 50}
    ];
    
    collectables = [
        {x_pos: 150, y_pos: floorPos_y, size: 50, isFound: false}, 
        {x_pos: 400, y_pos: floorPos_y, size: 50, isFound: false}, 
        {x_pos: 700, y_pos: floorPos_y, size: 50, isFound: false},  
        {x_pos: 1300, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 1700, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 2100, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 2200, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 2500, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 2800, y_pos: floorPos_y - 90, size: 50, isFound: false},
        {x_pos: 2900, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 3600, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 3900, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 4250, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 4575, y_pos: floorPos_y - 90, size: 50, isFound: false},
        {x_pos: 4900, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 5100, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 5400, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 5700, y_pos: floorPos_y - 90, size: 50, isFound: false},
        {x_pos: 5820, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 6400, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 6950, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 7250, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 7450, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 7750, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 7850, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 8050, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 8250, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 8550, y_pos: floorPos_y, size: 50, isFound: false},
        {x_pos: 8650, y_pos: floorPos_y, size: 50, isFound: false}
    ];
    
    mountain = [
        {x_pos: 100, y_pos: 100},
        {x_pos: 300, y_pos: 100},
        {x_pos: 900, y_pos: 100},
        {x_pos: 1500, y_pos: 100},
        {x_pos: 1700, y_pos: 100}, 
        {x_pos: 2600, y_pos: 100},
        {x_pos: 2800, y_pos: 100},
        {x_pos: 3500, y_pos: 100},
        {x_pos: 3700, y_pos: 100},
        {x_pos: 4400, y_pos: 100},
        {x_pos: 4600, y_pos: 100},
        {x_pos: 5200, y_pos: 100},
        {x_pos: 5400, y_pos: 100},
        {x_pos: 6100, y_pos: 100},
        {x_pos: 6300, y_pos: 100},
        {x_pos: 7000, y_pos: 100},
        {x_pos: 7200, y_pos: 100},
        {x_pos: 7900, y_pos: 100},
        {x_pos: 8100, y_pos: 100},
        {x_pos: 8800, y_pos: 100}
    ];
    
    trees_x = [300, 500, 800, 1150, 1600, 2000, 2440, 2700, 3200, 3600, 4110, 4500, 4770, 5100, 5300, 5700, 6000, 6200, 6630, 7300, 7650, 7900,             8150,8400, 8570, 8800];
    
    game_score = 0;
    
    flagpole = [
        {isReached: false, alreadyReached: false, x_pos: 1500},
        {isReached: false, alreadyReached: false, x_pos: 3000},
        {isReached: false, alreadyReached: false, x_pos: 5000},
        {isReached: false, alreadyReached: false, x_pos: 7000},
        {isReached: false, alreadyReached: false, x_pos: 9000}
    ];
    
    for (let i = 0; i < flagpole.length; i++) 
    {
        if (flagpole[i].isReached && !flagpole[i].alreadyReached) 
        {
            level = i + 2; // Set the current level to the next level after the highest reached flagpole
        }
    }
    
    switch(level)
    {
        case 1: 
            game_char_x = width/2;
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            game_char_x = flagpole[level - 2].x_pos + 30;
            flagpole[level - 2].alreadyReached = true;
            break;     
    }
    
    platforms = [];
    platforms.push(createPlatforms(1820, floorPos_y - 80, 100));
    platforms.push(createPlatforms(2760, floorPos_y - 80, 65));
    platforms.push(createPlatforms(3300, floorPos_y - 80, 300));
    platforms.push(createPlatforms(4500, floorPos_y - 80, 300));
    platforms.push(createPlatforms(5600, floorPos_y - 80, 200));
    platforms.push(createPlatforms(5900, floorPos_y - 80, 250));
    platforms.push(createPlatforms(6400, floorPos_y, 100));
    platforms.push(createPlatforms(7485, floorPos_y - 80, 140));
    platforms.push(createPlatforms(8320, floorPos_y - 70, 200));
    
    enemies = [];
    enemies.push(new Enemy(3300, floorPos_y - 10, 100));
    enemies.push(new Enemy(4200, floorPos_y - 10, 75));
    enemies.push(new Enemy(4450, floorPos_y - 10, 175));
    enemies.push(new Enemy(5600, floorPos_y - 10, 100));
    enemies.push(new Enemy(5850, floorPos_y - 10, 250));
    enemies.push(new Enemy(6600, floorPos_y - 10, 100));
    enemies.push(new Enemy(7260, floorPos_y - 10, 200));
    enemies.push(new Enemy(7700, floorPos_y - 10, 200));
    enemies.push(new Enemy(8050, floorPos_y - 10, 130));
    enemies.push(new Enemy(8590, floorPos_y - 10, 80));
}

function draw()
{

	///////////DRAWING CODE//////////
    cameraPosX = game_char_x - width * 0.25;
    
    
    background(100,155,255); //fill the sky blue
    
    fill(0, 155, 0);
    noStroke();
    rect(0, floorPos_y, width, height - floorPos_y); // grass

	noStroke();
	fill(0,155,0);
    
    push();
    translate(-cameraPosX, 0);
    
    //canyon
    for (let i = 0; i < canyons.length; i++)
        {
            checkCanyon(canyons[i]);
            drawCanyon(canyons[i]);        
        }
    // cloud
    drawClouds();
    // mountain
    drawMountains();
    //trees
    drawTrees();
    //platforms
    for(let i =0; i < platforms.length; i++)
        {
            platforms[i].draw();
        }
    // coin check and draw
    for (let i = 0; i < collectables.length; i++)
        {
            if(!collectables[i].isFound)
            {   
                checkCollectable(collectables[i]);
                drawCollectable(collectables[i]);
            }
        }
    // flagpole
    for(let i = 0; i < flagpole.length; i++)
    {
        renderFlagpole(flagpole[i]);
    }
    // enemies
    for(let i = 0; i < enemies.length; i++)
    {
        enemies[i].draw();
        let isContact = enemies[i].checkContact(game_char_x, game_char_y);
        if(isContact)
            {
                if(lives > 0)
                    {
                        enemySound.play();
                        lives--;
                        startGame();
                        break;
                    }
            }
    }
    //the game character
    drawGameCharacter();
    
    pop(); // restore
    
    fill(255);
    noStroke();
    textSize(16);
    text("score: " + game_score, 20, 20);
    text("lives: " + lives, 20, 40);
    
    if(lives < 1)
    {
        gameOver = true;
        if (!gameOverSoundPlayed) 
        { // Check if game over sound has been played
            overSound.play();
            gameOverSoundPlayed = true; // Set the flag to true to indicate the sound has been played
        }
        textSize(30);
        fill(105,105,105);
        strokeWeight(5);
        stroke(0);
        rect(250, 100, 520, 300, 5);
        fill(255, 0, 0);
        strokeWeight(2);
        stroke(255);
        text("GAME OVER", 390, 200);
        textSize(20);
        text("PRESS [SPACE] TO RESTART", 310, 300);
        textSize(16);
        return;
    }
    for(let i = 0; i < flagpole.length; i++)
    {
        if(flagpole[flagpole.length - 1].isReached)
            {
                if(!victorySoundPlayed)
                {
                    victorySound.play();
                    victorySoundPlayed = true;
                }
                isVictory = true;
                textSize(25);
                fill(255, 170, 29);
                strokeWeight(5);
                stroke(255, 215, 0);
                rect(250, 100, 520, 300, 5);
                fill(0);
                noStroke();
                text("VICTORY COMPLETED!", 330, 200);
                text("CONGRATULATIONS..!!!", 330, 300);
                textSize(16);
                text("FINAL SCORE :" + game_score, 410, 350);
                return; 
            }
        else if(flagpole[i].isReached && flagpole[i].alreadyReached == false && level < 5)
        {
            if(!levelCompletedSoundPlayed)
                {
                    completedSound.play();
                    levelCompletedSoundPlayed = true;
                }
            textSize(20);
            fill(127,255,0);  
            strokeWeight(5);
            stroke(0,255,0);
            rect(250, 100, 520, 300, 5);
            fill(0);
            noStroke();
            text("LEVEL COMPLETED!", 380, 200);
            text("PRESS [KEY] TO CONTINUE", 305, 300);
            textSize(16);
            return;       
        }
        
        fill(255);
        text("Level " + level, width / 2, 20);
    }
    
   

	///////////INTERACTION CODE//////////
	
    
    if(isLeft == true)
        {
            game_char_x -= 5;
        }
    if(isRight == true)
        {
            game_char_x += 5;
        }
    if(game_char_y < floorPos_y)
        {
            let isContact = false;
            
            for(let i = 0; i < platforms.length; i++)
                {
                    if(platforms[i].checkContact(game_char_x, game_char_y))
                    {
                        isContact = true;
                        break;
                    }
                }
            if(isContact == false)
                {
                    isFalling = true;
                    game_char_y += 3.5;
                }
        }
    else
        {isFalling = false;}

    for(let i = 0; i < flagpole.length; i++)
    {
        if(flagpole[i].isReached == false)
        {
            checkFlagPole(flagpole[i]);
        }
    }
    if (isPlummeting)
        {   
            game_char_y += 8;
            plummetSound.play();
        }
     checkPlayerDie();
}

const drawGameCharacter = () =>
{
    	if(isLeft && isFalling)
	{
		// jumping left
        fill(200, 150, 150);
        ellipse(game_char_x, game_char_y - 50, 35);

        fill(0, 150, 150);
        rect(game_char_x - 18, game_char_y - 60, 10, 30);

        fill(0,0,128);
        rect(game_char_x - 8, game_char_y - 35, 16, 30);

        fill(0);
        rect(game_char_x - 10, game_char_y - 5, 10, 10);

	}
	else if(isRight && isFalling)
	{
		// jumping right
        fill(200, 150, 150);
        ellipse(game_char_x, game_char_y - 50, 35);

        fill(0, 150, 150);
        rect(game_char_x + 8, game_char_y - 60, 10, 30);

        fill(0,0,128);
        rect(game_char_x - 8, game_char_y - 35, 16, 30);

        fill(0);
        rect(game_char_x, game_char_y - 5, 10, 10);

	}
	else if(isLeft)
	{
		// walk-left
        fill(200, 150, 150);
        ellipse(game_char_x, game_char_y - 50, 35);

        fill(0, 150, 150);
        rect(game_char_x - 18, game_char_y - 30, 18, 10);

        fill(0,0,128);
        rect(game_char_x - 8, game_char_y - 35, 16, 30);

        fill(0);
        rect(game_char_x - 10, game_char_y - 5, 10, 10);


	}
	else if(isRight)
	{
		// walk-right
        fill(200, 150, 150);
        ellipse(game_char_x, game_char_y - 50, 35);

        fill(0, 150, 150);
        rect(game_char_x, game_char_y - 30, 18, 10);

        fill(0,0,128);
        rect(game_char_x - 8, game_char_y - 35, 16, 30);

        fill(0);
        rect(game_char_x, game_char_y - 5, 10, 10);

	}
	else if(isFalling || isPlummeting)
	{
		// jumping forward
        fill(200, 150, 150);
        ellipse(game_char_x, game_char_y - 50, 35);

        fill(0,0,128);
        rect(game_char_x - 13, game_char_y - 35, 26, 30);

        fill(0);
        rect(game_char_x - 15, game_char_y - 5, 10, 10);
        rect(game_char_x + 5, game_char_y - 5, 10, 10);


        fill(0, 150, 150);
        rect(game_char_x - 23, game_char_y - 60, 10, 30);
        rect(game_char_x + 13, game_char_y - 60, 10, 30);


	}
	else
	{
		// front 
        
        fill(200, 150, 150);
        ellipse(game_char_x, game_char_y - 50, 35);

        fill(0,0,128);
        rect(game_char_x - 13, game_char_y - 35, 26, 30);

        fill(0);
        rect(game_char_x - 15, game_char_y - 5, 10, 10);
        rect(game_char_x + 5, game_char_y - 5, 10, 10);

	}
}
function keyPressed()
{

    if(keyCode == 37 && isPlummeting == false && gameOver == false && isVictory == false)
    {
        isLeft = true;
    }
    else if(keyCode == 39 && isPlummeting == false && gameOver == false && isVictory == false)
    {
        isRight = true;
    }
    if(keyCode == 38 && isFalling == false && isPlummeting == false && gameOver == false && isVictory == false)
    {
        game_char_y -= 100;
        jumpSound.play();
    }
    if(keyCode == 32 && lives < 1)
    {
        setup();
        gameOverSoundPlayed = false;
    }
    
    for(let i = 0; i < flagpole.length; i++)
    {   
        if(flagpole[i].isReached && level < 5) 
        {
            levelCompletedSoundPlayed = false;
            flagpole[i].isReached = false;
            // Move the character to the flagpole position
            game_char_x = flagpole[i].x_pos + 30;
            // Reset character's y position to the ground
            game_char_y = floorPos_y;

            if (!flagpole[i].alreadyReached) 
            {
                // Proceed to the next level by updating flagpole status
                flagpole[i].alreadyReached = true;
                level++; // Increment the level
            }
            break;
        }
    }          
}

function keyReleased()
{
	
     if(keyCode == 37)
    {
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        isRight = false;
    }
}

const drawClouds = () =>
{
   for (let i = 0; i < cloud.length; i++)
    {
        
        fill(255, 255, 255)
        
        ellipse(cloud[i].x_pos + 105, cloud[i].y_pos + 50, cloud[i].size + 40, cloud[i].size + 30);
        ellipse(cloud[i].x_pos + 60, cloud[i].y_pos + 50, cloud[i].size + 25, cloud[i].size + 10);
        ellipse(cloud[i].x_pos + 140, cloud[i].y_pos + 50, cloud[i].size + 35, cloud[i].size + 10);
        
    }
}

const drawMountains = () =>
{
         for (let i = 0; i < mountain.length; i++)
        {
            fill(150);
            triangle(mountain[i].x_pos + 350, mountain[i].y_pos + 332, mountain[i].x_pos + 530, mountain[i].y_pos - 68, mountain[i].x_pos + 650, mountain[i].y_pos + 332);

            fill(255);
            triangle(mountain[i].x_pos + 499, mountain[i].y_pos,mountain[i].x_pos + 530, mountain[i].y_pos - 68, mountain[i].x_pos + 551, mountain[i].y_pos);
        }
}

const drawTrees = () =>
{
        for (let i = 0; i < trees_x.length; i++)
        {
            
            fill(120,100,50);
            rect(trees_x[i], treePos_y, 60, floorPos_y - 286);

            //  branches
            fill(0,150,0);
            triangle(trees_x[i] - 50, treePos_y + 50, trees_x[i] + 30, treePos_y - 50, trees_x[i] + 110, treePos_y + 50);
            triangle(trees_x[i] - 50, treePos_y, trees_x[i] + 30, treePos_y - 100, trees_x[i] + 110, treePos_y);

        }
}

const checkCollectable = (t_collectable) =>
{
        if(dist(game_char_x, game_char_y, t_collectable.x_pos, t_collectable.y_pos) < 20) 
        {
            t_collectable.isFound = true;
            collectSound.play();
            game_score+=1;
        }
        
}

const checkCanyon = (t_canyon) =>
{
        if(game_char_x > t_canyon.x_pos && game_char_x < t_canyon.x_pos + t_canyon.width && !isFalling)
        {
            isPlummeting = true;
        }
        
}
const drawCollectable = (t_collectable) =>
{
    if(t_collectable.isFound == false)
       {    //coin [outer border]
            strokeWeight(5);
            stroke(255, 215, 0);
    
            // coin [inner fill]
            fill(255, 170, 29);
            ellipse(t_collectable.x_pos, t_collectable.y_pos - 30, t_collectable.size, t_collectable.size);
            noStroke();
        }
}

const drawCanyon = (t_canyon) =>
{
    fill(120,100,50);
    
    rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);
    
}

const renderFlagpole = (t_flagpole) =>
{  
    push();
    strokeWeight(5);
    stroke(190);
    line(t_flagpole.x_pos, floorPos_y, t_flagpole.x_pos, floorPos_y - 250);
    fill(255, 0, 0);
    noStroke();

    if(t_flagpole.isReached)
    {
        rect(t_flagpole.x_pos, floorPos_y - 250, 50, 50);
    }
    else
    {
        rect(t_flagpole.x_pos, floorPos_y - 50, 50, 50);
    }
    pop(); 
}

const checkFlagPole = (t_flagpole) =>
{
   let dist = abs(game_char_x - t_flagpole.x_pos)
   if(dist < 15)
       {
           t_flagpole.isReached = true;
       }
}

const checkPlayerDie = () =>
{

    if (game_char_y > height && lives > 0)
    {
        lives--;
        startGame()
    }
        
}

class Enemy 
{
    constructor(x, y, range) 
    {
        this.x = x;
        this.y = y;
        this.range = range;
        this.currentX = x;
        this.inc = 1;
    }

    update() 
    {
        this.currentX += this.inc;

        if (this.currentX >= this.x + this.range) 
        {
            this.inc = -1;
        } else if (this.currentX <= this.x) 
        {
            this.inc = 1;
        }
    }

    draw() 
    {
        this.update();
        fill(255, 0, 0);
        ellipse(this.currentX, this.y, 20, 20);
    }

    checkContact(game_x, game_y) 
    {
        let d = dist(game_x, game_y, this.currentX, this.y);
        return d < 20;
    }
}

const createPlatforms = (x, y, length) =>
{
    let p = {
        x: x,
        y: y,
        length: length,
        draw: function()
        {
            fill(0);
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function(gc_x, gc_y)
        {
            if(gc_x > this.x && gc_x < this.x + this.length)
            {
                let d = this.y - gc_y;
                
                if(d >= 0 && d < 5)
                {
                    return true;
                }
            }
            return false;
        }
    }
    return p;
}