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



export { goesFirst, removeFirstPlayerText, playerOrComputer }