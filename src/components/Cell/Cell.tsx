import styles from './Cell.module.scss'
import { CellProps } from './Cell.props'
import { CellData } from '../../models'
import cn from 'classnames'

export const Cell = ({ cell, i, j, onLeftClick, onRightClick }: CellProps) => {
  const cellValue = (data: CellData) => {
    const { isMine, isRevealed, isFlagged, neighbors } = data
    if (!isRevealed) return isFlagged ? '🚩' : ''
    if (isMine) return '💣'
    if (neighbors) return neighbors
  }

  const getColor = (neighbors: number) => {
    switch (neighbors) {
      case 1:
        return 'blue'
      case 2:
        return 'green'
      case 3:
        return 'red'
      case 4:
        return 'dark-blue'
      case 5:
        return 'brown'
      case 6:
        return 'DarkCyan'
      case 7:
        return 'black'
      case 8:
        return 'white'
      default:
        return ''
    }
  }

  return (
    <div
      onClick={e => onLeftClick(e, i, j)}
      onContextMenu={e => onRightClick(e, i, j)}
      className={cn(styles.cell, {
        [styles.revealed]: cell.isRevealed,
      })}
      style={{ color: getColor(cell.neighbors) }}
    >
      {cellValue(cell)}
    </div>
  )
}
