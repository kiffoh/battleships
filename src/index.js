import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, removeFirstPlayerText, playerOrComputer, handleConfirmBtnClick } from "./goesFirst";
import { randomise } from "./randomise";

async function initialiseGame() {
    // Welcome STAGE
    let opponent = await playerOrComputer();
    if (opponent === "player") opponent = "player2";


    // Initialising the player classes
    const player1 = Player();
    player1.name = "player1";
    const player2 = Player();
    player2.name = `${opponent}`;

    player1.buildHTML();
    player2.buildHTML();
    
    player1.opponent = player2;
    player2.opponent = player1;

    // Ship position STAGE
    // Obtain random starting coordinates
    let startingCoordinates_player1 = await randomise();
    let startingCoordinates_player2 = await randomise();
    
    player1.positionShips(startingCoordinates_player1);
    player2.positionShips(startingCoordinates_player2);
    
    if (player2.name === "computer") {
        player1.buildShips();
        
        player1.buildGrid(true);
        player2.buildGrid(false);

        player1.applyDragDrop();

        player1.applyDraggableShips();

    } else {
        player1.buildShips();
        player2.buildShips();

        player1.buildGrid(true);
        player2.buildGrid(true);

        player1.applyDragDrop();
        player2.applyDragDrop();

        player1.applyDraggableShips();
        player2.applyDraggableShips();

        player2.showOverlay(true);
    }

    // randomise button functionality  
    const randomiseButtons = document.querySelectorAll(".randomise-btn");

    // Define an async function to use await
    async function handleButtonClick(button) {
        const coordinates = await randomise(); // Wait for randomise() to resolve
        if (button.classList.contains("player1")) {
            player1.resetGrid()
            player1.positionShips(coordinates);
            player1.buildGrid(true);
        } else {
            player2.resetGrid()
            player2.positionShips(coordinates);
            player2.buildGrid(true);
        }
    }

    // Use a for...of loop to iterate over the buttons
    for (const button of randomiseButtons) {
        button.onclick = () => handleButtonClick(button);
    }

    await handleConfirmBtnClick(player1, player2);

    // Starting the game
    // gameplay STAGE

    // For turn with computer I only register the event listeners on the computer squares
    if (player2.name === "computer") {
        player2.generateComputerGuesses();  
    } else {
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
    
    // Reset the game - ONLY VISUALISES WHEN GAME IS FINISHED
    const resetWholeGame = document.querySelector(".reset-btn");
    resetWholeGame.addEventListener("click", initialiseGame);
}

initialiseGame();
