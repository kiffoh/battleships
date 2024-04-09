import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, removeFirstPlayerText, playerOrComputer } from "./goesFirst";
import { handleRandomiseButtonClick, handleResetButtonClick, handleConfirmBtnClick } from "./buttonLogic";
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
    if (player2.name === "computer") { 
        player1.buildButtonContainer();
        
        player1.buildGrid(true);
        player2.buildGrid(false);

        player1.applyDragDrop();

        player1.applyDraggableShips();

    } else {
        player1.buildButtonContainer();
        player2.buildButtonContainer();

        player1.buildGrid(true);
        player2.buildGrid(true);

        player1.applyDragDrop();
        player2.applyDragDrop();

        player1.applyDraggableShips();
        player2.applyDraggableShips();

        player2.showOverlay(true);
    }

    // Attach logic to each button (Randomise, Reset, Confirm) for positioning stage
    // Use a for...of loop to iterate over the buttons 
    const randomiseButtons = document.querySelectorAll(".randomise-btn");
    for (const button of randomiseButtons) {
        button.onclick = () => handleRandomiseButtonClick(button, player1, player2);
    }

    const resetButtons = document.querySelectorAll(".reset-btn");
    for (const button of resetButtons) {
        button.onclick = () => handleResetButtonClick(button, player1, player2);
    }

    await handleConfirmBtnClick(player1, player2);

    // Starting the game
    // gameplay STAGE
    player1.buildShips();
    player2.buildShips();

    // For turn with computer I only register the event listeners on the computer squares
    if (player2.name === "computer") {
        player2.generateComputerGuesses();

        const computerCoordinates = await randomise();
        player2.resetGrid()
        player2.positionShips(computerCoordinates);
        player2.buildGrid(false);
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

    //removeFirstPlayerText(player1.name);
    // removeFirstPlayerText(player2.name);
    
    // Reset the game - ONLY VISUALISES WHEN GAME IS FINISHED
    const resetWholeGame = document.querySelector(".reset-btn");
    resetWholeGame.addEventListener("click", initialiseGame);
}

initialiseGame();
