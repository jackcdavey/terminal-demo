type Card = { value: string, suit: string };
type Deck = Card[];
type Hand = Card[];

const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function createDeck(): Deck {
    let deck: Deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    return deck;
}

function shuffle(deck: Deck): Deck {
    let currentIndex = deck.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

function calculateHandValue(hand: Hand): number {
    let score = 0;
    let aceCount = 0;

    for (let card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'A') {
            aceCount++;
            score += 11; // Initially treat Aces as 11
        } else {
            score += parseInt(card.value);
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10; // Treat an Ace as 1 instead of 11
        aceCount--;
    }

    return score;
}



export type BlackjackGameState = {
    deck: Deck;
    playerHand: Hand;
    dealerHand: Hand;
    status: string; // e.g., "playing", "player-won", "dealer-won", "tie", "busted"
};

let gameState: BlackjackGameState = {
    deck: [],
    playerHand: [],
    dealerHand: [],
    status: "idle"
};


export function blackjackCommand(
    input: string,
    gameState: BlackjackGameState,
    setGameState: React.Dispatch<React.SetStateAction<BlackjackGameState>>
): string {
    let output = '';

    // Function to safely pop a card from the deck
    const popCardFromDeck = (): Card => {
        const card = gameState.deck.pop();
        if (!card) {
            // Handle the case where the deck is empty
            // For simplicity, we'll just return a placeholder card here
            // In a real game, you might want to reshuffle the deck or handle this differently
            return { value: 'Error', suit: 'No Cards Left' };
        }
        return card;
    };

    switch (input.trim().toLowerCase()) {
        case 'start':
            gameState.deck = shuffle(createDeck());
            gameState.playerHand = [popCardFromDeck(), popCardFromDeck()];
            gameState.dealerHand = [popCardFromDeck(), popCardFromDeck()];
            gameState.status = "playing";
            output = `Game started.\nYour hand: ${formatHand(gameState.playerHand)}\nDealer's hand: ${formatHand([gameState.dealerHand[0], { value: '?', suit: '?' }])}`;
            break;
        case 'hit':
            if (gameState.status === "playing") {
                // Use popCardFromDeck to safely get a new card
                gameState.playerHand.push(popCardFromDeck());
                const playerScore = calculateHandValue(gameState.playerHand);

                if (playerScore > 21) {
                    gameState.status = "busted";
                    output = `You busted! Your score: ${playerScore}`;
                } else {
                    output = `Your hand: ${formatHand(gameState.playerHand)}`;
                }
            } else {
                output = "Game is not in progress.";
            }
            break;
        case 'stand':
            if (gameState.status === "playing") {
                // Dealer draws cards until the total is 17 or higher
                while (calculateHandValue(gameState.dealerHand) < 17) {
                    gameState.dealerHand.push(popCardFromDeck());
                }

                const playerScore = calculateHandValue(gameState.playerHand);
                const dealerScore = calculateHandValue(gameState.dealerHand);

                if (dealerScore > 21 || playerScore > dealerScore) {
                    gameState.status = "player-won";
                    output = `You won! Dealer's score: ${dealerScore}`;
                } else if (dealerScore === playerScore) {
                    gameState.status = "tie";
                    output = "It's a tie!";
                } else {
                    gameState.status = "dealer-won";
                    output = `Dealer won. Dealer's score: ${dealerScore}`;
                }
            } else {
                output = "Game is not in progress.";
            }
            break;

        default:
            output = "Invalid command. Available commands are 'start', 'hit', 'stand'.";
            break;
    }
    setGameState(gameState);
    return output;
};

function formatHand(hand: Hand): string {
    return hand.map(card => `${card.value} of ${card.suit}`).join(", ");
}