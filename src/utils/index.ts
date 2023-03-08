export interface Cell {
  x: number
  y: number
  isMine: boolean
  neighbors: number
  isEmpty: boolean
}

export const generateMines = (
  board: Cell[][],
  height: number,
  width: number,
  mines: number = 0
) => {
  let minesPlanted = 0
  while (minesPlanted < mines) {
    let randomX = Math.floor(Math.random() * width)
    let randomY = Math.floor(Math.random() * height)

    if (!board[randomX][randomY].isMine) {
      minesPlanted++
      board[randomX][randomY].isMine = true
    }
  }
  return board
}

export const getNeighbors = (
  i: number,
  j: number,
  board: Cell[][],
  height: number,
  width: number
) => {
  const neighbors: Cell[] = []
  const surroundings = [
    [-1, -1], // left top corner
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]

  surroundings.forEach(([x, y]) => {
    const newX = i + x
    const newY = j + y
    if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
      neighbors.push(board[newX][newY])
    }
  })

  return neighbors
}

export const generateNeighbors = (
  board: Cell[][],
  height: number,
  width: number
) => {
  let boardCopy = board

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      let mines = 0
      const area = getNeighbors(
        board[i][j].x,
        board[i][j].y,
        board,
        height,
        width
      )
      area.map(cell => {
        if (cell.isMine) {
          return mines++
        }
        return 0
      })
      if (!mines) {
        boardCopy[i][j].isEmpty = true
      }
      boardCopy[i][j].neighbors = mines
    }
  }

  return boardCopy
}
