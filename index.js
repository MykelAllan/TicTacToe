window.addEventListener('DOMContentLoaded', () => {
    const box = Array.from(document.querySelectorAll(".box"));
    const turnIndicator = document.querySelector(".turn-indicator i");
    const resetBtn = document.querySelector(".restart");
    const p1 = document.querySelector(".p1-score");
    const p2 = document.querySelector(".p2-score");

    const leftArrow = '<i class="fa fa-arrow-left" aria-hidden="true"></i>';
    const rightArrow = '<i class="fa fa-arrow-right" aria-hidden="true"></i>';
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let winningBoxes = [];
    let currentPlayer = 'X';
    let isGameRunning = false;
    let isDraw = false;
    let player1score = 0;
    let player2score = 0;

    const p1Won = 'P1 Won';
    const p2Won = 'P2 Won';
    const draw = 'Draw';

    resetBtn.textContent = "START";

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function highlightBoxHandler(winningBoxes) {
        if (isGameRunning) {
            if(isDraw) {
                for (let i = 0; i <= 8; i++) {
                    box[i].classList.add('winner');
                }
            } else {
                for (let i = 0; i <= 8; i++) {
                    box[i].classList.remove('winner');
                }
            }
        } else {
                winningBoxes.forEach((index) => {
                    box[index].classList.add('winner');
                });
            }
    }

    function resultHandler() {
        let roundWon = false;

        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            } 
            if (a === b && b === c) {
                roundWon = true;
                winningBoxes = winCondition;
                console.log(winningBoxes[0], winningBoxes[1], winningBoxes[2]);
                break;
            }   
        }
        if (roundWon) {
            announcingWinner(currentPlayer == 'X' ? p1Won : p2Won);
            isGameRunning = false;
            highlightBoxHandler(winningBoxes);
            return;
        } 
        if (!board.includes('')) {
            announcingWinner(draw);
            highlightBoxHandler();
            
            isGameRunning = false;
            return;
        }
    }

    function announcingWinner(winner) {
        switch (winner) {
            case p1Won:
                player1score++;
                p1.textContent = 'P1: ' + player1score;
                turnIndicator.innerHTML = p1Won;
                break;
            case p2Won:
                turnIndicator.innerHTML = p2Won;
                player2score++;
                p2.textContent = 'P2: ' + player2score;
                turnIndicator.innerHTML = p2Won;
                break;
            case draw:
                isDraw = true;
                turnIndicator.innerHTML = "DRAW";
                break;
        }
    }
    
    function changePlayer() {
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
        if (isGameRunning) {
            if (currentPlayer == 'X') {
                turnIndicator.innerHTML = leftArrow;
            } else {
                turnIndicator.innerHTML = rightArrow;
            }
        } 
    }

    function updateBoard(index) {
        board[index] = currentPlayer;
    }

    function isValidAction(box) {
        if (box.innerText === 'X' || box.innerText === 'O') {
            return false;
        }
        return true;
    }

    function userAction(box, index) {
        if(isValidAction(box) && isGameRunning) {
            box.innerText = currentPlayer;
            updateBoard(index);
            resultHandler();
            changePlayer();
        }
    }    

    box.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index))
    })

    resetBtn.addEventListener('click', function() {
        if (resetBtn.textContent == 'START') {
            resetBtn.textContent = "RESTART";
            isGameRunning = true;
            turnIndicator.innerHTML = leftArrow;
        } else {
            board = ['', '', '', '', '', '', '', '', ''];
            isDraw = false;
            isGameRunning = true;
            turnIndicator.innerHTML = leftArrow;
            highlightBoxHandler(winningBoxes);

            if (currentPlayer == 'O') {
                changePlayer();
            }

            box.forEach(box => {
                box.innerText = '';
            })
        }
    })
})