askCards();
function askCards() {
    const question = 'Digite a quantidade de cartas com que você quer jogar, um numero entre 4 e 14.'
    CardQuantity = prompt(question);
    console.log(CardQuantity);
    if (CardQuantity >= 4 && CardQuantity <= 14 && CardQuantity % 2 === 0) {
        placeTable(CardQuantity);
    } else {
        askCards();
    }
}


function placeTable(n) {
    let cardsOnTable = '';
    document.querySelector('main').innerHTML += `<ul style = "grid-template-columns: repeat(${n / 2}, 1fr);"></ul>`;
    const table = document.querySelector('ul');
    for (let i = 0; i < n / 2; i++) {
        cardsOnTable = `<li class="" onclick="addFlip(this);">
        <img src="./assets/imgs/back.png" alt="backcard">
        <img src="./assets/imgs/${i + 1}parrot.gif" alt="frontcard">
        </li>`
        table.innerHTML += cardsOnTable;
        table.innerHTML += cardsOnTable;
    }
}
function addFlip(touch) {
    touch.classList.toggle('flip');
}
