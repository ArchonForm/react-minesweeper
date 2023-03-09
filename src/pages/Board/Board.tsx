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
    mines: 10,
  }

  const board = initBoard(boardData)
  const [gameState, setGameState] = useState<string>('Game On')
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
    setGrid(updatedGrid)
  }

  const onRightClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault()
    if (grid[x][y].isRevealed) return
    const updatedGrid = produce(grid, draft => {
      draft[x][y].isFlagged = !draft[x][y].isFlagged
    })
    setGrid(updatedGrid)
  }

  const resetGame = (boardData: BoardData) => {
    setGameState('Game On')
    setGrid(initBoard(boardData))
  }

  return (
    <Container maxWidth='xs'>
      <div className='center'>
        <h1>{gameState}</h1>
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
