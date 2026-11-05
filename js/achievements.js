
/* =====================================
   SILVERMOON ACADEMY - ACHIEVEMENTS
===================================== */

function unlockAchievement(cardId, statusId, unlocked) {

    const card = document.getElementById(cardId);
    const status = document.getElementById(statusId);

    if (!card || !status) return;

    card.classList.toggle("unlocked", unlocked);

    status.textContent = unlocked
        ? "Unlocked"
        : "Locked";
}

/* SPELL APPRENTICE */
unlockAchievement(
    "spellApprentice",
    "spellApprenticeStatus",
    localStorage.getItem("achievementSpellApprentice") === "true"
);

/* POTION NOVICE */
unlockAchievement(
    "potionNovice",
    "potionNoviceStatus",
    localStorage.getItem("achievementPotionNovice") === "true"
);

/* COIN COLLECTOR */
unlockAchievement(
    "coinCollector",
    "coinCollectorStatus",
    localStorage.getItem("achievementCoinCollector") === "true" ||
    Number(localStorage.getItem("coinBalance")) >= 10
);

/* PERFECT STUDENT */
unlockAchievement(
    "perfectStudent",
    "perfectStudentStatus",
    localStorage.getItem("achievementPerfectStudent") === "true"
);

/* Preserve the existing coin achievement */
if (Number(localStorage.getItem("coinBalance")) >= 10) {
    localStorage.setItem("achievementCoinCollector", "true");
}

/* =====================================
   NEW MAGICAL ACHIEVEMENTS
===================================== */

/* Potion Master - tracking added later */
unlockAchievement(
    "potionMaster",
    "potionMasterStatus",
    localStorage.getItem("achievementPotionMaster") === "true"
);

/* Arcane Master - tracking added later */
unlockAchievement(
    "arcaneMaster",
    "arcaneMasterStatus",
    localStorage.getItem("achievementArcaneMaster") === "true"
);

/* Creature Explorer - tracking added later */
unlockAchievement(
    "creatureExplorer",
    "creatureExplorerStatus",
    localStorage.getItem("achievementCreatureExplorer") === "true"
);

/* Keeper of the Fifth Light */
unlockAchievement(
    "keeperFifthLight",
    "keeperFifthLightStatus",
    localStorage.getItem("markOfAetherClaimed") === "true"
);

/* =====================================
   POTION MASTER - DISPLAY PROGRESS
===================================== */

const potionMasterProgress =
    document.getElementById("potionMasterProgress");

const totalPotionsBrewed =
    Number(localStorage.getItem("totalPotionsBrewed")) || 0;

if (potionMasterProgress) {

    potionMasterProgress.textContent =
        Math.min(totalPotionsBrewed, 10) +
        " / 10 potions brewed";

}

// Ensure the achievement stays unlocked
if (totalPotionsBrewed >= 10) {

    localStorage.setItem(
        "achievementPotionMaster",
        "true"
    );

    unlockAchievement(
        "potionMaster",
        "potionMasterStatus",
        true
    );
}

/* =====================================
   ARCANE MASTER - DISPLAY PROGRESS
===================================== */

const arcaneMasterProgress =
    document.getElementById("arcaneMasterProgress");

const totalSpellsCast =
    Number(localStorage.getItem("totalSpellsCast")) || 0;

if (arcaneMasterProgress) {

    arcaneMasterProgress.textContent =
        Math.min(totalSpellsCast, 25) +
        " / 25 spells cast";
}

// Ensure Arcane Master stays unlocked
if (totalSpellsCast >= 25) {

    localStorage.setItem(
        "achievementArcaneMaster",
        "true"
    );

    unlockAchievement(
        "arcaneMaster",
        "arcaneMasterStatus",
        true
    );
}

/* =====================================
   BEAST SCHOLAR - DISCOVERY PROGRESS
===================================== */

let discoveredCreatures = [];

try {
    const savedCreatures = JSON.parse(
        localStorage.getItem("discoveredCreatures") || "[]"
    );

    if (Array.isArray(savedCreatures)) {
        discoveredCreatures = savedCreatures;
    }

} catch (error) {
    console.warn("Could not load discovered creatures.");
}

// Count unique valid creatures
const allCreatureNames = [
    "Moonfox",
    "Starhorn",
    "Emberwing",
    "Unicorn",
    "Siren",
    "Keraunos",
    "Gorgon",
    "Hippogriff"
];

const discoveredCount = allCreatureNames.filter(
    name => discoveredCreatures.includes(name)
).length;

// Update achievement progress
const beastScholarProgress =
    document.getElementById("beastScholarProgress");

if (beastScholarProgress) {
    beastScholarProgress.textContent =
        discoveredCount + " / 8 creatures discovered";
}

// Unlock after discovering all eight
if (discoveredCount === 8) {

    localStorage.setItem(
        "achievementBeastScholar",
        "true"
    );
}

unlockAchievement(
    "beastScholar",
    "beastScholarStatus",
    localStorage.getItem("achievementBeastScholar") === "true"
);

/* =====================================
   ASTRAL STUDIES - ACHIEVEMENTS
===================================== */

let observedPhenomena = [];

try {
    const savedPhenomena = JSON.parse(
        localStorage.getItem("observedPhenomena") || "[]"
    );

    if (Array.isArray(savedPhenomena)) {
        observedPhenomena = savedPhenomena;
    }

} catch (error) {
    console.warn("Could not load observed phenomena.");
}

