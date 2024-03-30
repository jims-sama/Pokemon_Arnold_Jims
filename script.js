var currentPage = window.location.pathname.split("/").pop();
var yourPokemon_fight;
var enemyPokemon_fight;
var selectedMoveId;

function scrollToID(id) {
    var element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function storeFormData(event) {
    event.preventDefault();

    var yourTrainerName = document.getElementById("yourTrainerName").value;
    var yourPokemon = document.getElementById("yourPokemon").value;
    var enemyTrainerName = document.getElementById("enemyTrainerName").value;
    var enemyPokemon = document.getElementById("enemyPokemon").value;

    localStorage.setItem("yourTrainerName", yourTrainerName);
    localStorage.setItem("yourPokemon", yourPokemon);
    localStorage.setItem("enemyTrainerName", enemyTrainerName);
    localStorage.setItem("enemyPokemon", enemyPokemon);

    window.location.href = "battle.html";
}

function pokemon(name, type, level, health, attack, speed, moves) {
    this.name = name;
    this.type = type;
    this.level = level;
    this.health = health;
    this.attack = attack;
    this.speed = speed;
    this.moves = moves.slice(0, 4);
}

function pokemonMove(name, type, damage) {
    this.name = name;
    this.type = type;
    this.damage = damage;
}

document.addEventListener("DOMContentLoaded", function() {
    if (currentPage === "battle.html") {
        let yourTrainerName_fight;
        let enemyTrainerName_fight;

        var yourTrainerName = localStorage.getItem("yourTrainerName");
        var yourPokemon = localStorage.getItem("yourPokemon");
        var enemyTrainerName = localStorage.getItem("enemyTrainerName");
        var enemyPokemon = localStorage.getItem("enemyPokemon");
        var battleTitle = yourTrainerName + " vs. " + enemyTrainerName;
        var yourPokemonSpriteElement = document.getElementById("yourPokemonSprite");
        var enemyPokemonSpriteElement = document.getElementById("enemyPokemonSprite");

        document.getElementById("yourTrainerNameDisplay").textContent = yourTrainerName;
        document.getElementById("yourPokemonDisplay").textContent = yourPokemon;
        document.getElementById("enemyTrainerNameDisplay").textContent = enemyTrainerName;
        document.getElementById("enemyPokemonDisplay").textContent = enemyPokemon;
        document.getElementById("battleTitleDisplay").textContent = battleTitle;

        var charizardMoves = [
            new pokemonMove("Ember", "Fire", 40),
            new pokemonMove("Fire Spin", "Fire", 35),
            new pokemonMove("Flamethrower", "Fire", 90),
            new pokemonMove("Dragon Claw", "Dragon", 80)
            ];

        var blastoiseMoves = [
            new pokemonMove("Water Gun", "Water", 40),
            new pokemonMove("Bubble", "Water", 40),
            new pokemonMove("Hydro Pump", "Water", 110),
            new pokemonMove("Surf", "Water", 90)
            ];

        var venusaurMoves = [
            new pokemonMove("Vine Whip", "Grass", 45),
            new pokemonMove("Razor Leaf", "Grass", 55),
            new pokemonMove("Solar Beam", "Grass", 120),
            new pokemonMove("Petal Dance", "Grass", 120)
            ];

        var electivireMoves = [
            new pokemonMove("Thunder Shock", "Electric", 40),
            new pokemonMove("Thunder Punch", "Electric", 75),
            new pokemonMove("Thunderbolt", "Electric", 90),
            new pokemonMove("Thunder", "Electric", 110)
            ];

        if (yourPokemon === "Venusaur") {
            yourPokemon_fight = new pokemon("Venusaur", "Grass", 50, 935, 167, 145, venusaurMoves);
            yourPokemonSpriteElement.src = "Pokemon/Venusaur.gif";
        } else if (yourPokemon === "Charizard") {
            yourPokemon_fight = new pokemon("Charizard", "Fire", 50, 925, 177, 167, charizardMoves);
            yourPokemonSpriteElement.src = "Pokemon/Charizard.gif";
        } else if (yourPokemon === "Blastoise") {
            yourPokemon_fight = new pokemon("Blastoise", "Water", 50, 930, 150, 143, blastoiseMoves);
            yourPokemonSpriteElement.src = "Pokemon/Blastoise.gif";
        } else if (yourPokemon === "Electivire"){
            yourPokemon_fight = new pokemon("Electivire", "Electric", 50, 910, 192, 161, electivireMoves);
            yourPokemonSpriteElement.src = "Pokemon/Electivire.gif"
        }

        if (enemyPokemon === "Venusaur") {
            enemyPokemon_fight = new pokemon("Venusaur", "Grass", 50, 935, 167, 145, venusaurMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Venusaur.gif";
        } else if (enemyPokemon === "Charizard") {
            enemyPokemon_fight = new pokemon("Charizard", "Fire", 50, 925, 177, 167, charizardMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Charizard.gif";
        } else if (enemyPokemon === "Blastoise") {
            enemyPokemon_fight = new pokemon("Blastoise", "Water", 50, 930, 150, 143, blastoiseMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Blastoise.gif";
        } else if (enemyPokemon === "Electivire"){
            enemyPokemon_fight = new pokemon("Electivire", "Electric", 50, 910, 192, 161, electivireMoves);
            enemyPokemonSpriteElement.src = "Pokemon/Electivire.gif";
        }

        document.getElementById("yourPokemonHP").textContent = "HP: " + yourPokemon_fight.health + "/" + yourPokemon_fight.health;
        document.getElementById("yourPokemonLevel").textContent = "Level " + yourPokemon_fight.level;
        document.getElementById("enemyPokemonHP").textContent = "HP: " + enemyPokemon_fight.health + "/" + enemyPokemon_fight.health;
        document.getElementById("enemyPokemonLevel").textContent = "Level " + enemyPokemon_fight.level;

        updateMoveNames();

        yourInitialHealth = yourPokemon_fight.health;
        enemyInitialHealth = enemyPokemon_fight.health;
    }
});

function updateMoveNames() {
    var yourMoves = yourPokemon_fight.moves;
    for (var i = 0; i < yourMoves.length; i++) {
        document.getElementById("yourPokemonMove" + (i+1)).textContent = yourMoves[i].name;
    }
}

function selectMove(moveId) {
    var buttons = document.querySelectorAll('.move button');
    buttons.forEach(function(button) {
        button.classList.remove('selected');
    });

    var selectedButton = document.getElementById(moveId);
    selectedButton.classList.add('selected');

    selectedMoveId = moveId;
}

var battleOver = false;

function takeTurn() {
    if (selectedMoveId && !battleOver) {
        executePlayerMove();

        if (enemyPokemon_fight.health > 0) {
            executeOpponentMove();
        }

        checkVictor();

        updateHPDisplay(yourPokemon_fight, enemyPokemon_fight);

        if (yourPokemon_fight.health <= 0 || enemyPokemon_fight.health <= 0) {
            battleOver = true;
            alert("Battle is over! Please refresh the page to start a new battle.");
        }
    } else {
        alert("Please select a move before taking a turn or the battle is already over.");
    }
}

function checkTypeEffectiveness(moveType, defenderType) {
    var typeChart = {
        "Normal": {"Rock": 0.5, "Ghost": 0, "Steel": 0.5},
        "Fire": {"Fire": 0.5, "Water": 0.5, "Grass": 2, "Ice": 2, "Bug": 2, "Rock": 0.5, "Dragon": 0.5, "Steel": 2},
        "Water": {"Fire": 2, "Water": 0.5, "Grass": 0.5, "Ice": 2, "Steel": 2},
        "Electric": {"Water": 2, "Electric": 0.5, "Grass": 0.5, "Ground": 0, "Flying": 2, "Dragon": 0.5},
        "Grass": {"Fire": 0.5, "Water": 2, "Grass": 0.5, "Poison": 0.5, "Ground": 2, "Flying": 0.5, "Bug": 0.5, "Rock": 2, "Dragon": 0.5, "Steel": 0.5},
        "Ice": {"Fire": 0.5, "Water": 0.5, "Grass": 2, "Ice": 0.5, "Ground": 2, "Flying": 2, "Dragon": 2, "Steel": 0.5},
        "Fighting": {"Normal": 2, "Ice": 2, "Poison": 0.5, "Flying": 0.5, "Psychic": 0.5, "Bug": 0.5, "Rock": 2, "Ghost": 0, "Dark": 2, "Steel": 2, "Fairy": 0.5},
        "Poison": {"Grass": 2, "Poison": 0.5, "Ground": 0.5, "Rock": 0.5, "Ghost": 0.5, "Steel": 0, "Fairy": 2},
        "Ground": {"Fire": 2, "Electric": 2, "Grass": 0.5, "Ice": 2, "Poison": 2, "Rock": 2, "Steel": 2},
        "Flying": {"Electric": 0.5, "Grass": 2, "Fighting": 2, "Bug": 2, "Rock": 0.5, "Steel": 0.5},
        "Psychic": {"Fighting": 2, "Poison": 2, "Psychic": 0.5, "Dark": 0, "Steel": 0.5},
        "Bug": {"Fire": 0.5, "Grass": 2, "Fighting": 0.5, "Poison": 0.5, "Flying": 0.5, "Psychic": 2, "Ghost": 0.5, "Dark": 2, "Steel": 0.5, "Fairy": 0.5},
        "Rock": {"Fire": 2, "Ice": 2, "Fighting": 0.5, "Ground": 0.5, "Flying": 2, "Bug": 2, "Steel": 0.5},
        "Ghost": {"Normal": 0, "Psychic": 2, "Ghost": 2, "Dark": 0.5},
        "Dragon": {"Dragon": 2, "Steel": 0.5, "Fairy": 0},
        "Dark": {"Fighting": 0.5, "Psychic": 2, "Ghost": 2, "Dark": 0.5, "Fairy": 0.5},
        "Steel": {"Fire": 0.5, "Water": 0.5, "Electric": 0.5, "Ice": 2, "Rock": 2, "Steel": 0.5, "Fairy": 2},
        "Fairy": {"Fighting": 2, "Poison": 0.5, "Bug": 0.5, "Steel": 0.5, "Dragon": 2, "Dark": 2}
    };

    if (defenderType in typeChart[moveType]) {
        var effectiveness = typeChart[moveType][defenderType];
        if (effectiveness === 2) {
            return "super effective";
        } else if (effectiveness === 0.5) {
            return "not very effective";
        }
    }

    return "";
}

function executeMove(attacker, defender, move) {
    var damage = calculateDamage(attacker, defender, move);
    var effectiveness = checkTypeEffectiveness(move.type, defender.type);
    if (effectiveness === "super effective") {
        damage *= 2;
    } else if (effectiveness === "not very effective") {
        damage *= 0.5;
    }
    defender.health -= damage;
    let effectivenessMessage = "";
    if (effectiveness === "super effective" || effectiveness === "not very effective") {
        effectivenessMessage = " (it's " + effectiveness + "!)";
    }
    logToConsole(attacker.name + " used " + move.name + " dealing " + damage + " damage to " + defender.name + effectivenessMessage);
}

function executePlayerMove() {
    var moveIndex = parseInt(selectedMoveId.slice(-1)) - 1;
    var move = yourPokemon_fight.moves[moveIndex];

    executeMove(yourPokemon_fight, enemyPokemon_fight, move);
}

function executeOpponentMove() {
    var moveIndex = Math.floor(Math.random() * enemyPokemon_fight.moves.length);
    var move = enemyPokemon_fight.moves[moveIndex];

    executeMove(enemyPokemon_fight, yourPokemon_fight, move);
}

function calculateDamage(attacker, defender, move) {
    return Math.floor((move.damage * (attacker.attack / 100)));
}

function checkVictor() {
    if (yourPokemon_fight.health <= 0) {
        yourPokemon_fight.health = 0;
        updateHPDisplay(yourPokemon_fight, enemyPokemon_fight);
        alert("Enemy " + enemyPokemon_fight.name + " wins!");
        enemyPokemon_fight.level++;
        document.getElementById("enemyPokemonLevel").textContent = "Level " + enemyPokemon_fight.level;
    } else if (enemyPokemon_fight.health <= 0) {
        enemyPokemon_fight.health = 0;
        updateHPDisplay(yourPokemon_fight, enemyPokemon_fight);
        alert("You win! Your " + yourPokemon_fight.name + " defeated enemy " + enemyPokemon_fight.name);
        yourPokemon_fight.level++;
        document.getElementById("yourPokemonLevel").textContent = "Level " + yourPokemon_fight.level;
        logToConsole("Congratulations! Your " + yourPokemon_fight.name + " leveled up to Level " + yourPokemon_fight.level + "!");
    }
}

function updateHPDisplay(yourPokemon, enemyPokemon) {
    document.getElementById("yourPokemonHP").textContent = "HP: " + yourPokemon.health + "/" + yourInitialHealth;
    document.getElementById("enemyPokemonHP").textContent = "HP: " + enemyPokemon.health + "/" + enemyInitialHealth;
}

function logToConsole(message) {
    var consoleArea = document.getElementById("consoleArea");
    var logMessage = document.createElement("div");
    logMessage.textContent = message;
    consoleArea.appendChild(logMessage);
}
