const buttonChoices = Array.from(document.querySelectorAll('button'));

buttonChoices.forEach((button) => {
    button.addEventListener('click', (event) => {
        processEvents(event.target);
    });
})

function processEvents(playerChoiceElement) {
    const playerChoice = playerChoiceElement.classList.value;
    const computerChoice = computerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    updateScoreboard(winner);
}

function updateScoreboard(winner) {
    const playerScore = document.querySelector('player-score');
    const computerScore = document.querySelector('computer-score');

    switch (winner) {
        case 'player':
            playerScore.textContent = +playerScore.textContent++;
        case 'computer':
            computerScore.textContent = +computerScore.textContent++;
    }
}

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

function determineWinner(playerChoice, computerChoice) {
    switch (playerChoice) {
        case 'rock':
            if (computerChoice === 'rock') {
                return 'tie';
            } else if (computerChoice === 'paper') {
                return 'computer';
            } else {
                return 'player';
            }
        case 'paper':
            if (computerChoice === 'rock') {
                return 'player';
            } else if (computerChoice === 'paper') {
                return 'tie';
            } else {
                return 'computer';
            }
        case 'scissors':
            if (computerChoice === 'rock') {
                return 'computer';
            } else if (computerChoice === 'paper') {
                return 'player';
            } else {
                return 'tie';
            }
    }
}

