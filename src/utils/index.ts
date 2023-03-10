import { BoardData, CellData } from '../models'
import produce from 'immer'

export const generateMines = (
  board: CellData[][],
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
  board: CellData[][],
  height: number,
  width: number
) => {
  const neighbors: CellData[] = []
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
  board: CellData[][],
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

export const initBoard = (boardData: BoardData) => {
  const { width, height, mines } = boardData
  const array2D = Array(width)
    .fill(null)
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
  let mutatedArrayWithMines = generateMines(array2D, height, width, mines)

  let mutatedArrayWithNeighbors = generateNeighbors(
    mutatedArrayWithMines,
    height,
    width
  )

  return mutatedArrayWithNeighbors
}

export const showEmptyCells = (
  height: number,
  width: number,
  x: number,
  y: number,
  board: CellData[][]
) => {
  let neighbors = getNeighbors(x, y, board, height, width)
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

export const showGrid = (board: CellData[][]) => {
  return produce(board, draft => {
    draft.map(row =>
      row.map(cell => {
        return Object.assign(cell, { isRevealed: true })
      })
    )
  })
}
