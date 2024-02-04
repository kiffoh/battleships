import { goesFirst } from "./goesFirst";

function gameLogic() {
    let firstTurn = goesFirst();
    toggleOverlay(firstTurn, true);
    /*
    // Sets the conditions of the while loop
    let playerShipsSunk = false;
    let computerShipsSunk = false;

    while (!playerShipsSunk && !computerShipsSunk) {
        let gridAttacked = document.querySelector(`${turn}Grid`);
        for (let square in gridAttacked) {
            square.addEventListener("click", () => {
                square.textContent = "X";
            })
        }
        turn = turn === "player" ? "computer" : "player";
    }
    */
};

function toggleOverlay(overlayID, showOverlay) {
    const overlay = document.getElementById(overlayID + "Overlay");
    if (showOverlay) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
}

function switchTurn(player) {
    if (player === "player") {
        toggleOverlay("computerGrid", false);
        toggleOverlay("playerGrid", true);
    } else {
        toggleOverlay("computerGrid", true);
        toggleOverlay("playerGrid", false);
    }
}

export {gameLogic}