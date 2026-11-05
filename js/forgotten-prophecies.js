// ======================================
// THE FORGOTTEN PROPHECIES
// ======================================

const openPropheciesButton =
    document.getElementById("openForgottenProphecies");

const closePropheciesButton =
    document.getElementById("closeForgottenProphecies");

const propheciesPopup =
    document.getElementById("forgottenPropheciesPopup");

// Open the magical story
if (openPropheciesButton && propheciesPopup) {

    openPropheciesButton.addEventListener("click", function() {

    // Read the student's current chapter
    const currentChapter = Number(
        localStorage.getItem("forgottenPropheciesChapter") || "1"
    );

    // Show the correct chapter
    if (currentChapter === 1) {

        document.getElementById("prophecyChapterTitle").textContent =
            "Chapter I: The Orb Awakens";

    } else if (currentChapter === 2) {

        document.getElementById("prophecyChapterTitle").textContent =
            "Chapter II: The Forgotten Element";

        document.getElementById("prophecyChapterText").textContent =
            "When ancient wounds refuse to heal, seek the creature whose heart remains pure. " +
            "Beneath the silver moon, a single strand shall mend what time has torn apart. " +
            "Let the leaf of moonlight meet the gift of the horned guardian, " +
            "and the second light shall awaken.";

        document.getElementById("beginProphecyTrial").textContent =
            "Seek the Healing Potion";
    }
    else if (currentChapter === 3) {

    document.getElementById("prophecyChapterTitle").textContent =
        "Chapter III: The Secret of Elementorumia";

    document.getElementById("prophecyChapterText").textContent =
        "The healing light has awakened a forgotten memory. " +
        "Journey to the place where four once stood beneath the silver moon. " +
        "There, among the ancient stones, a secret waits beyond the gaze of the founders. " +
        "Only those who stand within its forgotten grounds may uncover the hidden path.";

    document.getElementById("beginProphecyTrial").textContent =
        "Seek Elementorumia";
}
else if (currentChapter === 4) {

    document.getElementById("prophecyChapterTitle").textContent =
        "Chapter IV: The Lost Incantation";

    document.getElementById("prophecyChapterText").textContent =
        "Deep beneath Elementorumia, an ancient stone tablet " +
        "holds the echoes of a forgotten spell. " +
        "Four elemental runes guard its secret. " +
        "Only those who understand the words of the founders " +
        "may awaken the fifth light.";

    document.getElementById("beginProphecyTrial").textContent =
        "Awaken the Ancient Runes";
}
    
else if (currentChapter === 5) {

    document.getElementById("prophecyChapterTitle").textContent =
        "Chapter V: The Fifth Light";

    document.getElementById("prophecyChapterText").textContent =
        "The fifth rune has awakened a passage forgotten for three thousand years. " +
        "Beyond the ancient stone lies the Hall of Guardians, " +
        "where four sacred beings still protect the memories of Silvermoon's founders. " +
        "Their blessings must be earned before the Heart of Aether can be reached. " +
        "Four bonds. Four trials. One forgotten light.";

    document.getElementById("beginProphecyTrial").textContent =
        "Enter the Hall of Guardians";
}

    // Restore the story view
    document.querySelector(".forgotten-prophecies-intro").hidden = false;
    document.getElementById("prophecyChapterTitle").hidden = false;
    document.getElementById("prophecyChapterText").hidden = false;
    document.getElementById("beginProphecyTrial").hidden = false;
    document.getElementById("prophecyQuiz").hidden = true;
    document.getElementById("prophecyRunePuzzle").hidden = true;

    // Open the popup
    propheciesPopup.hidden = false;

});

}

// Close the magical story
if (closePropheciesButton && propheciesPopup) {

    closePropheciesButton.addEventListener("click", function() {

        propheciesPopup.hidden = true;

    });

}

// Close when clicking outside the story window
if (propheciesPopup) {

    propheciesPopup.addEventListener("click", function(event) {

        if (event.target === propheciesPopup) {
            propheciesPopup.hidden = true;
        }

    });

}
// ======================================
// CHAPTER I - THE ORB AWAKENS
// ======================================