const allCelestialPhenomena = [
    "meteor",
    "shadow",
    "convergence",
    "vespera"
];

const observedCount = allCelestialPhenomena.filter(
    type => observedPhenomena.includes(type)
).length;

// Celestial Observer
if (observedCount >= 1) {
    localStorage.setItem(
        "achievementCelestialObserver",
        "true"
    );
}

unlockAchievement(
    "celestialObserver",
    "celestialObserverStatus",
    localStorage.getItem("achievementCelestialObserver") === "true"
);

// Master of the Heavens
if (observedCount === 4) {
    localStorage.setItem(
        "achievementMasterOfHeavens",
        "true"
    );
}

unlockAchievement(
    "masterOfHeavens",
    "masterOfHeavensStatus",
    localStorage.getItem("achievementMasterOfHeavens") === "true"
);

// Display progress
const masterOfHeavensProgress =
    document.getElementById("masterOfHeavensProgress");

if (masterOfHeavensProgress) {
    masterOfHeavensProgress.textContent =
        observedCount + " / 4 phenomena observed";
}

/* =====================================
   KEEPER OF KNOWLEDGE - PROGRESS
===================================== */

let studiedAncientBooks = [];

try {
    const savedBooks = JSON.parse(
        localStorage.getItem("studiedAncientBooks") || "[]"
    );

    if (Array.isArray(savedBooks)) {
        studiedAncientBooks = savedBooks;
    }
} catch (error) {
    console.warn("Could not load studied books.");
}

const ancientBookIds = [
    "kingdoms",
    "children",
    "meeting",
    "founding",
    "unity"
];

const studiedBookCount = ancientBookIds.filter(
    id => studiedAncientBooks.includes(id)
).length;

// Display progress
const knowledgeProgress =
    document.getElementById("keeperOfKnowledgeProgress");

if (knowledgeProgress) {
    knowledgeProgress.textContent =
        studiedBookCount + " / 5 books studied";
}

// Unlock achievement
if (studiedBookCount === 5) {
    localStorage.setItem(
        "achievementKeeperOfKnowledge",
        "true"
    );
}

unlockAchievement(
    "keeperOfKnowledge",
    "keeperOfKnowledgeStatus",
    localStorage.getItem("achievementKeeperOfKnowledge") === "true"
);

/* =====================================
   RESTORE COMPLETED QUIZ ACHIEVEMENTS
===================================== */

const quizAchievementKeys = {
    spellcraft: "achievementSpellcraftScholar",
    potions: "achievementPotionScholar",
    astral: "achievementAstralScholar",
    ancient: "achievementHistoryScholar",
    creatures: "achievementCreatureScholar",
    master: "achievementGrandScholar"
};

let passedQuizzes = [];

try {
    const savedQuizzes = JSON.parse(
        localStorage.getItem("completedQuizzes") || "[]"
    );

    if (Array.isArray(savedQuizzes)) {
        passedQuizzes = savedQuizzes;
    }
} catch (error) {
    console.warn("Could not load completed quizzes.");
}

passedQuizzes.forEach(function(quiz) {
    const achievementKey = quizAchievementKeys[quiz];

    if (achievementKey) {
        localStorage.setItem(achievementKey, "true");
    }
});

/* =====================================
   QUIZ SCHOLAR ACHIEVEMENTS
===================================== */

const scholarAchievements = [
    {
        card: "spellcraftScholar",
        status: "spellcraftScholarStatus",
        key: "achievementSpellcraftScholar"
    },
    {
        card: "potionScholar",
        status: "potionScholarStatus",
        key: "achievementPotionScholar"
    },
    {
        card: "astralScholar",
        status: "astralScholarStatus",
        key: "achievementAstralScholar"
    },
    {
        card: "historyScholar",
        status: "historyScholarStatus",
        key: "achievementHistoryScholar"
    },
    {
        card: "creatureScholar",
        status: "creatureScholarStatus",
        key: "achievementCreatureScholar"
    },
    {
        card: "grandScholar",
        status: "grandScholarStatus",
        key: "achievementGrandScholar"
    }
];

scholarAchievements.forEach(function(achievement) {

    const unlocked =
        localStorage.getItem(achievement.key) === "true";

    unlockAchievement(
        achievement.card,
        achievement.status,
        unlocked
    );

});

/* =====================================
   ACHIEVEMENT PROGRESS OVERVIEW
===================================== */

function updateAchievementOverview() {

    const achievementCards =
        document.querySelectorAll(".achievement-card");

    const totalAchievements = achievementCards.length;

    const unlockedAchievements =
        document.querySelectorAll(
            ".achievement-card.unlocked"
        ).length;

    const unlockedCounter =
        document.getElementById("unlockedAchievements");

    const totalCounter =
        document.getElementById("totalAchievements");

    const progressFill =
        document.getElementById("achievementProgressFill");

    if (unlockedCounter) {
        unlockedCounter.textContent = unlockedAchievements;
    }

    if (totalCounter) {
        totalCounter.textContent = totalAchievements;
    }

    if (progressFill) {

        const percentage = totalAchievements > 0
            ? (unlockedAchievements / totalAchievements) * 100
            : 0;

        progressFill.style.width = percentage + "%";
    }
}

updateAchievementOverview();
