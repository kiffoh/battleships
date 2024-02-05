import { goesFirst } from "./goesFirst";
import { toggleOverlay, switchTurn } from "./overlay";

function gameLogic(player, computer) {
    
    console.log(player.allShipsSunk);
    console.log(computer.allShipsSunk);

    while (!player.allShipsSunk && !computer.allShipsSunk) {
        console.log("FALSE");
        player.allShipsSunk = true;
        computer.allShipsSunk = true;
    }
    console.log("TRUE");
};



export {gameLogic}