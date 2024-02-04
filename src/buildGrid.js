import {Ship, Gameboard} from "./classCreator";
// Player
// const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];
// const player1 = Gameboard();
// player1.positionShips(startingCoordinates);

// const player1Btn = document.querySelector(".player-1-btn");
// const player1Name = player1Btn.textContent

function buildGrid(grid, gameboard) {
    for (let x = 0; x <= 9; x++) {
        for (let y = 0; y <= 9; y++) {
            const gridDiv = document.createElement("div");
            gridDiv.classList = `${grid.classList} number ${x}${y}`;

            if (gameboard[y][x] != null) {
                gridDiv.classList.add("ship-present");
            }
            /*
            else {
                gridDiv.textContent = "";
            }
            */
            grid.appendChild(gridDiv);

            // clickGridSquare(gridDiv, x, y);
        }
    }
}


/*
function clickGridSquare(gridDiv, x, y) {
    gridDiv.addEventListener("click", () => {
        if ("player" in gridDiv.classList) {
            
        }
    });
}
*/

export {buildGrid}
