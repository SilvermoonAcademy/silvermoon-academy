const globalCoinBalance = document.getElementById("coinBalance");
if (globalCoinBalance) {
    const coinPileIcon = document.createElement("img");

    coinPileIcon.src = "images/coin-pile.png";
    coinPileIcon.alt = "Coins";
    coinPileIcon.className = "coin-pile-icon";

    globalCoinBalance.parentElement.insertBefore(
        coinPileIcon,
        globalCoinBalance
    );

    globalCoinBalance.parentElement.classList.add("coin-display");
}
const savedCoinBalance = localStorage.getItem("coinBalance");

if (globalCoinBalance && savedCoinBalance !== null) {
    globalCoinBalance.textContent = savedCoinBalance;
}
const globalCoin = document.createElement("div");
globalCoin.id = "coin";
globalCoin.className = "coin";

const globalCoinReward = document.createElement("div");
globalCoinReward.id = "coinReward";
globalCoinReward.className = "coin-reward";

document.body.appendChild(globalCoin);
document.body.appendChild(globalCoinReward);
// Slumpar om ett mynt dyker upp och vilken typ det blir
function getRandomCoin() {
    const randomNumber = Math.random() * 100;

    if (randomNumber < 70) {
        return null;
    } else if (randomNumber < 91) {
        return {
            type: "bronze",
            value: 1
        };
    } else if (randomNumber < 97) {
        return {
            type: "silver",
            value: 5
        };
    } else {
        return {
            type: "gold",
            value: 10
        };
    }
}


// Hämta elementen från HTML
const coin = globalCoin;
const coinBalance = globalCoinBalance;
const coinReward = globalCoinReward;
const savedBalance = localStorage.getItem("coinBalance");


if (savedBalance !== null && coinBalance !== null) {
    coinBalance.textContent = savedBalance;
}


// Funktion som placerar myntet slumpmässigt

function placeCoin() {

    // Check if the coin exists on this page
    if (!coin) return;

    const randomX = Math.random() *
        Math.max(0, window.innerWidth - 100);

    // Some pages do not have a header
    const header = document.querySelector("header");
    const headerHeight = header ? header.offsetHeight : 0;

    const randomY =
        headerHeight +
        Math.random() *
        Math.max(0, window.innerHeight - headerHeight - 100);

    const newCoin = getRandomCoin();

    if (newCoin === null) {
        coin.style.display = "none";
        return;
    }

    coin.style.left = randomX + "px";
    coin.style.top = randomY + "px";

    coin.className = "coin " + newCoin.type;
    coin.dataset.value = newCoin.value;

    coin.style.display = "block";
}


// Placera första myntet
placeCoin();

// När spelaren klickar på myntet
coin.addEventListener("click", function() {
const reward = Number(coin.dataset.value);

coinReward.textContent = "+" + reward;

coinReward.style.left = coin.style.left;
coinReward.style.top = coin.style.top;

coinReward.classList.remove("show");

void coinReward.offsetWidth;

coinReward.classList.add("show");

    const newBalance =
    Number(coinBalance.textContent) + Number(coin.dataset.value);

    coinBalance.textContent = newBalance;

    localStorage.setItem("coinBalance", newBalance);

    coin.style.display = "none";


});


const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("silvermoonTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");

    if (themeIcon) {
        themeIcon.src = "images/theme-moon.png";
        themeIcon.alt = "Switch to dark mode";
    }
}

if (themeToggle && themeIcon) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("silvermoonTheme", "light");

            themeIcon.src = "images/theme-moon.png";
            themeIcon.alt = "Switch to dark mode";

        } else {

            localStorage.setItem("silvermoonTheme", "dark");

            themeIcon.src = "images/theme-sun.png";
            themeIcon.alt = "Switch to light mode";
        }

    });
}