import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, playerOrComputer } from "./goesFirst";
import { handleRandomiseButtonClick, handleResetButtonClick, handleConfirmBtnClick, changeOverlaysTo, handleHorizontalOrVerticalButtonClick } from "./buttonLogic";
import { randomise } from "./randomise";

async function initialiseGame() {

    // WELCOME STAGE
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

    // SHIP POSITION STAGE
    player1.updateTurnText(`${player1.name.toUpperCase()} <span class="highlighted green">PLACE YOUR SHIPS</span>`);

    player1.buildHTMLGrid(true);
    player1.buildShips();
    player1.applyDraggableShips();

    if (player2.name === "computer") {
        // As player1 will always position ships first
        player2.buildRules();

        player1.buildButtonContainer();

        const player1handleHorizontalOrVerticalBtn = document.querySelector(".horizontal-or-vertical-btn");
        player1handleHorizontalOrVerticalBtn.onclick = () => handleHorizontalOrVerticalClick(player1handleHorizontalOrVerticalBtn, player1);
        
        player2.buildHTMLGrid(false);

        changeOverlaysTo("blue", true);
        
    } else {
        // As player1 will always position ships first
        player2.buildRules(true);

        player1.buildButtonContainer();
        player2.buildButtonContainer();

        player2.buildHTMLGrid(true);

    }

    // Attach logic to each button (HorizontalOrVertical, Randomise, Reset, Confirm) for positioning stage
    // Use a for...of loop to iterate over the buttons 
    const horizontalOrVerticalButtons = document.querySelectorAll(".horizontal-or-vertical-btn");
    for (const button of horizontalOrVerticalButtons) {
        button.onclick = () => handleHorizontalOrVerticalButtonClick(button, player1, player2);
    }

    const randomiseButtons = document.querySelectorAll(".randomise-btn");
    for (const button of randomiseButtons) {
        button.onclick = () => handleRandomiseButtonClick(button, player1, player2);
    }


    const resetButtons = document.querySelectorAll(".reset-btn");
    for (const button of resetButtons) {
        button.onclick = () => handleResetButtonClick(button, player1, player2);
    }

    // Game does not progress until handleConfirmBtnClick is fufilled
    await handleConfirmBtnClick(player1, player2);

    // Starting the game
    // GAMEPLAY STAGE
    // For turn with computer I only register the event listeners on the computer squares
    if (player2.name === "computer") {
        player2.generateComputerGuesses();

        // Generate position of computer's ships
        const computerCoordinates = await randomise();
        player2.positionShips(computerCoordinates);

        // Resetting HTML Grid's to remove the eventListeners for placing ships
        // false in buildHTMLGrid is to hide the ships from view
        player2.resetGrid()
        player2.buildHTMLGrid(false);        
    } else {
        // Resetting HTML Grid's to remove the eventListeners for placing ships
        player1.resetHTMLGrid();
        player1.buildHTMLGrid();

        player2.resetHTMLGrid();
        player2.buildHTMLGrid();

        // Register event listeners on both grids
        player1.registerGridDivEventListener();
    }
    
    player1.buildShips();
    player2.buildShips();

    player2.registerGridDivEventListener();

    // Determines who goes first
    let turn = goesFirst([player1, player2]);
    turn.showOverlay(true);

    if (turn.name === "computer") {
        console.log("COMPUTER GUESSED FIRST")
        player2.computerGuess();
    }
    
    // Reset the game - ONLY VISUALISES WHEN GAME IS FINISHED
    const resetWholeGame = document.querySelector(".reset-btn");
    resetWholeGame.addEventListener("click", initialiseGame);
}

initialiseGame();
