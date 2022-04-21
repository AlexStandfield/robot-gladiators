// Players Robot
var playerName = window.prompt("What is your robots name?")
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Enemy Robots
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

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
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }
        
            // Subtract enemies health
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
            );
            
            // Check Enemies Health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                // Award player money for winning
                playerMoney = playerMoney + 20;
                // Leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.")
            }
    
            // Subtract players health
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
        
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

// Execute Function
for(var i = 0; i < enemyNames.length; i++) {
    if (playersHealth > 0) {
        // Let the player know where they are and what round it is
        window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

        // pick new enemy to fight
        var pickedEnemyName = enemyNames[i];

        // reset enemy health
        enemyHealth = 50;

        // Use this to debug loop
        // debugger;

        // initiate fight
        fight(pickedEnemyName);
    } else {
        window.alert("You have lost your robot in battle! Game over!")
        break;
    }
}