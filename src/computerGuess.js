function computerGuess(computerInstance, hit, prevGuess) {
    guessStatus = false;

    while (!guessStatus) {
        let yIndex = Math.floor(Math.random() * 10);
        let xIndex = Math.floor(Math.random() * 10);

        if (gameboard.board[yIndex][xIndex] === null && gameboard.missed[yIndex][xIndex] === null) {
            
        }
    }

}