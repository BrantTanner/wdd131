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
            path: `../images/Playing Cards/${rank}_of_${suit}.png`,
            alt: `${rank} of ${suit}`
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
    img.alt = randomCard.alt;
    img.classList.add(card); // in order to style card
    document.getElementById(hand_container).appendChild(img);

    return randomCard
};

function addCardToHand(hand, card){
    hand.push(card)
    console.log(hand)
}

function findSum(hand, value){
    let sum = hand.reduce((acc, card) => acc + card.value, 0);
    let aceCount = hand.reduce((acc, card) => {
        if (card.value === 11) {
            return acc + 1;
        }
        else {
            return acc;
        } 
    }, 0);

    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount--;
    }


    document.getElementById(value).innerHTML = "Value: " + sum;
    return sum
}

function dealersTurn() {
    

    function step(){
        let dealerSum = findSum(dealerHand,"dealer-hand-value");
        
        // Dealer hits until has over 17
        if (dealerSum < 17) {
            const card = drawCard("dealer-hand-container", "dealer-card");
            addCardToHand(dealerHand, card);
            findSum(dealerHand, "dealer-hand-value")

            setTimeout(step, 1000);
            return;
        }

        // Once dealer finishes drawing, evaluate winner
        
        finishRound();
    }

    step();
}

function finishRound(){
    dealerSum = findSum(dealerHand, "dealer-hand-value")
    playerSum = findSum(playerHand, "player-hand-value")

    // Check win conditions
    if (dealerSum > 21){
        alert("Dealer struck out at " + dealerSum + " You win!")
    }
    else if (playerSum > 21){
        alert("you struck out " + playerSum + " Dealer wins!")
    }

    else if (dealerSum == playerSum){
        alert("Tie! Nobody wins!")
    }
    else if (dealerSum > playerSum){
        alert("Dealer got " + dealerSum + " You lose!")
    }
    else{
        alert("You got " + playerSum + " You win!")
    }

    location.reload();
}

// Gameplay loop

// Dealer's starting card
setTimeout(() => {
    const card = drawCard("dealer-hand-container", "dealer-card");
    addCardToHand(dealerHand, card);
    findSum(dealerHand, "dealer-hand-value");

}, 100);


// hit button
document.getElementById("hit").addEventListener("click", () => {

    // Player draws
    const cardDrawn = drawCard("player-hand-container", "player-card");
    addCardToHand(playerHand, cardDrawn);
    const playerSum = findSum(playerHand, "player-hand-value");

    if(playerSum > 21){
        setTimeout(() => {
        alert("Bust! You lose!");
        location.reload();
    }, 50);
    }
  
});

document.getElementById("stand").addEventListener("click", () => {
    dealersTurn()
})





// make it play like traditional black jack. Have the dealer's turn wait until the stand button is hit to draw his cards.
