import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, removeFirstPlayerText, playerOrComputer } from "./goesFirst";

async function initialiseGame() {
    let opponent = await playerOrComputer();
    if (opponent === "player") opponent = "player2";
    console.log(opponent);
    // Creating the player classes
    const player1 = Player();
    player1.name = "player1";
    const player2 = Player();
    player2.name = `${opponent}`;

    player1.buildHTML();
    player2.buildHTML();
    
    player1.opponent = player2;
    player2.opponent = player1;

    // await for coordinates to be given
    // const await startingCoordinates = coordinates();

    player1.buildShips();
    player2.buildShips();

    player1.buildGrid();
    player2.buildGrid();

    player1.applyDragDrop();
    player2.applyDragDrop();

    player1.applyDraggableShips();
    player2.applyDraggableShips();

    /*
    // Populating the player classes
    const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];
    player1.positionShips(startingCoordinates);
    player2.positionShips(startingCoordinates);

    // Starting the game
    // For turn with computer I only register the event listeners on the computer squares
    if (player2.name === "computer") {
        // As playing computer the player's ships can be revealed
        player1.buildGrid(true);
        player2.buildGrid(false);

        player2.generateComputerGuesses();
        
    } else {
        // As playing on the same screen neither player can have ships revealed
        player1.buildGrid(false);
        player2.buildGrid(false);
        
        // Register event listeners on both grids
        player1.registerGridDivEventListener();
    }
    player2.registerGridDivEventListener();

    // Determines who goes first
    let turn = goesFirst([player1, player2]);
    turn.showOverlay(true);
    console.log(turn)

    if (turn.name === "computer") {
        console.log("COMPUTER GUESSED FIRST")
        player2.computerGuess();
    }

    removeFirstPlayerText(player1.name);
    removeFirstPlayerText(player2.name);
    
    // Reset the whole game
    const resetWholeGame = document.querySelector(".reset-btn");
    resetWholeGame.addEventListener("click", initialiseGame);
    */
}

initialiseGame();
