const roleButtons = document.querySelectorAll(".role-options button");

let selectedRole = "";

roleButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        roleButtons.forEach(function(option) {
            option.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedRole = button.dataset.role;

    });

});

const studentName = document.getElementById("studentName");
const saveProfile = document.getElementById("saveProfile");
const profileMessage = document.getElementById("profileMessage");
const profileBackground = document.getElementById("profileBackground");
const profileHat = document.getElementById("profileHat");

saveProfile.addEventListener("click", function() {

    const name = studentName.value.trim();
    const background = profileBackground.value;
    const hat = profileHat.value;
    // Free academy backgrounds
const freeBackgrounds = [
    "student-room",
    "enchanted-forest",
    "silvermoon-lake"
];

// Purchased magical items
const ownedBackgrounds = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

// All valid magical backgrounds
const magicalBackgrounds = [
    "moonlit-library",
    "crystal-cavern",
    "astral-observatory",
    "elementorumia",
    "whispering-glade",
    "celestial-gardens"
];

// Check if the selected background is allowed
const isFree = freeBackgrounds.includes(background);

const isPurchased =
    magicalBackgrounds.includes(background) &&
    ownedBackgrounds.includes(background);

if (background !== "" && !isFree && !isPurchased) {
    profileMessage.textContent =
        "🔒 This magical background must be purchased from The Whispering Crescent.";
    return;
}

    if (
    name === "" ||
    selectedRole === "" ||
    background === "" ||
    hat === ""
    ) {
    profileMessage.textContent =
        "✨ Please complete all profile options.";
    return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentRole", selectedRole);
    localStorage.setItem("profileBackground", background);
    localStorage.setItem("profileHat", hat);

    profileMessage.textContent =
        "🌙 Welcome to Silvermoon Academy, " +
        name +
        " the " +
        selectedRole +
        "!";
        loadProfile();
});
const studentProfile = document.getElementById("studentProfile");
const displayName = document.getElementById("displayName");
const displayRole = document.getElementById("displayRole");
const profileAvatar = document.getElementById("profileAvatar");
const profileCoins = document.getElementById("profileCoins");
const profileSetup = document.getElementById("profileSetup");
const editProfile = document.getElementById("editProfile");
const profileHouse = document.getElementById("profileHouse");
const takeHouseTrial = document.getElementById("takeHouseTrial");

function loadProfile() {

    const savedName = localStorage.getItem("studentName");
    const savedRole = localStorage.getItem("studentRole");
    const savedCoins = localStorage.getItem("coinBalance") || 0;
    const savedHouse = localStorage.getItem("studentHouse");
    const savedBackground = localStorage.getItem("profileBackground");

    if (savedName && savedRole) {

    profileSetup.style.display = "none";
    studentProfile.style.display = "block";

    displayName.textContent = savedName;
    displayRole.textContent = savedRole;
    profileCoins.textContent = savedCoins;
    saveProfile.textContent = "Create Profile";

    if (savedHouse) {
    profileHouse.textContent = savedHouse;
    takeHouseTrial.style.display = "none";
} else {
    profileHouse.textContent = "Not Assigned";
    takeHouseTrial.style.display = "inline-block";
}
    const savedHat = localStorage.getItem("profileHat");

let avatarImage = "";

if (savedRole === "Witch" && savedHat === "hat") {
    avatarImage = "images/profile-witch-hat.png";
} else if (savedRole === "Witch" && savedHat === "no-hat") {
    avatarImage = "images/profile-witch-no-hat.png";
} else if (savedRole === "Wizard" && savedHat === "hat") {
    avatarImage = "images/profile-wizard-hat.png";
} else {
    avatarImage = "images/profile-wizard-no-hat.png";
}

profileAvatar.innerHTML = `
    <img src="${avatarImage}" alt="${savedRole}" class="profile-character">
`;
// Available profile backgrounds
const backgroundImages = {
    "student-room": "images/profile-student-room.png",
    "enchanted-forest": "images/profile-enchanted-forest.png",
    "silvermoon-lake": "images/profile-silvermoon-lake.png",

    "moonlit-library": "images/moonlit-library.png",
    "crystal-cavern": "images/crystal-cavern.png",
    "astral-observatory": "images/astral-observatory.png",
    "elementorumia": "images/elementorumia.png",
    "whispering-glade": "images/whispering-glade.png",
    "celestial-gardens": "images/celestial-gardens.png"
};

// Apply selected background
if (backgroundImages[savedBackground]) {
    profileAvatar.style.backgroundImage =
        `url('${backgroundImages[savedBackground]}')`;
} else {
    profileAvatar.style.backgroundImage = "";
}
// Hidden Elementorumia symbol
const elementorumiaSecret =
    document.getElementById("elementorumiaSecret");

const currentProphecyChapter =
    localStorage.getItem("forgottenPropheciesChapter");

const prophecyTrialActive =
    localStorage.getItem("forgottenProphecyTrialActive");

if (elementorumiaSecret) {
    elementorumiaSecret.hidden = !(
        savedBackground === "elementorumia" &&
        currentProphecyChapter === "3" &&
        prophecyTrialActive === "true"
    );
}
    }
}

loadProfile();
// ======================================
// CHAPTER III - SECRET OF ELEMENTORUMIA
// ======================================

const secretSymbol = document.getElementById("elementorumiaSecret");

if (secretSymbol) {
    secretSymbol.addEventListener("click", function() {

        const currentChapter =
            localStorage.getItem("forgottenPropheciesChapter");

        const trialActive =
            localStorage.getItem("forgottenProphecyTrialActive");

        const activeBackground =
            localStorage.getItem("profileBackground");

        if (
            currentChapter === "3" &&
            trialActive === "true" &&
            activeBackground === "elementorumia"
        ) {
            localStorage.setItem("forgottenPropheciesChapter", "4");
            localStorage.removeItem("forgottenProphecyTrialActive");

            alert(
                "Four lights awaken within the ancient stone. " +
                "As their colors intertwine, a hidden passage opens beneath Elementorumia. " +
                "Beyond the darkness, a forgotten incantation awaits..."
            );

            secretSymbol.hidden = true;
        }
    });
}
editProfile.addEventListener("click", function() {
// Check purchased profile backgrounds
const purchasedBackgrounds = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

const magicalBackgrounds = [
    "moonlit-library",
    "crystal-cavern",
    "astral-observatory",
    "elementorumia",
    "whispering-glade",
    "celestial-gardens"
];

magicalBackgrounds.forEach(function(backgroundId) {

    const option = profileBackground.querySelector(
        `option[value="${backgroundId}"]`
    );

    if (!option) return;

    const isPurchased = purchasedBackgrounds.includes(backgroundId);

    option.disabled = !isPurchased;

    option.textContent = isPurchased
        ? option.textContent.replace(" 🔒", "")
        : option.textContent.replace(" 🔒", "") + " 🔒";
});
    const savedName = localStorage.getItem("studentName");
    const savedRole = localStorage.getItem("studentRole");
    const savedBackground = localStorage.getItem("profileBackground");
    const savedHat = localStorage.getItem("profileHat");

    studentProfile.style.display = "none";
    profileSetup.style.display = "block";
    saveProfile.textContent = "Save Changes";

    studentName.value = savedName;

    selectedRole = savedRole;
    
    profileBackground.value = savedBackground || "";
    profileHat.value = savedHat || "";

    roleButtons.forEach(function(button) {

        button.classList.remove("selected");

        if (button.dataset.role === savedRole) {
            button.classList.add("selected");
        }

    });

    profileMessage.textContent = "";
});
takeHouseTrial.addEventListener("click", function() {
    window.location.href = "house-trial.html";
});
// Familiar Bond Token on profile

// Familiar on Profile

const profileFamiliar = document.getElementById("profileFamiliar");
const profileFamiliarImage = document.getElementById("profileFamiliarImage");
const profileFamiliarText = document.getElementById("profileFamiliarText");
const familiarRitualLink = document.getElementById("familiarRitualLink");

if (profileFamiliar) {

    const hasFamiliarToken =
        localStorage.getItem("familiarBondToken") === "true";

    const studentFamiliar =
        localStorage.getItem("studentFamiliar");

    if (studentFamiliar) {

        // Show the bonded familiar instead of the token
        profileFamiliar.style.display = "block";

        profileFamiliar.classList.add("has-familiar");
        
        profileFamiliarImage.src =
            `images/${studentFamiliar.toLowerCase()}.png`;

        profileFamiliarImage.alt = studentFamiliar;

        profileFamiliarText.textContent =
            `Your Familiar: ${studentFamiliar}`;

        // The ritual is complete, so the image is no longer a link
        familiarRitualLink.removeAttribute("href");
        familiarRitualLink.style.cursor = "default";

    } else if (hasFamiliarToken) {

        // Token purchased, but ritual not completed
        profileFamiliar.style.display = "block";

    }
}
// Magical Equipment

const equipmentNames = {
    "tidewood-wand": "Tidewood Wand",
    "stormflame-wand": "Stormflame Wand",
    "celestial-wand": "Celestial Wand",
    "mistweaver-staff": "Mistweaver Staff",
    "ashforge-staff": "Ashforge Staff",
    "celestial-staff": "Celestial Staff"
};

const changeEquipmentButton = document.getElementById("changeEquipment");
const equipmentInventory = document.getElementById("equipmentInventory");
const equippedItem = document.getElementById("equippedItem");

function displayEquippedItem() {
    const equipped = localStorage.getItem("equippedEquipment");

    if (!equipped || !equipmentNames[equipped]) {
        equippedItem.innerHTML = "<p>No magical equipment equipped.</p>";
        return;
    }

    equippedItem.innerHTML = `
    <img
        src="images/${equipped}.png"
        alt="${equipmentNames[equipped]}"
        class="profile-equipment-image"
    >
    <p>${equipmentNames[equipped]}</p>

    <button id="unequipEquipment" class="equipment-button">
        Unequip
    </button>
`;

document.getElementById("unequipEquipment").addEventListener("click", () => {
    localStorage.removeItem("equippedEquipment");

    displayEquippedItem();
    displayEquipmentInventory();

    equipmentInventory.hidden = true;
    changeEquipmentButton.textContent = "Choose Equipment";
});
}

function displayEquipmentInventory() {
    const ownedEquipment = JSON.parse(
        localStorage.getItem("ownedEquipment") || "[]"
    );

    equipmentInventory.innerHTML = "";

    if (ownedEquipment.length === 0) {
        equipmentInventory.innerHTML =
            "<p>You haven't purchased any magical equipment yet.</p>";
        return;
    }

    ownedEquipment.forEach(itemId => {
        if (!equipmentNames[itemId]) return;

        const item = document.createElement("div");
        item.className = "equipment-option";

        item.innerHTML = `
            <img src="images/${itemId}.png" alt="${equipmentNames[itemId]}">
            <p>${equipmentNames[itemId]}</p>
            <button class="equipment-button">Equip</button>
        `;

        const equipButton = item.querySelector("button");

if (localStorage.getItem("equippedEquipment") === itemId) {
    equipButton.textContent = "Equipped ✓";
    equipButton.disabled = true;
}
        item.querySelector("button").addEventListener("click", () => {
            localStorage.setItem("equippedEquipment", itemId);

            displayEquippedItem();
            displayEquipmentInventory();

            equipmentInventory.hidden = true;
            changeEquipmentButton.textContent = "Change Equipment";
        });

        equipmentInventory.appendChild(item);
    });
}

if (changeEquipmentButton) {
    changeEquipmentButton.addEventListener("click", () => {
        equipmentInventory.hidden = !equipmentInventory.hidden;

        if (!equipmentInventory.hidden) {
            displayEquipmentInventory();
        }
    });

    displayEquippedItem();
}
// Moon Amulet - Show on profile if purchased

const profileMoonAmulet = document.getElementById("profileMoonAmulet");

const ownedMoonItems = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

if (profileMoonAmulet) {
    const ownsMoonAmulet = ownedMoonItems.includes("moon-amulet");

    profileMoonAmulet.hidden = !ownsMoonAmulet;
}
// Crystal Ball - Show on profile if purchased

const profileCrystalBall = document.getElementById("profileCrystalBall");

if (profileCrystalBall) {
    const ownedCrystalItems = JSON.parse(
        localStorage.getItem("ownedEquipment") || "[]"
    );

    const ownsCrystalBall = ownedCrystalItems.includes("crystal-ball");

    profileCrystalBall.hidden = !ownsCrystalBall;
}
// Display purchased House Crest on student profile

const profileHouseCrest = document.getElementById("profileHouseCrest");
const profileHouseCrestImage = document.getElementById("profileHouseCrestImage");

const crestHouse = localStorage.getItem("studentHouse");

const crestOwnedEquipment = JSON.parse(
    localStorage.getItem("ownedEquipment") || "[]"
);

const profileHouseCrestImages = {
    Serenia: "images/serenia-crest.png",
    Caeloria: "images/caeloria-crest.png",
    Eldergard: "images/eldergard-crest.png",
    Kaelthorn: "images/kaelthorn-crest.png"
};

if (
    profileHouseCrest &&
    profileHouseCrestImage &&
    crestOwnedEquipment.includes("house-crest") &&
    profileHouseCrestImages[crestHouse]
) {
    profileHouseCrestImage.src = profileHouseCrestImages[crestHouse];
    profileHouseCrestImage.alt = `${crestHouse} House Crest`;

    profileHouseCrest.hidden = false;
    profileHouseCrest.dataset.house = crestHouse.toLowerCase();
}
// Show the Orb of Forgotten Stars if purchased
const profileForgottenOrb = document.getElementById("profileForgottenOrb");

if (profileForgottenOrb) {
    const ownedEquipment = JSON.parse(
        localStorage.getItem("ownedEquipment") || "[]"
    );

    profileForgottenOrb.hidden =
        !ownedEquipment.includes("orb-of-forgotten-stars");
}

/* =====================================
   PROFILE - THE MARK OF AETHER
===================================== */

const profileAetherMark =
    document.getElementById("profileAetherMark");

if (profileAetherMark) {

    const hasAetherMark =
        localStorage.getItem("markOfAetherClaimed") === "true";

    profileAetherMark.hidden = !hasAetherMark;

}
