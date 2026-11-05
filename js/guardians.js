
/* =====================================
   CHAPTER V - GUARDIANS
===================================== */

const guardianPortals = document.querySelectorAll(".guardian-portal");

guardianPortals.forEach(function(portal) {

    portal.addEventListener("click", function() {

        const guardian = portal.dataset.guardian;

        


if (guardian === "sirena") {

    window.location.href = "sirena-realm.html";

} else if (guardian === "keraon") {

    window.location.href = "keraon-realm.html";

} else if (guardian === "gorgana") {

    window.location.href = "gorgana-realm.html";

} else if (guardian === "hippora") {
    window.location.href = "hippora-realm.html";
}



    });

});

/* =====================================
   COMPLETED GUARDIAN TRIALS
===================================== */

// Check if the student has received Sirena's blessing
const waterBlessingCompleted =
    localStorage.getItem("blessingWater") === "true";

if (waterBlessingCompleted) {

    const waterPortal = document.querySelector(".portal-water");

    if (waterPortal) {
        waterPortal.classList.add("guardian-completed");
        waterPortal.title = "Sirena - Trial Completed";
    }

}

/* =====================================
   KERAON - COMPLETED FIRE PORTAL
===================================== */

const fireBlessingCompleted =
    localStorage.getItem("blessingFire") === "true";

if (fireBlessingCompleted) {

    const firePortal = document.querySelector(".portal-fire");

    if (firePortal) {
        firePortal.classList.add("guardian-completed");
        firePortal.title = "Keraon - Trial Completed";
    }

}


/* =====================================
   GORGANA - COMPLETED EARTH PORTAL
===================================== */

const earthBlessingCompleted =
    localStorage.getItem("blessingEarth") === "true";

if (earthBlessingCompleted) {

    const earthPortal = document.querySelector(".portal-earth");

    if (earthPortal) {
        earthPortal.classList.add("guardian-completed");
        earthPortal.title = "Gorgana - Trial Completed";
    }

}

/* =====================================
   HIPPORA - COMPLETED WIND PORTAL
===================================== */

const hipporaPortal = document.querySelector(
    '.guardian-portal[data-guardian="hippora"]'
);

if (
    hipporaPortal &&
    localStorage.getItem("blessingWind") === "true"
) {
    hipporaPortal.classList.add("guardian-completed");
}

/* =====================================
   STUDENT HOUSE - FIRST GUARDIAN
===================================== */

const studentHouse = localStorage.getItem("studentHouse");

const houseGuardians = {
    Serenia: "sirena",
    Kaelthorn: "keraon",
    Eldergard: "gorgana",
    Caeloria: "hippora"
};

const guardianBlessings = {
    sirena: "blessingWater",
    keraon: "blessingFire",
    gorgana: "blessingEarth",
    hippora: "blessingWind"
};

const firstGuardian = houseGuardians[studentHouse];

// Has the student completed their house guardian?
const firstGuardianCompleted =
    firstGuardian &&
    localStorage.getItem(guardianBlessings[firstGuardian]) === "true";

if (firstGuardian && !firstGuardianCompleted) {

    guardianPortals.forEach(portal => {

        const guardian = portal.dataset.guardian;

        if (guardian === firstGuardian) {

            // Highlight the student's first guardian
            portal.classList.add("guardian-first");

            portal.title = "Your House Guardian";

        } else {

            // Temporarily lock other guardians
            portal.classList.add("guardian-locked");

            portal.disabled = true;

            portal.title =
                "Complete your House Guardian's trial first";
        }

    });

}

/* =====================================
   PERSONAL GUARDIAN JOURNEY
===================================== */

const guardianJourneyTitle =
    document.getElementById("guardianJourneyTitle");

const guardianJourneyMessage =
    document.getElementById("guardianJourneyMessage");

const guardianNames = {
    sirena: "Sirena",
    keraon: "Keraon",
    gorgana: "Gorgana",
    hippora: "Hippora"
};

const allGuardiansCompleted = [
    "blessingWater",
    "blessingFire",
    "blessingEarth",
    "blessingWind"
].every(blessing =>
    localStorage.getItem(blessing) === "true"
);
    
if (guardianJourneyTitle && guardianJourneyMessage) {

    if (allGuardiansCompleted) {

        guardianJourneyTitle.textContent =
            "The Four Blessings Awaken";

        guardianJourneyMessage.textContent =
            "The blessings of Water, Fire, Earth and Wind " +
            "now dwell within you. The four sacred ingredients " +
            "await their union. Return to the ancient cauldron " +
            "and prepare the Aetherlight Elixir.";

    } else if (!firstGuardian) {


        guardianJourneyTitle.textContent =
            "Your Guardian Journey";

        guardianJourneyMessage.textContent =
            "Discover your house before beginning your journey with the ancient guardians.";

    } else if (!firstGuardianCompleted) {

        guardianJourneyTitle.textContent =
            `The Path of ${studentHouse}`;

        guardianJourneyMessage.textContent =
            `Your journey begins with ${guardianNames[firstGuardian]}, ` +
            `the guardian of your house. Earn their blessing to unlock the remaining paths.`;

    } else {

        guardianJourneyTitle.textContent =
            "The Four Guardians";

        guardianJourneyMessage.textContent =
            "Your house guardian has granted their blessing. " +
            "The remaining paths are now open. " +
            "Choose your next guardian and continue your journey.";

    }
}

/* =====================================
   AETHERLIGHT CHAMBER - UNLOCK
===================================== */

const enterAetherlightChamber =
    document.getElementById("enterAetherlightChamber");

if (enterAetherlightChamber && allGuardiansCompleted) {
    enterAetherlightChamber.hidden = false;
}

/* =====================================
   UNLOCK THE HEART OF AETHER
===================================== */

const heartOfAetherLink =
    document.getElementById("heartOfAetherLink");

const heartOfAetherMessage =
    document.getElementById("heartOfAetherMessage");

if (heartOfAetherLink && heartOfAetherMessage) {

    const elixirClaimed =
        localStorage.getItem("aetherlightClaimed") === "true";

    if (elixirClaimed) {

        heartOfAetherLink.hidden = false;

        heartOfAetherMessage.textContent =
            "The Aetherlight Elixir reveals a forgotten path. The Heart of Aether awaits you.";

    } else {

        heartOfAetherLink.hidden = true;

        heartOfAetherMessage.textContent =
            "Only the Aetherlight Elixir can reveal the path to the ancient Heart.";

    }
}
