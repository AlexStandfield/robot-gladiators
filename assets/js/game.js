// Funtion to create a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};
// Function to Set Name
var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robots name?")
    }

    console.log("Your robots name is " + name);
    return name;
};
// Players Robot
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You do not have enough money!");
        }
    }
};
// Enemy Robots
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// Fight or Skip Function
var fightOrSkip = function () {
    // Ask player if they'd like to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // Enter the conditional recursivefunction call here!
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Try again.");
        return fightOrSkip();
    }
    // If player picks "Skip" confirm and then stop the loop
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        // Confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        
        // If yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!")
            // Subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
};

// Create Function
var fight = function(enemy) {
    // Keep track of who goes first
    var isPlayerTurn = true;
    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    while(playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {

            // Ask player if they want to FIGHT or SKIP
            if (fightOrSkip()) {
                // if true leave fight by breaking loop
                break;
            }
            
            // Subtract enemies health
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            
            enemy.health = Math.max(0, enemy.health - damage);
            // Check Enemies Health
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                // Award player money for winning
                playerInfo.money = playerInfo.money + 20;
                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.")
            } 
        } else {
            // Subtract players health
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            // Check Players Health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                // Leave while() loop cause player is dead
                break;
            } else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.")
            }
        }
        // switch turn order next round
        isPlayerTurn = !isPlayerTurn;
    } // End of while() Looop
}; // End of function

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // Check local storage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }
    // If player has more money then the highscore, player sets a new highscore
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has a highscore of " + playerInfo.money + "!");
    } else {
        alert(playerInfo.name + " did not beat the highscore of " + highScore + ". Maybe next time!");
    }

    //Ask the player if they want to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // Restart the Game
        startGame();
    } else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function() {
    // Ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for a REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    // Use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            // Call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

// Function to Start a new game
var startGame = function () {

    // Reset player stats
    playerInfo.reset();
    
    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Let the player know where they are and what round it is
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            
            // pick new enemy to fight
            var pickedEnemyObj = enemyInfo[i];
            
            // reset enemy health
            pickedEnemyObj.health = randomNumber(40, 60);
            
            // Use this to debug loop
            // debugger;
            
            // initiate fight
            fight(pickedEnemyObj);

            // Go to shop if there are still enemies left
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                // Ask player if they want to use store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // If yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            };

        } else {
            window.alert("You have lost your robot in battle! Game over!")
            break;
        }
    }

    // End the game or Play Again
    endGame();

};

// Starts Game
startGame();