const beginTrial = document.getElementById("beginTrial");
const trialIntro = document.querySelector(".house-trial-intro");
const trialQuestion = document.getElementById("trialQuestion");

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const houseResult = document.getElementById("houseResult");
const winningHouseDisplay = document.getElementById("winningHouse");
const houseMotto = document.getElementById("houseMotto");
const returnProfile = document.getElementById("returnProfile");


const questions = [
    {
        question: "During your first week at Silvermoon Academy, you discover a hidden passage behind an old tapestry. No teacher has mentioned it, and you have no idea where it leads. What do you do?",
        answers: [
            {
                text: "I find out what I can about the passage first. There may be a reason it has been forgotten.",
                house: "Eldergard"
            },
            {
                text: "I enter immediately. Some discoveries are only made by those willing to take the first step.",
                house: "Kaelthorn"
            },
            {
                text: "I ask another student to come with me. Whatever is down there, we should face it together.",
                house: "Serenia"
            },
            {
                text: "I study the markings around the entrance. Perhaps they can tell me where the passage leads.",
                house: "Caeloria"
            }
        ]
    },

    {
        question: "During a practical magic lesson, another student loses control of a spell. The spell is growing stronger, and the student is beginning to panic. What do you do?",
        answers: [
            {
                text: "I speak calmly to the student and help them regain control. Panic will only make the situation worse.",
                house: "Serenia"
            },
            {
                text: "I step forward and try to stop the spell myself before someone gets hurt.",
                house: "Kaelthorn"
            },
            {
                text: "I quickly assess what is happening and follow the safest method I know to contain the spell.",
                house: "Eldergard"
            },
            {
                text: "I watch how the spell is behaving and try an unusual solution that might redirect its energy.",
                house: "Caeloria"
            }
        ]
    },
    {
    question: "While exploring the Silvermoon Archives, you find an old book that appears to have been untouched for centuries. A warning on the cover says that its knowledge can be dangerous in the wrong hands. What do you do?",
    answers: [
        {
            text: "I take the book to someone I trust. Some discoveries are better understood together.",
            house: "Serenia"
        },
        {
            text: "I open it. Dangerous or not, knowledge should not remain hidden simply because people fear it.",
            house: "Caeloria"
        },
        {
            text: "I decide to investigate the book despite the warning, but I make sure I am prepared for whatever might happen.",
            house: "Kaelthorn"
        },
        {
            text: "I examine the book carefully before doing anything, looking for enchantments, traps or signs of damage.",
            house: "Eldergard"
        }
    ]
},
{
    question: "A close friend has failed an important magical exam and is considering leaving Silvermoon Academy. What do you do?",
    answers: [
        {
            text: "I suggest trying a completely different way of learning. Perhaps they simply haven't found the method that works for them yet.",
            house: "Caeloria"
        },
        {
            text: "I listen to them and try to understand how they truly feel before offering any advice.",
            house: "Serenia"
        },
        {
            text: "I help them figure out what went wrong and create a practical plan for improving before the next exam.",
            house: "Eldergard"
        },
        {
            text: "I remind them of everything they have already overcome and encourage them to try again.",
            house: "Kaelthorn"
        }
    ]
},
{
    question: "During an expedition outside the academy, your group becomes lost as a magical storm approaches. Everyone has a different idea of what to do. How do you respond?",
    answers: [
        {
            text: "I choose the option that seems most promising and encourage the group to act before the storm reaches us.",
            house: "Kaelthorn"
        },
        {
            text: "I examine our surroundings and supplies before deciding which route gives us the safest chance of returning.",
            house: "Eldergard"
        },
        {
            text: "I look for something unusual in the environment — magical currents, creatures or landmarks that might reveal another way back.",
            house: "Caeloria"
        },
        {
            text: "I make sure everyone gets a chance to speak. Someone may have noticed something the rest of us missed.",
            house: "Serenia"
        }
    ]
},
{
    question: "You are offered the chance to learn a rare form of magic, but mastering it would require months of difficult training. What appeals to you most about the opportunity?",
    answers: [
        {
            text: "Taking the time to master the magic properly and knowing that the effort will eventually pay off.",
            house: "Eldergard"
        },
        {
            text: "Discovering something unfamiliar and learning what possibilities this magic might reveal.",
            house: "Caeloria"
        },
        {
            text: "Understanding how this magic could help or protect others.",
            house: "Serenia"
        },
        {
            text: "Challenging myself to accomplish something few students have managed before.",
            house: "Kaelthorn"
        }
    ]
},
{
    question: "At the heart of Silvermoon stands the statue of the four founders at Elementorumia. As you stand before it, you are asked one final question: What do you believe is most important for Silvermoon's future?",
    answers: [
        {
            text: "That we never stop questioning, exploring and discovering what lies beyond what we already know.",
            house: "Caeloria"
        },
        {
            text: "That we have the courage to challenge what is wrong and shape a better future.",
            house: "Kaelthorn"
        },
        {
            text: "That we continue trying to understand one another, especially when our differences seem greatest.",
            house: "Serenia"
        },
        {
            text: "That we protect what generations before us have built while patiently making it stronger.",
            house: "Eldergard"
        }
    ]
}
];


let currentQuestionIndex = 0;

const scores = {
    Serenia: 0,
    Kaelthorn: 0,
    Eldergard: 0,
    Caeloria: 0
};
const houseMottos = {
    Serenia: "Listen Beyond Words.",
    Kaelthorn: "Bold Hearts Shape the Future.",
    Eldergard: "Patience Builds What Strength Protects.",
    Caeloria: "Let Curiosity Guide You."
};

const answerHistory = [];

beginTrial.addEventListener("click", function() {
    trialIntro.style.display = "none";
    trialQuestion.style.display = "block";

    loadQuestion();
});


function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionNumber.textContent =
        "QUESTION " + (currentQuestionIndex + 1) + " OF 7";

    questionText.textContent = currentQuestion.question;

    answerOptions.innerHTML = "";

    currentQuestion.answers.forEach(function(answer) {
        const button = document.createElement("button");

        button.textContent = answer.text;
        button.dataset.house = answer.house;

        button.addEventListener("click", function() {
            const selectedHouse = button.dataset.house;

            scores[selectedHouse]++;
            answerHistory.push(selectedHouse);

            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                loadQuestion();
            } else {
                console.log(scores);
                determineHouse();
            }
        });

        answerOptions.appendChild(button);
    });
}
function determineHouse() {
    const highestScore = Math.max(...Object.values(scores));

    const leadingHouses = Object.keys(scores).filter(function(house) {
        return scores[house] === highestScore;
    });

    let winningHouse;

    if (leadingHouses.length === 1) {
        winningHouse = leadingHouses[0];
    } else {
        for (let i = answerHistory.length - 1; i >= 0; i--) {
            const house = answerHistory[i];

            if (leadingHouses.includes(house)) {
                winningHouse = house;
                break;
            }
        }
    }

    console.log("Scores:", scores);
    console.log("Leading houses:", leadingHouses);
    console.log("Winning House:", winningHouse);

    // Save the House to localStorage
    localStorage.setItem("studentHouse", winningHouse);

    // Hide the questions and show the result
    trialQuestion.style.display = "none";
    houseResult.style.display = "block";

    // Show the House name and motto
    winningHouseDisplay.textContent = winningHouse;
    houseMotto.textContent = houseMottos[winningHouse];
}
returnProfile.addEventListener("click", function() {
    window.location.href = "profile.html";
});
