const player2Btn = document.querySelector(".player-2-btn");

let player2Playing
let player1Playing

// Checks for confirmation of player names
player1Btn.addEventListener("click", () => {
    player1Playing = true;
    player1Btn.disable
})

player2Btn.addEventListener("click", () => {
    player2Playing = true;
})

if (player1Playing && player2Playing) {
    // ENABLE viewing of the battleships
}

module.exports = {player1, player2};

/* Comment out computer code until I try this section
if (player2Playing === true) {
    const player2 = Gameboard();
    player2.positionShips(startingCoordinates);  
} else {
    const computer = Gameboard()
    computer.positionShips(startingCoordinates);
}
*/
