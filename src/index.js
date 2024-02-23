import "./styles.css"
import { Player } from "./classCreator";
import { goesFirst, removeFirstPlayerText, playerOrComputer } from "./goesFirst";

async function initialiseGame() {
    let opponent = await playerOrComputer();
    console.log(opponent)
    // Creating the player classes
    const player1 = Player();
    player1.name = "player";
    const player2 = Player();
    player2.name = `computer`;
    console.log(opponent);
    player1.buildHTML();
    player2.buildHTML();
    
    player1.opponent = player2;
    player2.opponent = player1;

    /* Maybe create a computer class - Makes a separation in the logic and makes it less confusing
    const player = Computer();
    player.name = "player";
    const computer = Computer();
    computer.name = "computer";
    */

    // Populating the player classes
    const startingCoordinates = [[0,0,0,2], [7,7,0,0], [2,4,2,2], [6,7,2,2], [0,1,6,6], [3,3,5,6], [3,3,8,8], [5,5,5,8], [7,7,7,7], [9,9,7,7]];
    player1.positionShips(startingCoordinates);
    player2.positionShips(startingCoordinates);

    player1.buildGrid(true);
    player2.buildGrid(false);

    // Determines who goes first
    let turn = goesFirst([player1, player2]);
    turn.showOverlay(true);
    console.log(turn)

    // Starting the game
    // For turn with computer I only register the event listeners on the computer squares
    if (player2.name != "computer") {
        player1.registerGridDivEventListener();
    }
    player2.registerGridDivEventListener();

    if (turn.name === "computer") {
        player2.computerGuess();
    }

    removeFirstPlayerText(turn);
}

initialiseGame();
