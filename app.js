const cards = document.querySelectorAll(".card");

function shuffleCards() {
    cards.forEach(card => {
        const randomPos = Math.trunc(Math.random() * 12);

        card.style.order = randomPos;
    })
}
shuffleCards();

cards.forEach(card => card.addEventListener("click", flipACard));

let locked = false;
let numberOfTries = 0;
let cardsPicked = [];
function flipACard(e) {
    if (locked) return;

    saveCard(e.target.children[0], e.target.getAttribute("data-attr"))
}

function saveCard(el, value) {
    if (el === cardsPicked[0]?.el) return;

    el.classList.add("active");
    cardsPicked.push({ el, value })
    console.log(cardsPicked);

    if (cardsPicked.length === 2) {
        locked = true;
        numberOfTries++;
        result();
    }
}

function result() {

    saveNumberOfTries();

    if (cardsPicked[0].value === cardsPicked[1].value) {
        cardsPicked[0].el.parentElement.removeEventListener("click", flipACard);
        cardsPicked[1].el.parentElement.removeEventListener("click", flipACard);
        cardsPicked = [];
        setTimeout(() => {
            locked = false;
        }, 1000)
        return;
    } else {

        setTimeout(() => {
            cardsPicked[0].el.classList.remove("active")
            cardsPicked[1].el.classList.remove("active")
            cardsPicked = [];
            locked = false;
        }, 1000)
    }
}

const innerCard = [...document.querySelectorAll(".double-face")];
const advice = document.querySelector("h2");
const strokesNumber = document.querySelector('.strokes-number');

function saveNumberOfTries() {

    const checkForEnd = innerCard.filter(card => !card.classList.contains("active"));

    if (!checkForEnd.length) {
        strokesNumber.textContent = `Votre score final : ${numberOfTries}`;
        advice.textContent = "Félicitation, Vous avez gagné la partie !! Appuyer sur \"espace\" pour recommencer";
        return;
    } else {
        strokesNumber.textContent = `Nombre de coup : ${numberOfTries}`;
        advice.textContent = "Tentez de gagner avec le moins d'essais possible.";
    }
}
saveNumberOfTries()

window.addEventListener("keydown", handleRestart)
let shuffleLock = false;

function handleRestart(e) {
    e.preventDefault();

    if (e.keyCode === 32) {
        innerCard.forEach(card => card.classList.remove("active"));
        numberOfTries = 0;
        strokesNumber.textContent = `Nombre de coup : ${numberOfTries}`;
        advice.textContent = "Tentez de gagner avec le moins d'essais possible.";
        cardsPicked = [];
        locked = false;
        cards.forEach(card => card.addEventListener("click", flipACard));

        if (shuffleLock) return;
        shuffleLock = true;
        setTimeout(() => {
            shuffleCards();
            shuffleLock = false
        }, 600)

    }
}