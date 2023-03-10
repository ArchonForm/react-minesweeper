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
        return 'teal'
      case 2:
        return '#fa6781'
      case 3:
        return 'Sienna'
      case 4:
        return 'purple'
      case 5:
        return 'IndianRed'
      case 6:
        return 'blue'
      case 7:
        return 'red'
      case 8:
        return 'BurlyWood'
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
