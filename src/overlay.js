function toggleOverlay(overlayID, showOverlay) {
    const overlay = document.getElementById(overlayID + "Overlay");
    if (showOverlay) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
}

function switchTurn(player) {
    if (player === "player") {
        toggleOverlay("computerGrid", false);
        toggleOverlay("playerGrid", true);
    } else {
        toggleOverlay("computerGrid", true);
        toggleOverlay("playerGrid", false);
    }
}

export {toggleOverlay, switchTurn}