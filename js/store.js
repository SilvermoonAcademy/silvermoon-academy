const familiarTokenButton = document.getElementById("buyFamiliarToken");

function buyFamiliarToken() {
    const price = 25;
    const currentCoins = Number(localStorage.getItem("coinBalance") || 0);

    if (localStorage.getItem("familiarBondToken") === "true") {
        showStorePopup("Already Purchased", "You already own this token!");
        return;
    }

    if (currentCoins < price) {
        showStorePopup("Not Enough Coins", "You need 25 coins to purchase this item.");
        return;
    }

    const newBalance = currentCoins - price;

    localStorage.setItem("coinBalance", newBalance);
    localStorage.setItem("familiarBondToken", "true");

    document.getElementById("coinBalance").textContent = newBalance;

    familiarTokenButton.textContent = "Purchased";
    familiarTokenButton.disabled = true;

    showStorePopup(
    "A Magical Bond Awaits!",
    "The Familiar Bond Token is now yours! Your journey toward finding your magical companion can begin.",
    true
);
}

if (familiarTokenButton) {
    familiarTokenButton.addEventListener("click", buyFamiliarToken);

    if (localStorage.getItem("familiarBondToken") === "true") {
        familiarTokenButton.textContent = "Purchased";
        familiarTokenButton.disabled = true;
    }
}
// Magical purchase popup

const storePopup = document.getElementById("storePopup");
const storePopupTitle = document.getElementById("storePopupTitle");
const storePopupMessage = document.getElementById("storePopupMessage");
const closeStorePopup = document.getElementById("closeStorePopup");

function showStorePopup(title, message, showRitualButton = false) {
    const popupImage = document.querySelector(".store-popup-image");


    storePopupTitle.textContent = title;
    storePopupMessage.textContent = message;

    goToFamiliarRitual.hidden = !showRitualButton;

    closeStorePopup.textContent =
        showRitualButton ? "Continue Shopping" : "Close";

    storePopup.classList.add("show");
}
const goToFamiliarRitual =
    document.getElementById("goToFamiliarRitual");

closeStorePopup.addEventListener("click", function () {
    storePopup.classList.remove("show");
});

goToFamiliarRitual.addEventListener("click", function () {
    window.location.href = "familiar-ritual.html";
});
// Wands & Staffs

const magicalEquipment = {
    "tidewood-wand": {
        name: "Tidewood Wand",
        price: 20
    },
    "stormflame-wand": {
        name: "Stormflame Wand",
        price: 30
    },
    "celestial-wand": {
        name: "Celestial Wand",
        price: 45
    },
    "mistweaver-staff": {
        name: "Mistweaver Staff",
        price: 35
    },
    "ashforge-staff": {
        name: "Ashforge Staff",
        price: 50
    },
    "celestial-staff": {
        name: "Celestial Staff",
        price: 75
    },
    "moon-amulet": {
    name: "Moon Amulet",
    price: 15
},
"enchanted-cauldron": {
    name: "Enchanted Cauldron",
    price: 35
},
"moonbound-grimoire": {
    name: "The Moonbound Grimoire",
    price: 20
},
"crystal-ball": {
    name: "Crystal Ball",
    price: 40
},
"orb-of-forgotten-stars": {
    name: "The Orb of Forgotten Stars",
    price: 100
},
"house-crest": {
    name: "House Crest",
    price: 20
},
"moonlit-library": {
    name: "Moonlit Library",
    price: 30
},
"crystal-cavern": {
    name: "Crystal Cavern",
    price: 30
},
"astral-observatory": {
    name: "Astral Observatory",
    price: 30
},
"elementorumia": {
    name: "Elementorumia",
    price: 30
},
"whispering-glade": {
    name: "Whispering Glade",
    price: 30
},
"celestial-gardens": {
    name: "Celestial Gardens",
    price: 30
}
};

// Read previously purchased equipment
let ownedEquipment = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

// Connect the six Buy buttons
document.querySelectorAll("[data-item]").forEach(button => {

    const itemId = button.dataset.item;
    const item = magicalEquipment[itemId];

    if (!item) return;

    // Already purchased
    if (ownedEquipment.includes(itemId)) {
        button.textContent = "Purchased";
        button.disabled = true;
    }

    button.addEventListener("click", function () {

        if (ownedEquipment.includes(itemId)) {
            return;
        }

        const currentCoins = Number(
            localStorage.getItem("coinBalance") || 0
        );

        if (currentCoins < item.price) {
            showStorePopup(
                "Not Enough Coins",
                `You need ${item.price} coins to purchase ${item.name}.`
            );
            return;
        }

        // Deduct coins
        const newBalance = currentCoins - item.price;

        localStorage.setItem("coinBalance", newBalance);
        document.getElementById("coinBalance").textContent = newBalance;

        // Save purchased equipment
        ownedEquipment.push(itemId);

        localStorage.setItem(
            "ownedEquipment",
            JSON.stringify(ownedEquipment)
        );

        // Update button
        button.textContent = "Purchased";
        button.disabled = true;

        // Purchase confirmation
        showEquipmentPopup(
    "A Magical Purchase!",
    `${item.name} is now yours! You can equip it from your profile.`,
    itemId
);

    });

});
function showEquipmentPopup(title, message, itemId) {
    const popupImage = document.querySelector(".store-popup-image");

    if (popupImage) {

        if (itemId === "house-crest") {
            const house = localStorage.getItem("studentHouse");

            popupImage.src = houseCrestImages[house] || "images/silvermoon-crest.png";

            popupImage.alt = houseCrestImages[house]
                ? `${house} House Crest`
                : "Silvermoon Academy Crest";

        } else {
            popupImage.src = `images/${itemId}.png`;
            popupImage.alt = magicalEquipment[itemId].name;
        }
    }

    showStorePopup(title, message);
}
// Display the student's House Crest in the store

