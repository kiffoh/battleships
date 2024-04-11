# Battleships

## Introduction

Welcome to Battleships, a classic game implemented using Test Driven Development (TDD) principles. In this project, I built the famous Battleship game from scratch. You can play against the computer or locally against a friend.

This project emphasizes TDD, each functionality will be implemented and tested independently to ensure the code’s reliability and maintainability.

## Assignment

### Ship Class/Factory

Start by creating the Ship class/factory. Each ship object includes its length, the number of hits it has taken, and whether or not it has been sunk. Implement methods such as `hit()` to increase the number of hits and `isSunk()` to determine if the ship is sunk.

### Gameboard Class/Factory

Gameboards should be able to place ships at specific coordinates and receive attacks. Implement a method to determine if all ships have been sunk. Keep track of missed attacks to display them properly.

### Player

Players can take turns playing the game by attacking the enemy Gameboard. Implement a computer player capable of making random plays. Ensure the AI knows whether a move is legal.

### Main Game Loop and DOM Interaction

Create the main game loop and a module for DOM interaction. Set up a new game and populate Gameboards with coordinates. Implement methods to render gameboards and take user input for attacking. Display both players’ boards using information from the Gameboard class/factory.

### Game Completion

Create conditions to end the game once one player’s ships have all been sunk.

## GitHub Pages

The latest version of the Battleships game is deployed on GitHub Pages. You can play it [here](https://kiffoh.github.io/battleships/). The code pushed to GitHub Pages is from the `production-build` branch which is different from the rest, as the `dist` files are created using "webpack --mode production" rather than "webpack serve --open". The other branches contain unfinished features.
