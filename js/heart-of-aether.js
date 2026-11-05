
/* =====================================
   HEART OF AETHER - RESTORATION
===================================== */

const heartCrystal =
    document.getElementById("aetherHeartCrystal");

const heartStory =
    document.querySelector(".aether-heart-story");

const restoredImage =
    document.getElementById("aetherHeartRestored");

const hasAetherlightElixir =
    localStorage.getItem("aetherlightClaimed") === "true";

const heartAlreadyRestored =
    localStorage.getItem("heartOfAetherRestored") === "true";

function showRestoredHeart() {

    restoredImage.classList.add("is-restored");

    heartCrystal.hidden = true;

    heartStory.innerHTML = `
        <p>
            The ancient roots awaken.
            Silver light flows through the branches,
            and the Heart of Aether shines once more.
        </p>

        <p>
            A forgotten presence stirs
            within the sacred tree...
        </p>
    `;
}

/* Restore completed ceremony after reload */
if (heartAlreadyRestored) {
    showRestoredHeart();
}

if (heartCrystal && heartStory && restoredImage) {

    heartCrystal.addEventListener("click", function() {

        if (
            localStorage.getItem("heartOfAetherRestored") === "true"
        ) {
            return;
        }

        if (!hasAetherlightElixir) {

            heartStory.innerHTML = `
                <p>
                    The Heart remains silent.
                    Its ancient light cannot return
                    without the Aetherlight Elixir.
                </p>
            `;

            return;
        }

        heartCrystal.classList.add("restoring");

        heartStory.innerHTML = `
            <p>
                The Aetherlight Elixir begins to shine.
                Its magic flows into the ancient roots...
            </p>
        `;

        setTimeout(() => {

            restoredImage.classList.add("is-restored");

            localStorage.setItem(
                "heartOfAetherRestored",
                "true"
            );

            localStorage.setItem(
                "aetherlightUsed",
                "true"
            );

        }, 2000);

        
setTimeout(() => {

    showRestoredHeart();

    // The Silver Stag emerges after restoration
    showSilverStag(true);

}, 7000);


    });

}

/* =====================================
   HEART OF AETHER - SILVER STAG ARRIVAL
===================================== */

const silverStag =
    document.getElementById("silverStagAppearance");

const stagArrivalKey = "silverStagAwakened";


function showSilverStag(animate = true) {

    if (!silverStag) return;

    const stagInteraction =
        document.getElementById("silverStagInteraction");

    if (stagInteraction) {
        stagInteraction.hidden = false;
        stagInteraction.disabled = animate;
    }

    silverStag.hidden = false;

    silverStag.classList.remove(
        "stag-awakening",
        "stag-present"
    );

    if (animate) {
        silverStag.classList.add("stag-awakening");

        setTimeout(() => {
            if (stagInteraction) {
                stagInteraction.disabled = false;
            }
        }, 5000);

    } else {
        silverStag.classList.add("stag-present");
    }

    localStorage.setItem("silverStagAwakened", "true");

    if (heartStory) {
        heartStory.innerHTML = `
            <p>
                The Silver Stag has returned.
                Approach the ancient guardian
                to hear the forgotten prophecy.
            </p>
        `;
    }
}


/* Restore the Silver Stag after reload */

if (
    localStorage.getItem("heartOfAetherRestored") === "true"
) {
    showSilverStag(false);
}


/* =====================================
   THE FORGOTTEN PROPHECY
===================================== */

const stagInteraction =
    document.getElementById("silverStagInteraction");

const stagDialogue =
    document.getElementById("stagDialogue");

const stagDialogueText =
    document.getElementById("stagDialogueText");

const stagDialogueNext =
    document.getElementById("stagDialogueNext");

const prophecyLines = [
    "For three thousand years, I have waited beneath the fading light of Aether.",

    "When the four founders united their powers, they awakened something greater than the elements themselves.",

    "It was not Water, Fire, Earth or Wind. It was the bond that held them together.",

    "That bond became Aether, the Fifth Light. And through it, Silvermoon Academy was born.",

    "Yet the Fifth Light was never meant to belong to a single guardian, founder or house.",

    "It lives wherever courage, wisdom, patience and compassion stand together."
];

let prophecyIndex = 0;

if (
    stagInteraction &&
    stagDialogue &&
    stagDialogueText &&
    stagDialogueNext
) {

    stagInteraction.addEventListener("click", function() {

        if (
            localStorage.getItem("silverStagAwakened") !== "true"
        ) return;

        prophecyIndex = 0;
        stagDialogueText.textContent = prophecyLines[prophecyIndex];
        stagDialogueNext.textContent = "Continue";
        stagDialogue.hidden = false;
    });

    stagDialogueNext.addEventListener("click", function() {

        prophecyIndex++;

        if (prophecyIndex >= prophecyLines.length) {

            stagDialogue.hidden = true;

            localStorage.setItem(
                "forgottenProphecyRevealed",
                "true"
            );

updateAetherGift();

if (aetherGift) {
    aetherGift.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

            if (heartStory) {
                heartStory.innerHTML = `
                    <p>
                        The Forgotten Prophecy has been revealed.
                        The Fifth Light lives through unity.
                    </p>
                `;
            }

            return;
        }

        stagDialogueText.textContent = prophecyLines[prophecyIndex];

        if (prophecyIndex === prophecyLines.length - 1) {
            stagDialogueNext.textContent = "Finish";
        }
    });
}

/* =====================================
   THE GIFT OF AETHER
===================================== */

const aetherGift =
    document.getElementById("aetherGift");

const claimAetherMark =
    document.getElementById("claimAetherMark");

const aetherGiftMessage =
    document.getElementById("aetherGiftMessage");

function updateAetherGift() {

    if (!aetherGift) return;

    const prophecyRevealed =
        localStorage.getItem("forgottenProphecyRevealed")
        === "true";

    const markClaimed =
        localStorage.getItem("markOfAetherClaimed")
        === "true";

    aetherGift.hidden = !prophecyRevealed;

    if (markClaimed) {
        claimAetherMark.hidden = true;

        aetherGiftMessage.textContent =
            "The Mark of Aether is now yours. " +
            "You are a Keeper of the Fifth Light.";
    } else {
        claimAetherMark.hidden = false;
        aetherGiftMessage.textContent = "";
    }
}

if (claimAetherMark) {

    claimAetherMark.addEventListener("click", function() {

        if (
            localStorage.getItem("forgottenProphecyRevealed")
            !== "true"
        ) return;

        localStorage.setItem(
            "markOfAetherClaimed",
            "true"
        );

        localStorage.setItem(
            "achievementKeeperFifthLight",
            "true"
        );

        updateAetherGift();
    });
}

updateAetherGift();
