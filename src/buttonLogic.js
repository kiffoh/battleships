import { randomise } from "./randomise";

// Define an async function to use await
async function handleRandomiseButtonClick(button, player1, player2) {
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

function handleResetButtonClick(button, player1, player2) {
    if (button.classList.contains("player1")) {
        player1.resetGrid();
        player1.buildGrid(true);
    } else {
        player2.resetGrid();
        player2.buildGrid(true);
    }
}

async function handleConfirmBtnClick(player1, player2) {
    if (player2.name === "computer") {
        await singlePlayerConfirmBtn(player1);
    } else {
        await multiPlayerConfirmBtn(player1, player2);
    }
}

function singlePlayerConfirmBtn(player1) {
    const player1ConfirmBtn = document.querySelector(".player1.confirm-btn");
    let resolvePromise;

    const moveOnPromise = new Promise(resolve => {
        resolvePromise = resolve;
        player1ConfirmBtn.onclick = () => {
            // Calling allShipsPlaced checks if the game is ready to be progressed to next stage
            if (player1.allShipsPlaced()) {
                player1.removeChooseCoordinatesDiv();
                player1.removeGridNumbersAndButtons();

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
            player1.showOverlay(true);
            player2.showOverlay(false);

            player2.updateTurnText(`${player2.name.toUpperCase()} PLACE YOUR SHIPS`);

            // Remove player1 input coordinates section & build player2's input coordinates section
            player1.removeChooseCoordinatesDiv();
            player1.removeGridNumbersAndButtons();

            player2.buildPlayerChoosesCoordinatesDiv();

            // Attach correct button logic to horizontal-or-vertical btn;
            const player2handleHorizontalOrVerticalBtn = document.querySelector(".horizontal-or-vertical-btn");
            player2handleHorizontalOrVerticalBtn.onclick = () => handleHorizontalOrVerticalClick(player2handleHorizontalOrVerticalBtn, player1);

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
                player1.showOverlay(false);

                // Remove input coordinates section
                player2.removeChooseCoordinatesDiv();
                player2.removeGridNumbersAndButtons();

                // Due to order of adding, the 3 big buttons under grid (Btns container) get added in the wrong place to get removed with above function
                player2.removeButtons();
        
                // Hide both player's ships as the game is local
                player1.hideShips();
                player2.hideShips();

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

function changeOverlaysTo(colour) {
    const playerOverlays = [document.querySelector(`#player1GridOverlay`), document.querySelector(`#player2GridOverlay`)];
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

function handleHorizontalOrVerticalClick(horizontalOrVerticalBtn, player) {
    const constantCoordinate = document.getElementById("constantCoordinate");
    const variableCoordinate1 = document.getElementById("variableCoordinate1");
    const variableCoordinate2 = document.getElementById("variableCoordinate2");
    const shipDirection = document.querySelector(".ship-direction");

    const constantCoordinateInput = constantCoordinate.querySelector("input");
    const variableCoordinate1Input = variableCoordinate1.querySelector("input");
    const variableCoordinate2Input = variableCoordinate2.querySelector("input");

    if (horizontalOrVerticalBtn.textContent === "HORIZONTAL") {
        horizontalOrVerticalBtn.textContent = "VERTICAL";
        constantCoordinate.textContent = `X`;
        constantCoordinate.appendChild(constantCoordinateInput);
        variableCoordinate1.textContent = `Y1`;
        variableCoordinate1.appendChild(variableCoordinate1Input);
        variableCoordinate2.textContent = `Y2`;
        variableCoordinate2.appendChild(variableCoordinate2Input);
        shipDirection.textContent = "HORIZONTAL SHIP";
    } else {
        horizontalOrVerticalBtn.textContent = "HORIZONTAL";
        constantCoordinate.textContent = `Y`;
        constantCoordinate.appendChild(constantCoordinateInput);
        variableCoordinate1.textContent = `X1`;
        variableCoordinate1.appendChild(variableCoordinate1Input);
        variableCoordinate2.textContent = `X2`;
        variableCoordinate2.appendChild(variableCoordinate2Input);
        shipDirection.textContent = "VERTICAL SHIP";
    }
}

export { handleRandomiseButtonClick, handleResetButtonClick, handleConfirmBtnClick, hideShipsContainer, handleHorizontalOrVerticalClick }