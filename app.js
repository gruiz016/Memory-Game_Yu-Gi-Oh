const cards = document.querySelectorAll('.memory-card');
const refreshScreen = document.querySelector('.reset');
const gameBoard = document.querySelector('.memory-game');
const header = document.querySelector('.header');
const score = document.querySelector('.score');

//Setting varibles to handle the logic flow.
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let count = 24;

//This loops through each card and adds an eventlistner, with my flipCard function.
cards.forEach(card => card.addEventListener('click', flipCard));

//This function handles the control flow. The first if statement stops users from double clicking the same card and matching it with itself.
function flipCard() {
    if (count === 0) {
        lockBoard = true;
        alert('You Lose, Please Press Start Again!');
    }
    if (this === firstCard) return;
    if (lockBoard) { //This checks if the board is locked.
        return;
    } else {
        count--;
        this.classList.add('flip');
        if (!hasFlippedCard) { //Checks to see if the selected card has been flipped already.
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        secondCard = this;
        checkForMatch();
    }
}

//This function handles the mataching logic, which checks if the meta dataset is equal to one another. It also locks the board, while checking so that user can not continue to select cards.
function checkForMatch() {
    lockBoard = true;
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    isMatch ? disableCards() : unFlipCards();
}

//If there is a match this function removes the eventListener so that they stay face up and reset's the board.
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

//If there is no match this function removes the class that handles the animation. This also holds the delay in execution that allows the user to see the second card.
function unFlipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

//This function resets a few key values to ensure that they next time a user selects cards, there isn't weird bugs.
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//This starts a new game by refreshing the page.
refreshScreen.addEventListener('click', () => {
    location.reload();
});

gameBoard.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
        score.innerText = `You only got ${count} more tires!`;
    }
});

//This shuffles the deck.
(function shuffle() {
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 12);
        card.style.order = random;
    })
})();

