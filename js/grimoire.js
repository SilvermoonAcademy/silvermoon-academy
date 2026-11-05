// The Moonbound Grimoire

const openGrimoireButton = document.getElementById("openGrimoire");
const grimoireStatus = document.getElementById("grimoireStatus");

const grimoireModal = document.getElementById("grimoireModal");
const closeGrimoireButton = document.getElementById("closeGrimoire");

const leftPage = document.getElementById("grimoireLeftPage");
const rightPage = document.getElementById("grimoireRightPage");

const previousButton = document.getElementById("previousRecipes");
const nextButton = document.getElementById("nextRecipes");
const pageNumber = document.getElementById("grimoirePageNumber");

// All six potion recipes
const grimoireRecipes = [
    {
        name: "Moonlight Elixir",
        ingredients: ["Starflower", "Moonleaf"],
        image: "images/potion-moonlight-elixir.png",
        description: "A shimmering potion said to restore magical energy."
    },
    {
        name: "Forest Draught",
        ingredients: ["Moonleaf", "Mooncap Mushroom"],
        image: "images/potion-forest-draught.png",
        description: "A mysterious green potion made from enchanted herbs."
    },
    {
        name: "Phoenix Essence",
        ingredients: ["Starflower", "Ember Root"],
        image: "images/potion-phoenix-essence.png",
        description: "A rare potion containing a spark of phoenix magic."
    },
    {
        name: "Amoria Potion",
        ingredients: ["Starflower", "Heart Kelp"],
        image: "images/potion-amoria.png",
        description: "A magical potion associated with love and affection."
    },
    {
        name: "Armatura Potion",
        ingredients: ["Mooncap Mushroom", "Gorgon Scale"],
        image: "images/potion-armatura.png",
        description: "A protective potion that temporarily hardens the drinker's skin like stone."
    },
    {
        name: "Sanatio Potion",
        ingredients: ["Moonleaf", "Unicorn Hair"],
        image: "images/potion-sanatio.png",
        description: "A restorative potion used to heal minor magical injuries."
    }
];

// Each spread shows two recipes
let currentRecipeIndex = 0;

function createRecipePage(recipe) {

    const ingredientImages = {
        "Moonleaf": "ingredient-moonleaf.png",
        "Mooncap Mushroom": "ingredient-mooncap-mushroom.png",
        "Starflower": "ingredient-starflower.png",
        "Ember Root": "ingredient-ember-root.png",
        "Heart Kelp": "ingredient-heart-kelp.png",
        "Gorgon Scale": "ingredient-gorgon-scale.png",
        "Unicorn Hair": "ingredient-unicorn-hair.png"
    };

    const ingredientsHTML = recipe.ingredients.map(ingredient => {
        return `
            <div class="grimoire-ingredient">
                <img
                    src="images/${ingredientImages[ingredient]}"
                    alt="${ingredient}"
                >
                <span>${ingredient}</span>
            </div>
        `;
    }).join("");

    return `
        <h3>${recipe.name}</h3>

        <img
            src="${recipe.image}"
            alt="${recipe.name}"
            class="grimoire-potion-image"
        >

        <p>${recipe.description}</p>

        <h4>Ingredients</h4>

        <div class="grimoire-ingredients">
            ${ingredientsHTML}
        </div>
    `;
}

function displayGrimoirePages() {
    const firstRecipe = grimoireRecipes[currentRecipeIndex];
    const secondRecipe = grimoireRecipes[currentRecipeIndex + 1];

    leftPage.innerHTML = createRecipePage(firstRecipe);

    rightPage.innerHTML = secondRecipe
        ? createRecipePage(secondRecipe)
        : "";

    pageNumber.textContent =
        `Pages ${currentRecipeIndex + 1}–${Math.min(currentRecipeIndex + 2, grimoireRecipes.length)}`;

    previousButton.disabled = currentRecipeIndex === 0;

    nextButton.disabled =
        currentRecipeIndex + 2 >= grimoireRecipes.length;
}

// Check whether the book has been purchased
const ownedStoreItems = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

const ownsGrimoire = ownedStoreItems.includes("moonbound-grimoire");

if (openGrimoireButton && grimoireStatus) {

    if (!ownsGrimoire) {
        openGrimoireButton.textContent = "Locked";
        openGrimoireButton.disabled = true;

        grimoireStatus.textContent =
            "Purchase The Moonbound Grimoire at The Whispering Crescent to unlock its secrets.";

    } else {
        openGrimoireButton.textContent = "Open Grimoire";

        grimoireStatus.textContent =
            "All six potion recipes await within.";

        openGrimoireButton.addEventListener("click", () => {
            currentRecipeIndex = 0;
            displayGrimoirePages();
            grimoireModal.hidden = false;
        });
    }
}

// Close the book
closeGrimoireButton.addEventListener("click", () => {
    grimoireModal.hidden = true;
});

// Previous two recipes
previousButton.addEventListener("click", () => {
    if (currentRecipeIndex >= 2) {
        currentRecipeIndex -= 2;
        displayGrimoirePages();
    }
});

// Next two recipes
nextButton.addEventListener("click", () => {
    if (currentRecipeIndex + 2 < grimoireRecipes.length) {
        currentRecipeIndex += 2;
        displayGrimoirePages();
    }
});

// Close when clicking outside the book
grimoireModal.addEventListener("click", (event) => {
    if (event.target === grimoireModal) {
        grimoireModal.hidden = true;
    }
});