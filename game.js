// ### MODULES ###
const displayController = (() => {
    /**
     * This creates/updates the visual interface with the 2-D board
     * 
     * @param {*} board 
     */
    const createBoard = (board) => {
        console.log("BOARD: " + board)
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
                    gameController.chooseTile(x, y)
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
    /**
     * Handles player selecting a tile
     */
    const chooseTile = (x, y) => {
        const board = gameBoard.getBoard()
        board[x][y] = 'X'

        gameBoard.setBoard(board)
        displayController.createBoard(gameBoard.getBoard())
    }

    return { chooseTile }
})()

// ### FACTORIES ###
const Player = (id, symbol) => {
    const getId = () => id

    const getSymbol = () => symbol

    return { id, symbol, getId, getSymbol }
}

displayController.createBoard(gameBoard.getBoard())