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

    function buildGrid(grid, reveal) {
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

                registerGridDivEventListener(gridDiv, x, y);
            }
        }
    }

    function registerGridDivEventListener(gridDiv, x, y) {
        gridDiv.addEventListener("click", () => {
            if (gridDiv.textContent === "") {
                gridDiv.textContent = "X";
                if (gridDiv.classList.contains("hidden")) {
                    gridDiv.classList.remove("hidden");
                    gridDiv.classList.add("reveal");
                }
                HTMLtoboard(x, y);
            }
        });
    }

    function HTMLtoboard(x, y) {
        if (!gameboard) return;             
        gameboard.recieveAttack([x, y]);
        console.log(x,y);
        console.log(gameboard.missed) 
        console.log(gameboard.board)
    }

    return {buildGrid, positionShips: gameboard.positionShips, allShipsSunk: gameboard.allShipsSunk}
}
export {Ship, Gameboard, Player};