const chapterOneQuestions = [
    {
        question: "Where did the four founders first meet?",
        answers: [
            "At Silvermoon Lake",
            "Where the four elemental realms met",
            "Inside the Astral Observatory"
        ],
        correct: 1
    },
    {
        question: "Which four elements shaped the ancient realms?",
        answers: [
            "Fire, Water, Earth and Wind",
            "Light, Darkness, Ice and Fire",
            "Moon, Sun, Stars and Shadows"
        ],
        correct: 0
    },
    {
        question: "What was established when the four founders united?",
        answers: [
            "The Whispering Crescent",
            "The Kingdom of Aether",
            "Silvermoon Academy"
        ],
        correct: 2
    }
];
// ======================================
// START CHAPTER I QUIZ
// ======================================

const beginProphecyTrial =
    document.getElementById("beginProphecyTrial");

const prophecyQuiz =
    document.getElementById("prophecyQuiz");

const prophecyIntro =
    document.querySelector(".forgotten-prophecies-intro");

const prophecyChapterTitle =
    document.getElementById("prophecyChapterTitle");

const prophecyChapterText =
    document.getElementById("prophecyChapterText");

let currentProphecyQuestion = 0;

if (beginProphecyTrial && prophecyQuiz) {

    beginProphecyTrial.addEventListener("click", function() {

        // Read the student's current chapter
        const currentChapter = localStorage.getItem(
            "forgottenPropheciesChapter"
        );

        // Chapter V - Enter the Hall of Guardians
        if (currentChapter === "5") {
            window.location.href = "hall-of-guardians.html";
            return;
        }

        // Chapter II - Send the student to Potions
        if (currentChapter === "2") {
            localStorage.setItem(
                "forgottenProphecyTrialActive",
                "true"
            );

            window.location.href = "potions.html";
            return;
        }
// Chapter III - Search for Elementorumia
if (currentChapter === "3") {

    localStorage.setItem(
        "forgottenProphecyTrialActive",
        "true"
    );

    propheciesPopup.hidden = true;

    
showOrbVision(
    "The Whisper of Elementorumia",
    "The ancient grounds of Elementorumia hold a forgotten secret.\n\n" +
    "Stand where the four founders once stood, " +
    "and seek what remains unseen."
);


    return;
}
// ======================================
// CHAPTER IV - OPEN THE RUNE PUZZLE
// ======================================

if (currentChapter === "4") {

    const runePuzzle =
        document.getElementById("prophecyRunePuzzle");

    // Hide the chapter introduction
    prophecyIntro.hidden = true;
    prophecyChapterTitle.hidden = true;
    prophecyChapterText.hidden = true;
    beginProphecyTrial.hidden = true;

    // Hide the old quiz
    prophecyQuiz.hidden = true;

    // Reset the rune puzzle
runeProgress = 0;
runePuzzleCompleted = false;

runeButtons.forEach(function(rune) {
    rune.classList.remove("activated");
});

aetherRune.hidden = true;
aetherRune.classList.remove("activated");

runePuzzleFeedback.textContent = "";

    // Show the ancient rune wall
    runePuzzle.hidden = false;

    return;
}

        // Hide the introduction
        prophecyIntro.hidden = true;
        prophecyChapterTitle.hidden = true;
        prophecyChapterText.hidden = true;
        beginProphecyTrial.hidden = true;

        // Show the quiz
        prophecyQuiz.hidden = false;

        // Start with question one
        currentProphecyQuestion = 0;

        document.getElementById("prophecyQuestionNumber").textContent =
            "Question 1 of " + chapterOneQuestions.length;

        document.getElementById("prophecyQuestionText").textContent =
            chapterOneQuestions[0].question;

            // Show the answer options
            showProphecyAnswers();
    });

}
// ======================================
// DISPLAY PROPHECY ANSWERS
// ======================================

