import { useState, useEffect } from 'react'
import { Container, Button, Paper, Card } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Cell } from '../Cell/Cell'
import {
  generateNeighbors,
  generateMines,
  initBoard,
  showEmptyCells,
  showGrid,
} from '../../utils'
import { CellData, SetupData } from '../../models'
import produce from 'immer'
import { GameProps } from './Game.props'
import { Stack } from '@mui/system'
import styles from './Game.module.scss'

export const Game = ({ setupData, setGameStarted, name }: GameProps) => {
  const board = initBoard(setupData)

  const [seconds, setSeconds] = useState<number>(0)
  const [timerStarted, setTimerStarted] = useState<boolean>(false)
  const [gameState, setGameState] = useState<string>('😁')
  const [mineCount, setMineCount] = useState<number>(setupData.mines)
  const [grid, setGrid] = useState<CellData[][]>(board)

  useEffect(() => {
    if (!timerStarted) {
      return
    }

    let intervalId = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [seconds, timerStarted])

  useEffect(() => {
    if (gameState !== '😁') {
      setTimerStarted(false)
    }
  }, [gameState])

  const onLeftClick = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault()
    if (grid[x][y].isRevealed || grid[x][y].isFlagged) return
    const updatedGrid = produce(grid, draft => {
      Object.assign(draft[x][y], { isRevealed: true })
      if (draft[x][y].isEmpty) {
        showEmptyCells(setupData.height, setupData.width, x, y, draft)
      }
    })
    if (updatedGrid[x][y].isMine) {
      const revealedGrid = showGrid(updatedGrid)
      setGrid(revealedGrid)
      return setGameState('😤')
    }
    const hiddenGrid = updatedGrid.flat().filter(cell => !cell.isRevealed)
    if (hiddenGrid.length === setupData.mines) {
      setGameState('😎')
      showGrid(updatedGrid)
    }
    setGrid(updatedGrid)
    setTimerStarted(true)
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
    setTimerStarted(true)
  }

  const resetGame = (setupData: SetupData) => {
    setTimerStarted(false)
    setSeconds(0)
    setGameState('😁')
    setMineCount(setupData.mines)
    setGrid(initBoard(setupData))
  }

  return (
    <Container maxWidth='xs'>
      <div className='center'>
        <Paper elevation={3} sx={{ padding: '1rem' }}>
          <Card
            variant='outlined'
            sx={{
              padding: '1rem',
              marginBorrom: '1rem',
              backgroundColor: theme => theme.palette.grey[200],
              textAlign: 'center',
            }}
          >
            <h1 className={styles.gameStatus}>{gameState}</h1>
            <Stack justifyContent='space-between' direction='row'>
              <h4 className={styles.span}>💣 {mineCount}</h4>
              <h4 className={styles.span}>⏱️ {seconds}</h4>
            </Stack>
            <Stack
              spacing={2}
              justifyContent='center'
              direction={setupData.height == 8 ? 'column' : 'row'}
            >
              <Button
                startIcon={<ArrowBackIosIcon />}
                onClick={() => setGameStarted(false)}
                variant='contained'
                color='success'
              >
                New Game
              </Button>
              <Button onClick={() => resetGame(setupData)} variant='contained'>
                Reset Game
              </Button>
            </Stack>
          </Card>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${setupData.width}, 30px)`,
              gridTemplateRows: `repeat(${setupData.height}, 30px)`,
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
        </Paper>
      </div>
    </Container>
  )
}
