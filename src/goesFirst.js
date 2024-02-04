function goesFirst() {
    const players = ["player", "computer"];
    let number = Math.random();
    let index = Math.round(number);
    let first = players[index];

    const firstDiv = document.createElement("h3");
    firstDiv.classList = "first-player";
    if (first === "player") {
        firstDiv.textContent = "PLAYER GOES FIRST";
    } else {
        firstDiv.textContent = "COMPUTER GOES FIRST";
    }
    document.body.appendChild(firstDiv);
    // For the syntax of toggleOverlay
    return first + "Grid";
}

export {goesFirst}