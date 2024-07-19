const cardsArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'E', img: 'E' },
    { name: 'F', img: 'F' },
    { name: 'G', img: 'G' },
    { name: 'H', img: 'H' }
];

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const match = () => {
    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.add('matched');
    });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    const selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
        card.classList.remove('selected');
    });
};

gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = item.img;

    const back = document.createElement('div');
    back.classList.add('back');

    card.appendChild(front);
    card.appendChild(back);

    gameBoard.appendChild(card);
});

gameBoard.addEventListener('click', event => {
    const clicked = event.target;

    if (
        clicked.nodeName === 'DIV' &&
        !clicked.parentNode.classList.contains('selected') &&
        !clicked.parentNode.classList.contains('matched')
    ) {
        if (count < 2) {
            count++;
            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            } else {
                secondGuess = clicked.parentNode.dataset.name;
                clicked.parentNode.classList.add('selected');
            }
            if (firstGuess && secondGuess) {
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                }
                setTimeout(resetGuesses, delay);
            }
            previousTarget = clicked;
        }
    }
});

document.getElementById('restartButton').addEventListener('click', () => {
    gameGrid.sort(() => 0.5 - Math.random());
    gameBoard.innerHTML = '';

    gameGrid.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = item.img;

        const back = document.createElement('div');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);

        gameBoard.appendChild(card);
    });
});
