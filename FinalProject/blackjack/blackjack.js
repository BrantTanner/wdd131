const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = [ "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"]

const cardImages = []

const dealerHand = []
const playerHand = []

// Loops to build card deck array
suits.forEach(suit => {
    ranks.forEach( rank => {

        let value; 
        // logic to assign value to each card
        if (["jack", "queen", "king"].includes(rank)){
            value =  10
        }
        else if (rank === "ace"){
            value = 11
        }
        else {
            value = parseInt(rank)
        }

        cardImages.push({
            name: `${rank}_of_${suit}`,
            value: value,
            path: `../images/Playing Cards/${rank}_of_${suit}.png`
        })
    })
});
        





function drawCard(hand_container, card){
    // draw random card
    const randomCard = cardImages[Math.floor(Math.random() * cardImages.length)];
   
    // remove selected card from deck
    const index = cardImages.indexOf(randomCard);
    cardImages.splice(index, 1);

    //dynamically load card image to html
    const img = document.createElement("img");
    img.src = randomCard.path;
    img.classList.add(card); // in order to style card
    document.getElementById(hand_container).appendChild(img);

    return randomCard
};

function addCardToHand(hand, card){
    hand.push(card)
    console.log(hand)
}

function findSum(hand){
    const sum = hand.reduce((acc, card) => acc + card.value, 0);

    console.log(`The sum of ${hand} is ${sum}`);
    return sum
}

// Gameplay loop

// hit button
document.getElementById("hit").addEventListener("click", () => {

    // Player draws
    const cardDrawn = drawCard("player-hand-container", "player-card");
    addCardToHand(playerHand, cardDrawn);

    const playerSum = findSum(playerHand);

    // Dealer's turn
    setTimeout(dealersTurn, 1000);
    
});


function dealersTurn() {
    let dealerSum = findSum(dealerHand);

    if (dealerSum < 17) {
        const card = drawCard("dealer-hand-container", "dealer-card");
        addCardToHand(dealerHand, card);
        dealerSum = findSum(dealerHand);
    }
}

// make it play like traditional black jack. Have the dealer's turn wait until the stand button is hit to draw his cards.
