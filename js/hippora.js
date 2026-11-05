
/* =========================================
   HIPPORA - THE FLIGHT TRIAL
   STEP 1: FLIGHT CONTROLS
========================================= */

const beginFlightTrial = document.getElementById("beginFlightTrial");
const hipporaFlightTrial = document.getElementById("hipporaFlightTrial");
const startFlightGame = document.getElementById("startFlightGame");
const continueFlight = document.getElementById("continueFlight");
const flightGame = document.getElementById("flightGame");
const flightPlayer = document.getElementById("flightPlayer");
const flightMessage = document.getElementById("flightMessage");

// Player position
let flightX = 35;
let flightY = 150;

// Movement speed
const flightSpeed = 4;

// Game state
let flightRunning = false;


/* =========================================
   STAGE 1 - THE GENTLE WINDS
========================================= */

let windRingsCollected = 0;
let currentFlightStage = 1;
const windRingsRequired = 5;

let currentWindRing = null;

const flightScore = document.getElementById("flightScore");
const flightStage = document.getElementById("flightStage");


// Keys currently pressed
const flightKeys = {
    up: false,
    down: false,
    left: false,
    right: false
};

/* =========================================
   OPEN THE FLIGHT TRIAL
========================================= */

beginFlightTrial.addEventListener("click", () => {

    hipporaFlightTrial.hidden = false;
    beginFlightTrial.hidden = true;

    hipporaFlightTrial.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

/* =========================================
   UPDATE PLAYER POSITION
========================================= */

function updateFlightPosition() {

    const maxX = Math.max(
        0,
        flightGame.clientWidth - flightPlayer.offsetWidth
    );

    const maxY = Math.max(
        0,
        flightGame.clientHeight - flightPlayer.offsetHeight
    );

    // Keep Hippora inside the game area
    flightX = Math.max(0, Math.min(flightX, maxX));
    flightY = Math.max(0, Math.min(flightY, maxY));

    flightPlayer.style.left = flightX + "px";
    flightPlayer.style.top = flightY + "px";
}

/* =========================================
   GAME LOOP
========================================= */

function flightLoop() {

    if (!flightRunning) return;

    if (flightKeys.up) flightY -= flightSpeed;
    if (flightKeys.down) flightY += flightSpeed;
    if (flightKeys.left) flightX -= flightSpeed;
    if (flightKeys.right) flightX += flightSpeed;

    updateFlightPosition();
    checkWindRingCollision();
    checkStormCollision();
    checkCelestialPortalCollision();

if (flightRunning) {
    requestAnimationFrame(flightLoop);
}
}

/* =========================================
   KEYBOARD CONTROLS
========================================= */

const flightKeyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    s: "down",
    a: "left",
    d: "right"
};

document.addEventListener("keydown", (event) => {

    if (!flightRunning) return;

    const direction = flightKeyMap[event.key];

    if (direction) {
        event.preventDefault();
        flightKeys[direction] = true;
    }

});

document.addEventListener("keyup", (event) => {

    const direction = flightKeyMap[event.key];

    if (direction) {
        flightKeys[direction] = false;
    }

});

// Stop movement if the browser loses focus
window.addEventListener("blur", () => {
    Object.keys(flightKeys).forEach(key => {
        flightKeys[key] = false;
    });
});

/* =========================================
   ON-SCREEN CONTROLS
========================================= */

const flightButtons = {
    flightUp: "up",
    flightDown: "down",
    flightLeft: "left",
    flightRight: "right"
};

Object.entries(flightButtons).forEach(([id, direction]) => {

    const button = document.getElementById(id);

    button.addEventListener("pointerdown", event => {
        event.preventDefault();
        flightKeys[direction] = true;
        button.setPointerCapture(event.pointerId);
    });

    button.addEventListener("pointerup", () => {
        flightKeys[direction] = false;
    });

    button.addEventListener("pointercancel", () => {
        flightKeys[direction] = false;
    });

    button.addEventListener("lostpointercapture", () => {
        flightKeys[direction] = false;
    });

});

/* =========================================
   START FLIGHT
========================================= */

startFlightGame.addEventListener("click", () => {

    if (flightRunning) return;

    flightRunning = true;

    flightX = 35;
    flightY = flightGame.clientHeight / 2 -
              flightPlayer.offsetHeight / 2;

    updateFlightPosition();
    windRingsCollected = 0;

flightScore.textContent = "Wind Rings: 0 / 5";
flightStage.textContent = "Stage 1: The Gentle Winds";

currentFlightStage = 1;
celestialPortalReached = false;
continueFlight.hidden = true;

if (celestialPortal) {
    celestialPortal.remove();
    celestialPortal = null;
}
removeStormCrystals();
createWindRing();
    startFlightGame.hidden = true;

    flightMessage.textContent =
        "Guide Hippora through the skies using WASD or the arrow keys.";

    requestAnimationFrame(flightLoop);

});

// Set initial position
updateFlightPosition();

/* =========================================
   WIND RINGS
========================================= */

// Create a magical wind ring
function createWindRing() {

    if (currentWindRing) {
        currentWindRing.remove();
    }

    const ring = document.createElement("div");
    ring.className = "wind-ring";

    const maxX = Math.max(0, flightGame.clientWidth - 65);
    const maxY = Math.max(0, flightGame.clientHeight - 65);

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    ring.style.left = x + "px";
    ring.style.top = y + "px";

    flightGame.appendChild(ring);

    currentWindRing = ring;
}

// Check whether Hippora touches a ring
function checkWindRingCollision() {

    if (!flightRunning || !currentWindRing) return;

    const playerRect = flightPlayer.getBoundingClientRect();
    const ringRect = currentWindRing.getBoundingClientRect();

    const touching =
        playerRect.left < ringRect.right &&
        playerRect.right > ringRect.left &&
        playerRect.top < ringRect.bottom &&
        playerRect.bottom > ringRect.top;

    if (!touching) return;

    currentWindRing.remove();
    currentWindRing = null;

    windRingsCollected++;

    flightScore.textContent =
        `Wind Rings: ${windRingsCollected} / ${windRingsRequired}`;

    
if (windRingsCollected >= windRingsRequired) {

    if (currentFlightStage === 1) {

        // Begin the second stage
        currentFlightStage = 2;
        windRingsCollected = 0;

        flightStage.textContent =
            "Stage 2: The Storm of Forgotten Echoes";

        flightScore.textContent =
            "Wind Rings: 0 / 5";

        flightMessage.textContent =
            "Dark clouds gather around Hippora. Avoid the storm crystal and restore the winds!";

        createStormCrystal();
        createWindRing();

    } else if (currentFlightStage === 2) {

        // Complete the second stage
        flightRunning = false;
        continueFlight.hidden = false;

        flightStage.textContent =
            "Stage 2 Completed: The Storm of Forgotten Echoes";

        flightMessage.textContent =
            "The storm begins to fade. Beyond the clouds, the Celestial Sanctuary awaits.";

        removeStormCrystals();

    }

    return;
}


    createWindRing();
}


/* =========================================
   STAGE 2 - MOVING STORM CRYSTALS
========================================= */

let stormCrystals = [];
let stormCollisionCooldown = 0;

function removeStormCrystals() {

    stormCrystals.forEach(crystal => crystal.remove());
    stormCrystals = [];
}

function createStormCrystal() {

    removeStormCrystals();

    const positions = [
        { x: 0.35, y: 0.20, speed: 2.8 },
        { x: 0.60, y: 0.55, speed: 3.5 },
        { x: 0.82, y: 0.30, speed: 2.4 }
    ];

    positions.forEach((position, index) => {

        const crystal = document.createElement("div");
        crystal.className = "storm-crystal";

        crystal.style.left =
            Math.min(
                flightGame.clientWidth - 48,
                flightGame.clientWidth * position.x
            ) + "px";

        crystal.style.top =
            flightGame.clientHeight * position.y + "px";

        crystal.style.animationDuration =
            position.speed + "s";

        crystal.style.animationDelay =
            (-index * 0.7) + "s";

        flightGame.appendChild(crystal);
        stormCrystals.push(crystal);
    });
}

function checkStormCollision() {

    if (
        !flightRunning ||
        currentFlightStage !== 2 ||
        stormCrystals.length === 0
    ) {
        return;
    }

    // Brief protection after a collision
    if (performance.now() < stormCollisionCooldown) {
        return;
    }

    const playerRect = flightPlayer.getBoundingClientRect();

    // Smaller hitbox makes the game more forgiving
    const playerHitbox = {
        left: playerRect.left + playerRect.width * 0.25,
        right: playerRect.right - playerRect.width * 0.25,
        top: playerRect.top + playerRect.height * 0.25,
        bottom: playerRect.bottom - playerRect.height * 0.25
    };

    for (const crystal of stormCrystals) {

        const rect = crystal.getBoundingClientRect();

        const touching =
            playerHitbox.left < rect.right &&
            playerHitbox.right > rect.left &&
            playerHitbox.top < rect.bottom &&
            playerHitbox.bottom > rect.top;

        if (!touching) continue;

        flightMessage.textContent =
            "A storm crystal disrupts your flight! Hippora regains her balance.";

        flightX = 35;
        flightY =
            (flightGame.clientHeight -
             flightPlayer.offsetHeight) / 2;

        updateFlightPosition();

        stormCollisionCooldown = performance.now() + 1500;

        break;
    }
}


/* =========================================
   STAGE 3 - THE CELESTIAL SANCTUARY
========================================= */

let celestialPortal = null;
let celestialPortalReached = false;

function createCelestialPortal() {

    if (celestialPortal) {
        celestialPortal.remove();
    }

    const portal = document.createElement("div");
    portal.className = "celestial-portal";

    flightGame.appendChild(portal);

    // Position inside the game area
    portal.style.left =
        Math.max(0, flightGame.clientWidth - portal.offsetWidth - 30) + "px";

    portal.style.top =
        Math.max(0, (flightGame.clientHeight - portal.offsetHeight) / 2) + "px";

    celestialPortal = portal;
}

function checkCelestialPortalCollision() {

    if (
        !flightRunning ||
        currentFlightStage !== 3 ||
        !celestialPortal ||
        celestialPortalReached
    ) {
        return;
    }

    const playerRect = flightPlayer.getBoundingClientRect();
    const portalRect = celestialPortal.getBoundingClientRect();

    const touching =
        playerRect.left < portalRect.right &&
        playerRect.right > portalRect.left &&
        playerRect.top < portalRect.bottom &&
        playerRect.bottom > portalRect.top;

    if (!touching) return;

    // Complete the flight trial
    celestialPortalReached = true;
    flightRunning = false;

    celestialPortal.remove();
    celestialPortal = null;

    flightStage.textContent =
        "Stage 3 Completed: The Celestial Sanctuary";

    flightScore.textContent =
        "Flight Trial Completed";

    flightMessage.textContent =
        "Hippora carries you through the celestial gateway. The ancient winds of Ventlia awaken once more.";

    localStorage.setItem("hipporaFlightCompleted", "true");

    showWindBlessing();
}

/* =========================================
   CONTINUE TO STAGE 3
========================================= */

continueFlight.addEventListener("click", () => {

    if (currentFlightStage !== 2 || flightRunning) return;

    currentFlightStage = 3;
    celestialPortalReached = false;

    continueFlight.hidden = true;

    flightStage.textContent =
        "Stage 3: The Celestial Sanctuary";

    flightScore.textContent =
        "Reach the Celestial Gateway";

    flightMessage.textContent =
        "Beyond the storm, a golden gateway shines. Guide Hippora into the celestial portal.";

    // Return Hippora to the left side
    flightX = 35;
    flightY =
        (flightGame.clientHeight - flightPlayer.offsetHeight) / 2;

    updateFlightPosition();

    createCelestialPortal();

    flightRunning = true;
    requestAnimationFrame(flightLoop);
});

/* =========================================
   THE MANTLE OF THE FOUR WINDS
========================================= */

const hipporaMantle = document.getElementById("hipporaMantle");
const mantleCeremony = document.getElementById("mantleCeremony");
const acceptWindMantle = document.getElementById("acceptWindMantle");

// The trial requires the mantle
function updateWindMantleState() {

    const mantleAccepted =
        localStorage.getItem("windMantleAccepted") === "true";

    hipporaMantle.hidden = mantleAccepted;
    mantleCeremony.hidden = true;

    beginFlightTrial.disabled = !mantleAccepted;

    if (mantleAccepted) {
        beginFlightTrial.textContent = "Begin the Flight Trial";
    } else {
        beginFlightTrial.textContent = "Receive the Mantle First";
    }
}

// Examine the mantle
hipporaMantle.addEventListener("click", () => {

    mantleCeremony.hidden = false;

    mantleCeremony.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Accept the mantle
acceptWindMantle.addEventListener("click", () => {

    localStorage.setItem("windMantleAccepted", "true");

    updateWindMantleState();

    beginFlightTrial.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

// Restore progress on page load
updateWindMantleState();

/* =========================================
   HIPPORA - BLESSING OF WIND
========================================= */

const hipporaBlessing = document.getElementById("hipporaBlessing");
const claimWindBlessing = document.getElementById("claimWindBlessing");
const windBlessingMessage = document.getElementById("windBlessingMessage");

function showWindBlessing() {

    hipporaBlessing.hidden = false;

    const alreadyClaimed =
        localStorage.getItem("blessingWind") === "true";

    claimWindBlessing.hidden = alreadyClaimed;

    windBlessingMessage.textContent = alreadyClaimed
        ? "Blessing of Wind received. The ancient winds remain by your side."
        : "";

    hipporaBlessing.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

claimWindBlessing.addEventListener("click", () => {

    if (localStorage.getItem("blessingWind") === "true") {
        showWindBlessing();
        return;
    }

    localStorage.setItem("blessingWind", "true");

    const ingredients = JSON.parse(
        localStorage.getItem("guardianIngredients") || "{}"
    );

    ingredients["Celestial Feather"] = 1;

    localStorage.setItem(
        "guardianIngredients",
        JSON.stringify(ingredients)
    );

    showWindBlessing();
});

// Restore the reward scene when returning to Hippora
if (localStorage.getItem("hipporaFlightCompleted") === "true") {
    showWindBlessing();
}