function showProphecyAnswers() {

    const answerContainer =
        document.getElementById("prophecyAnswerOptions");

    const question = chapterOneQuestions[currentProphecyQuestion];

    // Remove previous answer buttons
    answerContainer.innerHTML = "";

    question.answers.forEach(function(answer, index) {

        const button = document.createElement("button");

        button.className = "prophecy-answer-button";
        button.textContent = answer;

        button.addEventListener("click", function() {

            const feedback =
                document.getElementById("prophecyQuizFeedback");

            if (index === question.correct) {
    feedback.textContent = "Correct! The stars shine brighter...";
    feedback.style.color = "#b8ffce";

    // Prevent multiple answers
    answerContainer.querySelectorAll("button").forEach(function(btn) {
        btn.disabled = true;
    });

    // Move to the next question
    setTimeout(function() {
        currentProphecyQuestion++;

        if (currentProphecyQuestion < chapterOneQuestions.length) {
            const nextQuestion = chapterOneQuestions[currentProphecyQuestion];

            document.getElementById("prophecyQuestionNumber").textContent =
                "Question " + (currentProphecyQuestion + 1) +
                " of " + chapterOneQuestions.length;

            document.getElementById("prophecyQuestionText").textContent =
                nextQuestion.question;

            feedback.textContent = "";
            showProphecyAnswers();

        } else {
             // Save completed chapter
            localStorage.setItem("forgottenPropheciesChapter", "2");
            
            feedback.textContent =
                "The stars have heard your answers. The first prophecy is complete.";

            answerContainer.innerHTML = "";
        }
    }, 1200);
} else {
                feedback.textContent = "The stars remain silent. Try again...";
                feedback.style.color = "#ffb8c6";
            }

        });

        answerContainer.appendChild(button);

    });

}
// ======================================
// CHAPTER IV - THE LOST INCANTATION
// ======================================

const correctRuneOrder = ["wind", "fire", "earth", "water"];

let runeProgress = 0;
let runePuzzleCompleted = false;

const runeButtons = document.querySelectorAll(
    "#prophecyRunePuzzle .rune-button[data-rune]"
);

const runePuzzleFeedback = document.getElementById(
    "runePuzzleFeedback"
);

const aetherRune = document.getElementById("aetherRune");

// Listen for rune clicks
runeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (runePuzzleCompleted) {
            return;
        }

        const selectedRune = button.dataset.rune;
        const expectedRune = correctRuneOrder[runeProgress];

        // Correct rune
        if (selectedRune === expectedRune) {

            button.classList.add("activated");
            runeProgress++;

            runePuzzleFeedback.textContent =
                "The ancient magic begins to awaken...";

            // All four runes activated
if (runeProgress === correctRuneOrder.length) {

    runePuzzleCompleted = true;

    aetherRune.hidden = false;
    aetherRune.classList.add("activated");

    // Change the ancient inscription
    document.querySelector(".rune-inscription p").innerHTML =
        "The four have spoken, and the fifth light shines once more.<br>" +
        "The forgotten path now lies before you.<br>" +
        "Touch the heart of Aether, and embrace your destiny.";

    runePuzzleFeedback.textContent = "";
}

        } else {

            // Wrong rune - reset the puzzle
            runeProgress = 0;

            runeButtons.forEach(function(rune) {
                rune.classList.remove("activated");
            });

            runePuzzleFeedback.textContent =
                "The ancient magic fades. Listen once more to the words carved in stone...";
        }

    });

});
// ======================================
// CHAPTER IV - ENTER THE FIFTH LIGHT
// ======================================

aetherRune.addEventListener("click", function() {

    // Aether must be awakened first
    if (!runePuzzleCompleted) {
        return;
    }

    // Unlock Chapter V
    localStorage.setItem("forgottenPropheciesChapter", "5");

    // Close the rune puzzle
    document.getElementById("prophecyRunePuzzle").hidden = true;

    // Close the prophecy popup
    document.getElementById("forgottenPropheciesPopup").hidden = true;

    // Prepare for the next chapter
    runePuzzleCompleted = false;

    
showOrbVision(
    "The Fifth Rune Awakens",
    "The ancient stone trembles as you touch the fifth rune.\n\n" +
    "Aether flows through the forgotten chamber, " +
    "revealing a path hidden for three thousand years.\n\n" +
    "Chapter V: The Fifth Light has been unlocked."
);


});

/* =====================================
   ORB OF FORGOTTEN STARS - VISIONS
===================================== */

const orbVisionModal =
    document.getElementById("orbVisionModal");

const orbVisionTitle =
    document.getElementById("orbVisionTitle");

const orbVisionText =
    document.getElementById("orbVisionText");

const closeOrbVision =
    document.getElementById("closeOrbVision");

let orbVisionResolve = null;

function showOrbVision(title, message) {

    if (!orbVisionModal) {
        return Promise.resolve();
    }

    orbVisionTitle.textContent = title;
    orbVisionText.textContent = message;

    orbVisionModal.hidden = false;

    closeOrbVision.focus();

    return new Promise(resolve => {
        orbVisionResolve = resolve;
    });
}

if (closeOrbVision) {

    closeOrbVision.addEventListener("click", function() {

        orbVisionModal.hidden = true;

        if (orbVisionResolve) {
            orbVisionResolve();
            orbVisionResolve = null;
        }

    });
}
