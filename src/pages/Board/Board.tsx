import { useState } from 'react'
import { Container, Button } from '@mui/material'
import { Cell } from '../../components/Cell'
import {
  generateNeighbors,
  generateMines,
  initBoard,
  showEmptyCells,
  showGrid,
} from '../../utils'
import { BoardData, CellData } from '../../models'
import produce from 'immer'

export const Board = () => {
  const boardData = {
    width: 10,
    height: 10,
    mines: 5,
  }

  const board = initBoard(boardData)
  const [gameState, setGameState] = useState<string>('Game On')
  const [mineCount, setMineCount] = useState<number>(boardData.mines)
  const [grid, setGrid] = useState<CellData[][]>(board)

  const onLeftClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault()
    if (grid[x][y].isRevealed || grid[x][y].isFlagged) return
    const updatedGrid = produce(grid, draft => {
      {
        Object.assign(draft[x][y], { isRevealed: true })
        if (draft[x][y].isEmpty) {
          showEmptyCells(boardData.height, boardData.width, x, y, draft)
        }
      }
    })
    if (updatedGrid[x][y].isMine) {
      const revealedGrid = showGrid(updatedGrid)
      setGrid(revealedGrid)
      return setGameState('Game Over')
    }
    const hiddenGrid = updatedGrid.flat().filter(cell => !cell.isRevealed)
    if (hiddenGrid.length === boardData.mines) {
      setGameState('You win! 🎉')
      showGrid(updatedGrid)
    }
    setGrid(updatedGrid)
  }

  const onRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault()

    let mineCountPlaceholder = mineCount
    if (grid[x][y].isRevealed) return
    const updatedGrid = produce(grid, draft => {
      draft[x][y].isFlagged
        ? (mineCountPlaceholder += 1)
        : (mineCountPlaceholder -= 1)

      if (mineCountPlaceholder >= 0 && mineCountPlaceholder <= mineCount + 1) {
        draft[x][y].isFlagged = !draft[x][y].isFlagged
        setMineCount(mineCountPlaceholder)
      }
    })
    setGrid(updatedGrid)
  }

  const resetGame = (boardData: BoardData) => {
    setGameState('Game On')
    setMineCount(boardData.mines)
    setGrid(initBoard(boardData))
  }

  return (
    <Container maxWidth='xs'>
      <div className='center'>
        <h1>{gameState}</h1>
        <h3>Mines remaining: {mineCount}</h3>
        <Button onClick={() => resetGame(boardData)} variant='outlined'>
          Reset Game
        </Button>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${boardData.width}, 30px)`,
            gridTemplateRows: `repeat(${boardData.height}, 30px)`,
          }}
        >
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <Cell
                onLeftClick={(e, i, j) => onLeftClick(e, i, j)}
                onRightClick={(e, i, j) => onRightClick(e, i, j)}
                key={`${i} - ${j}`}
                cell={cell}
                i={i}
                j={j}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  )
}
