import { buildGrid } from "./buildGrid";
import "./styles.css"
import {Ship, Gameboard} from "./classCreator";
import { gameLogic } from "./gameLogic";

const playerGrid = document.querySelector("#playerGrid");
const computerGrid = document.querySelector("#computerGrid");



const player = Gameboard();
const computer = Gameboard();

const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];

player.positionShips(startingCoordinates);
computer.positionShips(startingCoordinates);

buildGrid(playerGrid, player.board);
buildGrid(computerGrid, computer.board);

const startBtn = document.querySelector(".start-button");

startBtn.addEventListener("click", () => {
    gameLogic();
    startBtn.disabled = true;
});
