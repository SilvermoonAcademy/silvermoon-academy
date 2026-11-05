const quizOptions = document.querySelectorAll(".quiz-options button");
const quizResult = document.getElementById("quizResult");
const quizCoinBalance = document.getElementById("coinBalance");
const retryQuiz = document.getElementById("retryQuiz");

let subject = "spellcraft";
let currentQuestionIndex = 0;
let score = 0;
let questionTimer;
let completedQuizzes =
    JSON.parse(localStorage.getItem("completedQuizzes")) || [];

const rewards = {
    spellcraft: {
        name: "Silver Coin 🥈",
        value: 5
    },
    potions: {
        name: "Silver Coin 🥈",
        value: 5
    },
    astral: {
        name: "Silver Coin 🥈",
        value: 5
    },
    ancient: {
        name: "Silver Coin 🥈",
        value: 5
    },
    creatures: {
        name: "Silver Coin 🥈",
        value: 5
    },
    master: {
        name: "Gold Coin 🥇",
        value: 10
    }
};

const questions = {

    spellcraft: [
    {
        question: "Which spell creates a bright magical light?",
        answers: ["Lux", "Ignis", "Glacius"],
        correct: "Lux"
    },
    {
        question: "Which spell creates a magical shield?",
        answers: ["Aegis", "Procella", "Duplicatio"],
        correct: "Aegis"
    },
    {
        question: "Which spell freezes a target or covers an area in magical frost?",
        answers: ["Ignis", "Glacius", "Incrementum"],
        correct: "Glacius"
    },
    {
        question: "Which spell causes plants and magical vegetation to grow rapidly?",
        answers: ["Incrementum", "Procella", "Lux"],
        correct: "Incrementum"
    },
    {
        question: "Which spell creates a temporary magical copy of a person or object?",
        answers: ["Duplicatio", "Aegis", "Glacius"],
        correct: "Duplicatio"
    }
],
potions: [
    {
        question: "Which ingredients are used to brew the Moonlight Elixir?",
        answers: [
            "Moonleaf + Starflower",
            "Moonleaf + Mooncap Mushroom",
            "Ember Root + Starflower"
        ],
        correct: "Moonleaf + Starflower"
    },
    {
        question: "Which potion is created using Moonleaf and Mooncap Mushroom?",
        answers: [
            "Forest Draught",
            "Sanatio Potion",
            "Armatura Potion"
        ],
        correct: "Forest Draught"
    },
    {
        question: "Which ingredient is used in the Phoenix Essence?",
        answers: [
            "Ember Root",
            "Gorgon Scale",
            "Unicorn Hair"
        ],
        correct: "Ember Root"
    },
    {
        question: "Which potion uses Gorgon Scale as an ingredient?",
        answers: [
            "Armatura Potion",
            "Amoria Potion",
            "Moonlight Elixir"
        ],
        correct: "Armatura Potion"
    },
    {
        question: "Which ingredients are used to brew the Sanatio Potion?",
        answers: [
            "Unicorn Hair + Moonleaf",
            "Heart Kelp + Starflower",
            "Gorgon Scale + Mooncap Mushroom"
        ],
        correct: "Unicorn Hair + Moonleaf"
    }
],
astral: [
    {
        question: "Which celestial influence is associated with emotion, dreams and healing?",
        answers: [
            "Aqualis",
            "Ignara",
            "Vespera"
        ],
        correct: "Aqualis"
    },
    {
        question: "Which celestial influence represents courage, passion and strength?",
        answers: [
            "Ignara",
            "Terravon",
            "Caelus"
        ],
        correct: "Ignara"
    },
    {
        question: "Which celestial influence is connected to mystery, illusion and hidden magic?",
        answers: [
            "Vespera",
            "The Silver Moon",
            "The Eternal Stars"
        ],
        correct: "Vespera"
    },
    {
        question: "Which celestial event causes silver streaks to cross the night sky?",
        answers: [
            "Silverfall Meteor Shower",
            "Shadow Moon",
            "The Convergence"
        ],
        correct: "Silverfall Meteor Shower"
    },
    {
        question: "Which celestial influence is associated with destiny, prophecy and divination?",
        answers: [
            "The Eternal Stars",
            "Caelus",
            "Aqualis"
        ],
        correct: "The Eternal Stars"
    }
],
ancient: [
    {
        question: "Approximately how long ago did the war between the four elemental kingdoms take place?",
        answers: [
            "3,000 years ago",
            "1,000 years ago",
            "5,000 years ago"
        ],
        correct: "3,000 years ago"
    },
    {
        question: "Which founder was associated with Water?",
        answers: [
            "Aquillia",
            "Ventlia",
            "Ingnistil"
        ],
        correct: "Aquillia"
    },
    {
        question: "Which founder was associated with Earth?",
        answers: [
            "Solumer",
            "Ingnistil",
            "Ventlia"
        ],
        correct: "Solumer"
    },
    {
        question: "What is Elementorumia?",
        answers: [
            "The place where the four kingdoms met",
            "An ancient magical creature",
            "A forbidden spell"
        ],
        correct: "The place where the four kingdoms met"
    },
    {
        question: "Why was Silvermoon Academy founded?",
        answers: [
            "To unite magical traditions and create peace",
            "To prepare the kingdoms for another war",
            "To protect magic from non-magical people"
        ],
        correct: "To unite magical traditions and create peace"
    }
],
creatures: [
    {
        question: "Which magical creature is associated with House Serenia?",
        answers: [
            "Siren",
            "Gorgon",
            "Hippogriff"
        ],
        correct: "Siren"
    },
    {
        question: "Which magical creature is associated with House Kaelthorn?",
        answers: [
            "Keraunos",
            "Unicorn",
            "Moonfox"
        ],
        correct: "Keraunos"
    },
    {
        question: "Which House is associated with the Gorgon?",
        answers: [
            "Eldergard",
            "Caeloria",
            "Serenia"
        ],
        correct: "Eldergard"
    },
    {
        question: "Which House is associated with the Hippogriff?",
        answers: [
            "Caeloria",
            "Kaelthorn",
            "Eldergard"
        ],
        correct: "Caeloria"
    },
    {
        question: "Which creature has the highest chance of being discovered while exploring the wilds?",
        answers: [
            "Moonfox",
            "Starhorn",
            "Emberwing"
        ],
        correct: "Moonfox"
    }
]

   

};
function createMasterQuiz() {

    const subjects = [
        "spellcraft",
        "potions",
        "astral",
        "ancient",
        "creatures"
    ];

    const masterQuestions = [];

    subjects.forEach(function(study) {

        const shuffledQuestions = [...questions[study]];

        shuffledQuestions.sort(function() {
            return Math.random() - 0.5;
        });

        masterQuestions.push(
            ...shuffledQuestions.slice(0, 2)
        );

    });

    masterQuestions.sort(function() {
        return Math.random() - 0.5;
    });

    questions.master = masterQuestions;
}
function updatePassedExaminations() {

    document.querySelectorAll(".quiz-parchment").forEach(function(parchment) {

        const quizName = parchment.dataset.quiz;

        if (completedQuizzes.includes(quizName)) {

            parchment.classList.add("passed");

            const content = parchment.querySelector(".parchment-content");

            if (!content.querySelector(".passed-stamp")) {

                const passedStamp = document.createElement("img");

                passedStamp.src = "images/quiz-passed-stamp.png";
                passedStamp.alt = "Silvermoon Academy Passed";
                passedStamp.classList.add("passed-stamp");

                content.appendChild(passedStamp);
            }
        }
    });
}
updatePassedExaminations();
function loadQuestion() {

    const currentQuestion =
        questions[subject][currentQuestionIndex];

    document.getElementById("questionCounter").textContent =
        "Question " + (currentQuestionIndex + 1) + " of " +
        questions[subject].length;

    document.getElementById("question").textContent =
        currentQuestion.question;

    const shuffledAnswers = [...currentQuestion.answers];

shuffledAnswers.sort(function() {
    return Math.random() - 0.5;
});

quizOptions.forEach(function(button, index) {

    button.textContent = shuffledAnswers[index];

    button.classList.remove("correct", "wrong");
    button.disabled = false;

});

}



