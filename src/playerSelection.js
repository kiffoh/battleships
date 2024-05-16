import { updatePlayerSelectionDistanceVariable, updateMonikerSelectionDistanceVariable } from "./distance";

function goesFirst(players) {
    let number = Math.random();
    let index = Math.round(number);
    let first = players[index].moniker;

    const turnDiv = document.querySelector(".turn-text");
    turnDiv.textContent = `${first.toUpperCase()} GOES FIRST`;
    
    return players[index];
}

function removeFirstPlayerText(name) {
    const grid = document.getElementById(name + "Grid")
    const gridDivs = grid.querySelectorAll("*");
    gridDivs.forEach((gridDiv) => {
        gridDiv.addEventListener("click", () => {
            const turnText = document.querySelector(".turn-text");
            if (turnText.textContent) {
                turnText.textContent = "";
            }
        })
    })
}

function playerOrComputer() {
    // Turn on overall overlay
    const gridOverlay = document.getElementById("overallOverlay");
    gridOverlay.style.display = "block";

    // Create a new div element to hold the player-selection HTML content
    const centeredContainerDiv = document.createElement("div");
    centeredContainerDiv.classList.add("centered-container");

    // Add the inner HTML content for the player-selection div
    centeredContainerDiv.innerHTML = `
        <h1 class="welcome-title">WELCOME TO BATTLESHIPS:</h1>
        <div class="player-selection">
            <h3>PLAYER</h3>
            <h3>VS</h3>
            <div class="player-selection-container">
                <div class="player-2-btn-container">
                    <button class="player-2-btn">PLAYER</button>
                </div>
                <div class="computer-btn-container">
                    <button class="computer-btn">COMPUTER</button>
                </div>
            </div>
            <div class="confirm-player-or-computer-btn-container">
                <button class="confirm-player-or-computer-btn">CONFIRM</button>
            </div>
            <div class="player-selection-overlay"></div>            
        </div>
        <div class="moniker-selection">
            <div class="player1-moniker-container">
                <input type="text" class="player1-moniker-text" placeholder="PLAYER1" value="PLAYER1" size="10" maxlength="15">
            </div>
            <h3>VS</h3>
            <div class="player2-moniker-container">
                <input type="text" class="player2-moniker-text" placeholder="PLAYER2" value="PLAYER2" size="10" maxlength="15">
            </div>
            <h3 class="player2-name-is-computer">COMPUTER</h3>
            <div class="moniker-btns-container">
                <div class="confirm-moniker-btn-container">
                    <button class="confirm-moniker-btn">CONFIRM</button>
                </div>
                <div class="back-btn-container">
                    <button class="back-btn">BACK</button>
                </div>
            </div>
        </div>
        <div class="game-rules-overlay" id="gameRulesOverlay">
            <h3 class="game-rules-title">GAME RULES</h3>
            <p>Try and work out where the enemy ships are and sink them first!</p>
            <p>Each player places their ships, of 1 to 4 squares in size, secretly on a their square grid.</p>
            <p>Player's take turns shooting at the opponents grid by clicking on a square to a response of "HIT", "MISS" or "SUNK".</p>
            <p>First player to sink all of their opponents ships wins! Good Luck!</p>
            <p>Player vs Player is local play which means the screen is shared.<p>
            <p>Local play requires the opponent to not look at the screen whilst the other player is positioning their ships!</p>
            <p>TIP: Watch the game tracker beneath the title if you get lost.</p>
        </div>
        `;

    // Append the player-selection div to the grid-overlay div
    gridOverlay.appendChild(centeredContainerDiv);

    // Code to appropriately position the confirm buttons
    updatePlayerSelectionDistanceVariable();


    window.addEventListener("resize", updatePlayerSelectionDistanceVariable);
    window.addEventListener("resize", updateMonikerSelectionDistanceVariable);

    // Variable to hold the chosen player
    let chosenPlayer2 = null;

    // Body is used to prevent the scroll bar whilst the animation takes place
    // Scroll bar causes unwanted movement of other divs
    const body = document.querySelector("body");

    // Elements obtained to display correct div depending on player selection stage
    const playerSelectionDiv = document.querySelector(".player-selection");
    const monikerSelectionDiv = document.querySelector(".moniker-selection");

    // Player2 selection buttons
    const player2Btn = document.querySelector(".player-2-btn");
    const computerBtn = document.querySelector(".computer-btn");

    // Obtain moniker text input elements
    const player1MonikerText = document.querySelector(".player1-moniker-text");
    const player2MonikerText = document.querySelector(".player2-moniker-text");
    const player2NameIsComputer = document.querySelector(".player2-name-is-computer");

    // Variables to hold moniker text values
    let player1MonikerValue = "PLAYER1";
    let player2MonikerValue = "PLAYER2";
    
    // Functions to update and display the selected player
    player2Btn.addEventListener("click", () => {
        chosenPlayer2 = "player";
        player2Btn.classList.add("highlighted", "green");
        computerBtn.classList.remove("highlighted", "green");
    })

    computerBtn.addEventListener("click", () => {
        chosenPlayer2 = "computer";
        computerBtn.classList.add("highlighted", "green");
        player2Btn.classList.remove("highlighted", "green");
    })

    // Progresses player to input a name (moniker)
    const chosenPlayerConfirmBtn = document.querySelector(".confirm-player-or-computer-btn");
    chosenPlayerConfirmBtn.addEventListener("click", () => {
        if (chosenPlayer2) {
            if (chosenPlayer2 === "computer") {
                // Make internal equal computer
                player2MonikerText.style.display = "none";
                player2MonikerValue = "COMPUTER";
                player2NameIsComputer.style.display = "block";
            } else {
                player2NameIsComputer.style.display = "none";
                player2MonikerText.style.display = "block";
                player2MonikerValue = player2MonikerText.value;
            }

            // Trigger animation to the next stage (moniker-selection)
            playerSelectionDiv.classList.add("player-selection-leave");
            body.style.overflow = "hidden";

            playerSelectionDiv.addEventListener("animationend", () => {
                playerSelectionDiv.style.display = "none";
                playerSelectionDiv.classList.remove("player-selection-leave");

                monikerSelectionDiv.style.display = "flex";

                // Called here as the monikerSelectionDiv has a leftOffset
                updateMonikerSelectionDistanceVariable();
                monikerSelectionDiv.classList.add("moniker-selection-enter");
            }, { once: true });

            monikerSelectionDiv.addEventListener("animationend", () => {
                monikerSelectionDiv.classList.remove("moniker-selection-enter");
                body.style.overflow = "auto";
            }, { once: true });
        } else {
            chosenPlayerConfirmBtn.classList.add("denied");

            chosenPlayerConfirmBtn.addEventListener("animationend", () => {
                chosenPlayerConfirmBtn.classList.remove("denied");
            })
        }
    })

    // Event listners to update the stored moniker value when the input changes
    player1MonikerText.addEventListener("input", (event) => {
        player1MonikerValue = event.target.value;
    })

    player2MonikerText.addEventListener("input", (event) => {
        player2MonikerValue = event.target.value;
    })

    // Allows user to re-select a different opponent after leaving player selection screen
    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click", () => {
        // Trigger animation to revert to previous stage (player-selection)
        monikerSelectionDiv.classList.add("moniker-selection-leave");
        body.style.overflow = "hidden";

        monikerSelectionDiv.addEventListener("animationend", () => {
            monikerSelectionDiv.style.display = "none";
            monikerSelectionDiv.classList.remove("moniker-selection-leave");

            playerSelectionDiv.style.display = "flex";

            // Called here as the playerSelectionDiv has a leftOffset
            updatePlayerSelectionDistanceVariable();
            playerSelectionDiv.classList.add("player-selection-enter");
        }, { once: true });

        playerSelectionDiv.addEventListener("animationend", () => {
            playerSelectionDiv.classList.remove("player-selection-enter");
            body.style.overflow = "auto";
        }, { once: true });
    })

    // Promise moves the player to the next stage of the game
    const monikerConfirmBtn = document.querySelector(".confirm-moniker-btn");
    const monikerConfirmPromise = new Promise(resolve => {
        monikerConfirmBtn.addEventListener("click", () => {
            if (player1MonikerValue === "") {
                player1MonikerValue = "PLAYER1";
            }
            if (player2MonikerValue === "") {
                player2MonikerValue = chosenPlayer2 === "computer" ? "COMPUTER" : "PLAYER2";
            }

            if (player1MonikerValue === player2MonikerValue) {
                player1MonikerValue = player1MonikerValue + "1"
                player2MonikerValue = player2MonikerValue + "2"
            }

            resolve({ chosenPlayer2, player1MonikerValue, player2MonikerValue });
            gridOverlay.innerHTML = "";
            gridOverlay.style.display = "none";

            // Remove event listeners after they have served their purpose
            window.removeEventListener("resize", updatePlayerSelectionDistanceVariable);
            window.removeEventListener("resize", updateMonikerSelectionDistanceVariable);
        });
    });

    return monikerConfirmPromise;
};

function dullTitleText(dull) {
    const titleText = document.querySelector("h1")
    if (dull) {
        titleText.style.color = black;
    }
}

export { goesFirst, removeFirstPlayerText, playerOrComputer }