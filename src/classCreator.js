class Ship {
    constructor(length, placed=false, hits=0, sunk=false) {
        this.length = length;
        this.placed = placed;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits++;
        this.isSunk();
        return this;
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
        }
        return this;
    }

}

const Gameboard = () => {
    const board = Array.from({length: 10}, () => Array(10).fill(null));
    const missed = Array.from({length: 10}, () => Array(10).fill(null));
    const ships = [];

    function positionShips(coordinates) {
        if (coordinates === null) {
            console.log("Need to provide coordinates");
            return;
        }
        let position
        for (position of coordinates) {
            let newShip;

            const [x1, x2, y1, y2] = position;

            // Length 1
            if (x1 === x2 && y1 === y2) {
                // Fill board with Ship
                newShip = new Ship(1, true);
                board[y1][x1] = newShip;
            } // For a vertical ship
            else if (x1 === x2) {
                const yDiff = y2 - y1 + 1;
                newShip = new Ship(yDiff, true);
                // Fill board with Ship
                for (let i = 0; i < yDiff; i++) {
                    board[y1 + i][x1] = newShip;
                }
            } // For a horizontal ship
            else if (y1 === y2) {
                const xDiff = x2 - x1 + 1;
                newShip = new Ship(xDiff, true);
                // Fill board with Ship
                for (let i = 0; i < xDiff; i++) {
                    board[y1][x1 + i] = newShip;
                }
            } else {
                throw(Error);
            }
            ships.push(newShip);
        }
    }

    function recieveAttack([x,y]) {
        if (board[y][x] != null) {
            board[y][x].hit();
        }
        missed[y][x] = "X";
    }

    function allShipsSunk() {
        return ships.every(ship => ship.sunk === true);
    }

    function obtainCurrentShips() {
        // adds every ship on board to currentShips
        const currentShips = [];
        for (let y = 0; y <= 9; y++) {
            for (let x = 0; x <= 9; x++) {
                if (board[y][x] != null && !currentShips.includes(board[y][x])) {
                    currentShips.push(board[y][x]);
                }
            }
        }
        return currentShips;
    }

    function allShipsPlaced() {
        // Compares every ship on board with required lengths
        const requiredShipsLength = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        const currentShips = obtainCurrentShips();

        for (const ship of currentShips) {
            const index = requiredShipsLength.indexOf(ship.length);
            if (index === -1) {
                return false;
            }
            requiredShipsLength.splice(index, 1);
        };

        return (requiredShipsLength.length === 0 && currentShips.every(ship => ship.placed === true));
    }

    return {board, missed, positionShips, recieveAttack, allShipsSunk, ships, allShipsPlaced, obtainCurrentShips};
}

// module.exports = {Ship, Gameboard};

