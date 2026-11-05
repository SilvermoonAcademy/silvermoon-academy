const observeSky = document.getElementById("observeSky");
const celestialResult = document.getElementById("celestialResult");

const celestialEvents = [
    {
        name: "Silverfall Meteor Shower",
        description:
            "Silver streaks cross the night sky, briefly strengthening magical energy throughout the academy.",
        type: "meteor"
    },
    {
        name: "Shadow Moon",
        description:
            "The Silver Moon falls into shadow, causing hidden and mysterious magic to grow stronger.",
        type: "shadow"
    },
    {
        name: "The Convergence",
        description:
            "Several celestial influences align, creating a rare surge of magical energy.",
        type: "convergence"
    },
    {
        name: "Vespera's Veil",
        description:
            "A violet celestial veil spreads across the sky, strengthening illusion and hidden magic.",
        type: "vespera"
    }
];
function createMeteorShower() {

    const observatory = document.getElementById("observationSky");

    for (let i = 0; i < 10; i++) {

        const meteor = document.createElement("span");
        meteor.classList.add("meteor");

        meteor.style.left = Math.random() * 90 + "%";
        meteor.style.top = Math.random() * 60 + "%";
        meteor.style.animationDelay = Math.random() * 1.5 + "s";

        observatory.appendChild(meteor);

        setTimeout(() => {
            meteor.remove();
        }, 3000);
    }
}
function createShadowMoon() {

    const sky = document.getElementById("observationSky");

    sky.classList.remove("shadow-moon");

    void sky.offsetWidth;

    sky.classList.add("shadow-moon");

    setTimeout(() => {
        sky.classList.remove("shadow-moon");
    }, 5000);
}
function createConvergenceStars() {

    const sky = document.getElementById("observationSky");

    for (let i = 0; i < 18; i++) {

        const star = document.createElement("span");
        star.classList.add("convergence-star");

        star.style.left = Math.random() * 95 + "%";
        star.style.top = Math.random() * 90 + "%";
        star.style.animationDelay = Math.random() * 2 + "s";

        sky.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 5000);
    }
}
function createConvergence() {

    const sky = document.getElementById("observationSky");

    sky.classList.remove("convergence");

    void sky.offsetWidth;

    sky.classList.add("convergence");

    createConvergenceStars();

    setTimeout(() => {
        sky.classList.remove("convergence");
    }, 5000);
}
function createVesperasVeil() {

    const sky = document.getElementById("observationSky");

    // Remove an old veil if one still exists
    const oldVeil = sky.querySelector(".vespera-veil");

    if (oldVeil) {
        oldVeil.remove();
    }

    const veil = document.createElement("div");
    veil.classList.add("vespera-veil");

    sky.appendChild(veil);

    setTimeout(() => {
        veil.remove();
    }, 6000);
}
observeSky.addEventListener("click", function () {

    const randomEvent =
        celestialEvents[Math.floor(Math.random() * celestialEvents.length)];

        
/* =====================================
   ASTRAL STUDIES - ACHIEVEMENTS
===================================== */

// Load previously observed phenomena
let observedPhenomena = [];

try {
    const savedPhenomena = JSON.parse(
        localStorage.getItem("observedPhenomena") || "[]"
    );

    if (Array.isArray(savedPhenomena)) {
        observedPhenomena = savedPhenomena;
    }

} catch (error) {
    console.warn("Could not load observed phenomena.");
}

// Save unique celestial phenomena
if (!observedPhenomena.includes(randomEvent.type)) {

    observedPhenomena.push(randomEvent.type);

    localStorage.setItem(
        "observedPhenomena",
        JSON.stringify(observedPhenomena)
    );
}

// Unlock first observation achievement
localStorage.setItem(
    "achievementCelestialObserver",
    "true"
);

// Unlock master achievement after all four
const allPhenomena = [
    "meteor",
    "shadow",
    "convergence",
    "vespera"
];

if (allPhenomena.every(type => observedPhenomena.includes(type))) {

    localStorage.setItem(
        "achievementMasterOfHeavens",
        "true"
    );
}

    celestialResult.innerHTML = `
        <h3>${randomEvent.name}</h3>
        <p>${randomEvent.description}</p>
    `;
    if (randomEvent.type === "meteor") {
    createMeteorShower();
}
    if (randomEvent.type === "shadow") {
    createShadowMoon();
}
if (randomEvent.type === "convergence") {
    createConvergence();
}
if (randomEvent.type === "vespera") {
    createVesperasVeil();
}
});