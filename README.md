# Battleships

## Introduction

Welcome to Battleships, a classic game implemented using Test Driven Development (TDD) principles. In this project, I built the famous Battleship game from scratch. You can play against the computer or locally against a friend.

As this project emphasises TDD, each functionality was implemented and tested independently to ensure the code’s reliability and maintainability.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Build for Production](#build-for-production)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact Information](#contact-information)

## Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node package manager, which is installed with Node.js
- **webpack**: Module bundler

To install webpack globally (optional):

```bash
npm install -g webpack webpack-cli

## Installation
Clone the repository:

git clone https://github.com/your-username/your-project.git

cd your-project
Install dependencies:
npm install

## Usage
To run the development server with live reloading, use:

npx webpack serve --open
This will open your project in the default web browser and reload it on changes.

## Build for Production
To build the project for production, use:

npx webpack --mode production
This will create an optimized and minified version of your project in the dist directory.

To configure the project, edit the webpack.config.js file.

## Acknowledgements
Special thanks to Odin Project for the education and information.

## Additional features

## Intelligent computer Guessing

The computer has been designed to guess locally on a successful hit.

## Win tracker

Play multiple games to see who is the true champion with the play again feature!

## GitHub Pages

The latest version of the Battleships game is deployed on GitHub Pages. You can play it [here](https://kiffoh.github.io/battleships/).

