
/* =====================================
   SILVERMOON - PROFILE POTION INVENTORY
===================================== */

const profilePotionGrid = document.getElementById("profilePotionGrid");

const profilePotionImages = {
    "Moonlight Elixir": "images/potion-moonlight-elixir.png",
    "Forest Draught": "images/potion-forest-draught.png",
    "Phoenix Essence": "images/potion-phoenix-essence.png",
    "Amoria Potion": "images/potion-amoria.png",
    "Armatura Potion": "images/potion-armatura.png",
    "Sanatio Potion": "images/potion-sanatio.png"
};

function displayProfilePotions() {

    if (!profilePotionGrid) return;

    const savedPotions = JSON.parse(
        localStorage.getItem("potionInventory") || "{}"
    );

    profilePotionGrid.innerHTML = "";

    for (const [potionName, imagePath] of Object.entries(profilePotionImages)) {

        const amount = savedPotions[potionName] ?? 0;

        const potionCard = document.createElement("div");
        potionCard.classList.add("profile-potion-card");

        if (amount === 0) {
            potionCard.classList.add("empty-potion");
        }

        const potionImage = document.createElement("img");
        potionImage.src = imagePath;
        potionImage.alt = potionName;

        const potionTitle = document.createElement("span");
        potionTitle.textContent = potionName;

        const potionCount = document.createElement("strong");
        potionCount.textContent = "×" + amount;

        potionCard.appendChild(potionImage);
        potionCard.appendChild(potionTitle);
        potionCard.appendChild(potionCount);

        profilePotionGrid.appendChild(potionCard);
    }
}

displayProfilePotions();
