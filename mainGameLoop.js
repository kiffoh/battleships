const {Ship, Gameboard} = require("./index");
// Player
const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];
const player1 = Gameboard();
player1.positionShips(startingCoordinates);
// const player2Playing = document.querySelector(".player-2-playing");

module.exports = {player1};
/*
if (player2Playing === true) {
    const player2 = Gameboard().positionShips(startingCoordinates);  
} else {
    const computer = Gameboard().positionShips(startingCoordinates);
}
*/
