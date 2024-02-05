import "./styles.css"
import { Player } from "./classCreator";
import { gameLogic } from "./gameLogic";
import { goesFirst } from "./goesFirst";
import { toggleOverlay } from "./overlay";

const playerGrid = document.querySelector("#playerGrid");
const computerGrid = document.querySelector("#computerGrid");

// Creating the player classes
const player = Player();
const computer = Player();

// Populating the player classes
const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];
player.positionShips(startingCoordinates);
computer.positionShips(startingCoordinates);

player.buildGrid(playerGrid, true);
computer.buildGrid(computerGrid, false);

const startBtn = document.querySelector(".start-button");

startBtn.addEventListener("click", () => {
    // Determines who goes first
    let firstTurn = goesFirst();
    toggleOverlay(firstTurn, true);

    // gameLogic(player, computer);

    startBtn.disabled = true;
});
