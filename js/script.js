let allCards = document.getElementsByClassName("card");
let cards = Array.from(allCards);
const cardList = document.querySelector(".cards-wrapper");
let openCards = [];
let matchedCards = [];

const resetButton = document.querySelector(".reset");

let moves = 0;
let moveCounter = document.querySelector(".move-counter");
let stars = [...document.querySelectorAll(".fa-star")];

let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let interval;
let totalSeconds = 0;

const modal = document.querySelector(".modal");
const newGameButton = document.querySelector("#new-game");
const totalMoves = document.querySelector('#total-moves');
const gameTime = document.querySelector('#time');
const starRating = document.querySelector('#star-rating');
const closeButton = document.querySelector('#close-button');
let totalStarCounter = 0;

document.onLoad = gameStart();


function gameStart() {
    shuffle(cards);
    shuffledCards();
    moves = 0;
}


function shuffledCards() {
    for (let i = 0; i < cards.length; i++) {
        cardList.innerHTML = "";

        for (let card of cards) {
            cardList.appendChild(card);
        }
    }
}


function movesDisplay() {

    if (moves > 8) {
        stars[4].classList.add("hidden");
    }
    if (moves > 12) {
        stars[3].classList.add("hidden");
    }
    if (moves > 16) {
        stars[2].classList.add("hidden");
    }
    if (moves === 20) {
        stars[1].classList.add("hidden");
    }
}


resetButton.addEventListener("click", gameReset);


function gameReset() {
    window.location = window.location;
}


for (let card of cards) {
    card.addEventListener("click", turnOver);
}


function turnOver() {

    if (moves == 0) {
        timeInterval();
    }
    moves++;
    movesDisplay();
    moveCounter.innerHTML = moves;
    if (openCards.length < 2) {
        this.classList.add("open", "show", "unclick");
        openCards.push(this);
    }

    if (openCards.length === 2) {
        cardMatches();
    }
}


function cardMatches() {
    setTimeout(function() {
        if (openCards[0].innerHTML === openCards[1].innerHTML) {
            openCards[0].classList.add("match");
            openCards[1].classList.add("match");
            matchedCards.push(openCards[0]);
            matchedCards.push(openCards[1]);
        } else {
            openCards[0].classList.remove("open", "show", "unclick");
            openCards[1].classList.remove("open", "show", "unclick");
        }

        if (matchedCards.length == 16) {
            winGame();
        }

        openCards = [];
    }, 500);
}


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function timeInterval() {
    interval = setInterval(timer, 1000);
}

function timer() {
    totalSeconds++;
    seconds.innerHTML = pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


function winGame() {
    clearInterval(interval);
    if (matchedCards.length == 16) {
        modal.style.display = "block";
        totalMoves.innerHTML = moves
        gameTime.innerHTML = minutes.innerHTML + ":" + seconds.innerHTML;

        stars.forEach(function(star) {
            if (!star.classList.contains('hidden')) {
                totalStarCounter++;
                starRating.innerHTML = totalStarCounter + " Yıldız.";
            } else if (totalStarCounter == 1) {
                starRating.innerHTML = totalStarCounter + " Yıldız."
            }
        });
    }
}


newGameButton.addEventListener('click', function() {
    window.location = window.location;
});

closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
})