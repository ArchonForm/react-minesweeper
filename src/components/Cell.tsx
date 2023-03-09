import styles from './Cell.module.scss'
import { CellProps } from './Cell.props'
import { CellData } from '../models'

export const Cell = ({ cell, i, j, onLeftClick, onRightClick }: CellProps) => {
  const cellValue = (data: CellData) => {
    const { isMine, isRevealed, isFlagged, neighbors } = data
    if (!isRevealed) return isFlagged ? '🚩' : '❌'
    if (isMine) return '💣'
    if (neighbors) return neighbors
  }
  //   ✅
  return (
    <div
      onClick={e => onLeftClick(e, i, j)}
      onContextMenu={e => onRightClick(e, i, j)}
      className={styles.cell}
      data-dimension={`${i} - ${j}`}
    >
      {cellValue(cell)}
    </div>
  )
}
