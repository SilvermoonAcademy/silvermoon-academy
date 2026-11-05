
/* =====================================
   KERAON - THE BURNING PASSAGE
===================================== */

const beginKeraonTrial = document.getElementById("beginKeraonTrial");
const keraonTrial = document.getElementById("keraonTrial");
const useArmaturaPotion = document.getElementById("useArmaturaPotion");
const keraonPotionFeedback = document.getElementById("keraonPotionFeedback");

// Restore progress when returning to the realm
function restoreKeraonTrial() {

    const protectedByArmatura =
        localStorage.getItem("keraonProtected") === "true";

    if (protectedByArmatura) {
        beginKeraonTrial.hidden = true;
        keraonTrial.hidden = false;
        useArmaturaPotion.hidden = true;

        keraonPotionFeedback.textContent =
            "The ancient protection of Armatura still surrounds you. The passage is safe.";
    }
}

// Enter the burning passage
beginKeraonTrial.addEventListener("click", function() {

    keraonTrial.hidden = false;
    beginKeraonTrial.hidden = true;

    keraonTrial.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// Use Armatura Potion
useArmaturaPotion.addEventListener("click", function() {

    const inventory = JSON.parse(
        localStorage.getItem("potionInventory") || "{}"
    );

    if (!inventory["Armatura Potion"] ||
        inventory["Armatura Potion"] < 1) {

        keraonPotionFeedback.textContent =
            "You need an Armatura Potion to survive the burning passage. Return to the academy and brew one.";

        return;
    }

    // Consume one potion
    inventory["Armatura Potion"] -= 1;

    localStorage.setItem(
        "potionInventory",
        JSON.stringify(inventory)
    );

    // Save progress
    localStorage.setItem("keraonProtected", "true");

    revealKeraonChamber();

    useArmaturaPotion.hidden = true;

    keraonPotionFeedback.textContent =
        "The Armatura Potion surrounds you with a shimmering shield of ancient magic. The flames part before you, revealing the path into the mountain.";

});

// Restore saved progress
restoreKeraonTrial();

/* =====================================
   KERAON - THE THREE SEALS
===================================== */

const keraonChamber = document.getElementById("keraonChamber");
const keraonSeals = document.querySelectorAll(".keraon-seal");
const keraonSealFeedback = document.getElementById("keraonSealFeedback");

const correctSealOrder = ["courage", "strength", "eternity"];

let currentSealIndex = 0;

// Restore activated seals
function restoreKeraonSeals() {

    const completed =
        localStorage.getItem("keraonSealsCompleted") === "true";

    if (completed) {

        
const chamberImage = document.getElementById("keraonChamberImage");

if (chamberImage) {
    chamberImage.src = "images/keraon-chamber-restored.png";
    chamberImage.alt = "The Eternal Flame has been restored";
}

        currentSealIndex = correctSealOrder.length;

        keraonSeals.forEach(function(seal) {
            seal.classList.add("activated");
            seal.disabled = true;
        });

        keraonSealFeedback.textContent =
            "The three ancient seals shine together. The Eternal Flame has been restored.";
    }
}

// Handle seal clicks
keraonSeals.forEach(function(seal) {

    seal.addEventListener("click", function() {

        const selectedSeal = seal.dataset.seal;

        if (selectedSeal === correctSealOrder[currentSealIndex]) {

            seal.classList.add("activated");
            seal.disabled = true;

            currentSealIndex++;

            if (currentSealIndex === correctSealOrder.length) {

                localStorage.setItem(
                    "keraonSealsCompleted",
                    "true"
                );

// Reveal Keraon's reward
const keraonReward = document.getElementById("keraonReward");

if (keraonReward) {
    keraonReward.hidden = false;
}

                
const chamberImage = document.getElementById("keraonChamberImage");

if (chamberImage) {
    chamberImage.src = "images/keraon-chamber-restored.png";
    chamberImage.alt = "The Eternal Flame has been restored";
}

                keraonSealFeedback.textContent =
                    "The final seal ignites! A pillar of golden fire rises from the ancient altar. The Eternal Flame burns once more!";

            } else {

                keraonSealFeedback.textContent =
                    "The ancient seal awakens. The flames respond to your courage.";

            }

        } else {

            currentSealIndex = 0;

            keraonSeals.forEach(function(button) {
                button.classList.remove("activated");
                button.disabled = false;
            });

            keraonSealFeedback.textContent =
                "The seals flicker and fade. Their harmony has been broken. Try again.";

        }

    });

});

// Reveal the chamber when Armatura protection is active
function revealKeraonChamber() {

    const protectedByArmatura =
        localStorage.getItem("keraonProtected") === "true";

    if (protectedByArmatura && keraonChamber) {
        keraonChamber.hidden = false;
    }

}

// Restore saved progress
revealKeraonChamber();
restoreKeraonSeals();

/* =====================================
   KERAON - BLESSING OF FIRE
===================================== */

const claimFireBlessing = document.getElementById("claimFireBlessing");
const fireBlessingFeedback = document.getElementById("fireBlessingFeedback");

// Restore Keraon's reward when returning
function restoreFireBlessing() {

    const sealsCompleted =
        localStorage.getItem("keraonSealsCompleted") === "true";

    const blessingClaimed =
        localStorage.getItem("blessingFire") === "true";

    const reward = document.getElementById("keraonReward");

    if (sealsCompleted && reward) {
        reward.hidden = false;
    }

    if (blessingClaimed && claimFireBlessing) {

        claimFireBlessing.hidden = true;

        fireBlessingFeedback.textContent =
            "The Blessing of Fire is yours. The Eternal Flame burns within your spirit.";
    }
}

// Claim Keraon's blessing
if (claimFireBlessing && fireBlessingFeedback) {

    claimFireBlessing.addEventListener("click", function() {

        // Prevent duplicate rewards
        if (localStorage.getItem("blessingFire") === "true") {
            restoreFireBlessing();
            return;
        }

        // The seals must be restored first
        if (localStorage.getItem("keraonSealsCompleted") !== "true") {
            return;
        }

        // Save the unique guardian ingredient
        const ingredients = JSON.parse(
            localStorage.getItem("guardianIngredients") || "{}"
        );

        ingredients["Liquid Fire"] = 1;

        localStorage.setItem(
            "guardianIngredients",
            JSON.stringify(ingredients)
        );

        // Save the blessing
        localStorage.setItem("blessingFire", "true");

        // Update the reward scene
        restoreFireBlessing();

    });
}

// Restore progress when loading the page
restoreFireBlessing();
