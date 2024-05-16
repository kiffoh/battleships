function updatePlayerSelectionDistanceVariable() {
    const playerSelectionDiv = document.querySelector(".player-selection-container");

    // Calculate the distance between containers
    const distance = playerSelectionDiv.offsetLeft + 200;

    // Apply the distance to CSS animation
    document.documentElement.style.setProperty('--player-selection-distance', `${distance}px`);
}

function updateMonikerSelectionDistanceVariable() {
    const player2MonikerDiv = document.querySelector(".player2-moniker-text");
    const computerMonikerDiv = document.querySelector(".player2-name-is-computer");

    // Check computed style for display property
    const computerMonikerDisplayStyle = window.getComputedStyle(computerMonikerDiv).getPropertyValue('display');

    console.log(player2MonikerDiv.offsetLeft, computerMonikerDiv.offsetLeft)


    const player2Moniker = (computerMonikerDisplayStyle === "none" ? player2MonikerDiv : computerMonikerDiv)

    // Calculate the distance between containers
    const distance = player2Moniker.offsetLeft + 200;

    // Apply the distance to CSS animation
    document.documentElement.style.setProperty('--moniker-selection-distance', `${distance}px`);
}

export {updatePlayerSelectionDistanceVariable, updateMonikerSelectionDistanceVariable}