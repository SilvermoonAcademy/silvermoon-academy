
/* =========================================
   GORGANA - THE SHATTERED HEARTROOT
========================================= */

const heartrootGrid = document.getElementById("heartrootGrid");
const heartrootFeedback = document.getElementById("heartrootFeedback");
const resetHeartroot = document.getElementById("resetHeartroot");

let heartrootPieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let selectedHeartrootPiece = null;
let heartrootSolved = false;

// Shuffle the nine pieces
function shuffleHeartroot() {
    if (heartrootSolved) return;

    heartrootPieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    do {
        for (let i = heartrootPieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [heartrootPieces[i], heartrootPieces[j]] =
                [heartrootPieces[j], heartrootPieces[i]];
        }
    } while (heartrootPieces.every((piece, index) => piece === index));

    selectedHeartrootPiece = null;
    heartrootFeedback.textContent = "Select two pieces to swap them.";

    renderHeartroot();
}

// Draw all puzzle pieces
function renderHeartroot() {
    heartrootGrid.innerHTML = "";

    heartrootPieces.forEach((piece, position) => {
        const tile = document.createElement("button");

        tile.type = "button";
        tile.className = "heartroot-tile";
        tile.setAttribute("aria-label", `Puzzle piece ${piece + 1}`);

        const row = Math.floor(piece / 3);
        const column = piece % 3;

        tile.style.backgroundPosition =
            `${column * 50}% ${row * 50}%`;

        if (selectedHeartrootPiece === position) {
            tile.classList.add("selected");
        }

        tile.addEventListener("click", () => {
            selectHeartrootPiece(position);
        });

        heartrootGrid.appendChild(tile);
    });
}

// Select two pieces to swap
function selectHeartrootPiece(position) {
    if (heartrootSolved) return;

    if (selectedHeartrootPiece === null) {
        selectedHeartrootPiece = position;
    } else if (selectedHeartrootPiece === position) {
        selectedHeartrootPiece = null;
    } else {
        const first = selectedHeartrootPiece;

        [heartrootPieces[first], heartrootPieces[position]] =
            [heartrootPieces[position], heartrootPieces[first]];

        selectedHeartrootPiece = null;
        checkHeartrootSolution();
    }

    if (!heartrootSolved) {
        renderHeartroot();
    }
}

// Check if all pieces are correctly placed
function checkHeartrootSolution() {
    const solved = heartrootPieces.every(
        (piece, index) => piece === index
    );

    if (!solved) return;

    heartrootSolved = true;
    localStorage.setItem("heartrootSolved", "true");

    
heartrootFeedback.innerHTML = `
    <h3>The Heartroot Awakens</h3>

    <p>
        As the final stone falls into place, a brilliant
        emerald light spreads through the ancient roots.
        The silence of the forest gives way to life.
    </p>

    <p>
        <strong>Gorgana:</strong>
        "You have restored what time itself could not heal.
        The earth remembers your kindness, young guardian."
    </p>

    <p>
        "But your journey is not yet complete.
        Come, and receive the gift of the ancient earth."
    </p>
`;

    heartrootGrid.hidden = true;
    resetHeartroot.hidden = true;

    document.getElementById("heartrootAwakened").hidden = false;
    document.getElementById("gorganaReward").hidden = false;
}

// Reset puzzle
resetHeartroot.addEventListener("click", shuffleHeartroot);


/* =========================================
   RESTORE HEARTROOT PROGRESS
========================================= */

function restoreHeartrootProgress() {

    const puzzleCompleted =
        localStorage.getItem("heartrootSolved") === "true";

    const blessingReceived =
        localStorage.getItem("blessingEarth") === "true";

    if (puzzleCompleted || blessingReceived) {

        heartrootSolved = true;

        heartrootGrid.hidden = true;
        resetHeartroot.hidden = true;

        document.getElementById("heartrootAwakened").hidden = false;
        document.getElementById("gorganaReward").hidden = false;

        heartrootFeedback.innerHTML = `
            <h3>The Heartroot Has Awakened</h3>
            <p>
                The ancient roots are alive once more.
                Your kindness has restored the balance of the forest.
            </p>
        `;

        // Restore the claimed reward
        if (blessingReceived) {
            showEarthBlessing();
        }

    } else {
        shuffleHeartroot();
    }
}



/* =========================================
   GORGANA - START THE EARTH TRIAL
========================================= */

const beginGorganaTrial = document.getElementById("beginGorganaTrial");
const gorganaTrial = document.getElementById("gorganaTrial");
const exploreHeartroot = document.getElementById("exploreHeartroot");
const heartrootPuzzle = document.getElementById("heartrootPuzzle");

// Start Gorgana's trial
beginGorganaTrial.addEventListener("click", () => {
    gorganaTrial.hidden = false;
    beginGorganaTrial.hidden = true;

    gorganaTrial.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Enter the Heartroot puzzle
exploreHeartroot.addEventListener("click", () => {
    heartrootPuzzle.hidden = false;
    gorganaTrial.hidden = true;

    heartrootPuzzle.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

/* =========================================
   GORGANA - BLESSING OF EARTH
========================================= */

const claimEarthBlessing = document.getElementById("claimEarthBlessing");
const earthBlessingMessage = document.getElementById("earthBlessingMessage");

function showEarthBlessing() {
    claimEarthBlessing.hidden = true;

    earthBlessingMessage.innerHTML = `
        <h3>Blessing of Earth Received</h3>

        <p>
            The Seed of Eternity has been added
            to your guardian ingredients.
        </p>

        <p>
            Gorgana: "The earth shall remember
            your courage. Carry its blessing
            into the Heart of Aether."
        </p>

        <a href="hall-of-guardians.html">
            Return to the Hall of Guardians
        </a>
    `;
}

claimEarthBlessing.addEventListener("click", () => {

    // Prevent collecting the reward twice
    if (localStorage.getItem("blessingEarth") === "true") {
        showEarthBlessing();
        return;
    }

    // Save the blessing
    localStorage.setItem("blessingEarth", "true");

    // Add the ingredient to the guardian inventory
    const guardianIngredients = JSON.parse(
        localStorage.getItem("guardianIngredients") || "{}"
    );

    guardianIngredients["Seed of Eternity"] = 1;

    localStorage.setItem(
        "guardianIngredients",
        JSON.stringify(guardianIngredients)
    );

    showEarthBlessing();
});
// Restore saved progress after all elements are ready
restoreHeartrootProgress();