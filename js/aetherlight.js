
/* =====================================
   AETHERLIGHT - SACRED INGREDIENTS
===================================== */

const sacredIngredients = [
    "Tear of the Tides",
    "Liquid Fire",
    "Seed of Eternity",
    "Celestial Feather"
];

let guardianIngredients = {};

try {
    guardianIngredients = JSON.parse(
        localStorage.getItem("guardianIngredients") || "{}"
    ) || {};
} catch (error) {
    console.warn("Could not load guardian ingredients.", error);
}

const ingredientButtons =
    document.querySelectorAll(".aether-ingredient");

ingredientButtons.forEach(button => {

    const ingredientName = button.dataset.ingredient;

    const hasIngredient =
        Number(guardianIngredients[ingredientName]) > 0;

    if (hasIngredient) {
        button.classList.add("ingredient-owned");
        button.title = "Ingredient collected";
    } else {
        button.classList.add("ingredient-missing");
        button.title = "Ingredient not yet collected";
    }

});

const allIngredientsCollected = sacredIngredients.every(
    ingredient => Number(guardianIngredients[ingredient]) > 0
);

console.log(
    "All sacred ingredients collected:",
    allIngredientsCollected
);

/* =====================================
   AETHERLIGHT - BREWING INTERACTION
===================================== */

const brewingChamber =
    document.querySelector(".aetherlight-chamber");

let brewingInProgress = false;


/* SAVE BREWING PROGRESS */

const brewingStorageKey = "aetherlightBrewingProgress";

let brewingProgress = [];

try {
    const savedProgress = JSON.parse(
        localStorage.getItem(brewingStorageKey) || "[]"
    );

    if (Array.isArray(savedProgress)) {
        brewingProgress = savedProgress.filter(
            ingredient => sacredIngredients.includes(ingredient)
        );
    }
} catch (error) {
    console.warn("Could not load brewing progress.", error);
}

/* RESTORE INGREDIENTS AFTER RELOAD */

ingredientButtons.forEach(button => {
    const ingredientName = button.dataset.ingredient;

    if (brewingProgress.includes(ingredientName)) {
        button.style.visibility = "hidden";
        button.disabled = true;
    }
});


const cauldronGlow =
    document.getElementById("aetherCauldronGlow");

const ingredientElements = {
    "Tear of the Tides": "water",
    "Liquid Fire": "fire",
    "Seed of Eternity": "earth",
    "Celestial Feather": "wind"
};

function activateCauldronGlow(ingredientName) {

    if (!cauldronGlow) return;

    const element = ingredientElements[ingredientName];

    cauldronGlow.className =
        `aether-cauldron-glow glow-${element}`;

    // Restart the animation
    void cauldronGlow.offsetWidth;

    cauldronGlow.classList.add("glow-active");
}

ingredientButtons.forEach(button => {

    const ingredientName = button.dataset.ingredient;
    const hasIngredient =
        Number(guardianIngredients[ingredientName]) > 0;

    // Only collected ingredients can be used
    button.disabled =
    !hasIngredient || brewingProgress.includes(ingredientName);

    if (!hasIngredient) return;

    button.title = `Add ${ingredientName} to the cauldron`;

    button.addEventListener("click", function() {

        if (brewingInProgress) return;

        brewingInProgress = true;

        // Calculate the movement toward the cauldron
        const ingredientImage =
            button.querySelector(".ingredient-image");

        const imageRect =
            ingredientImage.getBoundingClientRect();

        const chamberRect =
            brewingChamber.getBoundingClientRect();

        const ingredientX =
            imageRect.left + imageRect.width / 2;

        const ingredientY =
            imageRect.top + imageRect.height / 2;

        // Cauldron opening in the background image
        const targetX =
            chamberRect.left + chamberRect.width * 0.5;

        const targetY =
            chamberRect.top + chamberRect.height * 0.39;

        ingredientImage.style.setProperty(
            "--brew-x",
            `${targetX - ingredientX}px`
        );

        ingredientImage.style.setProperty(
            "--brew-y",
            `${targetY - ingredientY}px`
        );

        button.classList.add("ingredient-brewing");

        setTimeout(() => {

            button.style.visibility = "hidden";

            
if (!brewingProgress.includes(ingredientName)) {

    brewingProgress.push(ingredientName);

    localStorage.setItem(
        brewingStorageKey,
        JSON.stringify(brewingProgress)
    );

}

button.disabled = true;

console.log(
    "Aetherlight brewing progress:",
    brewingProgress.length,
    "/ 4"
);

if (brewingProgress.length === sacredIngredients.length) {
    awakenAetherlight();
}


            brewingChamber.classList.add(
                "cauldron-awakened"
            );

            activateCauldronGlow(ingredientName);

            setTimeout(() => {
                brewingChamber.classList.remove(
                    "cauldron-awakened"
                );

                brewingInProgress = false;
            }, 800);

        }, 1500);

    });

});

/* =====================================
   AETHERLIGHT - FINAL AWAKENING
===================================== */

const aetherlightAwakening =
    document.getElementById("aetherlightAwakening");

function awakenAetherlight() {

    if (!aetherlightAwakening) return;

    aetherlightAwakening.hidden = false;

    localStorage.setItem(
        "aetherlightBrewed",
        "true"
    );
}

/* Restore the completed elixir after reload */
if (brewingProgress.length === sacredIngredients.length) {
    awakenAetherlight();
}

/* =====================================
   AETHERLIGHT - CLAIM ELIXIR
===================================== */

const claimAetherlightButton =
    document.getElementById("claimAetherlight");

const aetherlightClaimMessage =
    document.getElementById("aetherlightClaimMessage");

function restoreAetherlightClaim() {

    const alreadyClaimed =
        localStorage.getItem("aetherlightClaimed") === "true";

    if (alreadyClaimed) {
        claimAetherlightButton.disabled = true;
        claimAetherlightButton.textContent = "Elixir Claimed";

        aetherlightClaimMessage.textContent =
            "The Aetherlight Elixir is yours. " +
            "The Heart of Aether awaits.";
    }
}

if (claimAetherlightButton && aetherlightClaimMessage) {

    claimAetherlightButton.addEventListener("click", function() {

        const brewed =
            localStorage.getItem("aetherlightBrewed") === "true";

        const allFourIngredientsUsed =
            sacredIngredients.every(ingredient =>
                brewingProgress.includes(ingredient)
            );

        if (!brewed || !allFourIngredientsUsed) return;

        if (localStorage.getItem("aetherlightClaimed") === "true") {
            return;
        }

        localStorage.setItem("aetherlightClaimed", "true");

        restoreAetherlightClaim();
    });

    restoreAetherlightClaim();
}
