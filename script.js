function computerChoice() {
    const randomChoice = Math.floor(Math.random() * 3);

    switch (randomChoice) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}