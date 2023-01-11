let CardQuantity = 0;
let turns = 0;
let points = 0;
let idFinder = 1;
let maxPoints = 7;
let clock = 0;

askCards();
function askCards() {
    const question = 'Digite a quantidade de cartas com que você quer jogar, um numero entre 4 e 14.'
    CardQuantity = prompt(question);
    if (CardQuantity >= 4 && CardQuantity <= 14 && CardQuantity % 2 === 0) {
        document.querySelector('main').innerHTML += `<ul style = "grid-template-columns: repeat(${CardQuantity / 2}, 1fr);">
        </ul>`;
        placeCards(CardQuantity);
        maxPoints = CardQuantity / 2;
    } else {
        askCards();
    }
}

function placeCards(CardQuantity) {
    const table = document.querySelector('ul');
    let deck = [];
    for (let i = 0; i < CardQuantity / 2; i++) {
        const cardsOnTable = `<li class="" onclick="flipCard(this);" data-test="card">
        <img src="./assets/imgs/back.png" alt="backcard" data-test="face-down-image">
        <img src="./assets/imgs/${i + 1}parrot.gif" alt="frontcard" id = "card${i}" data-test="face-up-image">
        </li>`
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


let firstCard = '';
function flipCard(touch) {
    const cardContent = touch.querySelector('li>img:last-child');
    if (!touch.classList.contains('flip') && idFinder === 1) {
        firstCard = cardContent;
        touch.classList.add('flip');
        idFinder++;
        turns++;
    } else {
        touch.classList.add('flip');
        idFinder--;
        turns++;
        if (firstCard.getAttribute('id') === cardContent.getAttribute('id')) {
            points++;
            firstCard = '';
            checkPoint();
        } else {
            removeOnClick();
            setTimeout(function () {
                touch.classList.remove('flip');
                firstCard.parentElement.classList.remove('flip');
                firstCard = '';
                addOnClick();
            }, 1000);
        }
    }
}

function checkPoint() {
    if (points === maxPoints) {
        setTimeout(function () {
            alert(`Você ganhou em ${turns} jogadas! A duração do jogo foi de ${clock} segundos!`);
            restart();
        }, 500);
    }
}
function removeOnClick() {
    const cardsPlaced = document.querySelectorAll('li');
    for (let i = 0; i < cardsPlaced.length; i++) {
        cardsPlaced[i].removeAttribute('onclick');
    }
}

function addOnClick() {
    const cardsPlaced = document.querySelectorAll('li');
    for (let i = 0; i < cardsPlaced.length; i++) {
        cardsPlaced[i].setAttribute('onclick', 'flipCard(this);');
    }
}
function restart() {
    const restartAnswer = prompt('Você gostaria de reiniciar a partida? Digite sim ou não');
    if (restartAnswer === 'sim') {
        // document.querySelector('main').removeChild(document.querySelector('ul'));
        // askCards();
        location.reload();

    } else if (restartAnswer === 'não') {
        clearInterval(timer);
    } else {
        restart();
    }
}

const timer = setInterval(function () {
    clock++
    clockSet(clock);
}, 1000);

function clockSet(seg) {
    document.querySelector('.overlay p').innerHTML = `Timer: ${seg}s`
}