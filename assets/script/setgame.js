askCards();
function askCards() {
    const question = 'Digite a quantidade de cartas com que você quer jogar, um numero entre 4 e 14.'
    CardQuantity = prompt(question);
    if (CardQuantity >= 4 && CardQuantity <= 14 && CardQuantity % 2 === 0) {
        document.querySelector('main').innerHTML += `<ul style = "grid-template-columns: repeat(${CardQuantity / 2}, 1fr);">
        </ul>`;
        placeCards(CardQuantity);
    } else {
        askCards();
    }
}

function placeCards(CardQuantity) {
    const table = document.querySelector('ul');
    let deck = [];
    for (let i = 0; i < CardQuantity / 2; i++) {
        const cardsOnTable = `<li class="" onclick="addFlip(this);">
        <img src="./assets/imgs/back.png" alt="backcard">
        <img src="./assets/imgs/${i + 1}parrot.gif" alt="frontcard">
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
