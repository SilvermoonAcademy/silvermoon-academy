
// =====================================
// SILVERMOON POTION INVENTORY
// =====================================

const startingIngredients = {
    "Moonleaf": 3,
    "Mooncap Mushroom": 3,
    "Starflower": 3,
    "Ember Root": 3,
    "Heart Kelp": 3,
    "Gorgon Scale": 1,
    "Unicorn Hair": 1
};

const startingPotions = {
    "Moonlight Elixir": 0,
    "Forest Draught": 0,
    "Phoenix Essence": 0,
    "Amoria Potion": 0,
    "Armatura Potion": 0,
    "Sanatio Potion": 0
};

// Give the student a starter supply only once
if (localStorage.getItem("potionIngredients") === null) {
    localStorage.setItem(
        "potionIngredients",
        JSON.stringify(startingIngredients)
    );
}

// Create an empty potion collection only once
if (localStorage.getItem("potionInventory") === null) {
    localStorage.setItem(
        "potionInventory",
        JSON.stringify(startingPotions)
    );
}

// Load the student's inventory
let potionIngredients = JSON.parse(
    localStorage.getItem("potionIngredients")
);

let potionInventory = JSON.parse(
    localStorage.getItem("potionInventory")
);


const ingredientButtons = document.querySelectorAll(".ingredients button");

function updateIngredientDisplay() {

    ingredientButtons.forEach(function(button) {

        const ingredient =
            button.dataset.ingredient || button.textContent.trim();

        let counter = button.querySelector(".ingredient-count");

        if (!counter) {
            counter = document.createElement("span");
            counter.classList.add("ingredient-count");
            button.appendChild(counter);
        }

        const amount = potionIngredients[ingredient] ?? 0;

        counter.textContent = "×" + amount;

        button.classList.toggle("out-of-stock", amount === 0);
    });
}

updateIngredientDisplay();


const potionResult = document.getElementById("potionResult");
const brewedPotion = document.getElementById("brewedPotion");
const brewedPotionImage = document.getElementById("brewedPotionImage");

let selectedIngredients = [];
    const potionRecipes = {
    "Starflower|Moonleaf": "Moonlight Elixir",
    "Moonleaf|Mooncap Mushroom": "Forest Draught",
    "Starflower|Ember Root": "Phoenix Essence",
    "Starflower|Heart Kelp": "Amoria Potion",
    "Mooncap Mushroom|Gorgon Scale": "Armatura Potion",
    "Moonleaf|Unicorn Hair": "Sanatio Potion"
};

ingredientButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const ingredient = button.dataset.ingredient;

        // Prevent brewing while ingredients are being reset
        if (selectedIngredients.length >= 2) {
            return;
        }

        // Check ingredient stock
        const alreadySelected = selectedIngredients.filter(
            item => item === ingredient
        ).length;

        if ((potionIngredients[ingredient] ?? 0) <= alreadySelected) {
            potionResult.textContent =
                "You don't have enough " + ingredient +
                ". Visit the Academy Store for more ingredients.";
            return;
        }

        button.classList.add("selected");
        selectedIngredients.push(ingredient);

        // Wait for the second ingredient
        if (selectedIngredients.length === 1) {

            brewedPotion.style.display = "none";
            brewedPotion.classList.remove("show");

            potionResult.textContent =
                ingredient + " selected. Choose one more ingredient.";

            return;
        }

        const firstIngredient = selectedIngredients[0];
        const secondIngredient = selectedIngredients[1];

        const recipeKey1 =
            firstIngredient + "|" + secondIngredient;

        const recipeKey2 =
            secondIngredient + "|" + firstIngredient;

        const potion =
            potionRecipes[recipeKey1] ||
            potionRecipes[recipeKey2];

        if (potion) {

            // Consume both ingredients
            selectedIngredients.forEach(function(item) {
                potionIngredients[item]--;
            });

            localStorage.setItem(
                "potionIngredients",
                JSON.stringify(potionIngredients)
            );

            // Store the finished potion
            potionInventory[potion] =
                (potionInventory[potion] || 0) + 1;

            localStorage.setItem(
                "potionInventory",
                JSON.stringify(potionInventory)
            );

            updateIngredientDisplay();

            potionResult.textContent =
                potion + " successfully brewed!";

            // Achievement
            localStorage.setItem(
                "achievementPotionNovice",
                "true"
            );

            
/* =====================================
   POTION MASTER - BREWING PROGRESS
===================================== */

// Count every successfully brewed potion
const totalPotionsBrewed =
    Number(localStorage.getItem("totalPotionsBrewed")) || 0;

const updatedPotionCount = totalPotionsBrewed + 1;

localStorage.setItem(
    "totalPotionsBrewed",
    updatedPotionCount.toString()
);

// Unlock Potion Master after 10 potions
if (updatedPotionCount >= 10) {
    localStorage.setItem(
        "achievementPotionMaster",
        "true"
    );
}

            // Chapter II - The Forgotten Element
            const currentChapter = localStorage.getItem(
                "forgottenPropheciesChapter"
            );

            const prophecyTrialActive = localStorage.getItem(
                "forgottenProphecyTrialActive"
            );

            if (
                currentChapter === "2" &&
                prophecyTrialActive === "true" &&
                potion === "Sanatio Potion"
            ) {

                localStorage.setItem(
                    "forgottenPropheciesChapter",
                    "3"
                );

                localStorage.removeItem(
                    "forgottenProphecyTrialActive"
                );

                potionResult.textContent =
                    "Sanatio Potion! The wounds of the past begin to heal. " +
                    "Beneath the place where four once stood, " +
                    "something ancient stirs...";
            }

            // Potion images
            const potionImages = {
                "Moonlight Elixir": "images/potion-moonlight-elixir.png",
                "Forest Draught": "images/potion-forest-draught.png",
                "Phoenix Essence": "images/potion-phoenix-essence.png",
                "Amoria Potion": "images/potion-amoria.png",
                "Armatura Potion": "images/potion-armatura.png",
                "Sanatio Potion": "images/potion-sanatio.png"
            };

            brewedPotionImage.src = potionImages[potion];

            brewedPotion.style.display = "flex";
            brewedPotion.classList.remove("show");

            void brewedPotion.offsetWidth;

            brewedPotion.classList.add("show");

        } else {

            brewedPotion.style.display = "none";
            brewedPotion.classList.remove("show");

            potionResult.textContent =
                "Nothing happened... Try another combination.";
        }

        // Result animation
        potionResult.classList.remove("show");

        void potionResult.offsetWidth;

        potionResult.classList.add("show");

        // Reset selected ingredients
        setTimeout(function() {

            selectedIngredients = [];

            ingredientButtons.forEach(function(button) {
                button.classList.remove("selected");
            });

        }, 1500);

    });

});
