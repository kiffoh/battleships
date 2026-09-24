# Battleships

## Introduction

Welcome to Battleships, a classic game implemented in vanilla JavaScript. In this project, I built the famous Battleship game from scratch. You can play against the computer or locally against a friend.

Core game logic, such as ship creation, positioning, hits and sinking, is covered by Jest unit tests in `tests.test.js`. UI and game-flow code is not currently unit tested.

## Additional features

**Intelligent computer Guessing**

The computer has been designed to guess locally on a successful hit, so do not give it too many chances!

**Win tracker**

Play multiple games to see who is the true champion with the play again feature!

## Table of Contents

- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Build for Production](#build-for-production)
- [Acknowledgements](#acknowledgements)
- [Deployment](#deployment)

## Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node package manager, which is installed with Node.js
- **webpack**: Module bundler

## Usage
First install dependencies with `npm install`. To run the development server with live reloading, use:

```bash
npm start
```

This will open the project in the default web browser and reload it on changes.

To run the test suite, use:

```bash
npm test
```

## Build for Production
To build the project for production, use:

```bash
npm run build
```

This will create an optimised and minified version of the project in the dist directory.

To configure the project, edit the webpack.config.js file.

## Acknowledgements
Special thanks to [Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-battleship)  for the education and information.

## Deployment

The latest version of the Battleships game is deployed on GitHub Pages. You can play it [here](https://kiffoh.github.io/battleships/).