function showQuizComplete() {

    document.getElementById("questionCounter").textContent =
        "✨ QUIZ COMPLETE ✨";

    document.getElementById("question").textContent =
        score + " / " + questions[subject].length;

    quizOptions.forEach(function(button) {
        button.style.display = "none";
    });

    retryQuiz.style.display = "block";

}
retryQuiz.addEventListener("click", function() {

    if (subject === "master") {
        createMasterQuiz();
    }

    currentQuestionIndex = 0;
    score = 0;

    retryQuiz.style.display = "none";

    quizOptions.forEach(function(button) {
        button.style.display = "inline-block";
        button.classList.remove("correct", "wrong");
    });

    quizResult.textContent = "";

    loadQuestion();

});

const subjectButtons =
    document.querySelectorAll("[data-subject]");


subjectButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        clearTimeout(questionTimer);

        subjectButtons.forEach(function(option) {
            option.classList.remove("selected");
        });

        button.classList.add("selected");

        subject = button.dataset.subject;

        if (subject === "master") {
            createMasterQuiz();
        }

        currentQuestionIndex = 0;
        score = 0;

        retryQuiz.style.display = "none";

        quizOptions.forEach(function(option) {
            option.style.display = "inline-block";
            option.disabled = false;
            option.classList.remove("correct", "wrong");
        });

        quizResult.textContent = "";

        loadQuestion();

        document.querySelector(".quiz-question-parchment").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});



