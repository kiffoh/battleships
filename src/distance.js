function updateDistanceVariable() {
    const player1Container = document.querySelector(".grid-containers > :first-child");
    const player2Container = document.querySelector(".grid-containers > :last-child");

    // Calculate the distance between containers
    const distance = player1Container.offsetWidth + (player2Container.offsetLeft - player1Container.offsetLeft - player1Container.offsetWidth);

    // Apply the distance to CSS animation
    document.documentElement.style.setProperty('--distance', `${distance}px`);
}

export {updateDistanceVariable}