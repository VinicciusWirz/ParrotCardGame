let turns = 0;
let numAux = 1;
let clock = 0;
const oneSec = 1000;

askCards();
function askCards() {
    const minCards = 4;
    const maxCards = 14;
    const question = 'Digite a quantidade de cartas com que você quer jogar, um numero par entre 4 e 14.'
    const CardQuantity = prompt(question);
    const uniques = CardQuantity / 2;
    if (CardQuantity >= minCards && CardQuantity <= maxCards && CardQuantity % 2 === 0) {
        document.querySelector('main').innerHTML += `<ul style = "grid-template-columns: repeat(${uniques}, 1fr);">
        </ul>`;
        placeCards(uniques);
    } else {
        askCards();
    }
}

function placeCards(uniques) {
    const table = document.querySelector('ul');
    let deck = [];
    for (let i = 0; i < uniques; i++) {
        const cardsOnTable = `<li class="" onclick="flipCard(this);" data-test="card">
        <img src="./assets/imgs/back.png" alt="backcard" data-test="face-down-image">
        <img src="./assets/imgs/${i + 1}parrot.gif" alt="frontcard" id = "card${i}" data-test="face-up-image">
        </li>`;
        deck.push(cardsOnTable);
    }
    deck = [...deck, ...deck];
    deck = shuffle(deck);
    for (let i = 0; i < deck.length; i++) {
        table.innerHTML += deck[i];
    }
}
function shuffle(array) {
    const lastIndex = array.length - 1;
    for (let i = lastIndex; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i));
        const tempValue = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = tempValue;
    }
    return array;
}

const timer = setInterval(function () {
    clock++;
    clockSet(clock);
}, oneSec);

function clockSet(seg) {
    document.querySelector('p span').innerHTML = `${seg}`;
}

const CardsOnTable = document.querySelectorAll('li');

let firstCard = '';
function flipCard(touch) {
    const liCard = touch.classList;
    if (!liCard.contains('flip') && numAux === 1) {
        firstCard = touch;
        liCard.add('flip');
        numAux++;
        turns++;
    } else if (!liCard.contains('flip') && numAux === 2) {
        liCard.add('flip');
        numAux++;
        turns++;
        checkSameCard(firstCard, touch);
    }
}
function checkSameCard(cardOne, cardTwo) {
    const idCardOne = cardOne.querySelector('li>img:last-child').getAttribute('id');
    const idCardTwo = cardTwo.querySelector('li>img:last-child').getAttribute('id');
    if (idCardOne === idCardTwo) {
        cardOne.setAttribute('data-value', 'score');
        cardTwo.setAttribute('data-value', 'score');
        firstCard = '';
        numAux = 1;
        checkPoint();
    } else {
        setTimeout(function () {
            cardTwo.classList.remove('flip');
            cardOne.classList.remove('flip');
            firstCard = '';
            numAux = 1;
        }, oneSec);
    }
}

function checkPoint() {
    const renderTime = oneSec / 10;
    const CardsFlipped = document.querySelectorAll('[data-value = "score"]');
    if (CardsOnTable.length === CardsFlipped.length) {
        setTimeout(function () {
            alert(`Você ganhou em ${turns} jogadas! A duração do jogo foi de ${clock} segundos!`);
            restart();
        }, renderTime);
    }
}

function restart() {
    const restartAnswer = prompt('Você gostaria de reiniciar a partida? Digite sim ou não');
    if (restartAnswer === 'sim') {
        location.reload();
    } else if (restartAnswer === 'não') {
        clearInterval(timer);
    } else {
        restart();
    }
}