const Player = () => {
    const gameboard = Gameboard();
    const name = "";
    const opponent = null;
    let potentialComputerGuesses = null;
    let prev = false;
    let draggableShips;

    function buildHTML() {
        // Function to build the top level HTML stucture for player's grids 
        const gridContainers = document.querySelector(".grid-containers");
        const playerContainer = document.createElement("div");
        playerContainer.classList.add(`${this.name}-grid-container`);
        playerContainer.id = `${this.name}Container`;

        playerContainer.innerHTML = 
        `
        <h3 class="${this.name} title">${this.name.toUpperCase()}</h3>
                <div class="${this.name}-grid game-board" id="${this.name}Grid">

                </div>
                <div class="grid-overlay" id="${this.name}GridOverlay"></div>
        `
        gridContainers.appendChild(playerContainer);
    }

    function buildShips() {
        // Function to build HTML ships for player
        const shipsContainer = document.createElement('div');
        shipsContainer.classList.add('ships-container');

        shipsContainer.innerHTML = `
        <div class="ship-container-1">
            <div class="draggable-ship" draggable="true" data-size="4"></div>
            <div class="draggable-ship" draggable="true" data-size="3"></div>
            <div class="draggable-ship" draggable="true" data-size="3"></div>
        </div>
        <div class="ship-container-2">
            <div class="draggable-ship" draggable="true" data-size="2"></div>
            <div class="draggable-ship" draggable="true" data-size="2"></div>
            <div class="draggable-ship" draggable="true" data-size="2"></div>
        </div>
        <div class="ship-container-3">
            <div class="draggable-ship" draggable="true" data-size="1"></div>
            <div class="draggable-ship" draggable="true" data-size="1"></div>
            <div class="draggable-ship" draggable="true" data-size="1"></div>
            <div class="draggable-ship" draggable="true" data-size="1"></div>
        </div>
        `;

        // Beneath is for correct UX placement of the confirm button
        const playerGridContainer = document.querySelector(`.${this.name}-grid-container`)
        playerGridContainer.insertAdjacentElement("afterbegin", shipsContainer);

        // Stores the draggableShips div in array for updateClassLisstOnShipSunk
        draggableShips = [...playerGridContainer.querySelectorAll(".draggable-ship")];
    }

    
    function updateClassListOnShipSunk(ship) {
        // Function to update the classList of the HTML element when the associated ship is sunk
        console.log(ship);
        console.log(draggableShips);
        for (let i =0; i < draggableShips.length; i++) {
            const dataSize = parseInt(draggableShips[i].dataset.size);
            if (ship.length === dataSize) {
                draggableShips[i].classList.add("sunk");
                draggableShips.splice(i, 1);
                break;
            }
        }
    }

    function buildButtonContainer() {
        // Buttons for SHIP POSITIONING STAGE
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");

        const randomiseBtn = document.createElement("button");
        randomiseBtn.classList.add(`${this.name}`, `randomise-btn`);
        randomiseBtn.textContent = "RANDOMISE";

        const confirmBtn = document.createElement("button");
        confirmBtn.classList.add(`${this.name}`, `confirm-btn`);
        confirmBtn.textContent = "CONFIRM";

        /* NOT A NEED FOR RESET YET
        const resetBtn = document.createElement("button");
        resetBtn.classList.add(`${this.name}`, `reset-btn`);
        resetBtn.textContent = "RESET";
        */

        btnContainer.appendChild(randomiseBtn);
        // btnContainer.appendChild(resetBtn);
        btnContainer.appendChild(confirmBtn);

        const gameboard = document.querySelector(`.${this.name}-grid.game-board`)
        gameboard.insertAdjacentElement("afterend", btnContainer);
    }

    function removeShips() {
        const gridContainer = document.querySelector(`.${this.name}-grid-container`);
        const shipsContainer = gridContainer.querySelector(`.ships-container`);

        if (shipsContainer) {
            gridContainer.removeChild(shipsContainer);
        }
    }

    function removeButtons() {
        const gridContainer = document.querySelector(`.${this.name}-grid-container`);
        const btnContainer = gridContainer.querySelector(`.btn-container`);

        gridContainer.removeChild(btnContainer);
    }

    function hideShips() {
        // Used for local play to remove ships from screen
        const gameboard = document.querySelectorAll(`.${this.name}-grid.game-board.number`);
        gameboard.forEach(element => {
            if (element.classList.contains("reveal")) {
                element.classList.remove("reveal");
                element.classList.add("hidden");
            }
        })
    }

    function buildRules(pvp) {
        // Display's rules whilst ships are being placed
        const playerOverlay = document.getElementById(`${this.name}GridOverlay`);

        this.showOverlay(true);

        playerOverlay.innerHTML = `
            <h3 class="rules-title">RULES</h3>
            <p>Try and deduce where the enemy ships are and sink them first!</p>
            <br></br>
            <p>Each player deploys their ships (of lengths varying from 1 to 4 squares) secretly on a their square grid.</p>
            <p>Every turn each player shoots at the other's grid by clicking on a location to a response of "HIT", "MISS" or "SUNK".</p>
            <p>(Watch the turn counter beneath the title if you get lost)</p>
            <p>First player to sink all of the opponents ships wins! Good Luck!</p>
        `;

        if (pvp) {
            playerOverlay.innerHTML = `
            <h3 class="rules-title">RULES</h3>
            <p>Try and deduce where the enemy ships are and sink them first!</p>
            <br></br>
            <p>Each player deploys their ships (of lengths varying from 1 to 4 squares) secretly on a their square grid.</p>
            <p>Every turn each player shoots at the other's grid by clicking on a location to a response of "HIT", "MISS" or "SUNK".</p>
            <p>(Watch the turn counter beneath the title if you get lost)</p>
            <p>First player to sink all of the opponents ships wins! Good Luck!</p>
            <br></br>
            <p>Local play requires the opponent to not look at the screen whilst the player is positioning their ships!</p>
        `;
        }
    }

    function removeRules() {
        const playerOverlay = document.getElementById(`${this.name}GridOverlay`);

        this.showOverlay(false);

        playerOverlay.innerHTML = ``
    }

    function buildHTMLGrid(reveal) {
        // Build player's HTML grid based off player's board array
        const grid = document.getElementById(this.name + "Grid");
        for (let y = 0; y <= 9; y++) {
            for (let x = 0; x <= 9; x++) {
                const gridDiv = document.createElement("div");
                gridDiv.classList = `${grid.classList} number ${y}${x}`;
    
                if (gameboard.board[y][x] != null) {
                    gridDiv.classList.add("ship-present");
                    if (reveal) {
                        gridDiv.classList.add("reveal");
                    } else {
                        gridDiv.classList.add("hidden");
                    }
                }
                
                grid.appendChild(gridDiv);

            }
        }
    }

    function resetGrid() {
        // Reset board array
        for (let y = 0; y <= 9; y++) {
            for (let x = 0; x <= 9; x++) {
                gameboard.board[y][x] = null;
            }
        }
        resetHTMLGrid.bind(this)();
    }

    function resetHTMLGrid() {
        const HTMLGrid = document.querySelector(`.${this.name}-grid.game-board`);
        HTMLGrid.innerHTML = "";
    }

    function registerGridDivEventListener() {
        // Allows for player interaction with grid
        const grid = document.getElementById(this.name + "Grid")
        const gridDivs = grid.querySelectorAll("*");

        gridDivs.forEach(gridDiv => {
            gridDiv.addEventListener("click", () => {
                clickToHTML.bind(this)(gridDiv);   
            });
        })
    };

    function clickToHTML(gridDiv) {
        // Convert's player interaction with grid into a guess by changing HTML
        if (gridDiv.textContent === "") {
            if (gridDiv.classList.contains("ship-present")) {
                gridDiv.textContent = "X";
                updateTurnText(`${this.opponent.name.toUpperCase()} HIT`)

                if (gridDiv.classList.contains("hidden")) {
                    gridDiv.classList.remove("hidden");
                    gridDiv.classList.add("reveal");
                }
            } else {
                gridDiv.textContent = "●";
                updateTurnText(`${this.opponent.name.toUpperCase()} MISSED`)

                this.showOverlay(true);
                this.opponent.showOverlay(false);
                gridDiv.id = "hit";
                
                // Computer guessIndex if player missses
                // Keeps going until it hits and X
                if (this.name === "computer") {
                    computerGuess.bind(this)();
                }
            }
            HTMLtoboard.bind(this)(gridDiv);
        }
    }

    function computerGuessToHTML(gridDiv) {
        // Requires own function due to logic of how computer guesses
        if (gridDiv.textContent === "") {
            if (gridDiv.classList.contains("ship-present")) {
                gridDiv.textContent = "X";
                updateTurnText("COMPUTER HIT")
                console.log("COMPUTER HIT")
                
                computerGuess.bind(this)();

            } else {
                gridDiv.textContent = "●";
                updateTurnText("COMPUTER MISSED")

                // In Computer vs Player the computer board needs to be accessed through the player class
                // Therefore reverse to logic in player class
                this.showOverlay(false);
                this.opponent.showOverlay(true);
                gridDiv.id = "hit";
            }
        }
        computerHTMLtoboard.bind(this)(gridDiv);
    }

    async function computerGuess() {
        let guessIndex = await Math.floor(Math.random() * potentialComputerGuesses.length);
        while (guessIndex >= potentialComputerGuesses.length) {
            guessIndex = await Math.floor(Math.random() * potentialComputerGuesses.length);
        }
        let guessedDiv = await potentialComputerGuesses[guessIndex];
        potentialComputerGuesses.splice(guessIndex, 1);

        // Randomises computer's guess time
        let minTime = await Math.max(150, Math.random() * 500) 
        await new Promise(resolve => setTimeout(resolve, minTime));
        
        computerGuessToHTML.bind(this)(guessedDiv);
    }
    
    
    function generateComputerGuesses() {
        potentialComputerGuesses = []
        const computerGrid = document.getElementById(`${this.opponent.name}Grid`)
        const computerGridDivs = computerGrid.querySelectorAll("*");
        computerGridDivs.forEach(div => {
            potentialComputerGuesses.push(div);
        })
    }
        
    function removeComputerGuess(divToRemove, potentialComputerGuesses) {
        for (let i = 0; i < potentialComputerGuesses.length; i++) {
            if (potentialComputerGuesses[i] === divToRemove) {
                potentialComputerGuesses.splice(i, 1);
                break;
            } 
        }
    }   

    function classToInteger(gridDiv) {
        // Used for interaction between DOM and board array
        const classListString = gridDiv.getAttribute("class");
        const numbers = "0123456789"
        for (let className of classListString.split(" ")) {
            if (numbers.includes(className[0])) {
                return [parseInt(className[0]), parseInt(className[1])];
            }
        }
    }

    function HTMLtoboard(gridDiv) {
        // Convert's player interaction with grid into a guess by changing board array
        if (!gameboard) return;
    
        const [y, x] = classToInteger(gridDiv);             
        gameboard.recieveAttack([x, y]);
    
        if (gameboard.board[y][x] != null && gameboard.board[y][x].sunk) {
            updateTurnText(`${this.opponent.name.toUpperCase()} SANK ONE OF ${this.name.toUpperCase()}'S SHIP`)

            // Algorithm to find all all parts of a sunken ship 
            // Allows for "sunk" to be added to each part of the sunken ship, not just the hit which sank the ship  
            const coordinates = findTouchingShips(gameboard.board, x, y, new Set());
            coordinates.forEach(coordinate => {
                let x = parseInt(coordinate[1]);
                let y = parseInt(coordinate[0]);
                let shipDiv = gridDivFromCoordinates.bind(this)(y, x);
                shipDiv.classList.add("sunk");
                nearbyShipSquaresHit.bind(this)(x, y);
            })        

            updateClassListOnShipSunk.bind(this)(gameboard.board[y][x]);

            // Game over check?
            if (gameboard.allShipsSunk()) {
                triggerOverallOverlay.bind(this)();
            }
        }
    }

    function computerHTMLtoboard(gridDiv) {
        // Convert's player interaction with grid into a guess by changing board array
        if (!gameboard) return;
    
        const [y, x] = classToInteger(gridDiv);            
        this.opponent.gameboard.recieveAttack([x, y]);
        console.log(potentialComputerGuesses.length);
        if (this.opponent.gameboard.board[y][x] != null && this.opponent.gameboard.board[y][x].sunk) {
            updateTurnText("COMPUTER SANK A PLAYER'S SHIP")

            // Algorithm to find all all parts of a sunken ship 
            // Allows for "sunk" to be added to each part of the sunken ship, not just the hit which sank the ship 
            const coordinates = findTouchingShips(this.opponent.gameboard.board, x, y, new Set());
            coordinates.forEach(coordinate => {
                let x = parseInt(coordinate[1]);
                let y = parseInt(coordinate[0]);
                let shipDiv = this.opponent.gridDivFromCoordinates(y, x);
                shipDiv.classList.add("sunk");
                this.opponent.nearbyShipSquaresHit(x, y, potentialComputerGuesses);
            })        

            this.opponent.updateClassListOnShipSunk(this.opponent.gameboard.board[y][x]);

            // Game over check?
            if (this.opponent.gameboard.allShipsSunk()) {
                triggerOverallOverlay.bind(this)();
            }
        }
    }

    function nearbyShipSquaresHit(x, y, potentialComputerGuesses = null) {
        // Updates squares which neighbour a sunk ship to be guesses
        const surroundingCoordinates = findSurroundingCoordinates(x, y);

        // Iterate through array to determine if needs to be updated;
        for (let coordinates of surroundingCoordinates) {
            let x = coordinates[0];
            let y = coordinates[1];

            if (gameboard.missed[y][x] === null) {
                gameboard.recieveAttack([x, y])
                const missedDiv = gridDivFromCoordinates.bind(this)(y, x);
                missedDiv.textContent = "●";
                missedDiv.id = "revealedMiss";

                if (this.opponent.name === "computer") {
                    removeComputerGuess(missedDiv, potentialComputerGuesses);
                }
            }

        }
    }

    function findSurroundingCoordinates(x, y) {
        // Find all coordinates surrounding input coordinates (Including diagonal)
        const surroundingCoordinates = [];
        for (let Y = y - 1; Y <= y + 1; Y++) {
            for (let X = x - 1; X <= x + 1; X++) {
                if (Math.min(X, Y) < 0 || Math.max(X, Y) > 9 || gameboard.board[Y][X] != null) {
                    continue;
                }
                surroundingCoordinates.push([X, Y]);
            }
        }
        return surroundingCoordinates;
    }

    function gridDivFromCoordinates(y, x) {
        const grid = document.getElementById(this.name + "Grid");
        const gridDivs = grid.querySelectorAll("*");
        let foundGridDiv = null;

        gridDivs.forEach(gridDiv => {
            if (gridDiv.classList.contains(`${y}${x}`)) {
                foundGridDiv = gridDiv;                
            }
        })
        return foundGridDiv;
    }

    function findTouchingShips(gameboard, x, y, path) {
        if (path.has(`${y}${x}`) || Math.max(x, y) > 9 || Math.min(x, y) < 0 || gameboard[y][x] === null) return;

        // CODE FOR MY OWN UNDERSTANDING
        // Previously had "path.add([y, x])"
        // This line attempts to add an array [y, x] to the Set. However, JavaScript considers two arrays to 
        // be equal only if they reference the same array object, not if their contents are the same. Since you 
        // are creating new array objects each time you use [y, x], they are not considered equal, and thus each 
        // attempt to add a new [y, x] array to the Set will succeed, resulting in duplicates.

        // Beneath allows for proper checks
        path.add(`${y}${x}`);

        findTouchingShips(gameboard, x + 1, y, path) 
        findTouchingShips(gameboard, x - 1, y, path)
        findTouchingShips(gameboard, x, y + 1, path)
        findTouchingShips(gameboard, x, y - 1, path)

        return path
    }
    

    function showOverlay(showOverlay, name=this.name) {
        let overlay = document.getElementById(name + "GridOverlay");
        if (showOverlay) {
            overlay.style.display = "block";
        } else {
            overlay.style.display = "none";
        }
    }

    function updateTurnText(text) {
        const turnDiv = document.querySelector(".turn-text");
        turnDiv.textContent = text;
    }

    function triggerOverallOverlay() {
        const overlay = document.getElementById("gameEndingOverlay");
        overlay.style.display = "flex";

        // Create a new div element to hold the player-selection HTML content
        const congratulationsTitle = document.querySelector(".winner-confirmation");

        let winner;

        if (this.gameboard.allShipsSunk()) {
            winner = this.opponent.name;
        } else {
            winner = this.name;
        }

        // Add the inner HTML content for the player-selection div
        congratulationsTitle.textContent = `Congratulations ${winner.toUpperCase()} wins!        `

        const resetBtn = document.querySelector(".reset-btn")

        resetBtn.addEventListener("click", () => {
            overlay.style.display = "none";
            const resetHTML = document.querySelector(".grid-containers");

            resetHTML.innerHTML = "";
        })
    }  

    return {buildHTMLGrid, showOverlay, registerGridDivEventListener, buildHTML, computerGuess, opponent, generateComputerGuesses, positionShips: gameboard.positionShips, allShipsSunk: gameboard.allShipsSunk, allShipsPlaced: gameboard.allShipsPlaced, gameboard, gridDivFromCoordinates, nearbyShipSquaresHit, potentialComputerGuesses, buildShips, buildButtonContainer, resetGrid, removeShips, removeButtons, hideShips, updateTurnText, updateClassListOnShipSunk, buildRules, removeRules}
}
export {Ship, Gameboard, Player};