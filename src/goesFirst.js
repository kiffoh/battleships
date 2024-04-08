function goesFirst(players) {
    let number = Math.random();
    let index = Math.round(number);
    let first = players[index].name;

    const firstDiv = document.querySelector(".first-player");
    firstDiv.textContent = `${first.toUpperCase()} GOES FIRST`;
    
    return players[index];
}

function removeFirstPlayerText(name) {
    const grid = document.getElementById(name + "Grid")
    const gridDivs = grid.querySelectorAll("*");
    gridDivs.forEach((gridDiv) => {
        gridDiv.addEventListener("click", () => {
            const firstPlayerText = document.querySelector(".first-player");
            if (firstPlayerText.textContent) {
                firstPlayerText.textContent = "";
            }
        })
    })
}

function playerOrComputer() {
    // Turn on overall overlay
    const gridOverlay = document.getElementById("overallOverlay");
    gridOverlay.style.display = "block";

    // Create a new div element to hold the player-selection HTML content
    const centeredContainerDiv = document.createElement("div");
    centeredContainerDiv.classList.add("centered-container");

    // Add the inner HTML content for the player-selection div
    centeredContainerDiv.innerHTML = `
        <h1 class="welcome-title">WELCOME TO BATTLESHIPS:</h1>
        <div class="player-selection">
            <h3>PLAYER</h3>
            <h3>VS</h3>
            <div class="player-selection-container">
                <div class="player-2-btn-container">
                    <button class="player-2-btn">PLAYER</button>
                </div>
                <div class="computer-btn-container">
                    <button class="computer-btn">COMPUTER</button>
                </div>
            </div>
            <div class="player-selection-overlay"></div>            
        </div>
        `;

    // Append the player-selection div to the grid-overlay div
    gridOverlay.appendChild(centeredContainerDiv);

    const player2Btn = document.querySelector(".player-2-btn");
    const computerBtn = document.querySelector(".computer-btn");

    // Implement promise for first one to be resolved.
    const player2Promise = new Promise((resolve, reject) => {
        player2Btn.addEventListener("click", () => {
            console.log("PLAYER BUTTON PRESSED")
            gridOverlay.innerHTML = "";
            gridOverlay.style.display = "none";
            resolve("player");
        })
    })
    
    const computerPromise = new Promise((resolve, reject) => {
        computerBtn.addEventListener("click", () => {
            console.log("COMPUTER BUTTON PRESSED")
            gridOverlay.innerHTML = "";
            gridOverlay.style.display = "none";
            resolve("computer");
        })
    })
    
    return Promise.any([player2Promise, computerPromise])

};

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
            player1.removeShipsAndButtons();

            resolve();
        }
    })
    
    return moveOnPromise;
}

function multiPlayerConfirmBtn(player1, player2) {
    // Change the overlay colour for ship placement
    changeOverlaysTo("blue");
    hideShipsContainer(true, player2.name)

    const player1ConfirmBtn = document.querySelector(".player1.confirm-btn");

    player1ConfirmBtn.onclick = () => {
        player1.showOverlay(true);
        player2.showOverlay(false);

        hideShipsContainer(false, player2.name)
        hideShipsContainer(true, player1.name)
    }

    const player2ConfirmBtn = document.querySelector(".player2.confirm-btn");
    let resolvePromise; // Declare a variable to store the resolve function
    
    const moveOnPromise = new Promise(resolve => {
        // Assign the resolve function to the variable
        resolvePromise = resolve;
        
        player2ConfirmBtn.onclick = () => {
            player1.removeShipsAndButtons();
            player2.removeShipsAndButtons();
            player1.showOverlay(false);
    
            player1.hideShips();
            player2.hideShips();
            // Revert overlay colour back to original
            changeOverlaysTo("partially-transparent");
            
            // Resolve the promise when the player 2 confirmation button is clicked
            resolve();
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

export { goesFirst, removeFirstPlayerText, playerOrComputer, handleConfirmBtnClick }