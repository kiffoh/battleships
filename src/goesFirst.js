function goesFirst(players) {
    let number = Math.random();
    let index = Math.round(number);
    let first = players[index].name;

    const turnDiv = document.querySelector(".turn-text");
    turnDiv.textContent = `${first.toUpperCase()} GOES FIRST`;
    
    return players[index];
}

function removeFirstPlayerText(name) {
    const grid = document.getElementById(name + "Grid")
    const gridDivs = grid.querySelectorAll("*");
    gridDivs.forEach((gridDiv) => {
        gridDiv.addEventListener("click", () => {
            const turnText = document.querySelector(".turn-text");
            if (turnText.textContent) {
                turnText.textContent = "";
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
        <div class="game-rules-overlay" id="gameRulesOverlay">
            <h3 class="game-rules-title">GAME RULES</h3>
            <p>Try and work out where the enemy ships are and sink them first!</p>
            <p>Each player places their ships, of 1 to 4 squares in size, secretly on a their square grid.</p>
            <p>Player's take turns shooting at the opponents grid by clicking on a square to a response of "HIT", "MISS" or "SUNK".</p>
            <p>First player to sink all of their opponents ships wins! Good Luck!</p>
            <p>Player vs Player is local play which means the screen is shared.<p>
            <p>Local play requires the opponent to not look at the screen whilst the other player is positioning their ships!</p>
            <p>TIP: Watch the turn counter beneath the title if you get lost.</p>
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

function dullTitleText(dull) {
    const titleText = document.querySelector("h1")
    if (dull) {
        titleText.style.color = black;
    }
}

export { goesFirst, removeFirstPlayerText, playerOrComputer }