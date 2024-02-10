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

export {goesFirst}