quizOptions.forEach(function(button) {

    button.addEventListener("click", function() {

        const currentQuestion =
            questions[subject][currentQuestionIndex];

        quizOptions.forEach(function(option) {
            option.classList.remove("correct", "wrong");
            option.disabled = true;
        });

        if (button.textContent === currentQuestion.correct) {

            button.classList.add("correct");

            score++;

            quizResult.textContent = "✨ Correct!";

        } else {

            button.classList.add("wrong");

            quizResult.textContent = "❌ Wrong answer!";

        }

        quizResult.classList.remove("show");

        void quizResult.offsetWidth;

        quizResult.classList.add("show");

        questionTimer = setTimeout(function() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions[subject].length) {

        quizResult.textContent = "";

        loadQuestion();

    } else {

        showQuizComplete();

        const totalQuestions = questions[subject].length;

        if (score === totalQuestions) {

            localStorage.setItem("achievementPerfectStudent", "true");
            
                
/* =====================================
   SUBJECT QUIZ ACHIEVEMENTS
===================================== */

const quizAchievements = {
    spellcraft: "achievementSpellcraftScholar",
    potions: "achievementPotionScholar",
    astral: "achievementAstralScholar",
    ancient: "achievementHistoryScholar",
    creatures: "achievementCreatureScholar",
    master: "achievementGrandScholar"
};

const achievementKey = quizAchievements[subject];

if (achievementKey) {
    localStorage.setItem(achievementKey, "true");
}


            const reward = rewards[subject];

            if (!completedQuizzes.includes(subject)) {

                const newBalance =
                Number(quizCoinBalance.textContent) + reward.value;

                quizCoinBalance.textContent = newBalance;

                localStorage.setItem("coinBalance", newBalance);

                completedQuizzes.push(subject);
                    localStorage.setItem(
                     "completedQuizzes",
                    JSON.stringify(completedQuizzes)
                    );
                quizResult.textContent =
                    "🎉 Perfect score! " +
                    score +
                    " / " +
                    totalQuestions +
                    " — You earned a " +
                    reward.name +
                    " +" +
                    reward.value;

            } else {

                quizResult.textContent =
                    "🎉 Perfect score! " +
                    score +
                    " / " +
                    totalQuestions +
                    " — Reward already collected!";

            }

        } else {

            quizResult.textContent =
                "📚 Score: " +
                score +
                " / " +
                totalQuestions +
                " — You need a perfect score to earn the reward. Try again!";

        }

    }

}, 1000);

    });

});