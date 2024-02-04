import { goesFirst } from "./goesFirst";

function gameLogic() {
    let turn = goesFirst();
    console.log(turn);

    
}

export {gameLogic}