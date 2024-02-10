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
        } else {
            missed[y][x] = "X";
        }
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
                // Remove the text for who goes first
                const firstPlayerText = document.querySelector(".first-player");
                if (firstPlayerText.textContent) {
                    firstPlayerText.textContent = "";
                }

                if (gridDiv.textContent === "") {
                    if (gridDiv.classList.contains("ship-present")) {
                        gridDiv.textContent = "X";
                        if (gridDiv.classList.contains("hidden")) {
                            gridDiv.classList.remove("hidden");
                            gridDiv.classList.add("reveal");
                        }
                    } else {
                        gridDiv.textContent = "●"
                    }
                    HTMLtoboard.bind(this)(gridDiv);
                    // Move beneath to own function as this is triggered separately
                    this.toggleOverlay(true);
                    this.opponent.toggleOverlay(false);
                }
            });
        })
    };

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
        if (!gameboard) return;
    
        const [y, x] = classToInteger(gridDiv);             
        gameboard.recieveAttack([x, y]);
    
        if (gameboard.board[y][x] != null && gameboard.board[y][x].sunk) {
            // Need to add a backtrack algorythm to find all the nodes - Can also use this to make the ship one?
            gridDiv.classList.add("sunk");
            if (gameboard.allShipsSunk()) {
                // Using the div which stated the first player
                const winnerConfirmation = document.querySelector(".first-player")
                winnerConfirmation.textContent = `Congratulations ${this.name} wins!`
                triggerOverallOverlay();
            }
        }
    }
    

    function toggleOverlay(showOverlay) {
        const overlay = document.getElementById(this.name + "GridOverlay");
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

    return {buildGrid, toggleOverlay, registerGridDivEventListener, positionShips: gameboard.positionShips, allShipsSunk: gameboard.allShipsSunk}
}
export {Ship, Gameboard, Player};