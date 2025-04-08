let player = {
    element: document.getElementById("player"),
    x: 50,
    y: 300,
    width: 40,
    height: 40,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumpPower: 15,
    isJumping: false,
  };
  
  let game = {
    level: 1,
    maxLevel: 4,
    score: 0,
    lives: 3,
    gravity: 0.8,
    friction: 0.8,
    platforms: [],
    coins: [],
    totalCoins: 0,
    collectedCoins: 0,
    enemies: [],
    goal: null,
    isGameOver: false,
    isLevelComplete: false,
    gameLoop: null,
    keys: {},
  };
  
  const gameContainer = document.getElementById("game-container");
  const levelDisplay = document.getElementById("level-display");
  const scoreDisplay = document.getElementById("score-display");
  const livesDisplay = document.getElementById("lives-display");
  const coinsCollectedDisplay = document.getElementById("coins-collected");
  const totalCoinsDisplay = document.getElementById("total-coins");
  const levelCompleteScreen = document.getElementById("level-complete");
  const levelScore = document.getElementById("level-score");
  const nextLevelButton = document.getElementById("next-level");
  const gameOverScreen = document.getElementById("game-over");
  const finalScoreDisplay = document.getElementById("final-score");
  const restartButton = document.getElementById("restart-button");
  const gameCompleteScreen = document.getElementById("game-complete");
  const completeScoreDisplay = document.getElementById("complete-score");
  const playAgainButton = document.getElementById("play-again");
  const startScreen = document.getElementById("start-screen");
  const startButton = document.getElementById("start-button");
  
  
  document.addEventListener("keydown", (e) => {
    game.keys[e.key] = true;
  });
  
  document.addEventListener("keyup", (e) => {
    game.keys[e.key] = false;
  });
  
  nextLevelButton.addEventListener("click", () => {
    levelCompleteScreen.style.display = "none";
    game.level++;
    if (game.level > game.maxLevel) {
      game.level = 1;
    }
    startLevel();
  });
  
  restartButton.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    resetGame();
    startLevel();
  });
  
  playAgainButton.addEventListener("click", () => {
    gameCompleteScreen.style.display = "none";
    resetGame();
    startLevel();
  });
  
  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    startLevel();
  });
  
  function resetGame() {
    game.level = 1;
    game.score = 0;
    game.lives = 3;
    game.isGameOver = false;
    updateUI();
  }
  
  function updateUI() {
    levelDisplay.textContent = game.level;
    scoreDisplay.textContent = game.score;
    livesDisplay.textContent = game.lives;
    coinsCollectedDisplay.textContent = game.collectedCoins;
    totalCoinsDisplay.textContent = game.totalCoins;
  }
  
  function createLevel(level) {
    clearLevel();
  
    game.collectedCoins = 0;
    game.totalCoins = 0;
  
    player.x = 50;
    player.y = 300;
    player.velocityX = 0;
    player.velocityY = 0;
  
    switch (level) {
      case 1:
       
        createPlatform(0, 550, 800, 50); 
        createPlatform(200, 450, 200, 20);
        createPlatform(500, 350, 200, 20);
  
        createCoin(250, 420);
        createCoin(300, 420);
        createCoin(550, 320);
        createCoin(600, 320);
        createCoin(650, 320);
  
        createGoal(650, 510);
        break;
  
      case 2:
        createPlatform(0, 550, 800, 50);
        createPlatform(100, 450, 150, 20);
        createPlatform(350, 400, 150, 20);
        createPlatform(600, 350, 150, 20);
        createPlatform(350, 250, 150, 20);
  
        createCoin(150, 420);
        createCoin(400, 370);
        createCoin(650, 320);
        createCoin(400, 220);
  
        createEnemy(300, 530, 200, 3); 
        createEnemy(430, 380, 100, 2); 
  
        createGoal(400, 210);
        break;
  
      case 3:
        createPlatform(0, 550, 800, 50); 
        createPlatform(100, 450, 100, 20);
        createPlatform(300, 400, 100, 20);
        createPlatform(500, 350, 100, 20);
        createPlatform(300, 300, 100, 20);
        createPlatform(100, 250, 100, 20);
        createPlatform(300, 200, 100, 20);
        createPlatform(500, 150, 200, 20);
  
        createCoin(130, 420);
        createCoin(330, 370);
        createCoin(530, 320);
        createCoin(330, 270);
        createCoin(130, 220);
        createCoin(330, 170);
        createCoin(550, 120);
  
        createEnemy(250, 530, 300, 4); 
        createEnemy(550, 330, 100, 2); 
        createEnemy(150, 230, 80, 3); 
  
        createGoal(650, 110);
        break;
  
      case 4:
        createPlatform(0, 550, 800, 50); 
        createPlatform(150, 450, 80, 20);
        createPlatform(350, 450, 80, 20);
        createPlatform(550, 450, 80, 20);
        createPlatform(250, 350, 80, 20);
        createPlatform(450, 350, 80, 20);
        createPlatform(650, 350, 80, 20);
        createPlatform(150, 250, 80, 20);
        createPlatform(350, 250, 80, 20);
        createPlatform(550, 250, 80, 20);
        createPlatform(350, 150, 200, 20);
  
        createCoin(180, 420);
        createCoin(380, 420);
        createCoin(580, 420);
        createCoin(280, 320);
        createCoin(480, 320);
        createCoin(680, 320);
        createCoin(180, 220);
        createCoin(380, 220);
        createCoin(580, 220);
        createCoin(400, 120);
        createCoin(450, 120);
  
        createEnemy(300, 530, 500, 5); 
        createEnemy(280, 330, 100, 3); 
        createEnemy(480, 330, 100, 3); 
        createEnemy(200, 230, 60, 2); 
        createEnemy(580, 230, 60, 2); 
  
        createGoal(450, 110);
        break;
    }
  
    game.totalCoins = game.coins.length;
    updateUI();
  }
  
  function clearLevel() {
    const elementsToRemove = document.querySelectorAll(
      ".platform, .coin, .enemy, .goal"
    );
    elementsToRemove.forEach((el) => el.remove());
  
    game.platforms = [];
    game.coins = [];
    game.enemies = [];
    game.goal = null;
  }
  
  function createPlatform(x, y, width, height) {
    const platform = document.createElement("div");
    platform.classList.add("platform");
    platform.style.left = x + "px";
    platform.style.top = y + "px";
    platform.style.width = width + "px";
    platform.style.height = height + "px";
  
    gameContainer.appendChild(platform);
  
    game.platforms.push({
      element: platform,
      x: x,
      y: y,
      width: width,
      height: height,
    });
  }
  
  function createCoin(x, y) {
    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.left = x + "px";
    coin.style.top = y + "px";
  
    gameContainer.appendChild(coin);
  
    game.coins.push({
      element: coin,
      x: x,
      y: y,
      width: 20,
      height: 20,
      collected: false,
    });
  }
  
  function createEnemy(x, y, patrolDistance, speed) {
    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = x + "px";
    enemy.style.top = y + "px";
  
    gameContainer.appendChild(enemy);
  
    game.enemies.push({
      element: enemy,
      x: x,
      y: y,
      width: 30,
      height: 30,
      startX: x,
      patrolDistance: patrolDistance,
      direction: 1,
      speed: speed,
    });
  }
  
  function createGoal(x, y) {
    const goal = document.createElement("div");
    goal.classList.add("goal");
    goal.style.left = x + "px";
    goal.style.top = y + "px";
  
    gameContainer.appendChild(goal);
  
    game.goal = {
      element: goal,
      x: x,
      y: y,
      width: 40,
      height: 40,
    };
  }
  
  function updatePlayerPosition() {
    if (
      (game.keys["ArrowLeft"] || game.keys["a"] || game.keys["A"]) &&
      !game.isLevelComplete
    ) {
      player.velocityX = -player.speed;
    } else if (
      (game.keys["ArrowRight"] || game.keys["d"] || game.keys["D"]) &&
      !game.isLevelComplete
    ) {
      player.velocityX = player.speed;
    } else {
      player.velocityX *= game.friction;
    }
  
    if (
      (game.keys["ArrowUp"] ||
        game.keys[" "] ||
        game.keys["w"] ||
        game.keys["W"]) &&
      !player.isJumping &&
      !game.isLevelComplete
    ) {
      player.velocityY = -player.jumpPower;
      player.isJumping = true;
    }
  
    player.velocityY += game.gravity;
  
    player.x += player.velocityX;
    player.y += player.velocityY;
  
    if (player.x < 0) {
      player.x = 0;
      player.velocityX = 0;
    } else if (player.x + player.width > gameContainer.offsetWidth) {
      player.x = gameContainer.offsetWidth - player.width;
      player.velocityX = 0;
    }
  
    if (player.y > gameContainer.offsetHeight) {
      playerDied();
      return;
    }
  
    checkPlatformCollisions();
  
    checkCoinCollisions();
  
    checkEnemyCollisions();
  
    checkGoalCollision();
  
    player.element.style.left = player.x + "px";
    player.element.style.top = player.y + "px";
  }
  
  function checkPlatformCollisions() {
    player.isJumping = true;
  
    for (let platform of game.platforms) {
      if (
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width &&
        player.y + player.height > platform.y &&
        player.y + player.height < platform.y + platform.height / 2 &&
        player.velocityY > 0
      ) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.isJumping = false;
      }
    }
  }
  
  function checkCoinCollisions() {
    for (let coin of game.coins) {
      if (
        !coin.collected &&
        player.x + player.width > coin.x &&
        player.x < coin.x + coin.width &&
        player.y + player.height > coin.y &&
        player.y < coin.y + coin.height
      ) {
        coin.collected = true;
        coin.element.style.display = "none";
  
        game.score += 10;
        game.collectedCoins++;
        updateUI();
  
        if (game.collectedCoins >= game.totalCoins) {
          completeLevel();
        }
      }
    }
  }
  
  function updateEnemies() {
    for (let enemy of game.enemies) {
      enemy.x += enemy.direction * enemy.speed;
  
      if (enemy.x > enemy.startX + enemy.patrolDistance) {
        enemy.direction = -1;
      } else if (enemy.x < enemy.startX) {
        enemy.direction = 1;
      }
  
      enemy.element.style.left = enemy.x + "px";
    }
  }
  
  function checkEnemyCollisions() {
    for (let enemy of game.enemies) {
      if (
        player.x + player.width > enemy.x &&
        player.x < enemy.x + enemy.width &&
        player.y + player.height > enemy.y &&
        player.y < enemy.y + enemy.height
      ) {
        playerDied();
        return;
      }
    }
  }
  
  function checkGoalCollision() {
    if (
      game.goal &&
      player.x + player.width > game.goal.x &&
      player.x < game.goal.x + game.goal.width &&
      player.y + player.height > game.goal.y &&
      player.y < game.goal.y + game.goal.height
    ) {
      game.score += 20;
      updateUI();
  
      game.goal.element.style.display = "none";
      game.goal = null;
    }
  }
  
  function playerDied() {
    game.lives--;
    updateUI();
  
    if (game.lives <= 0) {
      gameOver();
    } else {
      player.x = 50;
      player.y = 300;
      player.velocityX = 0;
      player.velocityY = 0;
    }
  }
  
  function completeLevel() {
    if (game.isLevelComplete) return;
  
    game.isLevelComplete = true;
  
    let levelBonus = game.lives * 50;
    game.score += levelBonus;
  
    updateUI();
  
    levelScore.textContent = game.score;
  
    if (game.level === game.maxLevel) {
      completeScoreDisplay.textContent = game.score;
      gameCompleteScreen.style.display = "flex";
    } else {
      levelCompleteScreen.style.display = "flex";
    }
  }
  
  function gameOver() {
    game.isGameOver = true;
    clearInterval(game.gameLoop);
  
    finalScoreDisplay.textContent = game.score;
    gameOverScreen.style.display = "flex";
  }
  
  function gameLoop() {
    if (!game.isGameOver && !game.isLevelComplete) {
      updatePlayerPosition();
      updateEnemies();
    }
  }
  
  function startLevel() {
    createLevel(game.level);
    game.isLevelComplete = false;
  
    if (game.gameLoop) {
      clearInterval(game.gameLoop);
    }
  
    game.gameLoop = setInterval(gameLoop, 20);
  }
  