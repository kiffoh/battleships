function goesFirst(players) {
    let number = Math.random();
    let index = Math.round(number);
    let first = players[index].name;

    const firstDiv = document.createElement("h3");
    firstDiv.classList = "first-player";
    if (first === "player") {
        firstDiv.textContent = "PLAYER GOES FIRST";
    } else {
        firstDiv.textContent = "COMPUTER GOES FIRST";
    }
    document.body.appendChild(firstDiv);
    
    return players[index];
}

function removeFirstPlayerText(turn) {
    // Opponent variable as turn is not an instance of the player class
    // Therefore opponent needed as this will be the first grid clicked
    const opponent = turn = "player" ? "computer" : "player";
    const grid = document.getElementById(opponent + "Grid")
    const gridDivs = grid.querySelectorAll("*");
    gridDivs.forEach((gridDiv) => {
        gridDiv.addEventListener("click", () => {
            const firstPlayerText = document.querySelector(".first-player");
            if (firstPlayerText.textContent) {
                firstPlayerText.textContent = "";
            }
        })
    })
}

export { goesFirst, removeFirstPlayerText }