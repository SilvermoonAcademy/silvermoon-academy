// Silvermoon Academy - Crystal Ball

const consultCrystalBall = document.getElementById("consultCrystalBall");
const crystalBallModal = document.getElementById("crystalBallModal");
const closeCrystalBall = document.getElementById("closeCrystalBall");
const newProphecy = document.getElementById("newProphecy");
const crystalBallProphecy = document.getElementById("crystalBallProphecy");

// 25 common prophecies
const commonProphecies = [
    // Mysterious
    "The moon remembers a secret you have yet to discover.",
    "A forgotten whisper will soon find its way to you.",
    "When four shadows meet, an ancient truth shall awaken.",
    "The stars are watching a choice you have not yet made.",
    "A silver light will guide you through unexpected darkness.",
    "The answer you seek is hidden in an ordinary moment.",
    "An old story is waiting for someone to change its ending.",
    "The wind carries a message meant only for you.",
    "Something lost beneath the moon will one day return.",
    "Beware the silence that follows a falling star.",

    // Humorous
    "Beware of a suspiciously confident mushroom.",
    "Your next great adventure may involve an unfortunate hairstyle.",
    "A potion will bubble. Someone will blame the cauldron.",
    "Never trust a wizard who says 'What could possibly go wrong?'",
    "A mysterious sock will soon disappear without explanation.",
    "The stars advise against arguing with enchanted furniture.",
    "An owl knows your secrets. Unfortunately, it also loves gossip.",
    "Your destiny involves a door marked 'Do Not Open'. Naturally.",
    "Someone will mistake a powerful artifact for a paperweight.",
    "A Moonfox will question your decisions. It may have a point.",

    // Encouraging
    "A small act of courage will awaken great magic.",
    "Even the faintest star can illuminate the darkest night.",
    "Your greatest strength has yet to reveal itself.",
    "The path ahead is uncertain, but your magic is growing.",
    "Kindness will open a door that power cannot."
];

// 5 rare prophecies
const rareProphecies = [
    "Four ancient voices whisper beneath Elementorumia. One has spoken your name.",
    "The silver moon has watched you before. It remembers.",
    "A black cat knows more about your future than it admits.",
    "The founders left a secret that even the stars refuse to reveal.",
    "When the last forgotten star awakens, the academy shall remember."
];

let lastProphecy = "";

// Choose a random prophecy
function getRandomProphecy() {
    let prophecy;

    do {
        const isRare = Math.random() < 0.10;

        const prophecyList = isRare
            ? rareProphecies
            : commonProphecies;

        const randomIndex = Math.floor(
            Math.random() * prophecyList.length
        );

        prophecy = prophecyList[randomIndex];

    } while (prophecy === lastProphecy);

    lastProphecy = prophecy;
    return prophecy;
}

// Reveal a prophecy
function revealProphecy() {
    crystalBallProphecy.classList.remove("revealed");

    crystalBallProphecy.textContent = getRandomProphecy();

    // Restart text animation
    void crystalBallProphecy.offsetWidth;

    crystalBallProphecy.classList.add("revealed");
}

// Open Crystal Ball
consultCrystalBall.addEventListener("click", () => {
    crystalBallModal.hidden = false;
    revealProphecy();
});

// Close Crystal Ball
closeCrystalBall.addEventListener("click", () => {
    crystalBallModal.hidden = true;
});

// Seek another vision
newProphecy.addEventListener("click", revealProphecy);

// Close when clicking outside the popup
crystalBallModal.addEventListener("click", (event) => {
    if (event.target === crystalBallModal) {
        crystalBallModal.hidden = true;
    }
});