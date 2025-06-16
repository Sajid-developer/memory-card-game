const emojis = ['🍕', '🚀', '🐱', '🎧', '⚽', '🌈', '🧊', '🎲'];
let cardsArray = [...emojis, ...emojis];
let firstCard = null;
let lockBoard = false;
let matchedCount = 0;

const grid = document.querySelector('.grid');
const popup = document.getElementById('win-popup');
const restartBtn = document.getElementById('restart');

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(emoji) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">${emoji}</div>
      <div class="card-back">❓</div>
    </div>
  `;
    card.addEventListener('click', () => flipCard(card, emoji));
    return card;
}

function flipCard(card, emoji) {
    if (lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = { card, emoji };
    } else {
        if (emoji === firstCard.emoji) {
            matchedCount++;
            firstCard = null;

            if (matchedCount === emojis.length) {
                setTimeout(() => popup.classList.remove('hidden'), 600);
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                card.classList.remove('flipped');
                firstCard.card.classList.remove('flipped');
                firstCard = null;
                lockBoard = false;
            }, 800);
        }
    }
}

function setupGame() {
    grid.innerHTML = '';
    popup.classList.add('hidden');
    matchedCount = 0;
    firstCard = null;
    lockBoard = false;

    const shuffled = shuffle(cardsArray);
    shuffled.forEach(emoji => {
        const card = createCard(emoji);
        grid.appendChild(card);
    });
}

function restartGame() {
    setupGame();
}

restartBtn.addEventListener('click', restartGame);

// Initial game setup
setupGame();
