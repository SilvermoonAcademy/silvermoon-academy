const exploreWilds = document.getElementById("exploreWilds");
const creatureResult = document.getElementById("creatureResult");
const rarityButtons = document.querySelectorAll(".rarity-filter-btn");

let selectedRarity = "all";

rarityButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        rarityButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedRarity = button.dataset.rarity;

        console.log("Selected rarity:", selectedRarity);
    });
});


function getRandomCreature() {
    const randomNumber = Math.random() * 100;

    if (randomNumber < 40) {
        return {
            name: "Moonfox",
            message: "A Moonfox emerges from the silver mist.",
            rarity: "Common",
            image: "images/moonfox.png"
        };

    } else if (randomNumber < 65) {
        return {
            name: "Starhorn",
            message: "A Starhorn quietly watches you from between the trees.",
            rarity: "Uncommon",
            image: "images/starhorn.png"
        };

    } else if (randomNumber < 80) {
        return {
            name: "Emberwing",
            message: "An Emberwing circles through the sky above you.",
            rarity: "Rare",
            image: "images/emberwing.png"
        };

    } else if (randomNumber < 90) {
        return {
            name: "Unicorn",
            message: "A Unicorn steps silently into the moonlight.",
            rarity: "Very Rare",
            image: "images/unicorn.png"
        };

    } else if (randomNumber < 92.5) {
        return {
            name: "Siren",
            message: "A mysterious song rises from the waters nearby.",
            rarity: "Legendary",
            image: "images/siren.png",
            house: "Serenia"
        };

    } else if (randomNumber < 95) {
        return {
            name: "Keraunos",
            message: "Thunder echoes as a Keraunos charges across the horizon.",
            rarity: "Legendary",
            image: "images/keraunos.png",
            house: "Kaelthorn"
        };

    } else if (randomNumber < 97.5) {
        return {
            name: "Gorgon",
            message: "The forest falls silent as a Gorgon appears among the ruins.",
            rarity: "Legendary",
            image: "images/gorgon.png",
            house: "Eldergard"
        };

    } else {
        return {
            name: "Hippogriff",
            message: "A Hippogriff descends from the clouds above Silvermoon.",
            rarity: "Legendary",
            image: "images/hippogriff.png",
            house: "Caeloria"
        };
    }
}
function getFilteredCreature() {
    let creature = getRandomCreature();

    if (selectedRarity === "all") {
        return creature;
    }

    const rarityMap = {
        common: "Common",
        uncommon: "Uncommon",
        rare: "Rare",
        "very-rare": "Very Rare",
        legendary: "Legendary"
    };

    const wantedRarity = rarityMap[selectedRarity];

    while (creature.rarity !== wantedRarity) {
        creature = getRandomCreature();
    }

    return creature;
}

exploreWilds.addEventListener("click", function() {
    const creature = getFilteredCreature();
    
    
/* =====================================
   CREATURE DISCOVERY & ACHIEVEMENTS
===================================== */

// Load previously discovered creatures
let discoveredCreatures;

try {
    discoveredCreatures = JSON.parse(
        localStorage.getItem("discoveredCreatures") || "[]"
    );
} catch (error) {
    discoveredCreatures = [];
}

if (!Array.isArray(discoveredCreatures)) {
    discoveredCreatures = [];
}

// Add the creature if it has not been discovered before
if (!discoveredCreatures.includes(creature.name)) {

    discoveredCreatures.push(creature.name);

    localStorage.setItem(
        "discoveredCreatures",
        JSON.stringify(discoveredCreatures)
    );
}

// First creature discovered
localStorage.setItem(
    "achievementCreatureExplorer",
    "true"
);

// All eight creatures discovered
if (discoveredCreatures.length >= 8) {

    localStorage.setItem(
        "achievementBeastScholar",
        "true"
    );
}


    creatureResult.classList.remove("show");
    void creatureResult.offsetWidth;

    creatureResult.innerHTML = `
    <img
        src="${creature.image}"
        alt="${creature.name}"
        class="encounter-image"
    >

    <h3>${creature.name}</h3>

    <strong class="encounter-rarity ${creature.rarity.toLowerCase().replace(" ", "-")}">
    ${creature.rarity}
</strong>

    ${creature.house
        ? `<p class="encounter-house">Symbol of House ${creature.house}</p>`
        : ""
    }

    <p>${creature.message}</p>
`;

    creatureResult.classList.add("show");
});