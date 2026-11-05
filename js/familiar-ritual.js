// Familiar Ritual Interface

const beginFamiliarRitual = document.getElementById("beginFamiliarRitual");

const familiarIntro = document.querySelector(".familiar-ritual-intro");
const familiarQuestionCard = document.getElementById("familiarQuestionCard");

const familiarQuestionNumber = document.getElementById("familiarQuestionNumber");
const familiarQuestionText = document.getElementById("familiarQuestionText");
const familiarAnswerOptions = document.getElementById("familiarAnswerOptions");
const familiarProgress = document.getElementById("familiarProgress");

let familiarScores = {
    Cat: 0,
    Raven: 0,
    Owl: 0,
    Toad: 0,
    Hare: 0,
    Dog: 0,
    Seal: 0
};
let familiarPrimaryScores = {
    Cat: 0,
    Raven: 0,
    Owl: 0,
    Toad: 0,
    Hare: 0,
    Dog: 0,
    Seal: 0
};
beginFamiliarRitual.addEventListener("click", function () {

    if (localStorage.getItem("studentFamiliar")) {
    alert("You have already bonded with your familiar!");
    window.location.href = "profile.html";
    return;
}
    const hasToken = localStorage.getItem("familiarBondToken") === "true";

    if (!hasToken) {
        alert("You need a Familiar Bond Token to begin the ritual.");
        return;
    }

    familiarIntro.hidden = true;
    familiarQuestionCard.hidden = false;

    currentFamiliarQuestion = 0;

    Object.keys(familiarScores).forEach(familiar => {
        familiarScores[familiar] = 0;
    });

    Object.keys(familiarPrimaryScores).forEach(familiar => {
        familiarPrimaryScores[familiar] = 0;
    });

    showFamiliarQuestion();
});

function showFamiliarQuestion() {

    const question = familiarQuestions[currentFamiliarQuestion];

    familiarQuestionNumber.textContent =
        `Question ${currentFamiliarQuestion + 1} of ${familiarQuestions.length}`;

    familiarQuestionText.textContent = question.question;

    familiarAnswerOptions.innerHTML = "";
    familiarProgress.innerHTML = "";

    // Progress indicator
    familiarQuestions.forEach((_, index) => {

        const step = document.createElement("span");

        if (index <= currentFamiliarQuestion) {
            step.classList.add("active");
        }

        familiarProgress.appendChild(step);
    });

    // Answer buttons
    question.answers.forEach(answer => {

        const button = document.createElement("button");

        button.className = "familiar-answer-button";
        button.textContent = answer.text;

        button.addEventListener("click", function () {

    // Award one point to the selected familiar
    Object.entries(answer.scores).forEach(([familiar, points]) => {
    familiarScores[familiar] += points;

    if (points === 2) {
        familiarPrimaryScores[familiar]++;
    }
});

    // Move to the next question
    currentFamiliarQuestion++;

    if (currentFamiliarQuestion < familiarQuestions.length) {

        showFamiliarQuestion();

    } else {

        // All seven questions completed
        const winningFamiliar = determineFamiliar();

console.log("Your Familiar:", winningFamiliar);
console.table(familiarScores);

familiarQuestionCard.hidden = true;

// Temporary result message
showFamiliarResult(winningFamiliar);    
}

});

        familiarAnswerOptions.appendChild(button);
    });
}
// Familiar Bonding Ritual Questions

