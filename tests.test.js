const {Ship} = require("./index");

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