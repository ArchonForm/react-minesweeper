export interface CellData {
  x: number
  y: number
  isMine: boolean
  neighbors: number
  isEmpty: boolean
  isRevealed: boolean
  isFlagged: boolean
}

export interface BoardData {
  width: number
  height: number
  mines: number
}

export interface SetupData {
  width: number
  height: number
  mines: number
}
