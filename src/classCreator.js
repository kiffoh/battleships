class Ship {
    constructor(length, hits=0, sunk=false) {
        this.length = length;
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
            // Assuming each coordinate is fine bc it will come from the UI
            // Length 1
            if (x1 === x2 && y1 === y2) {
                // Fill board with Ship
                newShip = new Ship(1);
                board[y1][x1] = newShip;
            } // For a constant X
            else if (x1 === x2) {
                const yDiff = y2 - y1 + 1;
                newShip = new Ship(yDiff);
                // Fill board with Ship
                for (let i = 0; i < yDiff; i++) {
                    board[y1 + i][x1] = newShip;
                }
            } else if (y1 === y2) {
                const xDiff = x2 - x1 + 1;
                newShip = new Ship(xDiff);
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

    return {board, missed, positionShips, recieveAttack, allShipsSunk, ships};
}

// module.exports = {Ship, Gameboard};

const Player = () => {
    const gameboard = Gameboard();
    const name = "";
    const opponent = null;
    let potentialComputerGuesses = null;

    function buildHTML() {
        const gridContainers = document.querySelector(".grid-containers");
        const playerContainer = document.createElement("div");
        playerContainer.classList.add(`${this.name}-grid-container`);
        playerContainer.id = `${this.name}Container`;

        playerContainer.innerHTML = 
        `
        <h3>${this.name.toUpperCase()}</h3>
                <div class="${this.name}-grid game-board" id="${this.name}Grid">

                </div>
                <div class="grid-overlay" id="${this.name}GridOverlay"></div>
        `
        gridContainers.appendChild(playerContainer);
    }

    function buildGrid(reveal) {
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

    function registerGridDivEventListener() {
        const grid = document.getElementById(this.name + "Grid")
        const gridDivs = grid.querySelectorAll("*");

        gridDivs.forEach(gridDiv => {
            gridDiv.addEventListener("click", () => {
                clickToHTML.bind(this)(gridDiv);   
            });
        })
    };

    function clickToHTML(gridDiv) {
        if (gridDiv.textContent === "") {
            if (gridDiv.classList.contains("ship-present")) {
                gridDiv.textContent = "X";
                if (gridDiv.classList.contains("hidden")) {
                    gridDiv.classList.remove("hidden");
                    gridDiv.classList.add("reveal");
                }
            } else {
                gridDiv.textContent = "●";
                this.showOverlay(true);
                this.opponent.showOverlay(false);
                gridDiv.id = "hit";
                
                // Computer guess if player missses
                // Keeps going until it hits and X
                if (this.name === "computer") {
                    computerGuess.bind(this)();
                }
            }
            HTMLtoboard.bind(this)(gridDiv);
            
        }
    }

    function computerGuessToHTML(gridDiv) {
        if (gridDiv.textContent === "") {
            if (gridDiv.classList.contains("ship-present")) {
                gridDiv.textContent = "X";
                
                console.log("COMPUTER HIT")
                // This way the computer shall keep regoing until it hits a dot
                computerGuess.bind(this)();

            } else {
                gridDiv.textContent = "●";

                // Reverse as this is done in player class
                this.showOverlay(false);
                this.opponent.showOverlay(true);
                gridDiv.id = "hit";
                
            }
            computerHTMLtoboard.bind(this)(gridDiv);
        }
    }

    async function computerGuess() {
        try {
            if (potentialComputerGuesses === null) {
                generateComputerGuesses();
            }
            console.log(potentialComputerGuesses.length)
            let numberOfGuesses = potentialComputerGuesses.length + 1;
            let guess = await Math.floor(Math.random() * numberOfGuesses);
            let guessedDiv = await potentialComputerGuesses[guess];
            potentialComputerGuesses.splice(guess, 1);
            await new Promise(resolve => setTimeout(resolve, 100));
            if (guessedDiv === undefined) {
                console.log("UNDEFINED GUESS");
            }
            // Put beneath in an await?
            computerGuessToHTML.bind(this)(guessedDiv);
            // Toggle overlays
        } catch (error) {
            console.error("An error occurred in the computerGuess function:", error);
        }
    }
    

    
    function generateComputerGuesses() {
        potentialComputerGuesses = []
        const computerGrid = document.getElementById("playerGrid")
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
        const classListString = gridDiv.getAttribute("class");
        const numbers = "0123456789"
        for (let className of classListString.split(" ")) {
            if (numbers.includes(className[0])) {
                return [parseInt(className[0]), parseInt(className[1])];
            }
        }
    }

    function HTMLtoboard(gridDiv) {
        // Don't think board is properly switching with computer as the number of registered hits is wrong.
        // Maybe need to create a different class for computer vs player
        if (!gameboard) return;
    
        const [y, x] = classToInteger(gridDiv);             
        gameboard.recieveAttack([x, y]);
    
        if (gameboard.board[y][x] != null && gameboard.board[y][x].sunk) {
            console.log("PLAYER SANK A COMPUTER'S SHIP")
            // Algorithm to find all all parts of ship 
            const coordinates = findTouchingShips(gameboard.board, x, y, new Set());
            coordinates.forEach(coordinate => {
                let x = parseInt(coordinate[1]);
                let y = parseInt(coordinate[0]);
                let shipDiv = gridDivFromCoordinates.bind(this)(y, x);
                shipDiv.classList.add("sunk");
                nearbyShipSquaresHit.bind(this)(x, y);
            })        


            if (gameboard.allShipsSunk()) {
                // Using the div which stated the first player
                const winnerConfirmation = document.querySelector(".first-player")
                winnerConfirmation.textContent = `Congratulations ${this.name} wins!`
                triggerOverallOverlay();
            }
        }
    }

    function computerHTMLtoboard(gridDiv) {
        // Don't think board is properly switching with computer as the number of registered hits is wrong.
        // Maybe need to create a different class for computer vs player
        if (!gameboard) return;
    
        const [y, x] = classToInteger(gridDiv);            
        this.opponent.gameboard.recieveAttack([x, y]);
    
        if (this.opponent.gameboard.board[y][x] != null && this.opponent.gameboard.board[y][x].sunk) {
            console.log("COMPUTER SANK A PLAYER'S SHIP");
            // Algorithm to find all all parts of ship 
            const coordinates = findTouchingShips(this.opponent.gameboard.board, x, y, new Set());
            coordinates.forEach(coordinate => {
                let x = parseInt(coordinate[1]);
                let y = parseInt(coordinate[0]);
                let shipDiv = this.opponent.gridDivFromCoordinates(y, x);
                shipDiv.classList.add("sunk");
                this.opponent.nearbyShipSquaresHit(x, y, potentialComputerGuesses);
            })        


            if (this.opponent.gameboard.allShipsSunk()) {
                // Using the div which stated the first player
                const winnerConfirmation = document.querySelector(".first-player")
                winnerConfirmation.textContent = `Congratulations ${this.name} wins!`
                triggerOverallOverlay();
            }
        }
    }

    function nearbyShipSquaresHit(x, y, potentialComputerGuesses = null) {
        // This is displaying these on the wrong board with COMPUTER
        // As they are displaying on the wrong board the guesses aren't been taken out of the potentialComputerGuesses
        // Create array of surrounding coordinates
        const surroundingCoordinates = findSurroundingCoordinates(x, y);


        // Iterate through array to determine if needs to be updated;
        for (let coordinates of surroundingCoordinates) {
            let x = coordinates[0];
            let y = coordinates[1];

            if (gameboard.missed[y][x] === null) {
                console.log(potentialComputerGuesses)
                gameboard.recieveAttack([x, y])
                const missedDiv = gridDivFromCoordinates.bind(this)(y, x);
                missedDiv.textContent = "●";
                missedDiv.id = "revealedMiss";
                
                // Need to remove missedDiv from potentialComputerGuesses
                // MAY NEED TO CHANGE THIS AS PLAYER WILL CHANGE
                if (this.name === "player" && this.opponent.name === "computer") {
                    removeComputerGuess(missedDiv, potentialComputerGuesses);
                }
            }

        }
        if (potentialComputerGuesses != null) {
            console.log(potentialComputerGuesses.length);
        }
    }

    function findSurroundingCoordinates(x, y) {
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

        // Previously had "path.add([y, x])"
        //  This line attempts to add an array [y, x] to the Set. However, JavaScript considers two arrays to 
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

    function triggerOverallOverlay() {
        const overlay = document.getElementById("overallOverlay");
        overlay.style.display = "block";
    }

    return {buildGrid, showOverlay, registerGridDivEventListener, buildHTML, positionShips: gameboard.positionShips, allShipsSunk: gameboard.allShipsSunk, gameboard, gridDivFromCoordinates, nearbyShipSquaresHit, potentialComputerGuesses}
}
export {Ship, Gameboard, Player};