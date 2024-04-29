class TicTacToePlayer {
    constructor() {
        this.myPiece = 'X';
        this.OppPiece = 'O';
    }

    getNextStates(currState, piece) {
        let nextStates = [];
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(currState[i][j] == '') {
                    let copy = currState.map(function(arr) {
                        return arr.slice();
                    });
                    copy[i][j] = piece;
                    nextStates.push(copy);
                }
            }
        }
        return nextStates;
    }

    gameValue(currState) {
        // check rows
        for(let i = 0; i < 3; i++) {
            let val = currState[i][0];
            if(val != '' && val == currState[i][1] && val == currState[i][2]) {
                if(val == this.myPiece) { return 10; } // Winning state
                return -10; // Losing state
            }
        }

        // check columns
        for(let j = 0; j < 3; j++) {
            let val = currState[0][j];
            if(val != '' && val == currState[1][j] && val == currState[2][j]) {
                if(val == this.myPiece) { return 10; } // Winning state
                return -10; // Losing state
            }
        }

        // check \ diagonal
        let val = currState[0][0];
        if(val != '' && val == currState[1][1] && val == currState[2][2]) {
            if(val == this.myPiece) { return 10; } // Winning state
            return -10; // Losing state
        }

        // check / diagonal
        val = currState[0][2];
        if(val != '' && val == currState[1][1] && val == currState[2][0]) {
            if(val == this.myPiece) { return 10; } // Winning state
            return -10; // Losing state
        }

        // check for draw
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(currState[i][j] == '') { // empty cell exists
                    return -1; // state is not a terminal state
                }
            }
        }

        return 0; // draw
    }

    maxValue(currState) {
        // check if state is a terminal state (game over)
        let gameValue = this.gameValue(currState)
        if(gameValue !== -1) {
            return [gameValue, null];
        }

        let nextStates = this.getNextStates(currState, this.myPiece);
        let alpha = Number.NEGATIVE_INFINITY;
        let minVal, maxNextState, minNextState;
        for(let i = 0; i < nextStates.length; i++) {
            [minVal, minNextState] = this.minValue(nextStates[i]);
            if(alpha < minVal) {
                alpha = minVal;
                maxNextState = nextStates[i];
            }
        }
        return [alpha, maxNextState];
    }

    minValue(currState) {
        // check if state is a terminal state (game over)
        let gameValue = this.gameValue(currState)
        if(gameValue !== -1) {
            return [gameValue, null];
        }

        let nextStates = this.getNextStates(currState, this.OppPiece);
        let beta = Number.POSITIVE_INFINITY;
        let maxVal, maxNextState, minNextState;;
        for(let i = 0; i < nextStates.length; i++) {
            [maxVal, maxNextState] = this.maxValue(nextStates[i]);
            if(beta > maxVal) {
                beta = maxVal;
                minNextState = nextStates[i];
            }
        }
        return [beta, minNextState];
    }

    findIdx(currState, nextState) {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(currState[i][j] != nextState[i][j]) { return [i, j]; }
            }
        }
    }

    makeMove(boardMatrix) {
        let currState = boardMatrix.map(function(arr) {
            return arr.slice();
        });
        let [alpha, nextState] = this.maxValue(currState);
        let [i, j] = this.findIdx(currState, nextState);
        let cell = document.getElementById(i + "-" + j);
        cell.click(); // click on that cell
    }
}

var currPlayer = 'X';
var boardMatrix = []
var player = new TicTacToePlayer();

window.onload = function() {
    setup();
}

function setup() {
    let board = document.getElementById("board");
    for(let i = 0; i < 3; i++) {
        let arr = []
        for(let j = 0; j < 3; j++) {
            arr.push('');
            let cell = document.createElement("input");
            cell.readOnly = true;
            cell.id = i + '-' + j;
            cell.classList.add("cell");
            cell.addEventListener("click", placeMove);
            board.append(cell);
        }
        boardMatrix.push(arr);
    }
    startGame();
}

function placeMove() {
    let [i, j] = this.id.split("-");
    boardMatrix[i][j] = currPlayer;
    if(currPlayer == 'X') {
        this.value = 'X';
        currPlayer = 'O';
    }
    else {
        this.value = 'O';
        currPlayer = 'X';
    }
    this.removeEventListener("click", placeMove);
    checkState();
}

function startGame() {
    player.makeMove(boardMatrix);
}

function checkState() {
    // check rows
    for(let i = 0; i < 3; i++) {
        let val = boardMatrix[i][0];
        if(val != '' && val == boardMatrix[i][1] && val == boardMatrix[i][2]) {
            let cell1 = document.getElementById(i + "-" + 0);
            let cell2 = document.getElementById(i + "-" + 1);
            let cell3 = document.getElementById(i + "-" + 2);

            cell1.style.color = "red";
            cell2.style.color = "red";
            cell3.style.color = "red";

            if(val == 'X') { console.log("X won!"); }
            else { console.log("O won!"); }
            endGame();
            return;
        }
    }

    // check columns
    for(let j = 0; j < 3; j++) {
        let val = boardMatrix[0][j];
        if(val != '' && val == boardMatrix[1][j] && val == boardMatrix[2][j]) {
            let cell1 = document.getElementById(0 + "-" + j);
            let cell2 = document.getElementById(1 + "-" + j);
            let cell3 = document.getElementById(2 + "-" + j);

            cell1.style.color = "red";
            cell2.style.color = "red";
            cell3.style.color = "red";

            if(val == 'X') { console.log("X won!"); }
            else { console.log("O won!"); }
            endGame();
            return;
        }
    }

    // check \ diagonal
    let val = boardMatrix[0][0];
    if(val != '' && val == boardMatrix[1][1] && val == boardMatrix[2][2]) {
        let cell1 = document.getElementById(0 + "-" + 0);
        let cell2 = document.getElementById(1 + "-" + 1);
        let cell3 = document.getElementById(2 + "-" + 2);

        cell1.style.color = "red";
        cell2.style.color = "red";
        cell3.style.color = "red";

        if(val == 'X') { console.log("X won!"); }
        else { console.log("O won!"); }
        endGame();
        return;
    }

    // check / diagonal
    val = boardMatrix[0][2];
    if(val != '' && val == boardMatrix[1][1] && val == boardMatrix[2][0]) {
        let cell1 = document.getElementById(0 + "-" + 2);
        let cell2 = document.getElementById(1 + "-" + 1);
        let cell3 = document.getElementById(2 + "-" + 0);

        cell1.style.color = "red";
        cell2.style.color = "red";
        cell3.style.color = "red";

        if(val == 'X') { console.log("X won!"); }
        else { console.log("O won!"); }
        endGame();
        return;
    }

    // check for draw
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(boardMatrix[i][j] == '') { // empty cell exists
                if(currPlayer == 'X') { player.makeMove(boardMatrix); }
                return;
            }
        }
    }

    // all cells are filled
    console.log("Draw!");
}

function endGame() {
    let cells = document.getElementsByClassName("cell");
    for(let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", placeMove);
    }
}

function restartGame() {
    currPlayer = 'X';

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            boardMatrix[i][j] = '';
            let cell = document.getElementById(i + "-" + j);
            cell.value = '';
            cell.style.color = "black";
            cell.addEventListener("click", placeMove);
        }
    }
    startGame();
}