const familiarQuestions = [
    {
        question: "You discover a hidden path in the enchanted forest. What do you do?",
        answers: [
            { text: "Explore it quietly on my own.", scores: { Cat: 2, Hare: 1 } },
            { text: "Look for clues about where it leads.", scores: { Raven: 2, Owl: 1 } },
            { text: "Think carefully before taking a step.", scores: { Owl: 2, Toad: 1 } },
            { text: "Invite a friend to explore with me.", scores: { Dog: 2, Seal: 1 } }
        ]
    },
    {
        question: "Which place makes you feel most at peace?",
        answers: [
            { text: "A cozy garden surrounded by ancient trees.", scores: { Toad: 2, Cat: 1 } },
            { text: "A moonlit shore with gentle waves.", scores: { Seal: 2, Dog: 1 } },
            { text: "An open meadow beneath the stars.", scores: { Hare: 2, Raven: 1 } },
            { text: "A quiet library filled with forgotten knowledge.", scores: { Owl: 2, Raven: 1 } }
        ]
    },
    {
        question: "A friend is feeling sad. How do you help?",
        answers: [
            { text: "Stay beside them until they feel better.", scores: { Dog: 2, Toad: 1 } },
            { text: "Find a playful way to make them smile.", scores: { Seal: 2, Hare: 1 } },
            { text: "Listen carefully and offer thoughtful advice.", scores: { Owl: 2, Raven: 1 } },
            { text: "Bring them somewhere peaceful and comforting.", scores: { Toad: 2, Seal: 1 } }
        ]
    },
    {
        question: "What would you most like to discover at Silvermoon Academy?",
        answers: [
            { text: "A secret that nobody else has uncovered.", scores: { Raven: 2, Cat: 1 } },
            { text: "A hidden magical passage.", scores: { Cat: 2, Hare: 1 } },
            { text: "A spell that lets me travel anywhere.", scores: { Hare: 2, Seal: 1 } },
            { text: "An ancient tradition worth protecting.", scores: { Toad: 2, Dog: 1 } }
        ]
    },
    {
        question: "When faced with an unexpected challenge, you...",
        answers: [
            { text: "Trust my instincts.", scores: { Cat: 2, Seal: 1 } },
            { text: "Act quickly and try something creative.", scores: { Hare: 2, Raven: 1 } },
            { text: "Stand strong and protect those around me.", scores: { Dog: 2, Toad: 1 } },
            { text: "Observe the situation before making a move.", scores: { Raven: 2, Owl: 1 } }
        ]
    },
    {
        question: "Which magical gift would you choose?",
        answers: [
            { text: "The ability to understand every creature.", scores: { Seal: 2, Dog: 1 } },
            { text: "The power to uncover hidden truths.", scores: { Raven: 2, Cat: 1 } },
            { text: "The gift of understanding ancient wisdom.", scores: { Owl: 2, Toad: 1 } },
            { text: "The ability to bring life to forgotten gardens.", scores: { Toad: 2, Hare: 1 } }
        ]
    },
    {
        question: "Under the Silver Moon, what matters most to you?",
        answers: [
            { text: "The freedom to follow my own path.", scores: { Cat: 2, Owl: 1 } },
            { text: "The courage to stand beside those I love.", scores: { Dog: 2, Cat: 1 } },
            { text: "The joy of discovering something new.", scores: { Hare: 2, Raven: 1 } },
            { text: "The connections that make life magical.", scores: { Seal: 2, Dog: 1 } }
        ]
    }
];
function determineFamiliar() {

    const highestScore = Math.max(...Object.values(familiarScores));

    let candidates = Object.keys(familiarScores).filter(
        familiar => familiarScores[familiar] === highestScore
    );

    // Tie-breaker: most primary answers
    if (candidates.length > 1) {

        const highestPrimaryScore = Math.max(
            ...candidates.map(familiar => familiarPrimaryScores[familiar])
        );

        candidates = candidates.filter(
            familiar => familiarPrimaryScores[familiar] === highestPrimaryScore
        );
    }

    // Final tie-breaker
    const winner = candidates[
        Math.floor(Math.random() * candidates.length)
    ];

    return winner;
}
const familiarResultCard = document.getElementById("familiarResultCard");
const familiarResultImage = document.getElementById("familiarResultImage");
const familiarResultName = document.getElementById("familiarResultName");
const familiarResultDescription = document.getElementById("familiarResultDescription");

const familiarInfo = {
    Cat: {
        image: "images/cat.png",
        description: "An independent spirit, guided by intuition and mystery."
    },
    Raven: {
        image: "images/raven.png",
        description: "A curious mind that sees secrets others overlook."
    },
    Owl: {
        image: "images/owl.png",
        description: "A thoughtful companion, guided by wisdom and patience."
    },
    Toad: {
        image: "images/toad.png",
        description: "A loyal and grounded soul who finds magic in simple things."
    },
    Hare: {
        image: "images/hare.png",
        description: "A quick and creative spirit, always ready for adventure."
    },
    Dog: {
        image: "images/dog.png",
        description: "A brave and protective companion with an unwavering heart."
    },
    Seal: {
        image: "images/seal.png",
        description: "A playful and empathetic soul who brings joy wherever they go."
    }
};

function showFamiliarResult(familiar) {

    localStorage.setItem("studentFamiliar", familiar);
    const info = familiarInfo[familiar];

    familiarResultImage.src = info.image;
    familiarResultImage.alt = familiar;

    familiarResultName.textContent = familiar;
    familiarResultDescription.textContent = info.description;

    familiarQuestionCard.hidden = true;
    familiarResultCard.hidden = false;

}