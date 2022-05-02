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
    while(playerInfo.health > 0 && enemy.health > 0) {
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
                playerInfo.money = playerInfo.money + 12;
                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.")
            }
    
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
    } // End of while() Looop
}; // End of function

var endGame = function() {
    // If player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".")
    } else {
        window.alert("You've lost your robot in battle.")
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // Use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // Do nothing, so function will end
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