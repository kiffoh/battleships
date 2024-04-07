let board = [];

class Ship {
    constructor(length, hits=0, sunk=false) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }
}

function positionShips(coordinates) {
    if (coordinates === null) {
        console.log("Need to provide coordinates");
        return;
    }
    let newShip;

    const [x1, x2, y1, y2] = coordinates;
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
}

function nearbyShipSquaresHit(x, y) {
    const surroundingCoordinates = findSurroundingCoordinates(x, y);

    // Iterate through array to determine if needs to be updated;
    for (let coordinates of surroundingCoordinates) {
        const xCoord = coordinates[0];
        const yCoord = coordinates[1];

        if (board[yCoord][xCoord] === null) {
            board[yCoord][xCoord] = "Nearby";
        }
    }
}

function findSurroundingCoordinates(x, y) {
    const surroundingCoordinates = [];
    for (let Y = y - 1; Y <= y + 1; Y++) {
        for (let X = x - 1; X <= x + 1; X++) {
            if (Math.min(X, Y) < 0 || Math.max(X, Y) > 9 || board[Y][X] != null) {
                continue;
            }
            surroundingCoordinates.push([X, Y]);
        }
    }
    return surroundingCoordinates;
}

async function randomise() {
    // Reinitialize board array for every randomise()
    board = Array.from({length: 10}, () => Array(10).fill(null));

    const directions = ["horizontal", "vertical"];
    const ships = [{length:4},{length:3},{length:3},{length:2},{length:2},{length:2},{length:1},{length:1},{length:1},{length:1}];
    const coordinates = [];

    for (let ship of ships) {
        let index = Math.round(Math.random());
        ship["direction"] = directions[index];

        let viable = false;
        let x1, x2, y1, y2;

        while (!viable) {
            if (ship["direction"] === "horizontal") {
                let yCoordinate = Math.round(Math.random() * 9);
                y1 = yCoordinate;
                y2 = yCoordinate;
                
                x1 = Math.round(Math.random() * 9);
                x2 = x1 + (ship["length"] - 1);
                if (x2 > 9) {
                    x2 = x1;
                    x1 = x2 - (ship["length"] - 1);
                }

                let conflict = false;
                // Check for viable coordinates
                for (let i = x1; i <= x2; i++) {
                    if (board[y1][i] != null) {
                        conflict = true;
                        break;
                    }
                }

                if (conflict) {
                    continue;
                }
            } else {
                let xCoordinate = Math.round(Math.random() * 9);
                x1 = xCoordinate;
                x2 = xCoordinate;

                y1 = Math.round(Math.random() * 9);
                y2 = y1 + (ship["length"] - 1);
                if (y2 > 9) {
                    y2 = y1;
                    y1 = y2 - (ship["length"] - 1);
                }

                // Check for viable coordinates
                let conflict = false;
                for (let i = y1; i <= y2; i++) {
                    if (board[i][x1] != null) {
                        conflict = true;
                        break;
                    }
                }

                if (conflict) {
                    continue;
                }
            }

            // Position ships and mark nearby squares to prevent illegal ship placement
            await positionShips([x1, x2, y1, y2]);

            if (ship["direction"] === "horizontal") {
                for (let i = x1; i <= x2; i++) {
                    await nearbyShipSquaresHit(i, y1);
                }
            } else {
                for (let i = y1; i <= y2; i++) {
                    await nearbyShipSquaresHit(x1, i);
                }
            }
            coordinates.push([x1, x2, y1, y2]);
            viable = true;
        }
    }
    return coordinates
}

export {randomise};

