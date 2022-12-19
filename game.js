// ### FACTORIES ###
const Player = (id, symbol) => {
    const getId = () => id

    const getSymbol = () => {
        return symbol
    }

    return { getId, getSymbol }
}

// ### MODULES ###
const displayController = (() => {
    /**
     * This creates/updates the visual interface with the 2-D board
     * 
     * @param {*} board 
     */
    const createBoard = (board) => {
        gameController.trackCurrPlayer()
        const currentPlayer = gameController.getCurrentPlayer()

        const container = document.getElementById('game-board')
        container.innerHTML = ''

        // Loop through rows
        board.forEach((element, x) => {
            const row = document.createElement('div')
            row.classList.add('flex', 'gap-4')
            // Loop through cols
            element.forEach((e, y) => {
                const tile = document.createElement('div')
                tile.innerHTML = e
                tile.addEventListener('click', function() {
                    gameController.chooseTile(x, y, currentPlayer)
                })

                row.appendChild(tile)

                container.appendChild(row)
            })
        });
    }

    /**
     * This updates the win-display to display the winner of the match
     * 
     * @param {boolean} isWon 
     * @param {string} symbol 
     */
    const displayWin = (isWon, symbol) => {
        const container = document.getElementById('win-display')
        const winDisplay = document.createElement('div')

        if(isWon) {
            winDisplay.innerHTML = symbol + " HAS WON THE GAME!"
            container.appendChild(winDisplay)
        }
    }

    return { createBoard, displayWin }
})()

const gameBoard = (() => {
    var board = [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['G', 'H', 'I']
    ]

    /**
     * Returns board
     * 
     * @returns board
     */
    const getBoard = () => board
    const setBoard = (board) => board = this.board

    return {getBoard, setBoard}
})()

const gameController = (() => {
    const playerOne = Player(1, 'X')
    const playerTwo = Player(2, 'O')

    let currentPlayer = ''

    /**
     * Handles player selecting a tile
     */
    const chooseTile = (x, y, currentPlayer) => {
        const board = gameBoard.getBoard()
        board[x][y] = currentPlayer.getSymbol()

        gameBoard.setBoard(board)
        checkWinCondition(currentPlayer.getSymbol())

        displayController.createBoard(gameBoard.getBoard())
    }

    /**
     * Tracks and updates the current player
     * 
     * @param {Player} playerOne 
     * @param {Player} playerTwo 
     */
    const trackCurrPlayer = () => {
        if (currentPlayer == '') {
            setCurrentPlayer(playerOne)
        } else if (currentPlayer.getSymbol() == 'X') {
            setCurrentPlayer(playerTwo)
        } else if (currentPlayer.getSymbol() == 'O') {
            setCurrentPlayer(playerOne)
        }
    }

    /**
     * Sets the current player
     * 
     * @param {Player} player 
     */
    const setCurrentPlayer = (player) => {
        currentPlayer = player
    }

    /**
     * Gets the current player
     * 
     * @returns Player
     */
    const getCurrentPlayer = () => {
        return currentPlayer
    }

    /**
     * This checks the win condition for across and diag.
     * 
     * @param {string} symbol 
     */
    const checkWinCondition = (symbol) => {
        // Check win diagonal
        const board = gameBoard.getBoard()
        let isWon = false;

        if (checkWinDiag(symbol, board) || checkWinAcross(symbol, board)) {
            isWon = true;
        }

        displayController.displayWin(isWon, symbol)
    }

    /**
     * This checks for wins in a diag. across the board
     * 
     * @param {string} symbol 
     * @param {2D array} board 
     * @returns 
     */
    const checkWinDiag = (symbol, board) => {
        if (board[0][0] == symbol && board[1][1]  == symbol && board[2][2] == symbol) {
            console.log(symbol + ' WINS!')
            return true
        } else if (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol) {
            console.log(symbol + ' WINS!')
            return true 
        }
    }

    const checkWinAcross = (symbol, board) => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == symbol && board[i][1] == symbol && board[i][2] == symbol) {
                return true
            }
        }
    }

    return { chooseTile, trackCurrPlayer, getCurrentPlayer, checkWinCondition }
})()

displayController.createBoard(gameBoard.getBoard())