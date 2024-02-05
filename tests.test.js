const {Ship, Gameboard} = require("./src/classCreator");
const {player1} = require("./src/buildGrid");

// Ships class
test("Create a ship", () => {
    expect(new Ship(4)).toEqual({
        length: 4,
        hits: 0,
        sunk: false,
    })
})

test("Hit a ship twice", () => {
    expect(new Ship(4).hit().hit()).toEqual({
        length: 4,
        hits: 2,
        sunk: false,
    })
})

test("Sunk function work?", () => {
    expect(new Ship(1).hit().isSunk()).toEqual({
        length: 1,
        hits: 1,
        sunk: true,
    })
})

test("Sink a ship", () => {
    expect(new Ship(1).hit()).toEqual({
        length: 1,
        hits: 1,
        sunk: true,
    })
})

test("Position ship (Length = 1)", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[1, 1, 1, 1]])
    // Now, check the state of the board
    expect(gameboard.board).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, { length: 1, hits: 0, sunk: false }, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    );
});

test("Position ship (Length = 3 ; Y-AXIS)", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[0,0,0,2]])

    // Now, check the state of the board
    expect(gameboard.board).toEqual(
        [
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    );
});

test("Position ship (Length = 5 ; X-AXIS)", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[4,8,6,6]])
    // Now, check the state of the board
    expect(gameboard.board).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    );
});

test("Position multiple ships", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[1,1,1,1],[0,0,0,2],[4,8,6,6]])
    
    // Now, check the state of the board
    expect(gameboard.board).toEqual(
        [
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, { length: 1, hits: 0, sunk: false }, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    )
});


test("Check hit for a SINGLE ship", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[1,1,1,1],[0,0,0,2],[4,8,6,6]])
    gameboard.recieveAttack([1,1]);

    // Now, check the state of the board
    expect(gameboard.board).toEqual(
        [
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, { length: 1, hits: 1, sunk: true }, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, { length: 5, hits: 0, sunk: false }, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    )
});

test("Check hits for MULTIPLE ships", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[1,1,1,1],[0,0,0,2]])
    gameboard.recieveAttack([1,1]);
    gameboard.recieveAttack([0,0]);
    gameboard.recieveAttack([0,1]);
    gameboard.recieveAttack([0,2]);


    // Now, check the state of the board
    expect(gameboard.board).toEqual(
        [
            [{ length: 3, hits: 3, sunk: true }, null, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 3, sunk: true }, { length: 1, hits: 1, sunk: true }, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 3, sunk: true }, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    )
});

test("Check hits for allShipsSunk", () => {
    const gameboard = Gameboard(); // Create an instance of Gameboard
    // Call positionShips on the instance
    gameboard.positionShips([[1,1,1,1],[0,0,0,2]])
    gameboard.recieveAttack([1,1]);
    gameboard.recieveAttack([0,0]);
    gameboard.recieveAttack([0,1]);
    gameboard.recieveAttack([0,2]);

    // Now, check the state of the board
    expect(gameboard.allShipsSunk()).toBe(true);
});

test("Missed hits", () => {
    const gameboard = Gameboard();

    gameboard.recieveAttack([1,1]);

    expect(gameboard.missed).toEqual(
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, "X", null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    )
});

// MainGameLoop
test("Testing player1 creation", () => {
    expect(player1.board).toEqual(
        [
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, { length: 1, hits: 0, sunk: false }, null, null],
            [{ length: 3, hits: 0, sunk: false }, null, null, null, null, null, null, null, null, null],
            [{ length: 3, hits: 0, sunk: false }, null, { length: 3, hits: 0, sunk: false }, { length: 3, hits: 0, sunk: false }, { length: 3, hits: 0, sunk: false }, null, { length: 2, hits: 0, sunk: false }, { length: 2, hits: 0, sunk: false }, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, { length: 2, hits: 0, sunk: false }, null, { length: 4, hits: 0, sunk: false }, null, null, null, null],
            [{ length: 2, hits: 0, sunk: false }, { length: 2, hits: 0, sunk: false }, null, { length: 2, hits: 0, sunk: false }, null, { length: 4, hits: 0, sunk: false }, null, null, null, null],
            [null, null, null, null, null, { length: 4, hits: 0, sunk: false }, null, { length: 1, hits: 0, sunk: false }, null, { length: 1, hits: 0, sunk: false }],
            [null, null, null, { length: 1, hits: 0, sunk: false }, null, { length: 4, hits: 0, sunk: false }, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
        ]
    )
})
