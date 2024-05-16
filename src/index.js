import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, playerOrComputer } from "./goesFirst";
import { handleGameRulesButtonClick, handleRandomiseButtonClick, handleResetButtonClick, handleConfirmBtnClick, changeOverlaysTo, handleHorizontalOrVerticalButtonClick } from "./buttonLogic";
import { randomise } from "./randomise";

let player1WinningCounter = null;
let player2WinningCounter = null;
let opponent = null;
let player1Moniker = null;
let player2Moniker = null;

async function initialiseGame() {

    // WELCOME STAGE
    if (opponent === null) {
        const { chosenPlayer2, player1MonikerValue, player2MonikerValue } = await playerOrComputer();
        opponent = chosenPlayer2 === "player" ? "player2" : "computer";
        player1Moniker = player1MonikerValue;
        player2Moniker = player2MonikerValue;

        player1WinningCounter = 0;
        player2WinningCounter = 0;

        const resetHTML = document.querySelector(".grid-containers");

        resetHTML.innerHTML = "";
    }

    // Initialising the player classes
    const player1 = Player();
    player1.name = "player1";
    player1.moniker = player1Moniker;

    const player2 = Player();
    player2.name = `${opponent}`;
    player2.moniker = player2Moniker;
    
    player1.opponent = player2;
    player2.opponent = player1;

    player1.winningCounter = player1WinningCounter;
    player2.winningCounter = player2WinningCounter;

    player1.buildHTMLDivContainers();
    player2.buildHTMLDivContainers();

    // SHIP POSITION STAGE
    player1.updateTurnText(`${player1.moniker} <span class="highlighted green">PLACE YOUR SHIPS</span>`);

    player1.buildHTMLGrid(true);
    player1.buildShips();
    player1.applyDraggableShips();

    // As player1 will always position ships first
    player2.buildRules();

    player1.buildButtonContainer();
    // player2 button container always built so there is enough space for the ship placement rules
    player2.buildButtonContainer();

    if (player2.name === "computer") {        
        player2.buildHTMLGrid(false);

        // Change the overlay colour for ship placement rules, true signals it is vs a computer
        changeOverlaysTo("blue", true);
        
    } else {
        player2.buildHTMLGrid(true);
    }

    const gameRulesBtn = document.querySelector(".game-rules-btn");
    gameRulesBtn.addEventListener("click", () => {
        handleGameRulesButtonClick();
    })

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
        // Resetting HTML Grid's to remove the eventListeners for placing ships
        // Necessary as HTMLGrid needed to be built to show the rules
        player2.resetGrid()   
        
        // Generate position of computer's ships
        player2.generateComputerGuesses();
        const computerCoordinates = await randomise();
        player2.positionShips(computerCoordinates);
        
        // false hide's the ships from user view
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
    resetWholeGame.addEventListener("click", () => {
        opponent = null;

        const overlay = document.getElementById("gameEndingOverlay");
        overlay.style.display = "none";

        const resetHTML = document.querySelector(".grid-containers");

        resetHTML.innerHTML = "";

        player1.resetShipsArray();
        player2.resetShipsArray();

        initialiseGame();
    });

    const refreshGame = document.querySelector(".refresh-btn");
    refreshGame.addEventListener("click", () => {
        player1WinningCounter = player1.winningCounter;
        player2WinningCounter = player2.winningCounter;

        const overlay = document.getElementById("gameEndingOverlay");
        overlay.style.display = "none";

        const resetHTML = document.querySelector(".grid-containers");

        resetHTML.innerHTML = "";

        player1.resetShipsArray();
        player2.resetShipsArray();
         
        initialiseGame();
    });
}

initialiseGame();