const houseCrestImages = {
    Serenia: "images/serenia-crest.png",
    Caeloria: "images/caeloria-crest.png",
    Eldergard: "images/eldergard-crest.png",
    Kaelthorn: "images/kaelthorn-crest.png"
};

const studentHouse = localStorage.getItem("studentHouse");
const houseCrestImage = document.getElementById("storeHouseCrestImage");

if (houseCrestImage) {

    houseCrestImage.src =
        houseCrestImages[studentHouse] || "images/silvermoon-crest.png";

    houseCrestImage.alt = houseCrestImages[studentHouse]
        ? `${studentHouse} House Crest`
        : "Silvermoon Academy Crest";
}
/* =====================================
   THE ALCHEMIST'S SUPPLIES
===================================== */

const alchemistIngredients = {
    "Moonleaf": 2,
    "Mooncap Mushroom": 2,
    "Starflower": 3,
    "Ember Root": 4,
    "Heart Kelp": 6,
    "Gorgon Scale": 15,
    "Unicorn Hair": 15
};

const alchemistIngredientImages = {
    "Moonleaf": "images/ingredient-moonleaf.png",
    "Mooncap Mushroom": "images/ingredient-mooncap-mushroom.png",
    "Starflower": "images/ingredient-starflower.png",
    "Ember Root": "images/ingredient-ember-root.png",
    "Heart Kelp": "images/ingredient-heart-kelp.png",
    "Gorgon Scale": "images/ingredient-gorgon-scale.png",
    "Unicorn Hair": "images/ingredient-unicorn-hair.png"
};


/* =====================================
   DISPLAY ALCHEMIST INGREDIENTS
===================================== */

const alchemistProducts = document.getElementById("alchemistProducts");

function displayAlchemistIngredients() {

    if (!alchemistProducts) return;

    const inventory = JSON.parse(
        localStorage.getItem("potionIngredients") || "{}"
    );

    alchemistProducts.innerHTML = "";

    for (const [ingredient, price] of Object.entries(alchemistIngredients)) {

        const owned = inventory[ingredient] ?? 0;

        const card = document.createElement("div");
        card.classList.add("store-card");

        
const ingredientImage = document.createElement("img");

ingredientImage.src = alchemistIngredientImages[ingredient];
ingredientImage.alt = ingredient;
ingredientImage.classList.add("store-item-image");

        const title = document.createElement("h3");
        title.textContent = ingredient;

        const priceText = document.createElement("p");
        priceText.classList.add("store-price");
        priceText.textContent = price + " Coins";

        const ownedText = document.createElement("p");
        ownedText.textContent = "Owned: " + owned;

        const buyButton = document.createElement("button");
        buyButton.classList.add("store-buy-button");
        buyButton.textContent = "Buy";
        
buyButton.addEventListener("click", function() {

    const currentCoins = Number(
        localStorage.getItem("coinBalance") || 0
    );

    // Check if the student has enough coins
    if (currentCoins < price) {
        showStorePopup(
            "Not Enough Coins",
            "You need " + price + " coins to buy " + ingredient + "."
        );
        return;
    }

    // Deduct the price
    const newBalance = currentCoins - price;

    localStorage.setItem("coinBalance", newBalance);

    document.getElementById("coinBalance").textContent =
        newBalance;

    // Add one ingredient to the inventory
    const currentInventory = JSON.parse(
        localStorage.getItem("potionIngredients") || "{}"
    );

    currentInventory[ingredient] =
        (currentInventory[ingredient] || 0) + 1;

    localStorage.setItem(
        "potionIngredients",
        JSON.stringify(currentInventory)
    );

    // Update ingredient cards
    displayAlchemistIngredients();

    
 // Show the purchased ingredient in the popup
const popupImage = document.querySelector(".store-popup-image");

if (popupImage) {
    popupImage.src = alchemistIngredientImages[ingredient];
    popupImage.alt = ingredient;
}

// Purchase confirmation
showStorePopup(
    "Purchase Complete!",
    "You purchased 1 " + ingredient + " for " + price + " coins."
);


});

        
card.appendChild(ingredientImage);
card.appendChild(title);
card.appendChild(priceText);
card.appendChild(ownedText);
card.appendChild(buyButton);


        alchemistProducts.appendChild(card);
    }
}

displayAlchemistIngredients();
