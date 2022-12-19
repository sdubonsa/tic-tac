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

    return { createBoard }
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

    const checkWinCondition = (symbol) => {
        // Check win diagonal
        const board = gameBoard.getBoard()

        checkWinDiag(symbol, board)
    }

    const checkWinDiag = (symbol, board) => {
        if (board[0][0] == symbol && board[1][1]  == symbol && board[2][2] == symbol) {
            console.log(symbol + ' WINS!')
        } else if (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol) {
            console.log(symbol + ' WINS!') 
        }
    }

    return { chooseTile, trackCurrPlayer, getCurrentPlayer, checkWinCondition }
})()

displayController.createBoard(gameBoard.getBoard())