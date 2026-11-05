const discoverSpell = document.getElementById("discoverSpell");
const spellResult = document.getElementById("spellResult");

const spells = [
    {
        name: "Lux",
        description: "A simple spell that creates a bright magical light.",
        image: "images/spell-lux.png",
        color: "#f6d86b"
    },
    {
        name: "Ignis",
        description: "Summon a small flame using magical energy.",
        image: "images/spell-ignis.png",
        color: "#ff6347"
    },
    {
        name: "Aegis",
        description: "Create a magical shield to protect yourself.",
        image: "images/spell-aegis.png",
        color: "#d8e2ec"
    },
    {
        name: "Glacius",
        description: "Freeze a target or cover an area in magical frost.",
        image: "images/spell-glacius.png",
        color: "#78d7ff"
    },
    {
        name: "Incrementum",
        description: "Cause plants and magical vegetation to grow rapidly.",
        image: "images/spell-incrementum.png",
        color: "#72e6a6"
    },
    {
        name: "Procella",
        description: "Create a powerful gust of wind that pushes away anything in its path.",
        image: "images/spell-procella.png",
        color: "#f4f1de"
    },
    {
        name: "Duplicatio",
        description: "Create a temporary magical copy of a person or object.",
        image: "images/spell-duplicatio.png",
        color: "#c9a7ff"
    }
];

discoverSpell.addEventListener("click", function() {

    // Unlock Spell Apprentice achievement
    localStorage.setItem("achievementSpellApprentice", "true");

    
/* =====================================
   ARCANE MASTER - SPELL PROGRESS
===================================== */

// Count every spell cast
const totalSpellsCast =
    Number(localStorage.getItem("totalSpellsCast")) || 0;

const updatedSpellCount = totalSpellsCast + 1;

localStorage.setItem(
    "totalSpellsCast",
    updatedSpellCount.toString()
);

// Unlock Arcane Master after 25 spells
if (updatedSpellCount >= 25) {
    localStorage.setItem(
        "achievementArcaneMaster",
        "true"
    );
}

    // Pick a random spell
    const randomSpell = spells[Math.floor(Math.random() * spells.length)];

    // Reset animation
    spellResult.classList.remove("show");
    void spellResult.offsetWidth;

    // Display the discovered spell
    spellResult.innerHTML = `
        <img 
            src="${randomSpell.image}" 
            alt="${randomSpell.name} spell"
            class="discovered-spell-image"
        >
        <h3>${randomSpell.name}</h3>
        <p>${randomSpell.description}</p>
    `;

    spellResult.style.color = randomSpell.color;
    spellResult.style.textShadow = `0 0 12px ${randomSpell.color}`;

    spellResult.classList.add("show");
});