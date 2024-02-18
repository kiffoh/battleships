import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, removeFirstPlayerText } from "./goesFirst";

// Creating the player classes
const player = Player();
player.name = "player";
const computer = Player();
computer.name = "computer";

/* Maybe create a computer class - Makes a separation in the logic and makes it less confusing
const player = Computer();
player.name = "player";
const computer = Computer();
computer.name = "computer";
*/

// Populating the player classes
const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];
player.positionShips(startingCoordinates);
computer.positionShips(startingCoordinates);

player.buildGrid(true);
computer.buildGrid(false);

const startBtn = document.querySelector(".start-button");

startBtn.addEventListener("click", () => {
    player.opponent = computer;
    computer.opponent = player;

    // Determines who goes first
    let turn = goesFirst([player, computer]);
    turn.showOverlay(true);

    // Starting the game
    // For turn with computer I only register the event listeners on the computer squares
    // player.registerGridDivEventListener();
    computer.registerGridDivEventListener();

    removeFirstPlayerText(turn);

    startBtn.disabled = true;
});

