function addEventListeners(grid) {
    let squares = grid.querySelectorAll("*");
    squares.forEach(square => {
        square.addEventListener("click", () => {
            square.textContent = "X";
        })
    })
};

export {addEventListeners}