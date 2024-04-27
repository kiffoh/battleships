import { randomise } from "./randomise";

// Define an async function to use await
async function handleRandomiseButtonClick(button, player1, player2) {
    const coordinates = await randomise(); // Wait for randomise() to resolve
    if (button.classList.contains("player1")) {
        player1.resetGrid()
        player1.positionShips(coordinates);
        player1.buildHTMLGrid(true);
        player1.toggleShipsInvisible();
    } else {
        player2.resetGrid()
        player2.positionShips(coordinates);
        player2.buildHTMLGrid(true);
        player2.toggleShipsInvisible();
    }
}

function handleResetButtonClick(button, player1, player2) {
    if (button.classList.contains("player1")) {
        player1.resetGrid();
        player1.buildHTMLGrid(true);
        player1.resetShips();
    } else {
        player2.resetGrid();
        player2.buildHTMLGrid(true);
        player2.resetShips();
    }
}

async function handleConfirmBtnClick(player1, player2) {
    if (player2.name === "computer") {
        await singlePlayerConfirmBtn(player1, player2);
    } else {
        await multiPlayerConfirmBtn(player1, player2);
    }
}

function singlePlayerConfirmBtn(player1, player2) {
    const player1ConfirmBtn = document.querySelector(".player1.confirm-btn");
    let resolvePromise;

    const moveOnPromise = new Promise(resolve => {
        resolvePromise = resolve;
        player1ConfirmBtn.onclick = () => {
            // Calling allShipsPlaced checks if the game is ready to be progressed to next stage
            if (player1.allShipsPlaced()) {
                player1.removeButtons();
                player1.removeShips();
                changeOverlaysTo("partially-transparent", true)

                player2.removeRules();


                resolve();
            }
        }
    })
    
    return moveOnPromise;
}

function multiPlayerConfirmBtn(player1, player2) {
    // Change the overlay colour for ship placement
    changeOverlaysTo("blue");

    const player1ConfirmBtn = document.querySelector(".player1.confirm-btn");

    player1ConfirmBtn.onclick = () => {
        // Calling allShipsPlaced checks if the game is ready to be progressed to next stage
        if (player1.allShipsPlaced()) {
            player1.buildRules(true);
            player1.removeShips();

            player2.removeRules();
            player2.buildShips();
            player2.applyDraggableShips();

            player2.updateTurnText(`${player2.name.toUpperCase()} <span class="highlight-red">PLACE YOUR SHIPS</span>`);
        }
    }

    const player2ConfirmBtn = document.querySelector(".player2.confirm-btn");
    let resolvePromise; // Declare a variable to store the resolve function
    
    const moveOnPromise = new Promise(resolve => {
        // Assign the resolve function to the variable
        resolvePromise = resolve;
        
        player2ConfirmBtn.onclick = () => {
            // Calling allShipsPlaced checks if the game is ready to be progressed to next stage
            if (player2.allShipsPlaced()) {
                player1.removeRules();
                player1.removeButtons();
                player1.hideGridShips();

                player2.removeShips();
                player2.removeButtons();
                player2.hideGridShips();
                
                // Revert overlay colour back to original
                changeOverlaysTo("partially-transparent");
                
                // Resolve the promise when the player 2 confirmation button is clicked
                resolve();
            }
        }
    });
    
    // Return the promise
    return moveOnPromise;
}

function changeOverlaysTo(colour, computer=false) {
    let playerOverlays;
    if (computer) {
        playerOverlays = [document.querySelector(`#player1GridOverlay`), document.querySelector(`#computerGridOverlay`)];
    } else {
        playerOverlays = [document.querySelector(`#player1GridOverlay`), document.querySelector(`#player2GridOverlay`)];
    }
    if (colour === "blue") {
        playerOverlays.forEach(overlay => {
            overlay.style.backgroundColor = "rgb(73, 110, 235)";
        });
    } else if (colour === "partially-transparent") {
        playerOverlays.forEach(overlay => {
            overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        });
    }
}

function hideShipsContainer(hide, playerName) {
    const shipsContainer = document.querySelector(`.${playerName}-grid-container > .ships-container`);
    if (hide) {
        shipsContainer.style.display = "none";
    } else {
        shipsContainer.style.display = "flex";
    }
}

export { handleRandomiseButtonClick, handleResetButtonClick, handleConfirmBtnClick, hideShipsContainer, changeOverlaysTo }