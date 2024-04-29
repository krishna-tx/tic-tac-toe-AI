var currPlayer, myPiece, oppPiece;
var boardMatrix = [];
var player;

function selectedPlayerX() {
    console.log("Player X chosen");
    myPiece = 'O';
    oppPiece = 'X';
    let buttonX = document.getElementById("X-button");
    let buttonO = document.getElementById("O-button");
    buttonX.disabled = true;
    buttonO.disabled = true;
    startGame();
}

function selectedPlayerO() {
    console.log("Player O chosen");
    myPiece = 'X';
    oppPiece = 'O';
    let buttonX = document.getElementById("X-button");
    let buttonO = document.getElementById("O-button");
    buttonX.disabled = true;
    buttonO.disabled = true;
    startGame();
}

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
            cell.id = i + '-' + j;
            cell.classList.add("cell");
            cell.readOnly = true;
            cell.value = ''
            cell.style.color = "black";
            board.append(cell);
        }
        boardMatrix.push(arr);
    }
}

function startGame() {
    currPlayer = myPiece;

    // allow cells to be clicked
    let cells = document.getElementsByClassName("cell");
    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", placeMove);
    }

    player = new TicTacToePlayer(myPiece, oppPiece);
    player.makeMove(boardMatrix);
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
                if(currPlayer == myPiece) { player.makeMove(boardMatrix); }
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
    let buttonX = document.getElementById("X-button");
    let buttonO = document.getElementById("O-button");
    buttonX.disabled = false;
    buttonO.disabled = false;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            boardMatrix[i][j] = '';
            let cell = document.getElementById(i + "-" + j);
            cell.value = '';
            cell.style.color = "black";
        }
    }
}


