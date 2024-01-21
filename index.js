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
    const missed = [...board];
    const ships = [];

    function positionShips(coordinates) {
        console.log("LOG ME!!!")
        if (coordinates === null) {
            console.log("Need to provide coordinates");
            return;
        }

        for (position of coordinates) {
            let newShip;

            const [x1, x2, y1, y2] = position;
            // Assuming each coordinate is fine bc it will come from the UI

            // Length 1
            if (x1 === x2 && y1 === y2) {
                // Fill board with Ship
                newShip = new Ship(1);
                board[x1][y1] = newShip;
            } // For a constant X
            else if (x1 === x2) {
                const yDiff = y2 - y1 + 1;
                newShip = new Ship(yDiff);
                // Fill board with Ship
                for (let i = 0; i < yDiff; i++) {
                    board[x1][y1 + i] = newShip;
                }
            } else if (y1 === y2) {
                const xDiff = x2 - x1 + 1;
                newShip = new Ship(xDiff);
                // Fill board with Ship
                for (let i = 0; i < xDiff; i++) {
                    board[x1 + i][y1] = newShip;
                }
            } else {
                throw(Error);
            }
            ships.push(newShip);
        }
    }

    function recieveAttack([x,y]) {
        if (board[x][y] != null) {
            board[x][y].hit();
        } else {
            missed[x][y] = "X";
        }
    }

    function allShipsSunk() {
        return ships.every(ship => ship.sunk === true);
    }

    return {board, missed, positionShips, recieveAttack, allShipsSunk, ships};
}

// Player
const player1 = Gameboard();

if (player2Playing === true) {
    const player2 = Gameboard();  
} else {
    const computer = Gameboard();
}

/*
FOR THE GAME LOGIC
    let playerGuessX
    let playerGuessY

    if (!player2Name) {
        let computerGuessLegal = false;
        while (!computerGuessLegal) {
            computerGuessX = Math.random(0,9);
            computerGuessY = Math.random(0,9);
            if (player2.missed[computerGuessX][computerGuessY] != "X") {
                computerGuessLegal = true;
            };
        }
    } 

    return {player1Name, player2Name, turn, missed, computerGuessX, computerGuessY, player1GuessX, player1GuessY, player2GuessX, player2GuessY}
*/

module.exports = {Ship, Gameboard, Player};