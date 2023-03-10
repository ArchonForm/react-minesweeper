import React from 'react'
import { CellData } from '../../models'

export interface CellProps {
  cell: CellData
  i: number
  j: number
  onLeftClick: (e: React.MouseEvent, x: number, y: number) => void
  onRightClick: (e: React.MouseEvent, x: number, y: number) => void
}
