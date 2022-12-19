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
        console.log("BOARD: " + board)

        gameController.trackCurrPlayer()
        const currentPlayer = gameController.getCurrentPlayer()

        console.log("CURRENT PLAYER SYMBOL: " + currentPlayer.getSymbol())
        console.log("CURRENT PLAYER: " + currentPlayer)

        const container = document.getElementById('game-board')

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

    const setCurrentPlayer = (player) => {
        currentPlayer = player
    }

    const getCurrentPlayer = () => {
        return currentPlayer
    }

    return { chooseTile, trackCurrPlayer, getCurrentPlayer }
})()

displayController.createBoard(gameBoard.getBoard())