const buttonChoices = Array.from(document.querySelectorAll('button:not(.restart)'));
let mouseOverRestartBox = false;

window.onload = gameSetUp();

function gameSetUp() {
    buttonChoices.forEach((button) => {
        button.addEventListener('click', (event) => {
            processEvents(event.target);
        });
    });
}

function processEvents(playerChoiceElement) {
    const playerChoice = playerChoiceElement.classList.value;
    const computerChoice = computerChoose();
    const winner = determineWinner(playerChoice, computerChoice);

    updateScoreboard(winner);
    updateBattleIcon(winner);
    updateUserIcons(playerChoice, computerChoice);
    checkWinner();
}

function checkWinner() {
    const playerScore = +document.querySelector('.player-score').getAttribute('data-value');
    const computerScore = +document.querySelector('.computer-score').getAttribute('data-value');

    if (playerScore === 5) {
        processEndGame('player');
    } else if (computerScore === 5) {
        processEndGame('computer');
    }
}

function processEndGame(winner) {
    announceWinner(winner);
    changeEndgameButtonEventListeners(buttonChoices);
    trackEndgameCursor();
    addOverlayEventListener();
    restartWindowPopup();
}

function announceWinner(winner) {
    const restartWindowWinnerText = document.querySelector('h2.winner-text');
    const winnerText = winner.charAt(0).toUpperCase() + winner.slice(1) + " Wins!";

    restartWindowWinnerText.textContent = winnerText;
}

function addOverlayEventListener() {
    const overlay = document.querySelector('.overlay');
    const restartBox = document.querySelector('.restart-box');

    overlay.addEventListener('click', () => {
        if (!mouseOverRestartBox) {
            overlay.style.visibility = 'hidden';
            restartBox.classList.remove('active');
        }
    });
}

function changeEndgameButtonEventListeners(array) {
    const restartButton = document.querySelector('button.restart');

    restartButton.addEventListener('click', () => {
        window.location.reload();
    });

    array.forEach((button) => {
        const cloneButton = button.cloneNode(true);

        cloneButton.addEventListener('click', restartWindowPopup);
        button.parentElement.replaceChild(cloneButton, button);
    });
}

function restartWindowPopup() {
    const overlay = document.querySelector('.overlay');
    const restartBox = document.querySelector('.restart-box');

    overlay.style.visibility = 'visible';
    restartBox.classList.add('active');
}

function trackEndgameCursor() {
    const restartBox = document.querySelector('.restart-box');

    restartBox.addEventListener('mouseenter', () => mouseOverRestartBox = true);
    restartBox.addEventListener('mouseleave', () => mouseOverRestartBox = false);
}

function updateUserIcons(playerChoice, computerChoice) {
    const playerIcon = document.querySelector('.player-icon');
    const computerIcon = document.querySelector('.computer-icon');

    switch (playerChoice) {
        case 'rock':
            playerIcon.setAttribute('src', './img/rock.png');
            break;
        case 'paper':
            playerIcon.setAttribute('src', './img/paper.png');
            break;
        case 'scissors':
            playerIcon.setAttribute('src', './img/scissors.png');
    }

    switch (computerChoice) {
        case 'rock':
            case 'rock':
                computerIcon.setAttribute('src', './img/rock.png');
                break;
            case 'paper':
                computerIcon.setAttribute('src', './img/paper.png');
                break;
            case 'scissors':
                computerIcon.setAttribute('src', './img/scissors.png');
    }
}

function updateBattleIcon(winner) {
    const battleIcon = document.querySelector('img.battle-icon');
    const imageRandomChoice = Math.floor(Math.random() * 3);

    switch (winner) {
        case 'tie':
            battleIcon.setAttribute('src', './img/battle-icons/tie.png');
            break;
        case 'player':
            if (imageRandomChoice === 0) {
                battleIcon.setAttribute('src', './img/battle-icons/player-win/shoot-player.png')
            } else if (imageRandomChoice === 1) {
                battleIcon.setAttribute('src', './img/battle-icons/player-win/slash-player.png')
            } else {
                battleIcon.setAttribute('src', './img/battle-icons/player-win/stab-player.png')
            }
            break;
        case 'computer':
            if (imageRandomChoice === 0) {
                battleIcon.setAttribute('src', './img/battle-icons/computer-win/shoot-comp.png')
            } else if (imageRandomChoice === 1) {
                battleIcon.setAttribute('src', './img/battle-icons/computer-win/slash-comp.png')
            } else {
                battleIcon.setAttribute('src', './img/battle-icons/computer-win/stab-comp.png')
            }
    }
}

function updateScoreboard(winner) {
    const playerScore = document.querySelector('.player-score');
    const computerScore = document.querySelector('.computer-score');

    switch (winner) {
        case 'player':
            const updatedPlayerScore = +playerScore.getAttribute('data-value') + 1;

            playerScore.textContent = `Player: ${updatedPlayerScore}`;
            playerScore.setAttribute('data-value', updatedPlayerScore);
            break;
        case 'computer':
            const updatedComputerScore = +computerScore.getAttribute('data-value') + 1;

            computerScore.textContent = `Computer: ${updatedComputerScore}`;
            computerScore.setAttribute('data-value', updatedComputerScore);
    }
}

function computerChoose() {
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

