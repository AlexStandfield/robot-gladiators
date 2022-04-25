// Players Robot
var playerName = window.prompt("What is your robots name?")
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Enemy Robots
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = Math.floor(Math.random() * 60);
var enemyAttack = 12;

// Funtion to create a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// Create Function
var fight = function(enemyName) {

    while(playerHealth > 0 && enemyHealth > 0) {
        // Ask player if they want to FIGHT or SKIP
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
            // If yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!")
                // Subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
            // Subtract enemies health
            var damage = randomNumber(playerAttack - 3, playerAttack);

            enemyHealth = Math.max(0, enemyHealth - damage);
            
            // Check Enemies Health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                // Award player money for winning
                playerMoney = playerMoney + 12;
                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.")
            }
    
            // Subtract players health
            var damage = randomNumber(enemyAttack - 3, enemyAttack);

            playerHealth = Math.max(0, playerHealth - damage);
        
            // Check Players Health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                // Leave while() loop cause player is dead
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health left.")
            }
    } // End of while() Looop
}; // End of function

var endGame = function() {
    // If player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".")
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
            if (playerMoney >= 7) {

                window.alert("Refilling player's health by 20 for 7 dollars.")
                
                // Increase health and Decrease health
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!")
            }

            break;
        
        case "UPGRADE": // new case
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                
                // Increase Attack and Decrease Money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You don't have enough money!");
            }

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
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    
    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // Let the player know where they are and what round it is
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            
            // pick new enemy to fight
            var pickedEnemyName = enemyNames[i];
            
            // reset enemy health
            enemyHealth = randomNumber(40, 60);
            
            // Use this to debug loop
            // debugger;
            
            // initiate fight
            fight(pickedEnemyName);

            // Go to shop if there are still enemies left
            if (playerHealth > 0 && i < enemyNames.length -1) {
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