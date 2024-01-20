class Ship {
    constructor(length, hits=0, sunk=false) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits++;
        this.isSunk();
        return this;
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
        }
        return this;
    }

}

module.exports = {Ship};