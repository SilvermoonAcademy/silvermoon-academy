// Silvermoon Academy - Cauldron Selection

const standardCauldronButton = document.getElementById("standardCauldron");
const enchantedCauldronButton = document.getElementById("enchantedCauldron");
const enchantedCauldronImage = document.getElementById("enchantedCauldronImage");

// Check purchased items
const purchasedItems = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

const ownsEnchantedCauldron = purchasedItems.includes("enchanted-cauldron");

// Load saved selection
let selectedCauldron = localStorage.getItem("selectedCauldron") || "standard";

// Unlock enchanted cauldron if purchased
if (ownsEnchantedCauldron) {
    enchantedCauldronButton.disabled = false;
    enchantedCauldronButton.textContent = "Enchanted Cauldron";
} else {
    selectedCauldron = "standard";
    localStorage.setItem("selectedCauldron", "standard");
}

// Update button appearance
function updateCauldronSelection() {

    // Highlight the selected cauldron
    standardCauldronButton.classList.toggle(
        "selected",
        selectedCauldron === "standard"
    );

    enchantedCauldronButton.classList.toggle(
        "selected",
        selectedCauldron === "enchanted"
    );

    // Show or hide the enchanted cauldron
    if (enchantedCauldronImage) {
        enchantedCauldronImage.hidden =
            selectedCauldron !== "enchanted";
    }
}

// Select standard cauldron
standardCauldronButton.addEventListener("click", () => {
    selectedCauldron = "standard";
    localStorage.setItem("selectedCauldron", selectedCauldron);
    updateCauldronSelection();
});

// Select enchanted cauldron
enchantedCauldronButton.addEventListener("click", () => {
    if (!ownsEnchantedCauldron) return;

    selectedCauldron = "enchanted";
    localStorage.setItem("selectedCauldron", selectedCauldron);
    updateCauldronSelection();
});

// Apply saved selection
updateCauldronSelection();