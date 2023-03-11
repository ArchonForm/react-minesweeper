import { CellData, SetupData } from '../interfaces'
import produce from 'immer'

// Случайная генерация мин
export const generateMines = (
  board: CellData[][] = [],
  height: number = 0,
  width: number = 0,
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

// Получение соседей ячейки
export const getNeighbors = (
  i: number = 0,
  j: number = 0,
  board: CellData[][] = [],
  height: number = 0,
  width: number = 0
) => {
  const neighbors: CellData[] = []
  const surroundings = [
    [-1, -1], // Левый верхний угол
    [-1, 0], // Центральная верхняя
    [-1, 1], // и т.д.
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

// Генерация соседей
export const generateNeighbors = (
  board: CellData[][] = [],
  height: number = 0,
  width: number = 0
) => {
  const boardCopy = board

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
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
          return (mines += 1)
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

// Инициализация поля
export const initBoard = (boardData: SetupData) => {
  const { width, height, mines } = boardData
  const array2D = Array(width)
    .fill(0)
    .map((_, indexH) =>
      Array(height)
        .fill(null)
        .map((_, indexW) => ({
          x: indexH,
          y: indexW,
          isMine: false,
          neighbors: 0,
          isEmpty: false,
          isRevealed: false,
          isFlagged: false,
        }))
    )
  let arrayWithMines = generateMines(array2D, height, width, mines)

  return generateNeighbors(arrayWithMines, height, width)
}

// Показ пустых ячеек
export const showEmptyCells = (
  height: number = 0,
  width: number = 0,
  x: number = 0,
  y: number = 0,
  board: CellData[][] = []
) => {
  const neighbors = getNeighbors(x, y, board, height, width)

  neighbors.map(cell => {
    if (!cell.isRevealed && (cell.isEmpty || !cell.isMine) && !cell.isFlagged) {
      Object.assign(board[cell.x][cell.y], { isRevealed: true })
      if (cell.isEmpty) {
        showEmptyCells(height, width, cell.x, cell.y, board)
      }
    }
    return null
  })
  return board
}

// Раскрытие всего игрового поля
export const showGrid = (board: CellData[][]) => {
  return produce(board, draft => {
    draft.map(row =>
      row.map(cell => {
        return Object.assign(cell, { isRevealed: true })
      })
    )
  })
}
