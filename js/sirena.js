
/* =====================================
   CHAPTER V - SIRENA'S TRIAL
===================================== */

const beginSirenaTrial = document.getElementById("beginSirenaTrial");
const nerielRescue = document.getElementById("nerielRescue");

if (beginSirenaTrial && nerielRescue) {

    beginSirenaTrial.addEventListener("click", function() {

        // Reveal Neriel's rescue scene
        nerielRescue.hidden = false;

        // Hide the start button
        beginSirenaTrial.hidden = true;

        // Scroll to the rescue scene
        nerielRescue.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}

/* =====================================
   NERIEL - THE THREE KNOTS
===================================== */

const inspectNerielNet = document.getElementById("inspectNerielNet");
const nerielNetPuzzle = document.getElementById("nerielNetPuzzle");

const nerielKnotButtons = document.querySelectorAll(".neriel-knot");
const nerielPuzzleFeedback = document.getElementById("nerielPuzzleFeedback");

// Correct order based on the ancient clue
const correctKnotOrder = ["moon", "wave", "pearl"];

let knotProgress = 0;
let nerielFreed = false;

// Reveal the fishing net puzzle
if (inspectNerielNet && nerielNetPuzzle) {

    inspectNerielNet.addEventListener("click", function() {

        nerielNetPuzzle.hidden = false;
        inspectNerielNet.hidden = true;

        nerielNetPuzzle.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}

// Handle the enchanted knots
nerielKnotButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (nerielFreed) return;

        const selectedKnot = button.dataset.knot;
        const expectedKnot = correctKnotOrder[knotProgress];

        if (selectedKnot === expectedKnot) {

            button.classList.add("unraveled");
            button.disabled = true;

            knotProgress++;

            nerielPuzzleFeedback.textContent =
                "The enchanted knot begins to unravel...";

            // All three knots have been untied
            if (knotProgress === correctKnotOrder.length) {

                nerielFreed = true;

                
                // Reveal the healing option
                document.getElementById("nerielHealing").hidden = false;

                nerielPuzzleFeedback.textContent =
                    "The final knot loosens and the fishing net falls away. " +
                    "Neriel is free, but her injuries have not yet healed.";

            }

        } else {

            // Reset the puzzle after an incorrect choice
            knotProgress = 0;

            nerielKnotButtons.forEach(function(knot) {
                knot.classList.remove("unraveled");
                knot.disabled = false;
            });

            nerielPuzzleFeedback.textContent =
                "The knots tighten once more. " +
                "Listen carefully to the ancient words and try again.";

        }

    });

});

/* =====================================
   NERIEL - SANATIO POTION
===================================== */

const healNerielButton = document.getElementById("healNeriel");
const nerielHealingFeedback = document.getElementById("nerielHealingFeedback");

if (healNerielButton && nerielHealingFeedback) {

    healNerielButton.addEventListener("click", function() {

        // Prevent healing Neriel more than once
        if (localStorage.getItem("nerielHealed") === "true") {
            nerielHealingFeedback.textContent =
                "Neriel has already been healed. Her silver light shines brightly.";
            healNerielButton.hidden = true;
            return;
        }

        // Read the student's potion inventory
        const inventory = JSON.parse(
            localStorage.getItem("potionInventory") || "{}"
        );

        const sanatioAmount = inventory["Sanatio Potion"] || 0;

        // Check if the student has a Sanatio Potion
        if (sanatioAmount < 1) {
            nerielHealingFeedback.textContent =
                "You do not have a Sanatio Potion. " +
                "Visit the Potions classroom and brew one to heal Neriel.";
            return;
        }

        // Consume one Sanatio Potion
        inventory["Sanatio Potion"] = sanatioAmount - 1;

        localStorage.setItem(
            "potionInventory",
            JSON.stringify(inventory)
        );

        // Save Neriel's healing
        localStorage.setItem("nerielHealed", "true");
        
// Reveal Sirena's reward after healing Neriel
const sirenaReward = document.getElementById("sirenaReward");

if (sirenaReward) {
    sirenaReward.hidden = false;
}


        
// Transform Neriel's appearance
const nerielImage = document.getElementById("nerielImage");

if (nerielImage) {
    nerielImage.src = "images/neriel-healed.png";
    nerielImage.alt = "Neriel, healed and glowing with silver-blue magic";
    nerielImage.classList.add("neriel-glowing");
}

        // Display the result
        nerielHealingFeedback.textContent =
            "You gently pour the Sanatio Potion over Neriel's wounds. " +
            "A soft silver-blue light surrounds her as her injuries disappear. " +
            "Neriel looks up at you, her eyes filled with gratitude.";

        healNerielButton.hidden = true;

    });

}

// Restore Neriel's healed appearance when returning
if (localStorage.getItem("nerielHealed") === "true") {

    const nerielImage = document.getElementById("nerielImage");

    if (nerielImage) {
        nerielImage.src = "images/neriel-healed.png";
        nerielImage.alt = "Neriel, healed and glowing with silver-blue magic";
        nerielImage.classList.add("neriel-glowing");
    }

}

/* =====================================
   SIRENA - BLESSING OF WATER
===================================== */

const claimWaterBlessing = document.getElementById("claimWaterBlessing");
const waterBlessingFeedback = document.getElementById("waterBlessingFeedback");

function restoreWaterBlessing() {

    const healed = localStorage.getItem("nerielHealed") === "true";
    const claimed = localStorage.getItem("blessingWater") === "true";
    const reward = document.getElementById("sirenaReward");

    if (healed && reward) {
        reward.hidden = false;
    }

    if (claimed && claimWaterBlessing) {
        claimWaterBlessing.hidden = true;
        waterBlessingFeedback.textContent =
            "The Blessing of Water is yours. The ocean remembers your kindness.";
    }
    
/* =====================================
   RESTORE SIRENA'S COMPLETED TRIAL
===================================== */

function restoreSirenaTrial() {

    const nerielIsHealed =
        localStorage.getItem("nerielHealed") === "true";

    if (!nerielIsHealed) return;

    // Hide the old rescue scene
    const rescueScene = document.getElementById("nerielRescue");

    if (rescueScene) {
        rescueScene.hidden = true;
    }

    // Hide the original rescue button
    const rescueButton = document.getElementById("beginSirenaTrial");

    if (rescueButton) {
        rescueButton.hidden = true;
    }

    // Show the healed Neriel and Sirena's reward
    const rewardScene = document.getElementById("sirenaReward");

    if (rewardScene) {
        rewardScene.hidden = false;
    }

}

restoreSirenaTrial();

}

if (claimWaterBlessing && waterBlessingFeedback) {

    claimWaterBlessing.addEventListener("click", function() {

        // Prevent claiming the reward more than once
        if (localStorage.getItem("blessingWater") === "true") {
            restoreWaterBlessing();
            return;
        }

        // Neriel must be healed first
        if (localStorage.getItem("nerielHealed") !== "true") {
            return;
        }

        // Save the unique ingredient
        const ingredients = JSON.parse(
            localStorage.getItem("guardianIngredients") || "{}"
        );

        ingredients["Tear of the Tides"] = 1;

        localStorage.setItem(
            "guardianIngredients",
            JSON.stringify(ingredients)
        );

        // Save the guardian's blessing
        localStorage.setItem("blessingWater", "true");

        // Update the reward scene
        restoreWaterBlessing();

    });

}

// Restore the reward when returning to Sirena's realm
restoreWaterBlessing();
