class TicTacToePlayer {
    constructor(myPiece, oppPiece) {
        this.myPiece = myPiece;
        this.oppPiece = oppPiece;
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

        let nextStates = this.getNextStates(currState, this.oppPiece);
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